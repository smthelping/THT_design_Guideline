/* End-to-end DOM test with jsdom.
   Loads the real index.html + all real scripts, then exercises:
     - default state (English, light)
     - lazy route rendering (#/media -> videos + catalog + gallery)
     - theme toggle + persistence
     - language switch + persistence + RTL
     - JS-rendered content re-render on switch
     - tick state survival across a switch
     - restore-after-reload behaviour
     - no uncaught runtime errors

   NOTE ON SCOPING: the real scripts are classic <script> tags, so top-level
   `const`/`let` (e.g. `const BLOGS` in data.js) land in the *global lexical
   environment* and are visible to every later script. jsdom's indirect
   `window.eval()` gives each call its own declarative environment, which would
   hide them. So we concatenate all scripts into ONE eval to reproduce the
   browser's shared lexical scope. The head pre-paint script stays separate
   because it is a self-contained IIFE.
*/
const fs = require("fs");
const path = require("path");
const { JSDOM, VirtualConsole } = require("jsdom");

const DIR = process.argv[2] || ".";
const read = p => fs.readFileSync(path.join(DIR, p), "utf8");

// Scripts in the same order as index.html, minus the Chatwoot SDK (network).
const SCRIPTS = [
  "assets/js/i18n/app.js",
  "assets/js/i18n/en.js", "assets/js/i18n/es.js", "assets/js/i18n/pt.js",
  "assets/js/i18n/fr.js", "assets/js/i18n/ar.js", "assets/js/i18n/ru.js",
  "assets/js/i18n/zh.js",
  "assets/js/ui.js",
  "assets/js/data.js",
  "assets/js/app.js"
];

const source = read("index.html");

// The inline pre-paint script from <head>, replayed verbatim so we test the
// real first-paint path rather than a reimplementation of it.
const headScript = (source.match(
  /<!-- Apply saved theme and language[\s\S]*?<\/script>/) || [""])[0]
  .replace(/^[\s\S]*?<script>/, "").replace(/<\/script>\s*$/, "");
if (!headScript) { console.error("could not extract head pre-paint script"); process.exit(2); }

// strip external + inline script tags; we inject them ourselves
const html = source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const bundle = SCRIPTS.map(read).join("\n;\n");

let pass = 0, fail = 0;
function check(name, cond, detail) {
  if (cond) { pass++; console.log("  PASS  " + name); }
  else { fail++; console.log("  FAIL  " + name + (detail ? "  -> " + detail : "")); }
}
function section(t) { console.log("\n=== " + t + " ==="); }

function boot(storage) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", e => errors.push((e.detail && e.detail.message) || e.message || String(e)));
  vc.on("error", (...a) => errors.push(a.join(" ")));

  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    url: "https://example.test/",
    pretendToBeVisual: true,
    virtualConsole: vc
  });
  const w = dom.window;
  Object.keys(storage || {}).forEach(k => w.localStorage.setItem(k, storage[k]));
  w.scrollTo = () => {};
  w.eval(headScript);
  w.eval(bundle);                       // shared lexical scope, as in a browser
  w.document.dispatchEvent(new w.Event("DOMContentLoaded", { bubbles: true }));
  dom.__errors = errors;
  return dom;
}

const key = (dom, k) => {
  const el = dom.window.document.querySelector('[data-i18n="' + k + '"]');
  return el ? el.textContent.trim() : null;
};
const setLang = (dom, code) => {
  const sel = dom.window.document.getElementById("langSelect");
  sel.value = code;
  sel.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
};
const go = (dom, hash) => {
  dom.window.location.hash = hash;
  dom.window.dispatchEvent(new dom.window.Event("hashchange"));
};

