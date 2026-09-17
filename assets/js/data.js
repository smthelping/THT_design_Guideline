/* ==========================================================================
   THT Design Guide — content data
   Southern Machinery / SMThelp
   All product images served from ph.smthelp.com
   All videos from YouTube channel UClX0iEG2bvJq8yUBEDamgDw (Smthelping)
   All catalog assets from file.autoinsertion.com
   ========================================================================== */

/* ---------- Brand / product imagery (ph.smthelp.com) ---------- */
const IMG = {
  logo: "https://ph.smthelp.com/images/2024/06/26/Southern-Machinery-logo-300x83.png",

  s3010a: [
    "https://ph.smthelp.com/images/2025/12/06/S3010-Radial-Insertion-Machine.md.png",
    "https://ph.smthelp.com/images/2025/12/06/S3010-Radial-Insertion-Machine-F.md.png",
    "https://ph.smthelp.com/images/2025/12/06/S3010-Radial-Insertion-Machine--back.md.png",
    "https://ph.smthelp.com/images/2023/04/30/S3010-Radial-Insertion-machine-10-feeders_1-001.md.jpg",
    "https://ph.smthelp.com/images/2023/04/30/S3010-Radial-Insertion-machine-10-feeders_2.md.jpg",
    "https://ph.smthelp.com/images/2023/04/30/S3010-Radial-Insertion-machine-10-feeders_3-001.md.jpg"
  ],

  s7900: [
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7900-front-06.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7900-product-10.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7900-view-01-07.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7900-side-0332fa08e8246889fd.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7900-top-064b9d65f08bdd147b.md.webp"
  ],

  s7020: [
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7020-front-03.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7020-product-10.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7020-view-01-07.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7020-application-02.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-automatic-insertion-s7020-detail-22.md.webp"
  ],

  feeders: [
    "https://ph.smthelp.com/images/2026/09/14/smthelp-feeder-af2000-product-source-02.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-feeder-tray-feeder-product-32.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-feeder-tube-feeder-product-68.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-feeder-unspecified-product-813.md.webp",
    "https://ph.smthelp.com/images/2026/09/14/smthelp-feeder-js-tp-01-product.md.webp"
  ]
};

/* ---------- YouTube video catalogue ----------
   Source: public channel UClX0iEG2bvJq8yUBEDamgDw
   Board: file.autoinsertion.com/public/Southern-Machinery-YouTube-Video-Board.html
   Thumbnails follow the YouTube standard hqdefault pattern.
------------------------------------------------ */
const VIDEOS = [
  { id: "0k4U5NLKq4k", title: "How China made Auto Insertion machine for Smart EMS factory PCB assembly", cat: "THT Auto Insertion", type: "Deep dive", dur: "6:37", model: "" },
  { id: "iQx-MsR829c", title: "10x cost saving to use Radial Feeder Auto Odd Form Insertion", cat: "THT Auto Insertion", type: "Deep dive", dur: "8:23", model: "" },
  { id: "oWe8DATr63k", title: "10x cost saving Customized THT odd form feeder design", cat: "THT Auto Insertion", type: "Deep dive", dur: "6:46", model: "" },
  { id: "KtJF9zqHnXw", title: "10x cost saving Southern Machinery made Auto Insertion machine", cat: "THT Auto Insertion", type: "Deep dive", dur: "6:02", model: "" },
  { id: "WwLFI_abBUo", title: "Auto Insertion machine packing for overseas shipping", cat: "THT Auto Insertion", type: "Deep dive", dur: "6:22", model: "" },
  { id: "P0rfpkHpPxg", title: "10x labor cost saving Odd Form Insertion Machine", cat: "THT Auto Insertion", type: "Deep dive", dur: "7:15", model: "" },
  { id: "pzNoUquFH30", title: "SMT THT Radial Feeder Automate Radial Component Insertion", cat: "THT Auto Insertion", type: "Product demo", dur: "3:00", model: "" },
  { id: "W2nMivkRfXQ", title: "10x cost saving to handle bulk electronic components auto insertion", cat: "THT Auto Insertion", type: "Product demo", dur: "2:34", model: "" },
  { id: "fYQ0qVcgjGw", title: "10x cost saving to insert Odd Form Electronic components", cat: "THT Auto Insertion", type: "Product demo", dur: "1:25", model: "" },
  { id: "sqMO5i4NoZ8", title: "Stop Power Board Bottlenecks: S7020 4-Head Insertion for MOS & Connectors", cat: "THT Auto Insertion", type: "Product demo", dur: "1:13", model: "S7020" },
  { id: "-ivXgiqPR04", title: "Automated Rice Cooker PCB Assembly: S7020 4-Head Odd Form Inserter with Clinching", cat: "THT Auto Insertion", type: "Product demo", dur: "1:03", model: "S7020" },
  { id: "_urhfvRc724", title: "S-7020 Odd-Form Inserter Demo: Mixed Component Insertion", cat: "THT Auto Insertion", type: "Short demo", dur: "0:43", model: "S-7020" },
  { id: "muME9Gt2TaM", title: "TV Board Auto Assembly Insert by Odd Form Machine", cat: "THT Auto Insertion", type: "Short demo", dur: "0:52", model: "" },
  { id: "4O5ZjZ5CwAg", title: "THT Radial Lead Taped Component Feeder", cat: "THT Auto Insertion", type: "Short demo", dur: "0:11", model: "" },
  { id: "a2ZFxQ2KndA", title: "Customized THT Radial Taped Feeder", cat: "THT Auto Insertion", type: "Short demo", dur: "0:11", model: "" },
  { id: "omxIkpIkxS4", title: "How to Build Your Lights-Out THT Line", cat: "THT Auto Insertion", type: "Short demo", dur: "0:17", model: "" },
  { id: "4ActPHuu5C8", title: "Southern Machinery Odd Form Insertion design and manufacturing", cat: "THT Auto Insertion", type: "Short demo", dur: "0:30", model: "" },
  { id: "9_mqeJsj9fs", title: "Double Speed! S7020T Dual-Head Terminal Insertion for Power Tools", cat: "Terminal, Riveting & Wire", type: "Short demo", dur: "0:52", model: "S7020T" },
  { id: "0ivNvJMlJrQ", title: "S7020T Odd Form Insertion Machine — Reel Terminal & Radial Taped", cat: "Terminal, Riveting & Wire", type: "Product demo", dur: "3:49", model: "S7020T" },
  { id: "ckoAsndiACc", title: "THT Terminal Auto Insertion machine design and manufacturing", cat: "Terminal, Riveting & Wire", type: "Short demo", dur: "0:09", model: "" },
  { id: "bRkxtrJbtz0", title: "Terminal Reel Feeder — A Proven Way to Reduce PCB Assembly Costs", cat: "Terminal, Riveting & Wire", type: "Product demo", dur: "1:08", model: "" },
  { id: "tziwnk1prVY", title: "High-Speed PCB Riveting Machine in Operation", cat: "Terminal, Riveting & Wire", type: "Short demo", dur: "0:22", model: "" },
  { id: "g_wi1xyq5VA", title: "10x cost saving SMT Jumper Wire Feeder for EMS PCB assembly", cat: "Terminal, Riveting & Wire", type: "Product demo", dur: "1:12", model: "" },
  { id: "mtQX516P1ZA", title: "SMT Bulk Component Handling: Bowl Feeder vs. S-MVF01 Belt Feeder", cat: "Feeders, Nozzles & Material", type: "Product demo", dur: "2:02", model: "MVF01" },
  { id: "TuocC4GgwT0", title: "Customized Vibration Bowl Feeder for Smart EMS factory PCB assembly", cat: "Feeders, Nozzles & Material", type: "Short demo", dur: "0:11", model: "" },
  { id: "xSaUxnQJ8J8", title: "SMT THT Tray Feeder design and manufacturing", cat: "Feeders, Nozzles & Material", type: "Short demo", dur: "0:08", model: "" },
  { id: "cbvWhqnld2M", title: "SMT customized gripper nozzle design and manufacturing", cat: "Feeders, Nozzles & Material", type: "Product demo", dur: "1:36", model: "" },
  { id: "-1-m3fO_g94", title: "SIS7000A Intelligent SMT Reel Rack: Cut Kitting Time to 15 Mins", cat: "Feeders, Nozzles & Material", type: "Deep dive", dur: "7:07", model: "SIS7000A" },
  { id: "5R8P21iaOZg", title: "HMLV PCBA Ultra-fast changing without fixture — S100B Desktop Selective Soldering", cat: "Wave & Selective Soldering", type: "Deep dive", dur: "6:25", model: "S100B" },
  { id: "MRNrZrMpHO4", title: "SFY03 AGV SMT Safety Guardian for Smart EMS factory PCB assembly", cat: "Storage, ESD & Smart Factory", type: "Deep dive", dur: "5:01", model: "SFY03" }
];

