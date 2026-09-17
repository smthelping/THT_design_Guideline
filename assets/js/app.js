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
    if (lead === null) { $("#hd-result").innerHTML = row("Enter a lead diameter", "—"); return; }
    var unguided = $("#hd-type").value === "unguided";
    var offset = unguided ? 0.58 : 0.48;
    var target = lead + offset;
    var lo = target - 0.08, hi = target + 0.08;
    var html = "";
    html += row("Rule applied", unguided ? "Lead + 0.58 mm ± 0.08" : "Lead + 0.48 mm ± 0.08");
    html += row("Required hole diameter", fmt(target, 3) + " mm");
    html += row("Acceptable window", fmt(lo, 3) + " – " + fmt(hi, 3) + " mm");
    html += row("Imperial equivalent", fmt(target / 25.4, 4) + " in");

    var actual = num("#hd-actual");
    if (actual !== null && actual > 0) {
      var delta = actual - target;
      html += row("Your drilled diameter", fmt(actual, 3) + " mm");
      if (Math.abs(delta) <= 0.08) {
        html += row("Verdict", "In specification", "ok");
      } else if (delta < 0) {
        html += row("Verdict", "Undersize by " + fmt(Math.abs(delta), 3) + " mm — expect insertion faults", "bad");
      } else {
        html += row("Verdict", "Oversize by " + fmt(delta, 3) + " mm — loose component, weak clinch", "bad");
      }
    }
    $("#hd-result").innerHTML = html;
  }

  // 2 · Axial minimum hole span
  var TOOL = {
    "std":   { m: 1.112, c: 2.36, name: "Standard tooling" },
    "large": { m: 1.085, c: 4.11, name: "Large lead tooling" },
    "5":     { m: 1.109, c: 1.40, name: "5 mm tooling" },
    "5.5":   { m: 1.067, c: 2.30, name: "5.5 mm tooling" }
  };
  function calcSpan() {
    var L = num("#as-len"), lead = num("#as-lead");
    if (L === null || lead === null) { $("#as-result").innerHTML = row("Enter body length and lead diameter", "—"); return; }
    var t = TOOL[$("#as-tool").value];
    var eff = $("#as-sym").value === "nonsym" ? L - 0.41 : L;
    var span = (eff * t.m + t.c) - lead;

    var html = "";
    html += row("Tooling", t.name);
    html += row("Effective body length", fmt(eff, 3) + " mm" + (eff !== L ? " (non-symmetric correction)" : ""));
    html += row("Minimum hole span", fmt(span, 3) + " mm", "ok");
    html += row("Design target (min + 10%)", fmt(span * 1.1, 3) + " mm");
    html += row("Imperial minimum", fmt(span / 25.4, 4) + " in");

    if (span < 5) html += row("Note", "Span under 5 mm — max lead dia 0.61 mm, max body dia 2.29 mm", "bad");

    var actual = num("#as-actual");
    if (actual !== null && actual > 0) {
      html += row("Your actual span", fmt(actual, 3) + " mm");
      if (actual < span) {
        html += row("Verdict", "Below minimum by " + fmt(span - actual, 3) + " mm — body damage risk", "bad");
      } else if (actual < span * 1.05) {
        html += row("Verdict", "Marginal — within 5% of minimum, lot variation may fail", "bad");
      } else {
        html += row("Verdict", "Acceptable", "ok");
      }
    }
    $("#as-result").innerHTML = html;
  }

  // 3 · Radial lead hole span
  var PITCH = { "2.5": null, "5.0": 4.5, "7.5": 7.04, "10.0": 9.58 };
  function calcRadial() {
    var p = $("#rs-pitch").value, lead = num("#rs-lead");
    if (lead === null) { $("#rs-result").innerHTML = row("Enter a lead diameter", "—"); return; }
    var add = PITCH[p];
    var span = add === null ? 2.54 : lead + add;
    var html = "";
    html += row("Component pitch", p + " mm");
    html += row("Rule", add === null ? "Fixed 2.54 mm span" : "Lead dia + " + add + " mm");
    html += row("Recommended hole span", fmt(span, 3) + " mm", "ok");
    html += row("Imperial equivalent", fmt(span / 25.4, 4) + " in");

    var actual = num("#rs-actual");
    if (actual !== null && actual > 0) {
      var d = actual - span;
      html += row("Your PCB hole span", fmt(actual, 3) + " mm");
      if (Math.abs(d) <= 0.15) {
        html += row("Verdict", "Matched — runs as-is", "ok");
      } else if (d < 0) {
        html += row("Verdict", "Pitch too tight by " + fmt(Math.abs(d), 3) + " mm — adapt panel or change component pitch", "bad");
      } else {
        html += row("Verdict", "Pitch wider than required by " + fmt(d, 3) + " mm — verify tooling coverage", "bad");
      }
    }
    $("#rs-result").innerHTML = html;
  }

  // 4 · Axial max body diameter
  function calcBody() {
    var t = num("#bd-thick"), form = parseFloat($("#bd-tool").value);
    if (t === null) { $("#bd-result").innerHTML = row("Enter a board thickness", "—"); return; }
    var max = form - 2 * t;
    var html = "";
    html += row("Fixed form length", fmt(form, 2) + " mm");
    html += row("Board thickness", fmt(t, 3) + " mm");
    html += row("Maximum body diameter", fmt(max, 3) + " mm", max > 0 ? "ok" : "bad");
    if (max <= 0) html += row("Warning", "Board too thick for this tooling — no body clearance", "bad");

    var actual = num("#bd-actual");
    if (actual !== null && actual > 0) {
      html += row("Your component body dia", fmt(actual, 3) + " mm");
      html += actual <= max
        ? row("Verdict", "Fits", "ok")
        : row("Verdict", "Exceeds by " + fmt(actual - max, 3) + " mm — use larger form length tooling", "bad");
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
    { g: "Board", t: "Board thickness is 0.8 – 2.36 mm", d: "Single Board Transfer handling narrows this to 1.52 – 2.36 mm." },
    { g: "Board", t: "Warpage measured and within limit", d: "1.60 mm one axis for radial; 3.17 mm both axes for axial and DIP." },
    { g: "Board", t: "Panel size inside the handling window", d: "100 × 80 mm minimum to 483 × 406 mm maximum with handling." },
    { g: "Board", t: "Datum holes standardised at 3.96 mm, longest lateral span", d: "±0.05 mm position tolerance. 4.74 mm absolute maximum on Pass-Thru II." },
    { g: "Board", t: "Insertion hole position tolerance held at ±0.07 mm", d: "Confirm with your fabricator — this is spent before the board reaches the line." },
    { g: "Board", t: "Components placed at 0° or 90° only", d: "Other angles cannot be inserted. Single-axis for DIP and axial throughput." },
    { g: "Component", t: "Hole diameter = lead dia + 0.48 mm ± 0.08 mm", d: "+0.58 mm for unguided leads such as SIP or the third leg of a triangular layout." },
    { g: "Component", t: "Component packaging formats recorded for every THT part", d: "Tape, tube, tray, bulk or stick. Bulk and stick are usually the problem." },
    { g: "Component", t: "Radial component pitch matches the panel layout", d: "2.5 / 5.0 / 7.5 / 10.0 mm. A 3.5 mm part on a 5.0 mm layout is a purchasing fix." },
    { g: "Component", t: "Odd-form parts identified and counted", d: "Connectors, transformers, USB sockets, relays. Count them before ROI, not after ramp." },
    { g: "Component", t: "DIP sockets specified with tapered bushing", d: "Non-tapered bushing directly reduces insertion reliability. Request at quotation." },
    { g: "Process", t: "Clinch angle and length specified per component family", d: "Axial: 0°–45°, 1.28–1.80 mm. Outward clinch not recommended for DIP sockets." },
    { g: "Process", t: "Bottom-side clinch anvil clearance verified in layout", d: "The most commonly overlooked clearance — clear from above, colliding from below." },
    { g: "Process", t: "Capacity requirement stated in CPH or UPH", d: "Not pallets per hour. A 60-unit pallet at 40 pallets/h is 2,400 CPH, not 40." }
  ];

  function renderChecklist() {
    var host = $("#checklist");
    if (!host) return;
    var lastG = "", html = "";
    CHECKS.forEach(function (c, i) {
      if (c.g !== lastG) {
        html += '<h3 class="mt2 mb1" style="font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:var(--slate)">' + esc(c.g) + "</h3>";
        lastG = c.g;
      }
      html += '<label class="check-item" data-i="' + i + '">' +
              '<input type="checkbox" data-check="' + i + '">' +
              '<span class="ci-body"><span class="ci-title">' + esc(c.t) + "</span>" +
              '<span class="ci-desc">' + esc(c.d) + "</span></span></label>";
    });
    host.innerHTML = html;

    host.addEventListener("change", function (e) {
      var cb = e.target;
      if (!cb.dataset || cb.dataset.check === undefined) return;
      cb.closest(".check-item").classList.toggle("checked", cb.checked);
      updateScore();
    });
    $("#reset-check").addEventListener("click", function () {
      $$('[data-check]').forEach(function (cb) {
        cb.checked = false;
        cb.closest(".check-item").classList.remove("checked");
      });
      updateScore();
    });
    updateScore();
  }

  function updateScore() {
    var total = CHECKS.length;
    var done = $$("[data-check]").filter(function (c) { return c.checked; }).length;
    var pct = Math.round((done / total) * 100);
    $("#score-label").textContent = done + " of " + total + " confirmed";
    $("#score-val").textContent = pct + "%";
    $("#score-meter").style.width = pct + "%";
  }

  /* ======================================================================
     BLOG
     ====================================================================== */
  function renderBlogIndex() {
    var host = $("#blog-grid");
    if (!host || host.dataset.done) return;
    host.innerHTML = BLOGS.map(function (b) {
      return '<article class="blog-card" data-id="' + b.id + '">' +
        '<div class="bc-top"></div>' +
        '<div class="bc-body">' +
          '<div class="bc-topic">' + esc(b.topic) + "</div>" +
          "<h3>" + esc(b.title) + "</h3>" +
          '<p class="bc-excerpt">' + esc(b.excerpt) + "</p>" +
          '<div class="bc-foot"><span>' + esc(b.read) + " read</span>" +
          '<span>' + esc(b.date) + "</span></div>" +
        "</div></article>";
    }).join("");
    host.dataset.done = "1";

    host.addEventListener("click", function (e) {
      var card = e.target.closest(".blog-card");
      if (card) location.hash = "#/post/" + card.dataset.id;
    });
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
      host.innerHTML = '<p>Article not found. <a href="#/blog">Back to all insights &rarr;</a></p>';
      return;
    }
    var toc = b.body.filter(function (x) { return x.h; }).map(function (x) {
      return "<li>" + esc(x.h) + "</li>";
    }).join("");

    host.innerHTML =
      '<a class="view-link" href="#/blog">&larr; All insights</a>' +
      "<h1 style='margin-top:16px'>" + esc(b.title) + "</h1>" +
      '<div class="meta">' +
        '<div class="byline"><span class="av">SM</span><span>Southern Machinery engineering</span></div>' +
        "<span>" + esc(b.date) + "</span><span>" + esc(b.read) + " read</span>" +
        (b.model ? "<span>Platform: " + esc(b.model) + "</span>" : "") +
      "</div>" +
      '<div class="toc"><div class="toc-t">In this article</div><ol>' + toc + "</ol></div>" +
      b.body.map(blockHTML).join("") +
      '<div class="callout mt3"><p><strong>Need this run against your actual board?</strong> ' +
      'Send a top-side PCB image, the component list with part numbers, and your capacity requirement to ' +
      '<a href="mailto:info@smthelp.com">info@smthelp.com</a> — or use the ' +
      '<a href="#/survey">requirement form</a>. You will get a component-by-component insertion verdict.</p></div>' +
      '<p class="small mt2">Keywords: ' + b.keywords.map(function (k) {
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
      return '<button class="chip' + (c === vidFilter ? " active" : "") + '" data-cat="' + esc(c) + '">' +
             esc(c) + '<span class="n">' + n + "</span></button>";
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
      return '<button class="chip' + (c === catFilter ? " active" : "") + '" data-ccat="' + esc(c) + '">' +
             esc(c) + '<span class="n">' + n + "</span></button>";
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
    if (!host || host.dataset.done) return;
    var items = [];
    IMG.s3010a.forEach(function (u) { items.push([u, "S3010A radial insertion machine — Southern Machinery"]); });
    IMG.s7900.forEach(function (u) { items.push([u, "S7900 odd-form insertion machine — Southern Machinery"]); });
    IMG.s7020.forEach(function (u) { items.push([u, "S7020 odd-form inserter — Southern Machinery"]); });
    IMG.feeders.forEach(function (u) { items.push([u, "Custom feeder tooling — designed and manufactured in-house"]); });

    host.innerHTML = items.map(function (it) {
      return '<figure><img src="' + it[0] + '" alt="' + esc(it[1]) + '" loading="lazy">' +
             "<figcaption>" + esc(it[1]) + "</figcaption></figure>";
    }).join("");
    host.dataset.done = "1";
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
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
  });
})();
