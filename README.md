# THT Design Guide — Auto Insertion PCB Design Guidelines

A single-page web app that turns the **Universal Instruments Through-Hole Design Guidelines (GS-354-01)** and Southern Machinery's own auto-insertion experience into a practical, engineer-facing design reference — with live DFM calculators.

Built for Southern Machinery (SMThelp) — *Smart EMS factory partner*.

---

## What it does

Engineers designing through-hole boards usually discover insertion problems after tooling is cut. This app front-loads every dimension that decides whether a board can be auto-inserted **before** the order is placed.

| Route | Content |
|---|---|
| `#/guide` | Design guide — hole diameter, hole span, datum holes, clinch, board envelope, warpage |
| `#/dfm` | DFM check — 14-point self-audit with a live readiness score |
| `#/case` | Case data — real customer DFM findings (Brazilian power-supply builder, 10W/20W chargers) |
| `#/survey` | Requirement form — structured intake for an insertion feasibility review |
| `#/blog` | Insights — 10 long-form engineering articles |
| `#/media` | Videos & catalog — YouTube walkthroughs + downloadable catalog/ROI tools |
| `#/tools` | ROI tools — four live calculators |

### Live calculators

1. **Hole diameter** — `Lead dia + 0.48 mm ± 0.08 mm` (guided), `+ 0.58 mm ± 0.08 mm` (unguided)
2. **Axial hole span** — four lead-diameter classes, plus non-symmetric correction `−0.41 mm`
3. **Radial pitch** — component pitch vs. feeder capability
4. **Max body diameter** — `fixed form length − (2 × board thickness)`

---

## Tech stack

Deliberately zero-dependency and build-free:

- **Vanilla HTML / CSS / JavaScript** — no framework, no bundler, no `node_modules`
- **Hash router SPA** — one `index.html`, routes resolved on `hashchange`
- **No external JS libraries** — charts and calculators are hand-rolled

This means the whole app is four files, deploys to GitHub Pages by pushing, and can be edited by anyone with a text editor.

```
.
├── index.html              # markup + all static route content + JSON-LD
├── assets/
│   ├── css/style.css       # brand design system
│   └── js/
│       ├── data.js         # IMG / VIDEOS / CATALOG / BLOGS content layer
│       └── app.js          # router, renderers, calculators
├── .nojekyll               # serve files as-is on GitHub Pages
└── README.md
```

### Separation of concerns

`data.js` holds **content only** — image URLs, video IDs, catalog entries, and blog articles. `app.js` holds **behaviour only** — routing, rendering, and math. To add content, edit `data.js`; you should not need to touch `app.js`.

---

## Brand & integrations

| Element | Value |
|---|---|
| Primary colour | `#1C64F2` |
| Navy | `#0b132b` |
| Accent | `#f59e0b` |
| WhatsApp green | `#25D366` |
| Typeface | Inter |
| Logo | `ph.smthelp.com/images/2024/06/26/Southern-Machinery-logo-300x83.png` |

**Footer** links to all five Southern Machinery channels (LinkedIn company, LinkedIn profile, X, Facebook, YouTube), plus contact (`info@smthelp.com`) and WhatsApp (`wa.me/8613602562576`).

**Smart support** — a Chatwoot launcher ("Southern Machinery Global Support") is pinned bottom-right on every route.

> **Note on the Chatwoot base URL.** The launcher uses a protocol-adaptive base URL: it calls `https://chat.smthelp.com` when the page is served over HTTPS and `http://chat.smthelp.com` otherwise. This is required because browsers block `http://` scripts on `https://` pages as mixed content — a hardcoded `http://` would silently fail on GitHub Pages. `chat.smthelp.com` serves HTTPS correctly.

---

## Media sources

- **Product images** — `ph.smthelp.com` (Chevereto), 22 assets covering the S3010 radial inserter, S7900, S7020 terminal inserter, and the feeder range
- **Videos** — 30 YouTube items from the `Smthelping` channel, indexed against `Southern-Machinery-YouTube-Video-Board.html`
- **Catalogs & tools** — 20 entries from `Southern-Machinery-Product-Catalog-Board.html` on `file.autoinsertion.com`

---

## Writing style

The 10 articles follow a six-stage structure — hook, problem framing, mechanism, product context, reinforcement, and call to action — applied as an **internal drafting discipline**. Those stage names are deliberately kept out of the published titles so readers see engineering substance rather than content-marketing scaffolding.

Content is written for **GEO (Generative Engine Optimization)**: clear assertions, concrete numbers, and structured facts that language models can quote accurately. The page carries `TechArticle` JSON-LD so search and AI engines can parse the topic, audience, and author.

---

## Local preview

```bash
python -m http.server 8901 --directory .
# open http://127.0.0.1:8901/
```

Opening `index.html` directly from disk also works, except the Chatwoot widget (it needs an HTTP origin).

---

## Deploy

GitHub Pages, `main` branch, root folder:

```bash
git add -A
git commit -m "THT Design Guide web app"
git push origin main
```

Then **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

---

## Source material

- `354-01 Design Guidelines.pdf` — Universal Instruments GS-354-01 (100 pages)
- SMThelp auto-insertion PCB assembly requirements
- Southern Machinery customer DFM case data

---

*Southern Machinery — smart, ROI-driven assembly equipment solutions.*