/* ------------------------------------------------------------------ */
section("1 - default state (no stored preference)");
const dom = boot({});
const d = dom.window.document, w = dom.window;
check("no uncaught errors during boot", dom.__errors.length === 0, dom.__errors[0]);
check("html lang = en", d.documentElement.getAttribute("lang") === "en", d.documentElement.getAttribute("lang"));
check("html dir = ltr", d.documentElement.getAttribute("dir") === "ltr");
check("html data-theme = light", d.documentElement.getAttribute("data-theme") === "light");
check("nav text is English", key(dom, "design-guide") === "Design Guide", key(dom, "design-guide"));
check("language select built with 7 options",
      d.getElementById("langSelect").options.length === 7,
      String(d.getElementById("langSelect").options.length));
check("theme button present", !!d.getElementById("themeToggle"));
check("nothing persisted yet", w.localStorage.getItem("smthelp.lang") === null);
check("router landed on #/guide", !!d.getElementById("route-guide").classList.contains("active"));
check("JS-rendered: checklist built", d.querySelectorAll("#checklist .check-item").length === 14,
      String(d.querySelectorAll("#checklist .check-item").length));
check("JS-rendered: blog cards built", d.querySelectorAll("#blog-grid .blog-card").length === 10,
      String(d.querySelectorAll("#blog-grid .blog-card").length));
check("JS-rendered: radial gallery built", d.querySelectorAll("#gallery-radial img").length > 0,
      String(d.querySelectorAll("#gallery-radial img").length));
check("gallery captions localised from APP_I18N",
      /3010|Radial/i.test(d.querySelector("#gallery-radial figcaption").textContent),
      d.querySelector("#gallery-radial figcaption").textContent);

/* ------------------------------------------------------------------ */
section("2 - lazy route rendering (#/media)");
go(dom, "#/media");
check("no uncaught errors on navigation", dom.__errors.length === 0, dom.__errors[0]);
check("route-media is active", d.getElementById("route-media").classList.contains("active"));
check("route-guide deactivated", !d.getElementById("route-guide").classList.contains("active"));
check("video cards built", d.querySelectorAll("#video-grid .video-card").length > 0,
      String(d.querySelectorAll("#video-grid .video-card").length));
check("video filter chips built", d.querySelectorAll("#video-filters .chip").length > 1,
      String(d.querySelectorAll("#video-filters .chip").length));
check("catalog items built", d.querySelectorAll("#catalog-list .catalog-item").length > 0,
      String(d.querySelectorAll("#catalog-list .catalog-item").length));
check("catalog filter chips built", d.querySelectorAll("#catalog-filters .chip").length > 1,
      String(d.querySelectorAll("#catalog-filters .chip").length));
check("main gallery built", d.querySelectorAll("#gallery-main img").length > 0,
      String(d.querySelectorAll("#gallery-main img").length));
check("media 'All' chip is English", d.querySelector("#video-filters .chip").textContent.indexOf("All") === 0,
      d.querySelector("#video-filters .chip").textContent);

/* ------------------------------------------------------------------ */
section("3 - theme toggle + persistence");
d.getElementById("themeToggle").click();
check("data-theme flipped to dark", d.documentElement.getAttribute("data-theme") === "dark",
      d.documentElement.getAttribute("data-theme"));
check("aria-pressed updated", d.getElementById("themeToggle").getAttribute("aria-pressed") === "true");
check("persisted to localStorage", w.localStorage.getItem("smthelp.theme") === "dark",
      String(w.localStorage.getItem("smthelp.theme")));
check("meta theme-color darkened",
      (d.querySelector('meta[name="theme-color"]') || {}).content === "#0b132b",
      (d.querySelector('meta[name="theme-color"]') || {}).content);
d.getElementById("themeToggle").click();
check("toggles back to light", d.documentElement.getAttribute("data-theme") === "light");
check("persisted back to light", w.localStorage.getItem("smthelp.theme") === "light");
check("meta theme-color restored",
      (d.querySelector('meta[name="theme-color"]') || {}).content === "#ffffff");

/* ------------------------------------------------------------------ */
section("4 - language switch (zh)");
setLang(dom, "zh");
check("html lang = zh", d.documentElement.getAttribute("lang") === "zh");
check("nav translated to Chinese", key(dom, "design-guide") === "设计指引", key(dom, "design-guide"));
check("heading translated",
      (key(dom, "why-layout-not-equipment-decides-the-outcome") || "").indexOf("为什么") === 0,
      key(dom, "why-layout-not-equipment-decides-the-outcome"));
