/* ==========================================================================
   THT Design Guide — application layer
   Hash router · DFM calculators · readiness checklist · content rendering
   No dependencies, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function badge(v) {
    // v = [level, text]
    return '<span class="badge ' + v[0] + '">' + esc(v[1]) + "</span>";
  }
  function fmt(n, d) {
    if (!isFinite(n)) return "—";
    return n.toFixed(d === undefined ? 3 : d).replace(/\.?0+$/, function (m) {
      return m.indexOf(".") === 0 ? "" : m;
    });
  }
  function num(id) {
    var v = parseFloat(($(id) || {}).value);
    return isNaN(v) ? null : v;
  }

  // Translation helper for JS-generated strings. Falls back to the key itself
  // so a missing entry degrades to a readable token rather than "undefined".
  function T(key, vars) {
    return (window.SM && window.SM.T) ? window.SM.T(key, vars) : key;
  }

  /* ======================================================================
     ROUTER
     ====================================================================== */
  var ROUTES = ["guide", "dfm", "case", "survey", "blog", "post", "media", "tools"];

  function route() {
    var h = (location.hash || "#/guide").replace(/^#\/?/, "");
    var parts = h.split("/");
    var name = parts[0] || "guide";

    if (ROUTES.indexOf(name) === -1) name = "guide";

    $$(".route").forEach(function (el) { el.classList.remove("active"); });
    var el = $("#route-" + name);
    if (el) el.classList.add("active");

    // nav highlight — post belongs to blog
    var navKey = name === "post" ? "blog" : name;
    $$("[data-nav]").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === navKey);
    });

    if (name === "blog") renderBlogIndex();
    if (name === "post") renderPost(parts[1]);
    if (name === "media") { renderVideos(); renderCatalog(); renderGallery("#gallery-main"); }

    // collapse mobile nav after navigation
    $("#nav").classList.remove("open");

    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }

  window.addEventListener("hashchange", route);

  /* ======================================================================
     DFM CALCULATORS
     ====================================================================== */
  function row(label, value, cls) {
    return '<div class="r-row"><span class="r-label">' + label + '</span>' +
           '<span class="r-val ' + (cls || "") + '">' + value + "</span></div>";
  }

  // 1 · Hole diameter
  function calcHole() {
    var lead = num("#hd-lead");
    if (lead === null) { $("#hd-result").innerHTML = row(T("c1.enterLead"), "—"); return; }
    var unguided = $("#hd-type").value === "unguided";
    var offset = unguided ? 0.58 : 0.48;
    var target = lead + offset;
    var lo = target - 0.08, hi = target + 0.08;
    var html = "";
    html += row(T("c1.rule"), unguided ? T("c1.ruleUnguided") : T("c1.ruleGuided"));
    html += row(T("c1.reqDia"), fmt(target, 3) + " mm");
    html += row(T("c1.window"), fmt(lo, 3) + " – " + fmt(hi, 3) + " mm");
    html += row(T("c1.imperial"), fmt(target / 25.4, 4) + " in");

    var actual = num("#hd-actual");
    if (actual !== null && actual > 0) {
      var delta = actual - target;
      html += row(T("c1.yourDia"), fmt(actual, 3) + " mm");
      if (Math.abs(delta) <= 0.08) {
        html += row(T("verdict"), T("c1.inSpec"), "ok");
      } else if (delta < 0) {
        html += row(T("verdict"), T("c1.under", { d: fmt(Math.abs(delta), 3) }), "bad");
      } else {
        html += row(T("verdict"), T("c1.over", { d: fmt(delta, 3) }), "bad");
      }
    }
    $("#hd-result").innerHTML = html;
  }

  // 2 · Axial minimum hole span
  var TOOL = {
    "std":   { m: 1.112, c: 2.36, name: "tool.std" },
    "large": { m: 1.085, c: 4.11, name: "tool.large" },
    "5":     { m: 1.109, c: 1.40, name: "tool.5" },
    "5.5":   { m: 1.067, c: 2.30, name: "tool.55" }
  };
  function calcSpan() {
    var L = num("#as-len"), lead = num("#as-lead");
    if (L === null || lead === null) { $("#as-result").innerHTML = row(T("c2.enter"), "—"); return; }
    var t = TOOL[$("#as-tool").value];
    var eff = $("#as-sym").value === "nonsym" ? L - 0.41 : L;
    var span = (eff * t.m + t.c) - lead;

    var html = "";
    html += row(T("c2.tooling"), T(t.name));
    html += row(T("c2.effLen"), fmt(eff, 3) + " mm" + (eff !== L ? " " + T("c2.nonsym") : ""));
    html += row(T("c2.minSpan"), fmt(span, 3) + " mm", "ok");
    html += row(T("c2.target"), fmt(span * 1.1, 3) + " mm");
    html += row(T("c2.imperialMin"), fmt(span / 25.4, 4) + " in");

    if (span < 5) html += row(T("note"), T("c2.smallSpan"), "bad");

    var actual = num("#as-actual");
    if (actual !== null && actual > 0) {
      html += row(T("c2.yourSpan"), fmt(actual, 3) + " mm");
      if (actual < span) {
        html += row(T("verdict"), T("c2.below", { d: fmt(span - actual, 3) }), "bad");
      } else if (actual < span * 1.05) {
        html += row(T("verdict"), T("c2.marginal"), "bad");
      } else {
        html += row(T("verdict"), T("ok"), "ok");
      }
    }
    $("#as-result").innerHTML = html;
  }

  // 3 · Radial lead hole span
  var PITCH = { "2.5": null, "5.0": 4.5, "7.5": 7.04, "10.0": 9.58 };
  function calcRadial() {
    var p = $("#rs-pitch").value, lead = num("#rs-lead");
    if (lead === null) { $("#rs-result").innerHTML = row(T("c3.enter"), "—"); return; }
    var add = PITCH[p];
    var span = add === null ? 2.54 : lead + add;
    var html = "";
    html += row(T("c3.pitch"), p + " mm");
    html += row(T("c3.rule"), add === null ? T("c3.fixed") : T("c3.leadPlus", { d: add }));
    html += row(T("c3.recSpan"), fmt(span, 3) + " mm", "ok");
    html += row(T("c1.imperial"), fmt(span / 25.4, 4) + " in");

    var actual = num("#rs-actual");
    if (actual !== null && actual > 0) {
      var d = actual - span;
      html += row(T("c3.yourSpan"), fmt(actual, 3) + " mm");
      if (Math.abs(d) <= 0.15) {
        html += row(T("verdict"), T("c3.matched"), "ok");
      } else if (d < 0) {
        html += row(T("verdict"), T("c3.tight", { d: fmt(Math.abs(d), 3) }), "bad");
      } else {
        html += row(T("verdict"), T("c3.wide", { d: fmt(d, 3) }), "bad");
      }
    }
    $("#rs-result").innerHTML = html;
  }

  // 4 · Axial max body diameter
  function calcBody() {
    var t = num("#bd-thick"), form = parseFloat($("#bd-tool").value);
    if (t === null) { $("#bd-result").innerHTML = row(T("c4.enter"), "—"); return; }
    var max = form - 2 * t;
    var html = "";
    html += row(T("c4.formLen"), fmt(form, 2) + " mm");
    html += row(T("c4.thick"), fmt(t, 3) + " mm");
    html += row(T("c4.maxBody"), fmt(max, 3) + " mm", max > 0 ? "ok" : "bad");
    if (max <= 0) html += row(T("warn"), T("c4.tooThick"), "bad");

    var actual = num("#bd-actual");
    if (actual !== null && actual > 0) {
      html += row(T("c4.yourBody"), fmt(actual, 3) + " mm");
      html += actual <= max
        ? row(T("verdict"), T("c4.fits"), "ok")
        : row(T("verdict"), T("c4.exceeds", { d: fmt(actual - max, 3) }), "bad");
    }
    $("#bd-result").innerHTML = html;
  }

  function bindCalc() {
    ["#hd-lead", "#hd-type", "#hd-actual"].forEach(function (s) {
      $(s).addEventListener("input", calcHole); $(s).addEventListener("change", calcHole);
    });
    ["#as-len", "#as-lead", "#as-tool", "#as-sym", "#as-actual"].forEach(function (s) {
      $(s).addEventListener("input", calcSpan); $(s).addEventListener("change", calcSpan);
    });
    ["#rs-pitch", "#rs-lead", "#rs-actual"].forEach(function (s) {
      $(s).addEventListener("input", calcRadial); $(s).addEventListener("change", calcRadial);
    });
    ["#bd-thick", "#bd-tool", "#bd-actual"].forEach(function (s) {
      $(s).addEventListener("input", calcBody); $(s).addEventListener("change", calcBody);
    });
    calcHole(); calcSpan(); calcRadial(); calcBody();
  }

  /* ======================================================================
     READINESS CHECKLIST
     ====================================================================== */
  var CHECKS = [
    { g: "ck.board", t: "ck.1",  d: "ck.1d"  },
    { g: "ck.board", t: "ck.2",  d: "ck.2d"  },
    { g: "ck.board", t: "ck.3",  d: "ck.3d"  },
    { g: "ck.board", t: "ck.4",  d: "ck.4d"  },
    { g: "ck.board", t: "ck.5",  d: "ck.5d"  },
    { g: "ck.board", t: "ck.6",  d: "ck.6d"  },
    { g: "ck.component", t: "ck.7",  d: "ck.7d"  },
    { g: "ck.component", t: "ck.8",  d: "ck.8d"  },
    { g: "ck.component", t: "ck.9",  d: "ck.9d"  },
    { g: "ck.component", t: "ck.10", d: "ck.10d" },
    { g: "ck.component", t: "ck.11", d: "ck.11d" },
    { g: "ck.process", t: "ck.12", d: "ck.12d" },
    { g: "ck.process", t: "ck.13", d: "ck.13d" },
    { g: "ck.process", t: "ck.14", d: "ck.14d" }
  ];

  // Preserve tick state across a language switch.
  function checkedState() {
    var st = {};
    $$("[data-check]").forEach(function (cb) { st[cb.dataset.check] = cb.checked; });
    return st;
  }

  function renderChecklist() {
    var host = $("#checklist");
    if (!host) return;
    var prev = host.dataset.done ? checkedState() : {};
    var lastG = "", html = "";
    CHECKS.forEach(function (c, i) {
      if (c.g !== lastG) {
        html += '<h3 class="mt2 mb1" style="font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:var(--slate)">' + esc(T(c.g)) + "</h3>";
        lastG = c.g;
      }
      html += '<label class="check-item" data-i="' + i + '">' +
              '<input type="checkbox" data-check="' + i + '"' + (prev[i] ? " checked" : "") + ">" +
              '<span class="ci-body"><span class="ci-title">' + esc(T(c.t)) + "</span>" +
              '<span class="ci-desc">' + esc(T(c.d)) + "</span></span></label>";
    });
    host.innerHTML = html;
    host.dataset.done = "1";
    // re-apply the "checked" class after a rebuild
    $$("[data-check]").forEach(function (cb) {
      if (cb.checked) cb.closest(".check-item").classList.add("checked");
    });

    if (!host.dataset.bound) {
      host.dataset.bound = "1";
      host.addEventListener("change", function (e) {
        var cb = e.target;
        if (!cb.dataset || cb.dataset.check === undefined) return;
        cb.closest(".check-item").classList.toggle("checked", cb.checked);
        updateScore();
      });
      $("#reset-check").addEventListener("click", function () {
        $$("[data-check]").forEach(function (cb) {
          cb.checked = false;
          cb.closest(".check-item").classList.remove("checked");
        });
        updateScore();
      });
    }
    updateScore();
  }

  function updateScore() {
    var total = CHECKS.length;
    var done = $$("[data-check]").filter(function (c) { return c.checked; }).length;
    var pct = Math.round((done / total) * 100);
    $("#score-label").textContent = T("ck.count", { n: done, t: total });
    $("#score-val").textContent = pct + "%";
    $("#score-meter").style.width = pct + "%";
  }

  /* ======================================================================
     BLOG
     ====================================================================== */
  function renderBlogIndex() {
    var host = $("#blog-grid");
    if (!host) return;
    host.innerHTML = BLOGS.map(function (b) {
      return '<article class="blog-card" data-id="' + b.id + '">' +
        '<div class="bc-top"></div>' +
        '<div class="bc-body">' +
          '<div class="bc-topic">' + esc(b.topic) + "</div>" +
          "<h3>" + esc(b.title) + "</h3>" +
          '<p class="bc-excerpt">' + esc(b.excerpt) + "</p>" +
          '<div class="bc-foot"><span>' + esc(T("blog.readTime", { n: b.read })) + "</span>" +
          '<span>' + esc(b.date) + "</span></div>" +
        "</div></article>";
    }).join("");
    host.dataset.done = "1";

    if (!host.dataset.bound) {
      host.dataset.bound = "1";
      host.addEventListener("click", function (e) {
        var card = e.target.closest(".blog-card");
        if (card) location.hash = "#/post/" + card.dataset.id;
      });
    }
  }

  function blockHTML(b) {
    var h = "";
    if (b.h) h += "<h2>" + esc(b.h) + "</h2>";
    if (b.p) b.p.forEach(function (t) { h += "<p>" + t + "</p>"; });
    if (b.ul) h += "<ul>" + b.ul.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>";
    if (b.ol) h += "<ol>" + b.ol.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>";
    if (b.code) h += '<div class="formula">' + b.code.map(esc).join("\n") + "</div>";
    if (b.code2) h += '<div class="formula">' + b.code2.map(esc).join("\n") + "</div>";
    if (b.p2) b.p2.forEach(function (t) { h += "<p>" + t + "</p>"; });
    if (b.p3) b.p3.forEach(function (t) { h += "<p>" + t + "</p>"; });
    if (b.table) {
      h += '<div class="table-wrap"><table><thead><tr>' +
        b.table.head.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        b.table.rows.map(function (r) {
          return "<tr>" + r.map(function (c) {
            if (Array.isArray(c)) return "<td>" + badge(c) + "</td>";
            return "<td>" + esc(c) + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>";
    }
    return h;
  }

  function renderPost(id) {
    var b = BLOGS.filter(function (x) { return x.id === id; })[0];
    var host = $("#post-body");
    if (!b) {
      host.innerHTML = "<p>" + esc(T("blog.notFound")) +
        ' <a href="#/blog">' + esc(T("blog.backLink")) + "</a></p>";
      return;
    }
    var toc = b.body.filter(function (x) { return x.h; }).map(function (x) {
      return "<li>" + esc(x.h) + "</li>";
    }).join("");

    var ctaBody = T("blog.ctaBody", { email: "__EMAIL__", form: "__FORM__" })
      .replace("__EMAIL__", '<a href="mailto:info@smthelp.com">info@smthelp.com</a>')
      .replace("__FORM__", '<a href="#/survey">' + esc(T("blog.ctaForm")) + "</a>");

    host.innerHTML =
      '<a class="view-link" href="#/blog">' + esc(T("blog.back")) + "</a>" +
      "<h1 style='margin-top:16px'>" + esc(b.title) + "</h1>" +
      '<div class="meta">' +
        '<div class="byline"><span class="av">SM</span><span>' + esc(T("blog.byline")) + "</span></div>" +
        "<span>" + esc(b.date) + "</span><span>" + esc(T("blog.readTime", { n: b.read })) + "</span>" +
        (b.model ? "<span>" + esc(T("blog.platform")) + " " + esc(b.model) + "</span>" : "") +
      "</div>" +
      '<div class="toc"><div class="toc-t">' + esc(T("blog.toc")) + "</div><ol>" + toc + "</ol></div>" +
      b.body.map(blockHTML).join("") +
      '<div class="callout mt3"><p><strong>' + esc(T("blog.ctaTitle")) + "</strong> " +
      ctaBody + "</p></div>" +
      '<p class="small mt2">' + esc(T("blog.keywords")) + " " + b.keywords.map(function (k) {
        return '<span class="badge neutral">' + esc(k) + "</span>";
      }).join(" ") + "</p>";
  }

  /* ======================================================================
     VIDEOS
     ====================================================================== */
  var vidFilter = "All";
  function renderVideos() {
    var host = $("#video-grid");
    if (!host) return;
    var cats = ["All"].concat(VIDEOS.map(function (v) { return v.cat; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }));

    var fhost = $("#video-filters");
    fhost.innerHTML = cats.map(function (c) {
      var n = c === "All" ? VIDEOS.length : VIDEOS.filter(function (v) { return v.cat === c; }).length;
      var label = c === "All" ? T("media.all") : c;
      return '<button class="chip' + (c === vidFilter ? " active" : "") + '" data-cat="' + esc(c) + '">' +
             esc(label) + '<span class="n">' + n + "</span></button>";
    }).join("");

    if (!fhost.dataset.bound) {
      fhost.dataset.bound = "1";
      fhost.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        vidFilter = chip.dataset.cat;
        renderVideos();
      });
    }

    var list = vidFilter === "All" ? VIDEOS : VIDEOS.filter(function (v) { return v.cat === vidFilter; });
    host.innerHTML = list.map(function (v) {
      var thumb = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
      var url = "https://www.youtube.com/watch?v=" + v.id;
      return '<article class="video-card">' +
        '<a class="thumb" href="' + url + '" target="_blank" rel="noopener" aria-label="' + esc(v.title) + '">' +
          '<img src="' + thumb + '" alt="' + esc(v.title) + '" loading="lazy">' +
          '<span class="play"><span>&#9654;</span></span>' +
        "</a>" +
        '<div class="vc-body">' +
          "<h4><a href='" + url + "' target='_blank' rel='noopener' style='color:inherit'>" + esc(v.title) + "</a></h4>" +
          '<div class="vc-meta">' +
            '<span class="badge info">' + esc(v.type) + "</span>" +
            (v.model ? '<span class="badge neutral">' + esc(v.model) + "</span>" : "") +
            '<span class="small">' + esc(v.dur) + "</span>" +
          "</div>" +
        "</div></article>";
    }).join("");
  }

  /* ======================================================================
     CATALOG
     ====================================================================== */
  var catFilter = "All";
  function renderCatalog() {
    var host = $("#catalog-list");
    if (!host) return;
    var cats = ["All"].concat(CATALOG.map(function (c) { return c.cat; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }));

    var fhost = $("#catalog-filters");
    fhost.innerHTML = cats.map(function (c) {
      var n = c === "All" ? CATALOG.length : CATALOG.filter(function (x) { return x.cat === c; }).length;
      var label = c === "All" ? T("media.all") : c;
      return '<button class="chip' + (c === catFilter ? " active" : "") + '" data-ccat="' + esc(c) + '">' +
             esc(label) + '<span class="n">' + n + "</span></button>";
    }).join("");

    if (!fhost.dataset.bound) {
      fhost.dataset.bound = "1";
      fhost.addEventListener("click", function (e) {
        var chip = e.target.closest(".chip");
        if (!chip) return;
        catFilter = chip.dataset.ccat;
        renderCatalog();
      });
    }

    var list = catFilter === "All" ? CATALOG : CATALOG.filter(function (c) { return c.cat === catFilter; });
    host.innerHTML = list.map(function (c) {
      return '<a class="catalog-item" href="' + c.url + '" target="_blank" rel="noopener">' +
        '<span class="ci-icon">' + esc(c.kind) + "</span>" +
        '<span class="ci-main"><span class="ci-title">' + esc(c.title) + "</span>" +
        '<span class="ci-meta">' + esc(c.model) + " · " + esc(c.cat) + " · " + esc(c.note) + "</span></span>" +
        '<span class="view-link">Open &rarr;</span></a>';
    }).join("");
  }

  /* ======================================================================
     GALLERY
     ====================================================================== */
  function renderGallery(sel) {
    var host = $(sel);
    if (!host) return;
    var items = [];
    IMG.s3010a.forEach(function (u) { items.push([u, "gal.1"]); });
    IMG.s7900.forEach(function (u) { items.push([u, "gal.2"]); });
    IMG.s7020.forEach(function (u) { items.push([u, "gal.3"]); });
    IMG.feeders.forEach(function (u) { items.push([u, "gal.4"]); });

    host.innerHTML = items.map(function (it) {
      var cap = T(it[1]);
      return '<figure><img src="' + it[0] + '" alt="' + esc(cap) + '" loading="lazy">' +
             "<figcaption>" + esc(cap) + "</figcaption></figure>";
    }).join("");
    host.dataset.done = "1";
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  // Rebuild everything app.js generated. Called on load and whenever the
  // language changes, so JS-rendered content switches with the rest of the UI.
  function rerenderAll() {
    calcHole(); calcSpan(); calcRadial(); calcBody();
    renderChecklist();
    renderBlogIndex();
    renderGallery("#gallery-radial");
    renderGallery("#gallery-main");
    renderVideos();
    renderCatalog();
    var h = location.hash || "";
    if (h.indexOf("#/post/") === 0) renderPost(h.replace(/^#\/post\//, ""));
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("#navToggle").addEventListener("click", function () {
      $("#nav").classList.toggle("open");
    });
    $("#yr").textContent = new Date().getFullYear();

    bindCalc();
    renderChecklist();
    renderBlogIndex();
    renderGallery("#gallery-radial");

    if (!location.hash) location.hash = "#/guide";
    route();

    // ui.js registers its own sm:langchange listener first (it loads earlier),
    // so the DOM is already translated by the time this runs.
    document.addEventListener("sm:langchange", rerenderAll);
  });
})();
