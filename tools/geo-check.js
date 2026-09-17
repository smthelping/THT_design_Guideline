/* GEO check — automated audit of a static site's generative-engine readiness.
 *
 * Scores six dimensions (100 points total) and prints per-item evidence.
 * Read-only: never modifies anything.
 *
 *   node tools/geo-check.js [site-dir] [base-url]
 *
 * With a base URL it also verifies robots.txt / sitemap.xml / llms.txt and the
 * canonical target are actually reachable.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const DIR = process.argv[2] || ".";
const BASE = (process.argv[3] || "").replace(/\/$/, "");
const read = p => { try { return fs.readFileSync(path.join(DIR, p), "utf8"); } catch (e) { return null; } };

/* Fetch just the HTTP status code via curl.
 * Two portability traps are handled here, both of which otherwise make every
 * live check look like a network failure:
 *   1. `-o /dev/null` does not work with the native Windows curl.exe -> use a
 *      real temp file instead.
 *   2. curl can exit non-zero (e.g. 23) *after* it has already printed the
 *      status code, so a throwing execFileSync must still surface stdout. */
const TMP_OUT = path.join(os.tmpdir(), "geo-check-body.tmp");
function httpCode(url) {
  const args = ["-s", "-L", "-o", TMP_OUT, "-w", "%{http_code}"];
  if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/i.test(url)) args.push("--noproxy", "*");
  args.push(url);
  try {
    return execFileSync("curl", args, { encoding: "utf8", timeout: 25000 }).trim() || "000";
  } catch (e) {
    return ((e && e.stdout ? String(e.stdout) : "").trim()) || "000";
  }
}

let score = 0;
const rows = [];
function add(dim, item, got, max, note) {
  score += got;
  rows.push({ dim, item, got, max, note: note || "" });
}
const words = t => (String(t).match(/[A-Za-z0-9][A-Za-z0-9.\-]*/g) || []).length;

const html = read("index.html");
if (!html) { console.error("index.html not found in " + DIR); process.exit(2); }

// strip script/style/comments -> what a non-JS crawler extracts
const visible = html
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ");
const text = visible.replace(/<[^>]+>/g, " ");
const staticWords = words(text);

// ---------------------------------------------------------------- 1. crawlability
const robots = read("robots.txt"), sitemap = read("sitemap.xml"), llms = read("llms.txt");
add("1 crawlability", "robots.txt present", robots ? 3 : 0, 3);
add("1 crawlability", "sitemap.xml present", sitemap ? 3 : 0, 3);
add("1 crawlability", "llms.txt present", llms ? 3 : 0, 3);
add("1 crawlability", "AI crawlers explicitly allowed",
  robots && /GPTBot|ClaudeBot|PerplexityBot|CCBot/i.test(robots) ? 2 : 0, 2);

const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || "";
let canonOk = false, canonNote = canon || "(none)";
if (canon && BASE) {
  const code = httpCode(canon);
  canonOk = code === "200";
  canonNote = canon + " -> " + code;
} else if (canon) { canonOk = /^https:\/\//.test(canon); canonNote = canon + " (not verified: no base-url)"; }
add("1 crawlability", "canonical resolves", canonOk ? 4 : 0, 4, canonNote);

// static content ratio
let jsWords = 0;
["assets/js/data.js"].forEach(f => {
  const s = read(f); if (!s) return;
  (s.match(/"((?:[^"\\]|\\.)*)"/g) || []).forEach(m => { jsWords += words(m.slice(1, -1)); });
});
const ratio = staticWords + jsWords ? staticWords / (staticWords + jsWords) : 1;
add("1 crawlability", "static content ratio >= 50%", ratio >= 0.5 ? 5 : ratio >= 0.35 ? 2 : 0, 5,
  `${staticWords.toLocaleString()} static words, ratio ${(ratio * 100).toFixed(0)}%`);

const usesHash = /href="#\/[a-z]/.test(html);
add("1 crawlability", "no hash-only routing", usesHash ? 0 : 2, 2, usesHash ? "hash routes present" : "");
add("1 crawlability", "noscript fallback for hidden routes",
  /<noscript>[\s\S]*?\.route[\s\S]*?<\/noscript>/i.test(html) ? 3 : 0, 3);

// ---------------------------------------------------------------- 2. structured data
const types = [...new Set((html.match(/"@type":\s*"([A-Za-z]+)"/g) || [])
  .map(m => m.replace(/.*"([A-Za-z]+)"/, "$1")))];
const has = t => types.includes(t);
add("2 structured data", "TechArticle/Article", has("TechArticle") || has("Article") ? 4 : 0, 4);
add("2 structured data", "Organization with sameAs",
  has("Organization") && /"sameAs"/.test(html) ? 5 : has("Organization") ? 2 : 0, 5);
add("2 structured data", "FAQPage", has("FAQPage") ? 4 : 0, 4);
add("2 structured data", "HowTo", has("HowTo") ? 3 : 0, 3);
add("2 structured data", "BreadcrumbList", has("BreadcrumbList") ? 2 : 0, 2);
add("2 structured data", "WebSite", has("WebSite") ? 1 : 0, 1);
add("2 structured data", "datePublished + inLanguage",
  /"datePublished"/.test(html) && /"inLanguage"/.test(html) ? 1 : 0, 1);