check("persisted lang", w.localStorage.getItem("smthelp.lang") === "zh");
check("dir stays ltr for zh", d.documentElement.getAttribute("dir") === "ltr");

/* ------------------------------------------------------------------ */
section("5 - JS-rendered content re-renders on switch");
const ck = d.querySelector("#checklist .ci-title");
check("checklist rebuilt in Chinese", !!ck && /[\u4e00-\u9fff]/.test(ck.textContent),
      ck ? ck.textContent.slice(0, 40) : "no #checklist .ci-title");
check("score label localised", /已确认/.test(d.getElementById("score-label").textContent),
      d.getElementById("score-label").textContent);
const blogRead = d.querySelector("#blog-grid .bc-foot span");
check("blog read-time localised", !!blogRead && /阅读/.test(blogRead.textContent),
      blogRead ? blogRead.textContent : "none");
check("blog read-time keeps the number", !!blogRead && /7/.test(blogRead.textContent),
      blogRead ? blogRead.textContent : "none");
check("media 'All' chip localised", d.querySelector("#video-filters .chip").textContent.indexOf("全部") === 0,
      d.querySelector("#video-filters .chip").textContent);
check("gallery caption localised", /[\u4e00-\u9fff]/.test(d.querySelector("#gallery-main figcaption").textContent),
      d.querySelector("#gallery-main figcaption").textContent);
check("no uncaught errors after switch", dom.__errors.length === 0, dom.__errors[0]);

/* ------------------------------------------------------------------ */
section("6 - tick state survives a language switch");
const boxes = d.querySelectorAll("[data-check]");
[0, 3, 7].forEach(i => { boxes[i].checked = true; boxes[i].dispatchEvent(new w.Event("change", { bubbles: true })); });
check("score reads 3 of 14", /3/.test(d.getElementById("score-label").textContent) &&
      d.getElementById("score-val").textContent === "21%",
      d.getElementById("score-label").textContent + " / " + d.getElementById("score-val").textContent);
setLang(dom, "es");
const boxes2 = d.querySelectorAll("[data-check]");
check("all 3 ticks preserved after switch",
      [0, 3, 7].filter(i => boxes2[i] && boxes2[i].checked).length === 3,
      String([0, 3, 7].filter(i => boxes2[i] && boxes2[i].checked).length));
check("score still 3 after switch", d.getElementById("score-val").textContent === "21%",
      d.getElementById("score-val").textContent);
check("score label now Spanish", /confirmad/i.test(d.getElementById("score-label").textContent),
      d.getElementById("score-label").textContent);
setLang(dom, "zh");
check("score back to Chinese and still 3",
      /已确认/.test(d.getElementById("score-label").textContent) && /3/.test(d.getElementById("score-label").textContent),
      d.getElementById("score-label").textContent);

/* ------------------------------------------------------------------ */
section("7 - Arabic switches direction to RTL");
setLang(dom, "ar");
check("dir = rtl", d.documentElement.getAttribute("dir") === "rtl", d.documentElement.getAttribute("dir"));
check("lang = ar", d.documentElement.getAttribute("lang") === "ar");
check("nav translated to Arabic", key(dom, "design-guide") === "دليل التصميم", key(dom, "design-guide"));
check("RTL stylesheet rules present", /\[dir="rtl"\]/.test(read("assets/css/style.css")));
check("bidi isolation rule present", /unicode-bidi:\s*isolate/.test(read("assets/css/style.css")));

/* ------------------------------------------------------------------ */
section("8 - back to English restores cached originals");
setLang(dom, "en");
check("nav back to English", key(dom, "design-guide") === "Design Guide", key(dom, "design-guide"));
check("heading back to English",
      (key(dom, "why-layout-not-equipment-decides-the-outcome") || "").indexOf("Why layout") === 0);
