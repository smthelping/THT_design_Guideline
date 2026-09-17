/* ==========================================================================
   THT Design Guide — UI controller
   Theme (light / dark) and language (7 locales) with persistence.
   No dependencies, no build step.

   Public API (window.SM):
     SM.T(key, vars)      translate an app string
     SM.lang              current language code
     SM.theme             current theme ('light' | 'dark')
     SM.setLang(code)     switch language (persists)
     SM.setTheme(name)    switch theme (persists)
     SM.toggleTheme()     flip theme
     SM.LANGS             supported language metadata
   Events:
     document 'sm:langchange'  fired after the language has been applied
     document 'sm:themechange' fired after the theme has been applied
   ========================================================================== */
(function () {
  "use strict";

  var LS_THEME = "smthelp.theme";
  var LS_LANG  = "smthelp.lang";

  var LANGS = [
    { code: "en", label: "English",    native: "English",   dir: "ltr" },
    { code: "es", label: "Spanish",    native: "Español",   dir: "ltr" },
    { code: "pt", label: "Portuguese", native: "Português", dir: "ltr" },
    { code: "fr", label: "French",     native: "Français",  dir: "ltr" },
    { code: "ar", label: "Arabic",     native: "العربية",   dir: "rtl" },
    { code: "ru", label: "Russian",    native: "Русский",   dir: "ltr" },
    { code: "zh", label: "Chinese",    native: "中文",       dir: "ltr" }
  ];
  var CODES = LANGS.map(function (l) { return l.code; });
  var DEFAULT_LANG = "en";

  /* ---------- storage (defensive: private mode / disabled storage) ------- */
  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  /* ---------- language resolution ---------------------------------------- */
  // Stored preference wins; otherwise fall back to the browser, then English.
  function initialLang() {
    var stored = read(LS_LANG);
    if (stored && CODES.indexOf(stored) !== -1) return stored;
    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    for (var i = 0; i < CODES.length; i++) {
      if (nav === CODES[i] || nav.indexOf(CODES[i] + "-") === 0) return CODES[i];
    }
    return DEFAULT_LANG;
  }

  function initialTheme() {
    var stored = read(LS_THEME);
    if (stored === "light" || stored === "dark") return stored;
    // Default to light: this is an engineering reference read in bright offices.
    return "light";
  }

  var lang  = initialLang();
  var theme = initialTheme();

  /* ---------- app strings (JS-generated content, not in the DOM) --------- */
  var APP = window.APP_I18N || {};

  function T(key, vars) {
    var table = APP[lang] || {};
    var s = table[key];
    if (s === undefined) s = (APP.en || {})[key];
    if (s === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return s;
  }

  /* ---------- DOM translation ------------------------------------------- */
  // English is the source language and lives in the markup, so each element's
  // original text is cached once and restored whenever we return to EN.
  var originals = null;

  function cacheOriginals() {
    originals = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      originals.push({ el: el, text: el.textContent });
    });
  }

  function applyI18n() {
    if (!originals) cacheOriginals();
    var table = (window.I18N && window.I18N[lang]) || {};
    originals.forEach(function (rec) {
      var key = rec.el.getAttribute("data-i18n");
      var val = table[key];
      rec.el.textContent = (val === undefined || val === null) ? rec.text : val;
    });
  }

  /* ---------- theme ------------------------------------------------------ */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b132b" : "#ffffff");
  }

  function setTheme(next) {
    if (next !== "light" && next !== "dark") return;
    if (next === theme) return;
    theme = next;
    write(LS_THEME, theme);
    applyTheme();
    syncThemeButton();
    document.dispatchEvent(new CustomEvent("sm:themechange", { detail: { theme: theme } }));
  }

  function toggleTheme() { setTheme(theme === "dark" ? "light" : "dark"); }

  /* ---------- language --------------------------------------------------- */
  function applyLang() {
    var meta = LANGS.filter(function (l) { return l.code === lang; })[0] || LANGS[0];
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", meta.dir);
    applyI18n();
    syncLangControl();
  }

  function setLang(next) {
    if (CODES.indexOf(next) === -1) return;
    if (next === lang) return;
    lang = next;
    write(LS_LANG, lang);
    applyLang();
    // let renderers rebuild JS-generated content in the new language
    document.dispatchEvent(new CustomEvent("sm:langchange", { detail: { lang: lang } }));
  }

  /* ---------- switcher UI ------------------------------------------------ */
  function syncThemeButton() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var dark = theme === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("title", T(dark ? "theme.toLight" : "theme.toDark"));
    btn.setAttribute("aria-label", T(dark ? "theme.toLight" : "theme.toDark"));
    var icon = btn.querySelector(".tt-icon");
    if (icon) icon.textContent = dark ? "☀" : "☾";
  }

  function syncLangControl() {
    var sel = document.getElementById("langSelect");
    if (!sel) return;
    sel.value = lang;
    var label = document.getElementById("langLabel");
    if (label) label.textContent = T("lang.label");
  }

  function buildLangSelect() {
    var sel = document.getElementById("langSelect");
    if (!sel) return;
    sel.innerHTML = LANGS.map(function (l) {
      return '<option value="' + l.code + '">' + l.native + "</option>";
    }).join("");
    sel.value = lang;
    sel.addEventListener("change", function () { setLang(sel.value); });
  }

  function bind() {
    var tb = document.getElementById("themeToggle");
    if (tb) tb.addEventListener("click", toggleTheme);
    buildLangSelect();
    syncThemeButton();
    syncLangControl();
  }

  /* ---------- boot ------------------------------------------------------- */
  // The head script has already set data-theme/lang/dir before first paint;
  // this only wires behaviour and translates the DOM.
  function start() {
    applyTheme();
    applyLang();
    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // Re-translate after any dynamic re-render that injects new [data-i18n] nodes.
  document.addEventListener("sm:langchange", function () { applyI18n(); });

  window.SM = {
    T: T,
    get lang() { return lang; },
    get theme() { return theme; },
    setLang: setLang,
    setTheme: setTheme,
    toggleTheme: toggleTheme,
    applyI18n: applyI18n,
    LANGS: LANGS
  };
})();