// ---------------------------------------------------------------- 3. citability
const defs = (html.match(/<p[^>]*>[A-Z][a-z]+ (?:is|are|refers to|means)[^<]{20,140}<\/p>/g) || []).length;
add("3 citability", "definition sentences (X is Y)", defs >= 8 ? 7 : defs >= 3 ? 4 : defs >= 1 ? 2 : 0, 7, defs + " found");
const qHeads = (html.match(/<h[2-4][^>]*>[^<]*\?[^<]*<\/h[2-4]>/g) || []).length;
add("3 citability", "question-shaped headings", qHeads >= 5 ? 4 : qHeads >= 1 ? 2 : 0, 4, qHeads + " found");
const tables = (html.match(/<table/g) || []).length;
add("3 citability", "comparison tables", tables >= 5 ? 4 : tables >= 1 ? 2 : 0, 4, tables + " found");
// "5×" uses U+00D7, so a plain /5x/ never matches it — accept the real glyph.
const STATS = [/\b5\s*(?:×|x|times)/i, /50\+/, /\b15 years\b/i, /\b2011\b/, /\b1,?700\+/];
const statHits = STATS.filter(re => re.test(text)).length;
add("3 citability", "quotable business facts", statHits >= 4 ? 7 : statHits >= 2 ? 4 : statHits >= 1 ? 2 : 0, 7,
  statHits + "/5 signature facts present");
const hasFaqContent = /FAQPage/.test(html) || (html.match(/\?<\/(?:p|td|h[2-4])>/g) || []).length >= 8;
add("3 citability", "Q&A content marked up", hasFaqContent ? 3 : 0, 3);

// ---------------------------------------------------------------- 4. entity & brand
add("4 entity", "named author (Person)", /"@type":\s*"Person"/.test(html) ? 4 : 0, 4);
const socials = ["linkedin.com/company", "linkedin.com/in", "twitter.com", "facebook.com", "youtube.com"];
const socHits = socials.filter(s => html.includes(s)).length;
add("4 entity", "social profiles linked", socHits >= 5 ? 3 : socHits >= 3 ? 2 : 0, 3, socHits + "/5");
add("4 entity", "Organization url + foundingDate",
  /"foundingDate"/.test(html) && /"url"/.test(html) ? 4 : 0, 4);
add("4 entity", "external authority citations",
  /IPC-|IPC\s?\d|J-STD|IEC\s?\d/.test(text) ? 4 : 0, 4);

// ---------------------------------------------------------------- 5. multilingual
const langs = ["es", "pt", "fr", "ar", "ru", "zh"].filter(l => read("assets/js/i18n/" + l + ".js"));
add("5 multilingual", "multiple locales shipped", langs.length >= 5 ? 4 : langs.length >= 2 ? 2 : 0, 4, langs.length + " locales");
add("5 multilingual", "hreflang annotations", /hreflang=/.test(html) ? 3 : 0, 3);
add("5 multilingual", "per-language URLs", /href="\/(es|pt|fr|ar|ru|zh)\//.test(html) ? 3 : 0, 3);

// ---------------------------------------------------------------- 6. technical signals
add("6 technical", "og:url + twitter:card",
  /og:url/.test(html) && /twitter:card/.test(html) ? 2 : 0, 2);
const imgs = (html.match(/<img[^>]*>/g) || []);
const withAlt = imgs.filter(t => /alt="[^"]+"/.test(t)).length;
add("6 technical", "image alt coverage", imgs.length === 0 ? 1 : (withAlt / imgs.length) >= 0.8 ? 1 : 0, 1,
  withAlt + "/" + imgs.length);
add("6 technical", "semantic article/section tags",
  /<article[ >]/.test(html) && /<section[ >]/.test(html) ? 2 : 0, 2);

// ---------------------------------------------------------------- report
const byDim = {};
rows.forEach(r => { byDim[r.dim] = byDim[r.dim] || { got: 0, max: 0 }; byDim[r.dim].got += r.got; byDim[r.dim].max += r.max; });

console.log("");
Object.keys(byDim).forEach(d => {
  const { got, max } = byDim[d];
  console.log(d.padEnd(20) + String(got).padStart(3) + " / " + max);
  rows.filter(r => r.dim === d).forEach(r => {
    console.log("    " + (r.got === r.max ? "[ok]  " : r.got > 0 ? "[part]" : "[--]  ") +
      r.item.padEnd(42) + String(r.got).padStart(2) + "/" + r.max + (r.note ? "   " + r.note : ""));
  });
  console.log("");
});
console.log("TOTAL GEO SCORE: " + score + " / 100");
if (BASE) {
  ["robots.txt", "sitemap.xml", "llms.txt"].forEach(f => {
    console.log("  live " + f.padEnd(14) + httpCode(BASE + "/" + f));
  });
}