check("dir back to ltr", d.documentElement.getAttribute("dir") === "ltr");
check("checklist back to English", /Board thickness/.test(d.querySelector("#checklist .ci-title").textContent),
      d.querySelector("#checklist .ci-title").textContent.slice(0, 40));
check("blog read-time back to English", /min read/.test(d.querySelector("#blog-grid .bc-foot span").textContent),
      d.querySelector("#blog-grid .bc-foot span").textContent);
check("ticks still preserved in English", d.querySelectorAll("[data-check]:checked").length === 3,
      String(d.querySelectorAll("[data-check]:checked").length));

/* ------------------------------------------------------------------ */
section("9 - preferences survive a reload");
const dom2 = boot({ "smthelp.theme": "dark", "smthelp.lang": "ru" });
const d2 = dom2.window.document;
check("no uncaught errors on reload boot", dom2.__errors.length === 0, dom2.__errors[0]);
check("theme restored = dark", d2.documentElement.getAttribute("data-theme") === "dark",
      d2.documentElement.getAttribute("data-theme"));
check("lang restored = ru", d2.documentElement.getAttribute("lang") === "ru");
check("nav rendered in Russian", key(dom2, "design-guide") === "Руководство по проектированию",
      key(dom2, "design-guide"));
check("select shows ru", d2.getElementById("langSelect").value === "ru");
check("theme button shows sun icon", d2.getElementById("themeToggle").querySelector(".tt-icon").textContent === "☀",
      d2.getElementById("themeToggle").querySelector(".tt-icon").textContent);
check("no flash: data-theme present on <html> before scripts",
      /d\.setAttribute\("data-theme", t\)/.test(headScript));

/* ------------------------------------------------------------------ */
section("10 - all 7 locales translate the same element set");
const LANGS = ["en", "es", "pt", "fr", "ar", "ru", "zh"];
const probes = ["design-guide", "auto-insertion-readiness-checklist", "why-layout-not-equipment-decides-the-outcome"];
const dom3 = boot({});
LANGS.forEach(code => {
  setLang(dom3, code);
  const vals = probes.map(k => key(dom3, k));
  check(code + ": probe keys non-empty", vals.every(v => v && v.length > 0), JSON.stringify(vals));
  if (code !== "en") check(code + ": differs from English", vals[0] !== "Design Guide", JSON.stringify(vals[0]));
});

/* ------------------------------------------------------------------ */
section("11 - no untranslated-key leakage");
const leaks = [], empty = [];
d2.querySelectorAll("[data-i18n]").forEach(el => {
  const t = el.textContent.trim();
  if (t && t === el.getAttribute("data-i18n")) leaks.push(t);
  if (t === "") empty.push(el.getAttribute("data-i18n"));
});
check("no element shows its raw key", leaks.length === 0, leaks.slice(0, 5).join(", "));
check("no element left blank", empty.length === 0, empty.slice(0, 5).join(", "));

/* ------------------------------------------------------------------ */
section("12 - GEO static content survives JS boot (P0)");
setLang(dom, "en");
const cards = Array.prototype.slice.call(d.querySelectorAll("#blog-grid .blog-card"));
const statics = Array.prototype.slice.call(d.querySelectorAll("#route-blog .static-article"));
check("blog grid rendered 10 cards", cards.length === 10, String(cards.length));
check("10 static articles present in the DOM after boot", statics.length === 10, String(statics.length));

// The static copy is generated from data.js at build time. If the two ever
// drift, crawlers would index text that no longer matches the site.
const cardTitles = cards.map(c => c.querySelector("h3").textContent.trim()).sort();
const staticTitles = statics.map(a => a.querySelector("h3").textContent.trim()).sort();
check("static titles match data.js titles", JSON.stringify(cardTitles) === JSON.stringify(staticTitles),
      staticTitles.filter(t => cardTitles.indexOf(t) < 0).slice(0, 3).join(" | "));
const cardIds = cards.map(c => c.getAttribute("data-id")).sort();
const staticIds = statics.map(a => a.id.replace(/^article-/, "")).sort();
check("static ids match data.js ids", JSON.stringify(cardIds) === JSON.stringify(staticIds),
      staticIds.filter(i => cardIds.indexOf(i) < 0).slice(0, 3).join(" | "));

