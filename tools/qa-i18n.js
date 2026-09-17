/* Translation QA scan.
   Loads assets/js/i18n/app.js (APP_I18N) and each assets/js/i18n/<lang>.js
   (DOM text), then reports defects per locale:

     1. placeholder mismatch   -> {n}/{t}/{d} set differs from English  (STRUCTURAL BUG)
     2. empty / whitespace     -> value is blank
     3. identical to English   -> likely untranslated (only flagged when the
                                  English value contains real words, not a
                                  pure measurement / model code / URL)
     4. no target-script chars -> value has no characters from the target
                                  script (Cyrillic / Arabic / Han) although
                                  English does contain letters
     5. Latin-only residue     -> value keeps an English word that was clearly
                                  part of a sentence template
*/
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DIR = process.argv[2] || ".";
const LANGS = ["es", "pt", "fr", "ar", "ru", "zh"];
const NAMES = { es: "Spanish", pt: "Portuguese", fr: "French", ar: "Arabic", ru: "Russian", zh: "Chinese" };
const SCRIPT_RE = {
  ru: /[\u0400-\u04FF]/,
  ar: /[\u0600-\u06FF]/,
  zh: /[\u4E00-\u9FFF]/
};

// Values that are legitimately identical across languages.
const NEUTRAL = [
  /^[\s\d.,:;/×xX+\-–—±%°()\[\]"'`]*$/,       // pure numeric / punctuation
  /^(https?:|\/\/|www\.|mailto:)/i,            // URLs
  /^[A-Z0-9\-_./]{2,}$/,                       // model codes, acronyms
  /^[\u00A0\s]*$/                              // blank
];
const isNeutral = s => NEUTRAL.some(re => re.test(s.trim()));

function loadFile(file, globalName) {
  const code = fs.readFileSync(path.join(DIR, file), "utf8");
  const sandbox = { window: {} };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox[globalName] || {};
}

const APP = loadFile("assets/js/i18n/app.js", "APP_I18N");
const enApp = APP.en;

let structural = 0, blank = 0, untranslated = 0, noScript = 0, residue = 0, degen = 0;
const report = {};

const ph = s => (String(s).match(/\{[a-z]\}/g) || []).sort().join(",");
// Strip placeholders and punctuation; what is left is the literal wording.
const literal = s => String(s).replace(/\{[a-z]\}/g, "").replace(/[\s\u00A0.,:;/×+\-–—±%°()\[\]"'`|]+/g, "");
// A template whose English side carries wording but whose translation carries
// none is degenerate: e.g. en "{n} read" -> zh "{n}" (unit silently dropped).
const degenerate = (e, v) => {
  const le = literal(e), lv = literal(v);
  return le.length >= 2 && /[A-Za-z]{2,}/.test(le) && lv.length === 0;
};
// Terms that correctly stay in Latin script: brands, platform names, and
// standard technology / industry acronyms. A hit here means the translation is
// right and the checker is wrong — extend this list rather than "fixing" a
// translation that legitimately keeps the term.
const BRANDS = /\b(Panasonic|Yamaha|Fuji|JUKI|Samsung|Hitachi|ASM|Siemens|Hanwha|Sanyo|Mirae|Casio|Assembleon|Sony|Universal|YouTube|Google|Chatwoot|LinkedIn|Twitter|Facebook|WhatsApp|JavaScript|TypeScript|HTML|CSS|JSON|XML|HTTP|HTTPS|URL|API|PDF|CSV|Excel|Gerber|DXF|Open|pallet|PCB|SMT|THT|LED|SMD|DIP|USB|CAD|ROI|CPH|UPH|ESD|PPU|DFM|FAQ|IPC|J-STD|IEC|AMR|BHS|SBT)\b/i;

LANGS.forEach(L => {
  const dom = loadFile("assets/js/i18n/" + L + ".js", "I18N")[L] || {};
  const app = APP[L] || {};
  const issues = [];

  // ---- APP_I18N checks
  Object.keys(enApp).forEach(k => {
    const e = enApp[k], v = app[k];
    if (v === undefined) { issues.push(["MISSING", "app:" + k, ""]); return; }
    if (ph(e) !== ph(v)) { structural++; issues.push(["PLACEHOLDER", "app:" + k, "en=" + ph(e) + " vs " + L + "=" + ph(v)]); }
    if (!String(v).trim()) { blank++; issues.push(["BLANK", "app:" + k, ""]); }
    if (v === e && !isNeutral(e)) { untranslated++; issues.push(["SAME-AS-EN", "app:" + k, JSON.stringify(e)]); }
    if (degenerate(e, v)) { degen++; issues.push(["DEGENERATE", "app:" + k, "en=" + JSON.stringify(e) + " -> " + L + "=" + JSON.stringify(v)]); }
    if (SCRIPT_RE[L] && SCRIPT_RE[L].test(String(v)) === false && /[A-Za-z]{4,}/.test(String(v)) && !isNeutral(e)) {
      noScript++; issues.push(["NO-TARGET-SCRIPT", "app:" + k, JSON.stringify(v)]);
    }
  });

  // ---- DOM I18N checks
  Object.keys(dom).forEach(k => {
    const v = dom[k];
    if (!String(v).trim()) { blank++; issues.push(["BLANK", "dom:" + k, ""]); }
    if (SCRIPT_RE[L] && !SCRIPT_RE[L].test(String(v)) && /[A-Za-z]{5,}/.test(String(v)) && !isNeutral(v)) {
      noScript++; issues.push(["NO-TARGET-SCRIPT", "dom:" + k, JSON.stringify(String(v).slice(0, 60))]);
    }
    // Latin residue: a run of >=5 latin letters surrounded by target script
    if (SCRIPT_RE[L] && SCRIPT_RE[L].test(String(v))) {
      const m = String(v).match(/[\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF][^A-Za-z]{0,3}([A-Za-z]{5,})[^A-Za-z]{0,3}[\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/);
      if (m && !BRANDS.test(m[1])) { residue++; issues.push(["LATIN-RESIDUE", "dom:" + k, JSON.stringify(m[1] + " in " + String(v).slice(0, 60))]); }
    }
  });

  report[L] = { domCount: Object.keys(dom).length, appCount: Object.keys(app).length, issues };
});

// ------------------------------------------------------------------
console.log("APP_I18N keys (en): " + Object.keys(enApp).length);
LANGS.forEach(L => console.log("  " + L + " (" + NAMES[L] + "): app=" + report[L].appCount + " dom=" + report[L].domCount));
console.log("");
console.log("TOTALS -> placeholder:" + structural + "  blank:" + blank +
            "  same-as-en:" + untranslated + "  degenerate:" + degen +
            "  no-target-script:" + noScript + "  latin-residue:" + residue);
console.log("");

const FOCUS = process.argv[3];
LANGS.forEach(L => {
  if (FOCUS && L !== FOCUS) return;
  const bad = report[L].issues.filter(i => i[0] !== "SAME-AS-EN" || process.env.SHOW_SAME);
  console.log("--- " + L + " (" + NAMES[L] + ") : " + bad.length + " issue(s) ---");
  bad.slice(0, 40).forEach(i => console.log("   [" + i[0] + "] " + i[1] + "  " + i[2]));
  if (bad.length > 40) console.log("   ... " + (bad.length - 40) + " more");
  console.log("");
});
if (!process.env.SHOW_SAME) {
  const same = [];
  LANGS.forEach(L => report[L].issues.filter(i => i[0] === "SAME-AS-EN").forEach(i => same.push(L + " " + i[1] + " " + i[2])));
  if (same.length) { console.log("--- same-as-English (review; may be intentional) ---"); same.forEach(s => console.log("   " + s)); }
}