/* ---------- Product catalog board assets ----------
   Source: file.autoinsertion.com/public/Southern-Machinery-Product-Catalog-Board.html
------------------------------------------------------- */
const CATALOG = [
  { kind: "xlsx", title: "THT Insertion ROI Calculator", model: "General", cat: "ROI Tool", url: "https://file.autoinsertion.com/public/Blog%20file/THT-Insertion-ROI-Calculator.xlsx", note: "Model payback from labour rate, shift pattern and insertion volume." },
  { kind: "xlsx", title: "THT Auto Insertion ROI Worksheet", model: "General", cat: "ROI Tool", url: "https://file.autoinsertion.com/public/Blog%20file/THT-Auto-Insertion-ROI-Worksheet.xlsx", note: "Simplified worksheet version for first-pass screening." },
  { kind: "xlsx", title: "THT Staffing Audit Calculator", model: "General", cat: "ROI Tool", url: "https://file.autoinsertion.com/public/Blog%20file/tht-staffing-audit-calculator.xlsx", note: "Quantify manual insertion headcount before and after automation." },
  { kind: "pdf", title: "Auto Insertion Readiness Checklist", model: "General", cat: "DFM", url: "https://file.autoinsertion.com/public/Blog%20file/auto-insertion-readiness-checklist.pdf", note: "Pre-project gate: is this board actually ready for auto insertion?" },
  { kind: "html", title: "THT Auto Insertion Machine Solution — Landing", model: "General", cat: "Solution", url: "https://file.autoinsertion.com/public/Product%20landing%20Page/THT-Auto-Insertion-Machine-Solution-Landing.html", note: "Full line overview for high-mix EMS factories." },
  { kind: "html", title: "S3010A Radial Auto Insertion — Landing", model: "S3010A", cat: "Landing Page", url: "https://file.autoinsertion.com/public/Product%20landing%20Page/S3010A-Radial-Auto-Insertion-Landing.html", note: "Radial / vertical component insertion platform." },
  { kind: "html", title: "S7900 Odd Form Insertion Machine — Landing", model: "S7900", cat: "Landing Page", url: "https://file.autoinsertion.com/public/Product%20landing%20Page/S7900-Odd-Form-Insertion-Machine-Landing.html", note: "Odd-form and connector insertion platform." },
  { kind: "html", title: "BHS PCB Board Handling Equipment — Landing", model: "General", cat: "Landing Page", url: "https://file.autoinsertion.com/public/Product%20landing%20Page/BHS-PCB-Board-Handling-Equipments-Landing.html", note: "Inline transfer, magazine loaders and unloaders." },
  { kind: "pdf", title: "Precision S7900 Odd Form Insertion Machine", model: "S7900", cat: "Product", url: "https://file.autoinsertion.com/public/Southern%20Machinery%20Product/S7900%20Odd%20Form%20Insertion%20Machine.pdf", note: "Full specification brochure." },
  { kind: "pdf", title: "S-4000H Jumper Wire Axial Inserter", model: "S-4000H", cat: "Product", url: "https://file.autoinsertion.com/public/Southern%20Machinery%20Product/S-4000H%20Jumper%20Wire%20Axial%20Inserter.pdf", note: "Jumper wire / axial lead insertion." },
  { kind: "doc", title: "S4000 Axial Insertion Machine Users Manual", model: "S4000", cat: "Manual", url: "https://file.autoinsertion.com/public/Southern%20Machinery%20Manual/S4000+Axial+Insertion+Machine+Users+Manual.doc", note: "Operating and maintenance manual." },
  { kind: "html", title: "SLD250 Magazine Loader IO Troubleshooting Guide", model: "SLD250", cat: "Manual", url: "https://file.autoinsertion.com/public/Southern%20Machinery%20Manual/SLD250_Magazine_Loader_IO_Troubleshooting_Guide.html", note: "IO-level fault isolation for magazine loaders." },
  { kind: "3d", title: "THT Radial Taped Feeder", model: "Feeder", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/THT%20radial%20taped%20feeder.html", note: "Interactive 3D of the radial taped feeder." },
  { kind: "3d", title: "UIC Radial Feeder and Carrier Clip", model: "Feeder", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/UIC%20Radial%20Feeder%20and%20Carrier%20Clip.html", note: "Universal-compatible radial feeder retrofit." },
  { kind: "3d", title: "Radial Cutter Clinch Head", model: "Tooling", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/Radial%20Cutter%20clinch%20head.html", note: "Cut-and-clinch head geometry." },
  { kind: "3d", title: "Axial Taped Feeder", model: "Feeder", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/SMThelp%20Axial%20taped%20feeder.html", note: "Axial taped feeder assembly." },
  { kind: "3d", title: "Oddform Insertion 3-Bowl Feeder", model: "Feeder", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/Oddform%20insertion%203%20bowl%20feeder.html", note: "Three-bowl bulk feeding configuration." },
  { kind: "3d", title: "Bulk Terminal Feeder — NXT", model: "Feeder", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/Bulk%20Terminal%20feeder%20-NXT.html", note: "Bulk terminal feeding for NXT platforms." },
  { kind: "3d", title: "THT PIN Eyelet Insertion Machine", model: "Pin / Eyelet", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/THT%20PIN%20Eyelet%20Insertion%20machine.html", note: "Pin and eyelet insertion head." },
  { kind: "3d", title: "What is an SMT Gripper Nozzle", model: "Nozzle", cat: "3D Preview", url: "https://file.autoinsertion.com/public/SMT%20machine%203D%20Drawing%20in%20Html/What%20is%20SMT%20Gripper%20nozzle.html", note: "Custom gripper nozzle for odd-form handling." }
];

/* ==========================================================================
   BLOGS — 10 product marketing articles
   Written to a six-stage structure: attention → real pain → reusable method
   → where the method is embodied → how it compounds → explicit next action.
   Visible titles avoid the internal stage vocabulary entirely.
   ========================================================================== */

const BLOGS = [

/* ---------------- 1 ---------------- */
{
  id: "layout-decides",
  topic: "Board Design",
  title: "Why Your PCB Layout Decides Whether Auto Insertion Ever Pays Off",
  excerpt: "Most THT automation projects fail on the drawing board, not on the shop floor. Here is what the machine actually needs from your layout — and the four numbers that decide it.",
  date: "2026-06-24",
  read: 7,
  model: "S3010A",
  keywords: ["THT design guidelines", "PCB layout auto insertion", "through hole design rules"],
  body: [
    { h: "The machine is not the bottleneck", p: [
      "A radial inserter rated at 12,000 CPH will not deliver 12,000 CPH on a board that was designed for hand assembly. It will deliver whatever the layout permits — sometimes less than half the rated figure — and the shortfall shows up as unexplained downtime rather than a clean engineering answer.",
      "This is the single most expensive misunderstanding in through-hole automation. Buyers compare inserter speeds, then discover the constraint was never the head. It was the hole span, the datum holes, the clearance around a capacitor, the warp in the panel."
    ]},
    { h: "What is actually happening", p: [
      "Automatic insertion is a tolerance-stacking problem. Five independent error sources have to sum to less than the clearance available:"
    ], ul: [
      "Machine positioning tolerance and repeatability",
      "Workboard holder accuracy — how precisely the board is located",
      "Board pattern accuracy — where the holes actually are, not where the CAD file says",
      "Component lead condition — straightness, tip configuration, plating",
      "Hole diameter and position tolerance"
    ]},
    { h: "The tolerance stack nobody budgets for", p: [
      "Insertion hole position tolerance is typically ±0.07 mm. Datum hole position tolerance is tighter, around ±0.05 mm. Neither is generous. If your fabricator works to ±0.1 mm on hole position, no amount of machine accuracy will rescue the yield — the error is already spent before the board reaches the machine.",
      "This is why the design guideline conversation has to happen before the purchase order, not after. A layout review costs an afternoon. A line that cannot reach rated speed costs years."
    ]},
    { h: "Four numbers that decide everything", p: [
      "Strip away the diagrams and the whole discipline reduces to four quantities:"
    ], ol: [
      "<strong>Hole diameter.</strong> Lead diameter plus 0.48 mm, ±0.08 mm. Too small degrades insertion reliability; too large leaves the component loose and the clinch unreliable.",
      "<strong>Hole span.</strong> For radial 2.5 mm components, 2.54 mm. For 5.0 mm components, lead diameter plus 4.5 mm. For 7.5 mm and 10.0 mm components, lead diameter plus 7.04 mm and 9.58 mm respectively.",
      "<strong>Datum hole diameter.</strong> Minimum 3.17 mm, recommended 3.96 mm, maximum 6.35 mm — and on Pass-Thru II board handling, 4.74 mm absolute maximum.",
      "<strong>Board thickness.</strong> 0.8 mm to 2.36 mm for radial, axial and DIP insertion. Single-board-transfer handling narrows that to 1.52–2.36 mm."
    ]},
    { h: "Where this becomes a machine decision", p: [
      "Once the layout is right, the equipment choice becomes straightforward. A 2.5 mm/5.0 mm tooling platform covers the overwhelming majority of radial electrolytics and disc capacitors on consumer and power boards. When pitch needs to move — and it often does — the platform has to be able to accept 7.5 mm and 10.0 mm components without a tooling changeover that eats the shift.",
      "The S3010A radial platform is built around that 2.5 / 5.0 / 7.5 / 10.0 mm tooling envelope with up to ten feeder positions, so a board family with mixed capacitor pitches runs on one setup rather than three."
    ]},
    { h: "How the gains compound", p: [
      "A layout that respects these rules keeps paying after commissioning. Changeover drops because datum holes are standardised — the same workboard holder accepts a whole board family. First-pass yield rises because the tolerance stack has margin instead of being exactly spent. And re-layout for the next product generation starts from a template instead of a blank sheet.",
      "The opposite also compounds, in the wrong direction. Every new product re-opens the same argument, and the engineering team quietly learns to design around the machine instead of with it."
    ]},
    { h: "Your next step", p: [
      "Before you shortlist any machine, run your current board through a layout review against the four numbers above. If you want a starting point, the design guideline below covers every dimension — axial, radial and DIP — with the formulas and footprint clearances we use in field evaluation.",
      "If you would rather have us do the first pass: send a top-side PCB image, your capacity requirement, and the panel dimensions. You will get a component-by-component insertion verdict — which parts run, which need a pitch change, and which genuinely cannot be automated."
    ]}
  ]
},

/* ---------------- 2 ---------------- */
{
  id: "hole-diameter",
  topic: "DFM Rules",
  title: "The 0.48 mm Rule That Quietly Sets Your Insertion Yield",
  excerpt: "Hole diameter looks like a trivial detail. It is the difference between a component that clinches tight and one that falls out on the conveyor. Here is the formula and where it breaks.",
  date: "2026-06-18",
  read: 6,
  model: "S3010A",
  keywords: ["THT hole diameter formula", "PCB insertion hole size", "auto insertion design rules"],
  body: [
    { h: "One number, two failure modes", p: [
      "Ask ten engineers what hole diameter to use for a 0.6 mm lead and you will get ten answers, most of them inherited from a previous employer. But the tolerance is narrow and it fails in both directions.",
      "Undersized holes degrade insertion reliability — the lead catches, the head mis-seats, the machine flags a fault. Oversized holes let the component sit loose in the board, the clinch has nothing to bite against, and parts drop out during wave soldering or handling."
    ]},
    { h: "Where loose components really come from", p: [
      "A component that falls out after wave soldering is usually diagnosed as a soldering problem. It is almost always a hole diameter problem. If the hole is larger than recommended, the lead has lateral freedom before clinching. The clinch tooling closes on a lead that is not against the jaw reference surface, and the resulting bend is inconsistent — sometimes holding, sometimes not.",
      "This is why the failure is intermittent and why it resists a simple explanation. The board passes visual inspection, then fails downstream."
    ]},
    { h: "The formula, and the exception", p: [
      "For leads captured by the insertion tooling:"
    ], code: [
      "Hole diameter = Maximum lead diameter + 0.48 mm ± 0.08 mm",
      "                        (0.019 in)   (0.003 in)"
    ], p2: [
      "The exception matters more than the rule. Unguided leads — the ones not captured by the tooling, such as the third leg of a triangular layout, or in-line SIP and potentiometer leads — need a larger clearance because nothing holds them on centre:"
    ], code2: [
      "Hole diameter = Maximum lead diameter + 0.58 mm ± 0.08 mm",
      "                        (0.023 in)   (0.003 in)"
    ], p3: [
      "For maximum lead diameter, use whichever of the component's dimensional tolerances is largest. Do not average them."
    ]},
    { h: "A worked example from a real board", p: [
      "On a 10 W charger panel we evaluated for a Brazilian EMS customer, the specified hole diameters were consistently below the requirement. One electrolytic with a 0.6 mm ± 0.05 mm lead called for a 1.083 mm hole; the board was drilled at 1.6 mm. That is 0.5 mm of unnecessary clearance — enough for the component to sit visibly loose before clinching.",
      "Across the ten components on that panel, the required diameters landed between 0.883 mm and 1.483 mm. None of them needed anything exotic. They needed the formula applied consistently instead of carried over from an older product."
    ]},
    { h: "Where the rule gets enforced", p: [
      "A guideline is only useful if something in the process checks it. The practical approach is to build the check into the panel review: for every through-hole component on the BOM, record lead diameter, required hole diameter, and actual drilled diameter, then flag the deltas. On a ten-component board this takes twenty minutes and catches the errors before tooling is cut.",
      "The S3010A radial platform accepts lead diameters from roughly 0.36 mm to 0.86 mm across its 2.5 mm and 5.0 mm tooling, which covers the range on most power and lighting boards. The constraint is rarely the tooling — it is the drill file."
    ]},
    { h: "Why getting this right early matters twice", p: [
      "Hole diameter is fixed at fabrication. Correcting it means new tooling, new panels, new qualification — and a delay measured in weeks. Getting it right the first time costs nothing. Getting it wrong costs the difference between a line that runs at rated speed and one that runs at whatever the layout allows, indefinitely.",
      "There is a second-order effect too. Once a fabricator's drill file is standardised on the correct diameters, every subsequent board in that family inherits the correct value. The cost of the fix is paid once; the benefit is paid every order."
    ]},
    { h: "Your next step", p: [
      "Take your highest-volume THT board and check three components against the formula — the largest electrolytic, the smallest disc capacitor, and any unguided lead. If any of them is off by more than 0.1 mm, that is your first yield project.",
      "Send us the component list with lead diameters and we will return a hole-diameter table you can hand straight to your fabricator, with the required values and the current deltas side by side."
    ]}
  ]
},

/* ---------------- 3 ---------------- */
{
  id: "pitch-adaptation",
  topic: "Case Study",
  title: "3.5 mm to 5.0 mm: Fixing Capacitor Pitch Before You Buy a Machine",
  excerpt: "A real panel evaluation for a Brazilian power-supply builder. Ten components, three outcomes: runs as-is, needs a packaging change, or cannot be automated. Here is the full table.",
  date: "2026-06-11",
  read: 8,
  model: "S3010A",
  keywords: ["capacitor pitch auto insertion", "THT DFM evaluation", "radial insertion pitch"],
  body: [
    { h: "The panel that looked simple", p: [
      "A 10 W charger panel: 157.4 mm by 124 mm, 1.2 mm thick, 5.0 mm process edge, twelve units in a 4×3 array. Annual forecast 4.2 million units. Required output 940 UPH, which works out at a 38.3 second panel cycle time.",
      "On paper this is the easiest possible automation candidate. High volume, small panel, standard components. The evaluation told a different story — not because the board was hard, but because the drill file and the packaging had drifted from the design intent over several product generations."
    ]},
    { h: "The real problem was never the machine", p: [
      "Ten components needed to be inserted. Three of them were fine. Three needed a pitch or packaging change. Three could not be automated without a component change. One was marginal.",
      "The interesting part is that none of the failures were mechanical. They were all upstream: a capacitor bought in a 3.5 mm pitch when the board was laid out for 5.0 mm, an inductor supplied in bulk when the feeder needs radial tape, a resistor with heat-shrink sleeving that has no handling surface for a gripper."
    ]},
    { h: "The evaluation method", p: [
      "For every component, four quantities go in and one verdict comes out:"
    ], ol: [
      "<strong>Current pitch</strong> — the lead spacing the component is supplied in",
      "<strong>Current PCB pitch</strong> — the hole spacing on the board as drilled",
      "<strong>Required PCB pitch</strong> — what the tooling needs",
      "<strong>Lead diameter and required hole diameter</strong> — checked against the 0.48 mm rule"
    ], p2: [
      "The verdict falls into four buckets: runs as-is, adapt the pitch, change the packaging, or does not fit. That last bucket is not a failure of the evaluation — it is the most valuable output, because it tells you where manual labour will remain and lets you plan for it instead of discovering it at commissioning."
    ]},
    { h: "What the ten components actually said", p: [
      "Results from the 10 W panel, with the original Portuguese-language engineering notes:"
    ], table: {
      head: ["Ref", "Component", "Current pitch", "Required pitch", "Verdict"],
      rows: [
        ["EC101, EC102", "Electrolytic capacitor", "3.5 mm", "5.0 mm", ["warn", "Adapt pitch to 2.5 mm"]],
        ["EC201", "Electrolytic capacitor", "2.5 mm ± 0.05", "2.5 mm", ["ok", "Runs as-is"]],
        ["EC202", "Electrolytic capacitor", "2.5 mm", "2.5 mm", ["ok", "Runs as-is"]],
        ["EC103", "Electrolytic capacitor", "2.5 mm", "2.5 mm", ["ok", "Runs as-is"]],
        ["CY101", "Safety capacitor", "10.0 mm ± 1.00", "10.0 mm", ["ok", "Runs as-is"]],
        ["L101", "Axial inductor", "Axial tape", "5.00 mm", ["warn", "Change to radial tape packaging"]],
        ["FR101", "Fusible resistor", "Bulk", "12.5 mm", ["bad", "Does not fit — heat-shrink sleeving, bulk supply"]],
        ["USB1", "USB-A connector", "Odd-form", "—", ["bad", "Does not fit — odd-form, tray"]],
        ["TR1", "Transformer", "Odd-form", "—", ["bad", "Does not fit — odd-form, tray"]]
      ]
    }, p3: [
      "Six of nine run on the radial platform with no change. One needs a pitch adaptation on the panel. One needs a packaging change at the component supplier — a commercial action, not an engineering one. Two stay manual."
    ]},
    { h: "What this looks like in production", p: [
      "The S3010A accepts 2.5 mm, 5.0 mm, 7.5 mm and 10.0 mm tooling on one platform, so the mixed pitches on this panel do not require a tooling changeover between products. That is the difference between a line that runs a mixed family on one setup and a line that stops three times a shift.",
      "The two odd-form parts — the USB-A connector and the transformer — are a different problem. They are gripper-fed, tray-presented components, which is exactly the S7900 odd-form territory rather than the radial platform. Splitting them across two machines is the correct answer for this board, and it is better to know that during evaluation than during ramp."
    ]},
    { h: "Why this compounds", p: [
      "The panel evaluation is reusable. The 20 W charger in the same family shares four component references with the 10 W. Once the pitch corrections are made for one, they carry to the other. By the third product generation, the component library is largely pre-validated and the evaluation becomes a checklist rather than a project.",
      "The reverse is also true. A supplier change that silently alters pitch or packaging reintroduces the whole problem. Which is why the pitch and packaging columns belong in the component master data, not in a one-off spreadsheet."
    ]},
    { h: "Your next step", p: [
      "Send us a panel drawing plus the component list with part numbers. We will return the same four-column verdict table — runs as-is, adapt pitch, change packaging, or stays manual — with the required hole diameters calculated against the 0.48 mm rule.",
      "If you have a panel already in production, the more useful exercise is the reverse: tell us your current UPH and we will show you which of the three constraint categories is capping it."
    ]}
  ]
},

/* ---------------- 4 ---------------- */
{
  id: "axial-lead-length",
  topic: "Axial Insertion",
  title: "Your Resistor Leads Are Too Short, And It Is Costing You the Line",
  excerpt: "Axial insertion fails for one reason more than any other: the hole span is smaller than the component body needs. The formula is simple and almost nobody applies it.",
  date: "2026-06-04",
  read: 7,
  model: "S-4000 / S-4000H",
  keywords: ["axial insertion hole span", "resistor lead length", "axial auto insertion design"],
  body: [
    { h: "A failure that looks mechanical but is not", p: [
      "When an axial inserter damages a component body during insertion, the instinct is to blame the driver tip or the machine setup. In most cases the machine is doing exactly what it was told — the board simply does not have enough space between the two holes for the body that has to sit there.",
      "The driver tips come down either side of the body. If the hole span is too small, the body has nowhere to go and the tips close on it. The damage is immediate and visible, which is at least honest — unlike the yield losses that come from a span that is marginal rather than clearly wrong."
    ]},
    { h: "Why the span keeps being wrong", p: [
      "Designers calculate hole span from the component's nominal body length plus a small margin. That is the right instinct applied to the wrong quantity, because the tolerance that matters is the maximum body length, not the nominal — and for non-symmetrically shaped components there is an additional correction.",
      "There is a second reason. Component vendors change body dimensions between production lots without changing the part number. A span that worked for three years can fail without any design change on your side."
    ]},
    { h: "The formulas", p: [
      "Minimum insertion hole span is a function of body length, tooling style and lead diameter. Four tooling families, four formulas:"
    ], code: [
      "Standard tooling     Min span = [(Body length x 1.112) + 2.36 mm] - Lead dia",
      "Large lead tooling   Min span = [(Body length x 1.085) + 4.11 mm] - Lead dia",
      "5 mm tooling         Min span = [(Body length x 1.109) + 1.40 mm] - Lead dia",
      "5.5 mm tooling       Min span = [(Body length x 1.067) + 2.30 mm] - Lead dia",
      "",
      "Non-symmetrical components: subtract a further 0.41 mm from max body length"
    ], p2: [
      "Two operating rules follow from this. First, design the span <em>greater</em> than the calculated minimum, never equal to it — body lengths vary between lots. Second, keep the span consistent across consecutive insertions, because lead scrap problems appear when span changes too fast."
    ]},
    { h: "Two limits that catch people out", p: [
      "Body diameter. In axial insertion the overall form length is fixed, so board thickness and body diameter compete for the same space:"
    ], code2: [
      "Max body diameter = Fixed form length - (2 x board thickness)",
      "",
      "Standard / high density / large lead tooling:  form length 10.69 mm",
      "5 mm / 5.5 mm tooling:                         form length 11.68 mm",
      "",
      "Example: 1.57 mm board, standard tooling",
      "Max body dia = 10.69 - (2 x 1.57) = 7.55 mm"
    ], p3: [
      "At a 5 mm insertion span, the maximum body diameter collapses to 2.29 mm and the maximum lead diameter to 0.61 mm. This is a genuinely tight window, and it is where a lot of 'the machine cannot handle our parts' complaints originate.",
      "Span stability. On the 6295, 6292 and 6287 series, insertion span across five consecutive insertions should not vary by more than 10 mm. On the 6241, the limit is 5 mm across two consecutive insertions. Boards that mix a 7.5 mm resistor and a 22 mm wire link in adjacent positions can trip this."
    ]},
    { h: "Where the rules are enforced", p: [
      "The S-4000 axial platform and the S-4000H jumper wire variant share this tooling discipline. Jumper wire insertion in particular is sensitive to span variation because the wire is formed rather than supplied pre-formed — the tooling does the forming, so span accuracy is not just about clearance, it is about the shape of the finished link.",
      "Practically, this means jumper wire patterns should be grouped by span in the layout, with the widest span variation kept within the operating limit rather than distributed across the board."
    ]},
    { h: "The compounding effect", p: [
      "Hole span is set in the CAD library. Fix the footprint for a given body length once and every board that uses that footprint inherits the fix — permanently, across every future product. This is the highest-leverage correction available in THT design, because it is made once and applied indefinitely.",
      "The cost of not fixing it is also compounding, in the form of an engineering team that treats axial insertion as unreliable and quietly routes axial components to manual assembly. That decision is made gradually and is rarely revisited."
    ]},
    { h: "Your next step", p: [
      "Pull the axial components on your highest-volume board and calculate the minimum span for each using the standard tooling formula. Compare against the actual hole span. Anything within 0.5 mm of the minimum is a latent problem — fix it before the next component lot arrives.",
      "If you have a jumper wire pattern that keeps failing, send the pattern drawing. Span variation is usually visible immediately, and the fix is normally a layout regroup rather than a tooling change."
    ]}
  ]
},

/* ---------------- 5 ---------------- */
{
  id: "clinch-angle",
  topic: "Clinch & Cut",
  title: "Clinch Angles Explained: Why 45° Is Not Automatically Better",
  excerpt: "Clinch angle and clinch length are set independently, and the wrong combination either blocks the hole or fails to hold the part. Here is how to specify both.",
  date: "2026-05-28",
  read: 6,
  model: "S3010A / S7020T",
  keywords: ["clinch angle", "cut and clinch specification", "THT lead clinching"],
  body: [
    { h: "The step everyone skips", p: [
      "Between insertion and wave soldering there is a mechanical operation that determines whether the component stays put: clinching. The lead is cut to length and bent against the board so the component is held in place for soldering.",
      "It is specified by two independent numbers — angle and length — and in most design reviews neither is written down. The result is that clinch behaviour varies between machines, between products, and sometimes between shifts."
    ]},
    { h: "What actually goes wrong", p: [
      "Three failure modes, all traceable to unspecified clinch parameters:"
    ], ul: [
      "<strong>Lead overlaps a pad or trace.</strong> A long clinch on a dense board bends the lead across a neighbouring conductor. This is a short-circuit risk that passes visual inspection at the clinch station and fails at electrical test.",
      "<strong>Component lifts during handling.</strong> A short clinch with a shallow angle does not generate enough retention force. The part survives the clinch station, then shifts on the conveyor or in the wave.",
      "<strong>Inconsistent bend between units.</strong> Angle varies with lead hardness and hole diameter, so an unspecified angle drifts with component lot. Some units hold, some do not."
    ]},
    { h: "The specification, precisely", p: [
      "For axial insertion, clinch angle is adjustable across 0° to 45°. Clinch lead length is adjustable from 1.28 mm to 1.80 mm, measured from the centre of the insertion hole to the end of the lead. Both are tooling parameters — changing either requires a tooling change, not a software setting.",
      "For DIP and socket insertion the picture is more constrained:"
    ], table: {
      head: ["Parameter", "DIP module", "DIP socket", "Note"],
      rows: [
        ["Inward clinch angle", "20° +8°", "0° +10° / −0°", "Socket angle is tighter to avoid bushing damage"],
        ["Outward clinch", "Available", ["bad", "Not recommended"], "Explicitly not recommended for socket insertion"],
        ["Minimum lead dimension", "1.02 mm (0.040 in)", "1.02 mm (0.040 in)", "Measured at the clinch point"],
        ["Clinch length tolerance", "0.64 ± 0.13 mm", "0.64 ± 0.13 mm", "0.025 ± 0.005 in"]
      ]
    }, p2: [
      "Two notes that are easy to miss. First, tooling change is required to change clinch angle or length — this is not a programmable offset. Second, the achieved angle may vary depending on lead hardness and hole diameter, so the specified figure is a target, not a guarantee."
    ]},
    { h: "Where this gets decided", p: [
      "Cut-and-clinch is integrated into the insertion head on radial platforms, which means the footprint of the clinch anvil has to be respected in the bottom-side layout, not just the top-side component placement. This is the most commonly overlooked clearance in THT design: the board looks fine from the top and the anvil collides with a neighbouring solder joint from below.",
      "On the S3010A radial platform, cut-and-clinch is part of the standard insertion cycle — the lead is trimmed and formed in the same motion as insertion, so there is no separate clinch pass and no opportunity for the component to shift between operations. The S7020T terminal insertion platform applies the same principle to reel-fed terminals, where clinch geometry determines the mechanical joint quality rather than just retention."
    ]},
    { h: "How the discipline compounds", p: [
      "Once clinch angle and length are specified per component family and recorded in the process sheet, three things improve at once: bottom-side layout clearance becomes checkable, wave soldering defects trace to a known parameter instead of a mystery, and new products start from a validated clinch specification instead of rediscovering it.",
      "The alternative — leaving clinch as an operator judgement — means the process cannot be audited. When a customer asks why a joint failed, the honest answer is that nobody specified it."
    ]},
    { h: "Your next step", p: [
      "Pick one board family and write down the clinch angle and length for each through-hole component. If the numbers are not currently recorded anywhere, that is the finding — start there before changing any tooling.",
      "If you are seeing shorts that trace back to clinched leads crossing conductors, send us the bottom-side layout. Clinch anvil clearance is usually visible on the drawing, and the fix is normally a layout adjustment rather than a new tool."
    ]}
  ]
},

/* ---------------- 6 ---------------- */
{
  id: "dip-sockets",
  topic: "DIP Insertion",
  title: "DIP Sockets That Refuse to Be Auto-Inserted, And the Three Fixes",
  excerpt: "DIP socket insertion fails on lead tip geometry, bushing taper and clinch direction — three things specified by the socket vendor, not by you. Here is what to demand.",
  date: "2026-05-21",
  read: 7,
  model: "DIP Insertion",
  keywords: ["DIP socket auto insertion", "machined pin DIP", "DIP insertion hole diameter"],
  body: [
    { h: "The component you did not design", p: [
      "When a DIP socket will not insert automatically, the investigation usually starts on the machine and ends on the socket datasheet. Socket vendors optimise for hand insertion and for the electrical interface — not for the lead tip geometry an automated head needs.",
      "The result is a socket that passes every incoming inspection and fails every insertion attempt. It is the most frustrating category of THT automation problem because the fix is commercial, not technical."
    ]},
    { h: "Three root causes, in order of frequency", p: [
      "Across field evaluations, socket insertion failures cluster into three causes:"
    ], ol: [
      "<strong>Non-tapered bushing.</strong> A tapered bushing guides the lead into the socket aperture. A non-tapered bushing contributes directly to reduced insertion reliability — the lead catches on the aperture edge and the head mis-seats. This is a socket specification issue and the single most common cause.",
      "<strong>Squared lead tips.</strong> A squared tip is acceptable but a tapered tip is preferred, because the taper self-centres against the hole. With squared tips, hole positional tolerance has to absorb the entire misalignment.",
      "<strong>Outward clinch specified.</strong> Outward clinching is explicitly not recommended for DIP socket module insertion. If the process sheet says outward clinch, the socket will be damaged or the retention will be unreliable — and this one is on your process, not the vendor."
    ]},
    { h: "The hole diameter calculation", p: [
      "DIP insertion has its own formula because the lead cross-section, not just the diameter, drives the requirement. The minimum hole diameter depends on the effective lead diagonal:"
    ], code: [
      "Minimum hole dia = Max lead dia + Hole location tolerance + 0.25 mm",
      "",
      "Max lead dia  C = sqrt(A^2 + B^2)      where A and B are the lead cross-section",
      "",
      "Lead tip geometry:  tapered tip preferred, squared tip acceptable",
      "Tip radius:         0.36 mm max",
      "Lead dimension:     1.78 mm max / 0.76 mm min   (long axis)",
      "                    1.17 mm max / 0.38 mm min   (short axis)"
    ], p2: [
      "The key point is that a rectangular lead's effective diameter is its diagonal, not its width. A 0.64 mm by 0.38 mm lead has a diagonal of roughly 0.74 mm — noticeably larger than either dimension. Calculating from the width alone is the classic DIP hole sizing error."
    ]},
    { h: "Where the socket specification gets enforced", p: [
      "DIP insertion shares the tolerance discipline of the radial and axial platforms: machine accuracy, workboard holder accuracy, board pattern accuracy, and hole positional tolerance all contribute to whether the lead finds the aperture. The socket adds a fifth variable — bushing geometry — which is the only one you can control by purchasing decision rather than by process.",
      "In practice this means the socket AVL should carry two extra columns: bushing taper (yes/no) and lead tip configuration. Two columns, checked once per part number, prevent a recurring class of insertion failure."
    ]},
    { h: "The compounding benefit", p: [
      "Socket insertion is one of the few THT operations where a purchasing decision directly sets an engineering outcome. Getting it right once — tapered bushing, tapered tip, inward clinch — means every board using that socket inherits reliable insertion. Getting it wrong means the problem reappears on every new product that reuses the part number, and the socket is usually reused because it passed incoming inspection.",
      "There is a commercial angle too. Socket vendors will supply tapered bushing variants on request, often at no premium, if the requirement is stated at quotation. Stating it later means either a change fee or a permanent hand-insertion operation."
    ]},
    { h: "Your next step", p: [
      "Open your DIP socket part numbers and check two things: bushing taper and lead tip configuration. If either is unspecified on the datasheet, request the tapered variant explicitly — this is a five-minute email with a measurable yield effect.",
      "Then check your process sheet for outward clinch on any socket. If it is there, change it to inward. That single correction resolves a failure mode that no amount of machine tuning will fix."
    ]}
  ]
},

/* ---------------- 7 ---------------- */
{
  id: "warped-panel",
  topic: "Panel & Handling",
  title: "The Hidden Cost of a Warped Panel",
  excerpt: "Warpage, panelisation and process edge width are decided at fabrication and rarely reviewed. They are also the most common cause of transfer errors on inline THT lines.",
  date: "2026-05-14",
  read: 6,
  model: "BHS / SBT",
  keywords: ["PCB warpage auto insertion", "panelisation THT", "board handling design"],
  body: [
    { h: "Transfer errors are usually blamed on the conveyor", p: [
      "When an inline THT line stops with a board transfer error, attention goes to the board handling system. Most of the time the handling system is behaving correctly — the board is simply outside the geometric envelope it was specified for.",
      "Warpage, panelisation and edge width are all set at fabrication and all directly determine whether a board transfers reliably. None of them are typically reviewed at the design stage, because the board works fine on a manual line where a person places it by hand."
    ]},
    { h: "The three envelope violations", p: [
      "Boards fail board handling in three ways:"
    ], ul: [
      "<strong>Warpage beyond the tolerance.</strong> For axial and DIP insertion, maximum warp is 3.17 mm in both measured axes. For radial insertion the tighter figure applies to one axis: 1.60 mm across the board, 3.17 mm along it. A board that warps 2 mm will pass axial but fail radial.",
      "<strong>Panel size outside the handling window.</strong> With board handling, minimum is 100 mm by 80 mm and maximum is 483 mm by 406 mm on single-head machines, or 457 mm by 330 mm on dual-head. Without handling, the insertable area is 457.2 mm square.",
      "<strong>Edge geometry unsuitable for clamping.</strong> Non-symmetrical panels and panels without a clean process edge cannot be reliably located. The preferred configuration uses breakaway inserts to give a symmetrical panel with a consistent edge."
    ]},
    { h: "Panelisation is a throughput decision", p: [
      "Positioning small boards into multiple breakaway panels raises throughput, because the handling overhead is amortised across more units per transfer. Standardising panel size across a product family reduces changeover time, because the same workboard holder and the same handling setup apply to every board in the family.",
      "The trade-off is that panelisation adds process edge material and increases material cost. The break-even depends on board size and volume, and it is worth calculating rather than assuming."
    ], table: {
      head: ["Parameter", "Specification", "Applies to"],
      rows: [
        ["Board thickness", "0.8 – 2.36 mm", "Radial, axial, DIP insertion"],
        ["Board thickness (BHS)", "0.8 – 2.36 mm", "Board Handling System"],
        ["Board thickness (SBT)", "1.52 – 2.36 mm", "Single Board Transfer"],
        ["Max warpage, one axis", "1.60 mm", "Radial insertion"],
        ["Max warpage, both axes", "3.17 mm", "Axial and DIP insertion"],
        ["Insertable area, no handling", "457.2 × 457.2 mm", "Single and dual head"],
        ["Min board with handling", "100 × 80 mm", "Single and dual head"],
        ["Max board, single head", "483 × 406 mm", "With board handling"],
        ["Max board, dual head", "457 × 330 mm", "With board handling"]
      ]
    }},
    { h: "Where handling gets specified", p: [
      "The choice between Board Handling System and Single Board Transfer is a layout decision with a thickness consequence. BHS covers the full 0.8–2.36 mm range and supports left-to-right or right-to-left transfer on single or dual head machines. SBT suits same-side in/out layouts but narrows the thickness range to 1.52–2.36 mm — a real constraint if your product mix includes 1.0 mm boards.",
      "Workboard holder choice follows from the same analysis. Custom holders suit large lots with medium-to-high changeover; adjustable holders suit prototype and contract manufacturing with low-to-medium changeover. The wrong choice shows up as either unnecessary changeover time or unnecessary holder inventory."
    ]},
    { h: "Why it compounds", p: [
      "Panel standardisation is one of the few THT design decisions that reduces cost in three places simultaneously: handling time, workboard holder inventory, and changeover duration. It also makes the line's performance predictable, because the handling overhead becomes a known constant rather than a per-product variable.",
      "Warpage is less forgiving. A board that warps beyond tolerance is a fabrication problem that reappears on every order, and the usual workaround — slowing the line or adding an operator to seat boards manually — converts an inline line into a semi-automatic one without anyone deciding to make that change."
    ]},
    { h: "Your next step", p: [
      "Measure warpage on ten boards from your current production lot, using the axis that matters for your insertion type. If radial, the tighter 1.60 mm figure applies. If any board exceeds it, that is a fabrication conversation, not a machine conversation.",
      "Then check your panel size against the handling window. If you are outside 483 × 406 mm or below 100 × 80 mm, the panel needs rework before any handling specification will hold."
    ]}
  ]
},

/* ---------------- 8 ---------------- */
{
  id: "datum-holes",
  topic: "Board Design",
  title: "Datum Holes: The 3.96 mm Detail That Saves Minutes Every Changeover",
  excerpt: "Datum holes are the reference the whole insertion process is measured from. Standardise them and changeover collapses. Skip it and every new product pays the setup cost again.",
  date: "2026-05-07",
  read: 6,
  model: "Workboard Holders",
  keywords: ["datum holes PCB", "workboard holder design", "THT changeover time"],
  body: [
    { h: "The most boring decision with the biggest payoff", p: [
      "Nothing in THT design is less interesting than datum hole diameter and placement. Nothing else delivers as much changeover reduction for as little effort.",
      "Datum holes are the locating references the board is positioned against. Every other hole on the board is drilled relative to them, and the workboard holder clamps the board by them. If two boards in a family share datum hole diameter and spacing, they share a workboard holder — and changeover between them costs nothing."
    ]},
    { h: "Why changeover keeps costing more than it should", p: [
      "Changeover time is usually attributed to programming and feeder setup. Both are real, but the largest single component is often holder change: removing one workboard holder, fitting another, re-datuming, and verifying position.",
      "This is entirely avoidable. It persists because datum holes are designed per product by whoever is working on that product, with no family-level standard. The first board gets 4 mm holes at some spacing; the next gets 3.5 mm at a slightly different spacing; and the holder inventory grows by one every time."
    ]},
    { h: "The specification", p: [
      "The tolerances here are tight and they matter:"
    ], table: {
      head: ["Feature", "Minimum", "Recommended", "Maximum", "Position tolerance"],
      rows: [
        ["Primary datum hole (D1)", "3.17 mm", ["ok", "3.96 mm"], "6.35 mm", "±0.05 mm"],
        ["Secondary datum hole (D2)", "3.17 mm", "—", "6.35 mm", "±0.05 mm"],
        ["Insertion holes (E1–E4)", "—", "—", "—", "±0.07 mm"],
        ["Pass-Thru II handling", "—", "—", ["warn", "4.74 mm absolute max"], "—"]
      ]
    }, p2: [
      "Four rules follow:"
    ], ol: [
      "<strong>Place datum holes with the longest lateral span between them.</strong> Angular error scales with span — the wider the baseline, the smaller the positional error at the far end of the board.",
      "<strong>Standardise diameter and spacing across the product family.</strong> This is the changeover lever, and it is free.",
      "<strong>If you use Pass-Thru II board handling, the locating hole maximum is 4.74 mm.</strong> A 6.35 mm datum hole is fine for standalone operation and out of specification for Pass-Thru II.",
      "<strong>Hold position tolerance at ±0.05 mm.</strong> Insertion holes get ±0.07 mm; datum holes are tighter because every other dimension references them."
    ]},
    { h: "Where the reference is applied", p: [
      "The workboard holder is the physical interface between the datum specification and the machine. A custom holder designed for a specific board size gives the highest positional accuracy and suits large lots with medium-to-high changeover. An adjustable holder accommodates multiple board sizes and suits prototype or contract manufacturing with low-to-medium changeover.",
      "The point is that the holder is a consequence of the datum decision, not a substitute for it. An adjustable holder cannot compensate for datum holes that move between products — it can only accommodate boards that are individually correct."
    ]},
    { h: "The compounding effect", p: [
      "A standardised datum scheme turns the workboard holder from a per-product tool into a family asset. The second product on the line skips holder design entirely. The fifth product skips holder design and holder verification. By the tenth product, changeover is programming and feeders only, and the setup time curve flattens.",
      "There is a second benefit that shows up later: when you add a second machine, standardised datums mean boards move between machines without a holder library. That is the difference between a line and a collection of machines."
    ]},
    { h: "Your next step", p: [
      "List the datum hole diameter and spacing for every board you currently run. If there is more than one value, you have found your changeover project — standardising on 3.96 mm is the recommended starting point.",
      "If you use Pass-Thru II handling, check that no datum hole exceeds 4.74 mm. That single check prevents a class of transfer errors that is otherwise very hard to diagnose."
    ]}
  ]
},

/* ---------------- 9 ---------------- */
{
  id: "odd-form-signs",
  topic: "Odd-Form",
  title: "Five Signs Your Odd-Form Components Cannot Be Automated Yet",
  excerpt: "Odd-form insertion is where THT automation projects stall. These five conditions decide it — and three of them are fixable without touching the component.",
  date: "2026-04-29",
  read: 8,
  model: "S7900 / S7020T",
  keywords: ["odd form insertion", "odd form feeder", "connector auto insertion"],
  body: [
    { h: "Where THT automation projects actually stall", p: [
      "Radial and axial insertion are solved problems. The components are supplied on tape, the pitches are standard, and the design rules are well established. Odd-form components — connectors, transformers, USB sockets, fuse holders, relays — are where projects stall, because the component was never designed with automated handling in mind.",
      "This produces an uncomfortable conversation. The board needs twelve manual insertion operations, and the customer has budgeted for none of them."
    ]},
    { h: "The five conditions", p: [
      "Odd-form automation fails on five conditions. Each is checkable before any equipment is quoted:"
    ], ol: [
      "<strong>Packaging is bulk or tray with no orientation reference.</strong> Bulk components arrive with no consistent orientation. Tray components have orientation, but only if the tray is designed for it — many are not. A feeder needs either a tape format or a tray with a positive orientation feature.",
      "<strong>The component has no handling surface.</strong> A gripper needs somewhere to grip that is flat, accessible and does not damage the part. Heat-shrink sleeving, soft moulded bodies and irregular geometry leave nothing to grip. This is the hardest condition to fix, because it usually means a component change.",
      "<strong>Orientation must be identical at insertion.</strong> If the component must face a specific way and the packaging does not guarantee that, a vision system has to resolve it — which adds cycle time and cost. Where the packaging can guarantee orientation, vision is unnecessary.",
      "<strong>Polarity is not visually resolvable.</strong> If a camera cannot determine polarity from the top surface, the insertion station needs either a mechanical key or a human. Mechanical keys are cheap at the component design stage and expensive afterwards.",
      "<strong>Insertion force exceeds the platform.</strong> Heavy transformers and large connectors need insertion force beyond what a standard head provides. This is a real limit and it is better established during evaluation than during commissioning."
    ]},
    { h: "What the evaluation looks like", p: [
      "A real panel evaluation makes the pattern clear. On a 20 W charger panel, eleven components were assessed. Nine ran on the radial platform. Two did not:"
    ], table: {
      head: ["Component", "Issue", "Fixable?", "Action"],
      rows: [
        ["USB-A connector, tray supplied", "Odd-form, no tape format", ["warn", "Partly"], "Odd-form platform with tray feeder; orientation must be guaranteed"],
        ["Transformer assembly, tray supplied", "Odd-form, high insertion force", ["warn", "Partly"], "Dedicated odd-form station; verify force requirement"],
        ["Inductor supplied in bulk", "Bulk packaging", ["ok", "Yes"], "Change to radial tape — commercial action only"],
        ["Transistor, stick supply", "2.3 mm pitch, stick", ["bad", "No"], "Stays manual, or re-source in taped format"],
        ["Fusible resistor, heat-shrink", "No handling surface", ["bad", "No"], "Stays manual unless component is re-specified"]
      ]
    }, p2: [
      "The useful output is not 'nine out of eleven can be automated'. It is the column that says which two will remain manual, so headcount planning is based on a number rather than an assumption."
    ]},
    { h: "Where odd-form platforms fit", p: [
      "Odd-form insertion is a different machine class from radial. Where the radial platform handles taped, standard-pitch components at high cycle rates, an odd-form platform handles the low-volume, high-variety parts — typically with gripper tooling, tray or bowl feeding, and often with vision for orientation.",
      "The S7900 covers that territory with tray, bowl and tube feeding. The S7020T applies the same approach to reel-fed terminals, where the component is a formed metal part rather than an electronic component and the insertion cycle has to produce a mechanically sound joint, not just retention.",
      "For boards with both categories — which is most real boards — the practical configuration is a radial platform plus an odd-form platform, with the manual remainder planned explicitly rather than left as a surprise."
    ]},
    { h: "Why early evaluation pays twice", p: [
      "The odd-form decision is largely a purchasing decision. A component supplied in bulk can often be sourced in tape at the same unit price. A component with no handling surface usually cannot be fixed at all. Knowing which is which before equipment selection changes the scope of the project — sometimes substantially.",
      "It also changes the ROI calculation honestly. A line that automates nine of eleven operations is a good investment. A line that was expected to automate all eleven and achieves nine is a project that runs over budget and under-delivers, not because the equipment failed but because the evaluation was skipped."
    ]},
    { h: "Your next step", p: [
      "List every through-hole component on your board and mark the packaging format: tape, tray, tube, bulk, stick. Tape and tube are usually straightforward. Bulk and stick are usually the problem. Tray depends entirely on whether the tray has an orientation feature.",
      "Send us the list with part numbers and packaging. You will get back a verdict per component — automatable, automatable after a packaging change, or stays manual — and a realistic count of manual operations for your ROI model."
    ]}
  ]
},

/* ---------------- 10 ---------------- */
{
  id: "charger-line-audit",
  topic: "Case Study",
  title: "From 940 UPH to a Lights-Out THT Line: A Charger Design Audit",
  excerpt: "Two charger panels, 5.4 million units a year, 1210 UPH combined. A full design audit showing exactly where automation ends and manual work begins.",
  date: "2026-04-22",
  read: 9,
  model: "S3010A / S7020T / S7900",
  keywords: ["THT line design audit", "charger PCB assembly", "auto insertion ROI"],
  body: [
    { h: "The brief", p: [
      "A power-supply builder with two charger panels in the same family. The 10 W panel runs 4.2 million units a year at a required 940 UPH. The 20 W panel runs 1.2 million at 270 UPH. Combined requirement: 1210 UPH across 5.4 million units.",
      "The question was not whether to automate. At that volume the arithmetic is settled. The question was what the line would actually look like, and how much manual work would remain."
    ]},
    { h: "What the numbers did not show", p: [
      "Both panels looked like clean automation candidates on paper. Small, high volume, standard components, shared references between the two products.",
      "The evaluation surfaced three categories of constraint that no capacity calculation would have caught:"
    ], ul: [
      "<strong>Pitch mismatch.</strong> Two electrolytics on the 10 W panel were supplied at 3.5 mm pitch against a board laid out for 5.0 mm. The components existed in the right pitch — they simply were not the ones being purchased.",
      "<strong>Packaging mismatch.</strong> An inductor supplied in bulk and a transistor supplied in stick format, both of which needed taped supply to run on the radial platform.",
      "<strong>Genuine odd-form.</strong> A USB-A connector and a transformer, both tray-supplied, both requiring an odd-form platform rather than a radial one."
    ]},
    { h: "Panel geometry and the cycle-time budget", p: [
      "The two panels are similar but not identical, and the difference matters for handling:"
    ], table: {
      head: ["Parameter", "Charger 10 W", "Charger 20 W"],
      rows: [
        ["Panel length", "157.4 mm", "185.5 mm"],
        ["Panel width", "124 mm", "157.65 mm"],
        ["Panel thickness", "1.2 mm", "1.2 mm"],
        ["Process edge width", "5.0 mm", "5.0 mm and 10.0 mm"],
        ["Units per panel", "12 (4×3)", "16 (4×4)"],
        ["Annual forecast", "4,200,000", "1,200,000"],
        ["Required UPH", "940", "270"],
        ["Panel cycle time", "38.3 s", "177.8 s"]
      ]
    }, p2: [
      "Both panels sit comfortably inside the handling window — well above the 100 × 80 mm minimum, well below the 483 × 406 mm maximum. Thickness at 1.2 mm is inside the 0.8–2.36 mm range for both BHS and SBT handling, so handling choice is not constrained here.",
      "The 10 W panel is the throughput driver: 940 of the 1210 combined UPH, on a 38.3 second cycle. That is the panel the line has to be designed around."
    ]},
    { h: "The component verdicts", p: [
      "Across the two panels, components fell into three groups. The 10 W results:"
    ], table: {
      head: ["Ref", "Component", "Current", "Required", "Verdict"],
      rows: [
        ["EC101/102", "Electrolytic cap", "3.5 mm pitch", "5.0 mm", ["warn", "Adapt pitch"]],
        ["EC201", "Electrolytic cap", "2.5 mm", "2.5 mm", ["ok", "Runs as-is"]],
        ["EC202", "Electrolytic cap", "2.5 mm", "2.5 mm", ["ok", "Runs as-is"]],
        ["EC103", "Electrolytic cap", "2.5 mm", "2.5 mm", ["ok", "Runs as-is"]],
        ["CY101", "Safety cap", "10.0 mm", "10.0 mm", ["ok", "Runs as-is"]],
        ["L101", "Axial inductor", "Axial tape", "5.0 mm radial", ["warn", "Change packaging"]],
        ["FR101", "Fusible resistor", "Bulk + sleeving", "12.5 mm", ["bad", "Stays manual"]],
        ["USB1", "USB-A connector", "Odd-form, tray", "—", ["bad", "Odd-form platform"]],
        ["TR1", "Transformer", "Odd-form, tray", ["warn", "High force"], "Odd-form platform"]
      ]
    }, p2: [
      "The 20 W panel followed the same pattern with one addition: a transistor supplied in stick format at 2.3 mm pitch, which has no taped equivalent at that pitch and stays manual."
    ]},
    { h: "What the line actually needs", p: [
      "Three stations, not one:"
    ], ol: [
      "<strong>Radial platform</strong> for the taped, standard-pitch components — the majority of the component count and the source of the 940 UPH figure. A 2.5 / 5.0 / 7.5 / 10.0 mm tooling envelope covers every pitch on both panels without a tooling changeover, which is what makes the shared family viable.",
      "<strong>Odd-form platform</strong> for the USB-A connector and the transformer, using tray feeding. Lower cycle rate, higher component variety, and the right place for gripper tooling.",
      "<strong>Manual station</strong> for the fusible resistor with heat-shrink sleeving and the stick-supplied transistor — a small, defined, plannable operation rather than a residual that surfaces at ramp."
    ]},
    { h: "Why the audit is worth more than the quotation", p: [
      "The component verdict table is the deliverable that matters. It converts an open-ended automation ambition into a specific scope: this many components on this platform, this many on that platform, this many remain manual, this is the headcount.",
      "It also protects the ROI model. A line designed for the real component set hits its numbers. A line designed for an optimistic component set does not, and the shortfall is usually attributed to the equipment.",
      "And it carries forward. The 10 W and 20 W panels share four component references. Once the pitch and packaging corrections are made for one, they apply to the other — and to the next product in the family."
    ]},
    { h: "Your next step", p: [
      "The most useful thing you can send us is what this customer sent: a panel drawing, the component list with part numbers, packaging formats, and your capacity requirement. From that we produce the same three-station recommendation and the same verdict table.",
      "If you want to run the numbers yourself first, the THT insertion ROI calculator and the auto insertion readiness checklist below use the same inputs. Start with the checklist — it will tell you whether a full evaluation is worth commissioning."
    ]}
  ]
}
];