// app.js renders p/ul/ol with innerHTML because data.js carries inline <strong>.
// Over-escaping here would ship literal "&lt;strong&gt;" text to every reader.
check("inline markup rendered, not escaped", !/&lt;(strong|em|code)&gt;/.test(source));
check("article bodies contain real <strong> markup",
      statics.some(a => a.querySelector("strong")), String(statics.filter(a => a.querySelector("strong")).length));
check("static articles use h3 (outline h2 > h3 > h4, no skips)",
      statics.every(a => a.querySelector("h3")) && statics.every(a => a.querySelector("h4")));
check("static articles carry topic + keywords", statics.every(a => a.querySelector(".sa-topic")) &&
      statics.every(a => /Keywords/i.test(a.textContent)));
check("no duplicate body text (excerpt not repeated)", !/Most THT automation projects fail[\s\S]*Most THT automation projects fail/.test(source));

// Without JS every .route is display:none, so the noscript rule is what makes
// this content genuinely readable instead of hidden text.
check("noscript reveals routes when JS is off",
      /<noscript><style>\.route\{display:block/.test(source));

// crawler files
const robots = read("robots.txt"), sitemap = read("sitemap.xml"), llms = read("llms.txt");
check("robots.txt present", !!robots);
check("robots.txt allows the major AI crawlers",
      ["GPTBot", "ClaudeBot", "PerplexityBot", "CCBot"].every(b => robots.indexOf(b) >= 0));
check("robots.txt declares the sitemap", /Sitemap:\s*https:/.test(robots || ""));
check("sitemap.xml present and points at the canonical host",
      /smthelping\.github\.io\/THT_design_Guideline/.test(sitemap || ""));
check("llms.txt present", !!llms);
check("canonical is the live Pages URL",
      /<link rel="canonical" href="https:\/\/smthelping\.github\.io\/THT_design_Guideline\/"/.test(source));
check("og:url matches the canonical",
      /<meta property="og:url" content="https:\/\/smthelping\.github\.io\/THT_design_Guideline\/"/.test(source));
check("twitter:card present", /name="twitter:card"/.test(source));

// Structured data: a bare TechArticle gives an answer engine no entity to attach
// the facts to, so the Organization node carries foundingDate + sameAs + url.
check("Organization node declares foundingDate", /"foundingDate":\s*"2011"/.test(source));
check("Organization node declares url", /"@type":\s*"Organization"[\s\S]{0,600}?"url":/.test(source));
check("Organization node declares sameAs social profiles",
      (source.match(/"sameAs":\s*\[([\s\S]*?)\]/) || [])[1] &&
      ((source.match(/"sameAs":\s*\[([\s\S]*?)\]/)[1].match(/https:/g) || []).length >= 5));
check("TechArticle declares datePublished + inLanguage",
      /"datePublished"/.test(source) && /"inLanguage":\s*"en"/.test(source));

// The page must state the credentials that llms.txt quotes, or the two disagree.
check("visible credentials: founded 2011 + 15 years + 5×",
      /\b2011\b/.test(source) && /\b15 years\b/.test(source) && /5×/.test(source));
check("credentials paragraph is translatable", !!d.querySelector('[data-i18n="client-result-5x-throughput"]'));

// the new section chrome must translate like everything else
setLang(dom, "zh");
check("static-articles heading translates", key(dom, "full-articles") === "完整文章", key(dom, "full-articles"));
check("static-articles intro translates", /静态 HTML/.test(key(dom, "full-articles-intro") || ""),
      key(dom, "full-articles-intro"));
setLang(dom, "en");
check("static-articles heading restores to English", key(dom, "full-articles") === "Full articles",
      key(dom, "full-articles"));

/* ------------------------------------------------------------------ */
console.log("\nPASSED: " + pass + "   FAILED: " + fail);
process.exit(fail === 0 ? 0 : 1);
