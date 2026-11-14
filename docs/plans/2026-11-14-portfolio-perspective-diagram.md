# Portfolio in perspective: six-card connected diagram

Date: 14 November 2026 (Africa/Nairobi)  
Status: Implemented locally on 14 November 2026. Source and automated checks complete; browser visual signoff is pending. No deployment or push performed. See [verification record](../portfolio-diagram-verification.md).  
Target checkout: `D:/PROJECT SWE/inzu-landing-page-v2-main`  
Visual companion: [Desktop composition schematic](2026-11-14-portfolio-perspective-layout.svg)

## 1. Outcome and agreed scope

Replace the large illustrative dashboard beneath **Your portfolio. In perspective.** with six real HTML content cards connected to a central Inzu symbol. Use the supplied symbol consisting of two inverted “i” forms. Three cards sit on each side on desktop. Rounded, flared branches merge into the cards and hub. A thread leaves the hub below and connects into the existing first patterned feature frame in the next section.

Rainbrand supplies the reference for a connected composition, generous space and fluid joins. Inzu supplies the identity, green palette, six product topics, copy, artwork and original geometry. The reference screenshots show five cards; this design deliberately has the six requested cards.

The implementation is a bounded change to this landing section and its connection into `FeatureStories`. Keep the existing section title, introductory paragraph, `#features` anchor, adjacent shaped surfaces, feature stories, navigation, routes, CTA destinations and other sections. Removing the old overview's two decorative footer captions is included to clear the outgoing route. No backend feature development, authenticated data calls, new service integrations, deployment or publishing is required for this change.

Success means the complete composition works across widths, text changes, font loading and browser scaling. A build passing is necessary but does not establish that a joint is visually correct. No plan can guarantee a first implementation needs no adjustment; this plan makes those adjustments measurable and keeps known defects out of the completion criteria.

## 2. Phase 0 — completed discovery and baseline

### 2.1 Authority and checkout locations

Read these before implementation, even when starting in a fresh conversation:

1. This plan and its schematic.
2. `docs/INZU-LANDING-DESIGN-MANUAL.md`, especially sections 3–5, 7–8 and 10–12.
3. Current `src/components/Landing.tsx` and **all relevant occurrences** in `landing.css`; later rules override earlier ones.
4. Current worktree status. Preserve existing user work.

The actual product source roots are nested:

| Source | Actual root |
| --- | --- |
| Landing page | `D:/PROJECT SWE/inzu-landing-page-v2-main` |
| Frontend app | `D:/PROJECT SWE/inzu-frontend-main/inzu-frontend-main` |
| Backend | `D:/PROJECT SWE/inzu-backend-main/inzu-backend-main` |
| Saved Rainbrand reference | `C:/Users/User/Downloads/saveweb2zip-com-www-rainbrand-com` |

`CLAUDE.md` in the landing checkout describes an older component assembly, fonts and header. Current `App.tsx`, `Landing.tsx`, active CSS and the design manual take precedence as factual implementation evidence. Frontend BoardUI instructions belong to the product app; this task reads that app for evidence and copies a supplied brand asset, without editing its UI.

### 2.2 Exact current integration

Line references below describe the 14 November baseline and will move after edits.

| Source | Finding and consequence |
| --- | --- |
| `src/components/Landing.tsx:52–59` | `Dashboard` is HTML/CSS, not an image file. It contains the illustrative label and invented example metrics `04`, `92%`, `03`. Remove the component and its now-unused styling; there is no dashboard bitmap to regenerate. |
| `Landing.tsx:67–75` | `FeatureStories` owns the existing three pattern frames. The first frame receives `firstPatternRef`; keep that destination. |
| `Landing.tsx:78–102` | `FeatureFlow` owns the overview, outgoing connector and next section. It currently measures the dashboard bottom. Replace that start with the new hub bottom and extend measurement to all six cards. |
| `Landing.tsx:88–97` | Existing measurement lifecycle uses DOM rects, a resize observer, rAF scheduling and cleanup. Reuse these principles; the current separate stroke and flare are not the final geometry specification. |
| `landing.css:1` | `.lp-panel` has `overflow:hidden`. A cross-section SVG nested inside the dark panel would be clipped. Keep the connector overlay on the outer `FeatureFlow` host. |
| `landing.css:106–107` | Overview bottom cutouts use paper; adjacent feature-section cutouts use dark green. Preserve the paired backing colors. |
| `landing.css:125–128` | Old dashboard/tail spacing needs deliberate replacement, rather than leaving a dashboard-sized empty gap. |
| `landing.css:300–303` | Existing host and overlay rules are the starting lifecycle pattern. The old overlay is hidden at 900px; the replacement needs its own responsive policy. |
| `landing.css:322–331` | Actual phone feature rows remain two-column, and pattern links remain visible. The manual's older claim that they stack/hide at 560px is stale. Preserve current behavior and correct this specific note when documenting the new work. |
| `src/main.tsx` | React StrictMode is enabled. Effects must clean up and tolerate setup/cleanup/setup. |

Baseline verification on 14 November:

- `npm run build`: passed, Vite 6.4.1, 1,717 modules transformed.
- `npm run lint`: passed; this script runs `tsc --noEmit`.
- No existing automated test suite or browser-test configuration was found in the landing checkout. `tsx` 4.21.0 is already installed and can run a small geometry verification script without a new dependency.
- Initial worktree had three pre-existing untracked images: `public/images/hero-balcony.webp`, `hero-building.webp`, `hero-chosen-soul-preview.jpg`. Leave them untouched and out of this change.
- Planning formula checks passed across desktop frame widths 1000?1200px, including small-hub port/flare clearances, adjacent-flare separation, gutter runway and compact-story turn bands. These are specification checks, not tests of implemented browser geometry. The schematic XML is valid; browser-rendered visual review remains outstanding.
- Browser access host was unavailable during planning. The supplied screenshots and local sources were inspected; no current-page browser inspection, signed-in product test or visual signoff was completed.

### 2.3 Product evidence and claim boundaries

Implementation presence establishes what the local source models; it does not prove a deployed service is operating. Use modest capability descriptions and explicit planned labels below.

| Topic | Evidence | Allowed message | Guard |
| --- | --- | --- | --- |
| Tenant access | Frontend `src/app/(dashboard)/tenant/page.tsx:37–48,208–235,307–357`; backend `src/actions/tenant/me.ts:24–68`; `src/actions/tenants/sendPortalInvite.ts:14–15,86` | Tenant sign-in and viewing a unit, recent invoices, payments and maintenance updates. | Do not promise complete historical records or tenant web maintenance submission. No live invitation/login was exercised. |
| Portfolio | Frontend `src/components/dashboard-view.tsx:76–114,221–224`; `src/lib/dashboard-summary.ts:38–54`; backend `src/actions/dashboard/summary.ts` | Properties, occupancy, expected rent and outstanding balances together. | No real-time, forecasting, profit, valuation or performance guarantees. |
| Payments | Frontend `src/app/(dashboard)/payments/page.tsx:94,185–189`; backend `src/models/Payment.ts:36–51` | Recorded payments, references and balances/status. | Do not imply active collection, live settlement or automatic reconciliation. |
| Portfolio import | Frontend `src/lib/api/client.ts:285–324`; backend `src/actions/units/bulkCreate.ts:9–16,37–95`; `src/config/routes.ts:90` | Import is a planned capability, as requested by the user. | Existing bulk unit creation is not CSV/spreadsheet import. No portfolio-import route was found. |
| Channel connectivity | Backend `src/services/whatsapp.ts:85–106`, `whatsappFlows.ts`, `src/actions/maintenance/update.ts:103–112`; `src/services/mpesa.ts:45–46,123`; `src/actions/payments/callback.ts:5–15`; `src/models/Payment.ts:36–51` | Planned connections for tenant messages and payment updates, naming WhatsApp, M-Pesa and bank payments. | WhatsApp code exists but production readiness is unverified. M-Pesa initiation/callbacks are explicitly disabled. Bank transfer is a record type, not a live bank feed. |
| Maintenance | Backend `src/actions/maintenance/create.ts:22–23`, `update.ts:21–22,45–58`; frontend `src/components/maintenance-detail-view.tsx` | Track requests, status and costs. | No AI dispatch, guaranteed response times, tenant submission or contractor marketplace claims. |

Additional constraints: backend `RECONCILIATION_SAFETY.md:3–5` explicitly blocks reconciliation; `src/actions/payments/reconcile.ts:78` enforces that block. `src/actions/whatsapp/webhook.ts:41–69` does not establish verified production webhook security. Do not reproduce those operational details on the marketing page; they explain the content boundaries. Do not re-enable anything as part of this section.

### 2.4 Reference implementation lessons

Saved Rainbrand files are minified; inspect named anchors/search terms rather than relying on line numbers:

- `index.html`: `hiw-files`, `hiw-web`, `hiw-figma`, `hiw-hub-top`, `hiw-rb`, `hiw-hub-foot` show HTML cards and separately addressable surfaces.
- `css/3vyudohyunqb2.css`: desktop composition near character 17,000; mobile uses a different arrangement. Card artwork clips locally, while routes sit outside that clipping.
- `js/33rw5r_qlejg9.js`: around characters 16,922–21,700, measured anchors, edge snapping using DPR, resize observation, font readiness, resolution changes and invalid-route diagnostics.

Use these as evidence for the construction approach. Do not copy Rainbrand's proprietary silhouettes, logos, illustrations, minified code, five-card placements or implementation wholesale.

### 2.5 Allowed APIs and documentation

Use native SVG and already installed React tools. No diagram, canvas, animation or icon package needs to be added.

| API/pattern | Use and source |
| --- | --- |
| React `useRef`, `useState`, `useLayoutEffect` | Measure after DOM layout; effect returns cleanup. Existing pattern at `Landing.tsx:78–97`; [React reference](https://react.dev/reference/react/useLayoutEffect). |
| `element.getBoundingClientRect()` | Read viewport-relative border-box edges, then convert all boxes to one overlay space. [DOM reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). |
| `new ResizeObserver(callback)`, `.observe(element)`, `.disconnect()` | Watch host, width-owning frame, cards, hub and target; do not resize observed elements in the callback. [ResizeObserver reference](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). |
| `requestAnimationFrame`, `cancelAnimationFrame` | Coalesce invalidations and clean up queued work; already used locally. |
| `document.fonts.ready` | Remeasure after fonts/layout settle; guard promise callback after unmount. [Font readiness reference](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready). |
| `window.devicePixelRatio`, `window.matchMedia`, media-query `change` listeners | Keep snapping current on page zoom/display changes; re-arm a resolution listener after a DPR change. Use finite positive DPR or fallback 1. [DPR reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio). |
| CSS `container-type:inline-size`, named `@container` size queries | Select topology based on actual available diagram width; set a custom property on the child to expose that same choice to JS. [Container-query reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries). |
| Native `<svg>`, `<path>`, filled outlines | One outer overlay, one measured coordinate space, original ribbon geometry. Existing continuous bridge at `Landing.tsx:71` illustrates the filled-flare principle. |
| `lucide-react` | Existing package for optional decorative line icons. Inspect installed exports before choosing an icon; no provider-logo approximations. |
| `motion/react` | Already installed, but no new animation is required here. Never import `framer-motion`. |

## 3. Content and artwork specification

### 3.1 Section heading

Retain the existing title and paragraph exactly for the first implementation:

> Your portfolio.  
> In perspective.

> From the big picture to the details, bring the information you need together in one considered space.

This keeps the scope clear and avoids mixing a section redesign with an unrelated copy revision.

### 3.2 Six cards — proposed final copy

IDs below are stable content/measurement IDs, not visible numbering. DOM order is the table order: row-by-row on desktop/tablet and top-to-bottom on phones. Each card has a title, one sentence and a small product-specific graphic.

| Order / ID | Desktop slot | Title | Supporting copy | Visible status |
| --- | --- | --- | --- | --- |
| 1 / `tenants` | Upper left | **A place for your tenants.** | Tenants can sign in to view their unit, recent invoices, payments and maintenance updates. | No availability badge. |
| 2 / `payments` | Upper right | **Your payments, in one place.** | Keep recorded payments, references and balances together. | No availability badge. |
| 3 / `portfolio` | Middle left | **Your portfolio in one view.** | See properties, occupancy, expected rent and outstanding balances together. | No availability badge. |
| 4 / `connections` | Middle right | **Messages and payments, connected.** | Planned connections for tenant messages and payment updates. | **Planned**; text chips: **WhatsApp**, **M-Pesa**, **Bank payments**. |
| 5 / `import` | Lower left | **Import your portfolio.** | A planned way to bring existing property and unit records into Inzu. | **Planned**. |
| 6 / `maintenance` | Lower right | **Maintenance, kept in view.** | Track requests, status and costs alongside your portfolio. | No availability badge. |

The two planned labels must be visible beside the titles at every size, not hidden in a tooltip, footnote or hover state. “Planned” avoids inventing a launch date. The connected-channel card is a roadmap illustration; it must not show a green connected dot or an active provider account. Existing partial WhatsApp implementation does not change the conservative whole-card label.

No card is clickable in this version. They explain the product and do not launch a portal, upload, payment or connection dialog. Do not add arrow icons that imply a destination, false controls or hover-only copy.

### 3.3 Card visual briefs

Build compact original HTML/SVG graphics; do not generate a replacement raster dashboard. Graphics are decorative and cannot be mistaken for a working app interface.

| Card | Graphic | Constraints / evidence to consult |
| --- | --- | --- |
| Tenant access | A small tenant-space panel with a unit glyph and two short rows labeled “Invoices” and “Updates”. | Use the information hierarchy of the tenant portal, not its entire application shell. No real person, login form, fake password field or “Invite sent” state. |
| Payments | Three ledger-like rows with a reference line and a quiet “Recorded” label. | Reference payment-register fields. No provider-confirmed animation, fabricated transaction totals or reconciliation-success badge. |
| Portfolio | Overlapping property/unit tiles or one miniature property list with three neutral bars. | No old `04 / 92% / 03` metrics; no invented performance figures. |
| Connections | Three outlined text chips: WhatsApp, M-Pesa, Bank payments; subtle internal links toward a tenant-message glyph. | Use text names, avoiding a provider-logo download dependency. Entire graphic belongs to the visibly planned card. |
| Import | An outlined sheet marked “Property / Unit” approaching a stack of property tiles. | Concept only; no progress percentage, checkmark, successful upload or promised CSV format. A file icon does not establish actual import support. |
| Maintenance | Two ticket strips, e.g. “Leaking tap · Open” and “Light fitting · In progress”, with a simple tool glyph. | Fictional examples; do not imply automatic dispatch or tenant web submission. |

Use one short, readable figure caption: **A connected view of Inzu. Graphics are illustrative; planned capabilities are marked.** This replaces the old large “ILLUSTRATIVE VIEW” dashboard badge without hiding roadmap status. Keep examples anonymous. Do not access production records or send messages to construct graphics.

### 3.4 Central brand artwork

Exact supplied source:

`D:/PROJECT SWE/inzu-frontend-main/inzu-frontend-main/public/brand/inzu-mark.svg`

Copy it unchanged into landing `src/assets/inzu-mark.svg` during implementation and import it through Vite. Source provenance is frontend `src/components/inzu-brand.tsx:11–18`.

- Original viewBox: `560 240 380 1020`; `preserveAspectRatio="xMidYMid meet"`; sage fill `#90b494`.
- It is a tall mark, not a square icon. Preserve the 380:1020 viewBox aspect ratio and inspect the actual visible artwork.
- Place it in a simple, original rounded-square hub. Use an explicit **112 x 112px image element** inside the 192px hub, **96 x 96px** inside the 160px hub, and **88 x 88px** inside the 144px phone hub, with `object-fit:contain`. The SVG source declares square intrinsic width=2000/height=2000; its own tall viewBox and `preserveAspectRatio=meet` produce a narrow visible mark within that square element (about 42px wide at 112px high). Center the square image element. Do not combine a tall CSS image box with `object-fit:contain`, which can fit the square intrinsic SVG object into that box and letterbox the artwork again. Do not modify source dimensions or paths to solve sizing.
- Do not stretch to fill hub width, type two “i” characters, crop the full wordmark into a new symbol or use Rainbrand's hub silhouette.
- Central hub is noninteractive. Use an accessible name “Inzu”; suppress redundant decorative image announcements if the wrapper provides it.
- The shared navigation/footer wordmark remains unchanged.

## 4. Composition and surface specification

### 4.1 Palette, type and containment

Use the landing system from manual sections 3–4:

| Role | Value / rule |
| --- | --- |
| Section | Existing dark green `#294c34`. |
| Cards, hub, branch ribbons and exit route | One shared token `--portfolio-surface:#d5dfd2`. Exact same value is required at joins. |
| Card text | Existing ink `#213a2a`; choose body tone only after contrast verification. |
| Inner graphic panels | Paper `#f8f9f4`; restrained sage `#90b494`; optional small coral accent from existing palette. |
| Typography | Be Vietnam Pro, inherited from `.lp`; no serif/italic display text. |
| Card titles | Start at 24px desktop, 22px tablet, 21px phone, line-height about 1.15, weight 500. Let titles wrap naturally. |
| Card body | 14px / 1.6 on all modes; do not shrink copy to preserve a diagram silhouette. |
| Planned badge / caption | At least 12px, sufficient contrast. Badge stays in text flow. |
| Corners | Card radius 24px, hub radius 24px. No stepped proprietary hub outline. |
| Card interior | 24px padding desktop/tablet, 20px phone. Graphics fill remaining width with `min-width:0`. |

Keep the existing outer panel max-width 1440px and shell gutters. The diagram frame fits inside the section's normal content width. Set `min-width:0` on grid children. Card and row heights are content-driven with minimums, never fixed clipping heights.

Only the **inner artwork viewport** can use `overflow:hidden` and rounded corners to crop decorative shapes. The card outer surface, diagram stage and measured overlay do not clip connectors. The existing outer section can retain `.lp-panel` clipping because all cross-section routes are its sibling on `FeatureFlow`.

### 4.2 Desktop topology — available diagram width at least 1000px

```text
Tenant access ──────╮                 ╭────── Payment records
                   ╰────┐       ┌────╯
Portfolio view ─────────┤ INZU  ├─────────── Planned connections
                   ╭────┘       └────╮
Planned import ────╯         │       ╰────── Maintenance
                             │
                             ╰────────────── first feature frame below
```

The schematic indicates relationships; the coordinate table specifies actual initial placement. Each card connects independently to a flat side of the hub. Upper and lower branches use rounded orthogonal routes; middle branches are horizontal. No branch crosses another branch or a card. The stem leaves the hub's bottom center and stays in the central gutter until below the last card row.

Use one grid with left and right cards in three shared content-driven rows; central hub occupies the middle column of row two and aligns to that row's center. Pair rows grow to the taller of their two cards. No six independent absolute `top` values and no fixed total stage height in production.

Initial size rules, where `W` is the actual diagram frame width:

- Internal horizontal safe inset `P=24px`.
- Hub width/height `H=clamp(160px, 0.16*W, 192px)`.
- Each horizontal card-to-hub gutter `G=clamp(64px, (136/1200)*W, 136px)`.
- Each card width `C=(W - 2P - H - 2G)/2`. At W=1000, C is about 283px; below that, change topology rather than compressing cards.
- Card minimum height 224px; inter-row gap 56px; equal paired row height via CSS grid.
- Diagram top/bottom safe inset 24px; heading-to-diagram gap starts at 56px.
- Cap diagram width at 1200px and center it in the section. Larger panels add negative space, not stretched cards.

Reference boxes for a 1200px-wide frame with minimum-height cards:

| Node | x | y | width | height |
| --- | ---: | ---: | ---: | ---: |
| Tenant | 24 | 24 | 344 | 224 |
| Payments | 832 | 24 | 344 | 224 |
| Portfolio | 24 | 304 | 344 | 224 |
| Connections | 832 | 304 | 344 | 224 |
| Import | 24 | 584 | 344 | 224 |
| Maintenance | 832 | 584 | 344 | 224 |
| Hub | 504 | 320 | 192 | 192 |

This example stage is 832px high before its caption/exit corridor. It is a reference, not a fixed-size SVG scaled over responsive HTML. If content grows, measure the resulting rows and recalculate the routes.

Reference ports in this same frame:

- Left card ports: `(368,136)`, `(368,416)`, `(368,696)`.
- Right card ports: `(832,136)`, `(832,416)`, `(832,696)`.
- Hub left ports: `(504,368)`, `(504,416)`, `(504,464)`.
- Hub right ports: `(696,368)`, `(696,416)`, `(696,464)`.
- Upper/lower left rail x=436; right rail x=764. These are the gutter midpoints, derived from actual edges.
- Stem starts at hub bottom `(600,512)`.

For hubs at least 184px tall, side ports use fractions 0.25, 0.5 and 0.75 of the **actual hub border box**, with desktop 18px half-width flares. For hubs below 184px, use compact flares at the **hub side endpoints only** (half-width 14px, depth 16px) and constrain each nominal port to `[radius + halfWidth + 4, H - radius - halfWidth - 4]`. Thus H=160/radius24 gives side offsets **42, 80, 118px**, not 40/80/120. The facing desktop card endpoints can retain desktop flare sizes; geometry accepts per-endpoint parameters. Validate separation of neighboring flare envelopes as well as corner clearance. Hub bottom exit still has sufficient flat-edge width for its normal desktop flare. Card ports are the vertical center of the actual facing edge, never a percentage of an unrelated parent.

### 4.3 Tablet topology — frame width 600px to below 1000px

Place the hub above three pairs of cards. Reserve a central 64px gutter for a vertical spine; each paired row connects horizontally into that spine. All six relationships remain visible. The hub's bottom becomes the start of the spine, with a single outgoing continuation below row three.

- Hub 160px; centered above the grid with a 40px hub-to-first-row gap.
- Two columns `minmax(0,1fr)`, center gap 64px; card minimum height 224px; row gap 32px.
- Each pair uses one shared row height; attachment y is that row's actual center.
- At W=600, card width is 268px; do not keep desktop's extra 24px inner inset in this mode.
- Each card-to-spine join uses a compact 16px-deep flare and 14px half-width; a longer desktop flare cannot fit the 32px half-gutter.
- Draw each T-junction as one compound filled shape or deliberately overlap same-colored shapes by 1 CSS px. A horizontal branch does not need a pretend flare at the bare spine.
- No stray desktop side flares may remain on the hub. Hub is measured after the topology change.

### 4.4 Phone topology — frame width below 600px

Keep the hub centered at the top. Stack all six cards in DOM order to its right of a small reserved **left-side spine gutter**. Every card has a short horizontal connection from that spine into its left flat edge. After the sixth card, the spine turns toward the first feature-frame target below.

- Hub 144px. A route exits its bottom, turns left in a reserved 40px gap below the hub, and enters the side spine.
- Spine x=12px relative to the diagram frame; cards start at x=48px. The 36px card-to-spine gap accommodates a compact flare without compressing text.
- Card width `W - 48px`, minimum height 224px, vertical gap 24px; 20px interior padding. Cards grow for content and fallback fonts.
- New diagram-specific section padding may reduce to 16px per side at viewport widths at or below 560px. Scope that rule to the overview only; do not alter `.lp-panel` or the story section globally.
- At a 320px viewport, the expected frame is about 268px and cards about 220px wide. Titles may occupy three lines; neither title nor Planned badge is clamped or clipped.
- Use compact 16px flare depth and 14px half-width. Entire flare sits on the card's straight left edge.
- After the last card, reserve at least 48px for the spine to turn toward the feature target; avoid the caption. Do not draw through card interiors or across the section heading.
- No horizontal scrolling, carousel, drag behavior, hidden cards, pinch-to-read diagram or desktop SVG scaled down to phone size.

### 4.5 One source of truth for layout mode

Set a named inline-size container on a width-owning frame outside the diagram stage. Named queries style the stage and set `--portfolio-layout: desktop|tablet|phone` on it at the 1000/600 thresholds. Read that custom property's computed value with `getComputedStyle(stage).getPropertyValue('--portfolio-layout').trim()` during measurement and dispatch the matching geometry generator. CSS and JavaScript must not separately guess mode from window width.

Observe both frame and stage. Size containment is inline-only, so content still determines height. Do not add paint containment or a transform to solve layering. If container queries are unsupported, default to the phone topology and matching custom property; do not guess a desktop mode in JS.

## 5. Connector engineering contract

### 5.1 Ownership and coordinate space

One SVG overlay belongs to `FeatureFlow` and spans the dark overview plus existing feature stories. It contains the six-card connections and the complete hub-to-first-frame route. This is the one owner of the new connector geometry. It is not a generalized rewrite of all page connectors.

Measure these actual elements with refs:

1. Outer `FeatureFlow` SVG host.
2. Width-owning diagram frame and stage.
3. Hub border box.
4. All six card outer surface boxes.
5. Overview bottom / exit corridor reference and figure caption.
6. Stories section border box and computed padding, intro/text obstacle boxes, corner-overlay extent, and feature-track top.
7. Existing first `.lp-pattern-frame` border box.

The SVG's `viewBox` width/height equal the current host's CSS-pixel dimensions. Set explicit full-size width/height, no letterboxing, and use an exact matching viewBox (or `preserveAspectRatio="none"` when required). Never reuse the reference 1200x832 viewBox against independently reflowing HTML.

Use host-local CSS-pixel coordinates. With raw host rect `h`, source viewport point `p`, DPR `d`, the single shared conversion is:

```text
snap(v) = round(v*d)/d
localX = snap(viewportX) - h.left
localY = snap(viewportY) - h.top
```

Snap shared viewport edges/anchors once, then subtract the **raw host origin** for drawing. For a measured box, snap left/top/right/bottom and derive its width/height from those edges. Derive and snap each port once from that box, then reuse the same port object for route and flare. Do not independently round a width, a center and its flare. Do not round coordinates to integer CSS pixels or apply an extra `translate(-50%)` correction. Partial-DPR anti-aliasing is expected; geometric gaps are not.

Host/stage/cards must not be scaled or translated by animation while this formula is used. No scroll handler is needed for ordinary page scrolling: subtracting two viewport-relative measurements cancels page scroll. Revisit coordinate mapping if a future implementation introduces transforms or nested scrolling.

### 5.2 Shape and join rules

Use original **filled ribbon outlines**, not separately positioned CSS lines and decorative triangles.

- Main neck thickness: 2 CSS px at all viewport sizes.
- Desktop flare depth: 28px; half-width along the attachment edge: 18px. Exception: hub-side endpoints below H=184 use the constrained compact policy in section 4.2. Each endpoint carries its own flare parameters.
- Compact flare depth: 16px; half-width: 14px.
- Surface penetration: 1 CSS px into the actual filled edge at card, hub and pattern-frame attachment.
- Orthogonal bend centerline radius: start at 20px desktop, 12px compact. Clamp radius to available adjacent segment lengths; validate the minimum before constructing the path.
- Use smooth cubic flare sides tangent to the flat edge and tangent to the narrow route. Flare bases are curved merges, not spikes, detached triangles, semicircle decorations or square shoulders.
- Build each branch as one closed path containing both endpoint flares and the intervening ribbon. Route endpoints and flares come from the same immutable measured snapshot.
- Tablet/phone shared-spine junctions can be one compound filled network. If subpaths are used, overlap junctions by 1px in the same fill, without two coincident antialiased edges. Never join two independently positioned elements edge-to-edge.
- Parameterize the filled outline from its centerline: parallel sides offset by half the neck width; internal/external bend radii `r-halfWidth` / `r+halfWidth`; explicit endpoint flares join these sides. Validate before constructing arcs/curves. No external path-union package is needed.
- All decorative paths are `aria-hidden`, nonfocusable and `pointer-events:none`. No masks or clip paths are needed to repair detached joins.

Desktop middle branches are straight. Upper/lower routes bend through their gutter midpoint and end at their own hub port. Upper and lower routes occupy separate y ranges; they never converge on an unmeasured common point.

### 5.3 Attachment footprint validation

For a port on a straight card/hub edge, require:

```text
distance from port center to either rounded corner's tangent >= flareHalfWidth + 4px
```

Use actual corner radius and element dimensions. This is a complete footprint check, not just a center-point check. An attachment on a notch/curve is invalid even if its center touches a surface. If a future content/layout change violates clearance, move the port inward or use the compact flare parameters; do not conceal it with a random patch rectangle.

For every route, validate finite coordinates, positive box sizes, minimum neck/flare runway, non-self-intersecting ribbon, no unconnected end, and no intersections with inflated text/card obstacles except its declared terminal surfaces. Straight routes, near-zero horizontal displacement, and reversed target positions need explicit branches rather than degenerate curves.

### 5.4 Outgoing route into the next section

This replaces the existing dashboard-to-pattern path completely. **The downstream story layout changes independently at viewport 900px.** At and below that width, its intro is above the first frame. An incoming central stem would cross the heading/body; the compact bypass below is mandatory, regardless of diagram mode.

Common rules:

1. Start from the **hub bottom center**, with an integrated filled flare penetrating 1px into the hub.
2. Desktop diagram: descend through the center gutter below the last row. Tablet: continue the central spine. Phone: continue the left spine. Never turn across the card stage before the last card bottom plus 32px.
3. Reserve a dark-side exit corridor of at least 96px below desktop/tablet stages, 64px phone. Caption sits above or to one side of this corridor and is included in obstacle checks. Never center caption text over the route.
4. Measure the actual stories section, its computed padding, intro/content boxes, corner overlays, feature-track top and first pattern-frame top center. This snapshot decides whether the destination is beside or below the intro. Expose the existing story breakpoint as a scoped CSS custom property (`--portfolio-story-layout:split|stacked`) if needed; do not infer it from diagram mode.
5. Terminal flare merges into the **outer border** of the first frame, not its clipped artwork. Its complete footprint must fit the flat top edge. Use compact half-width/depth on small frames.
6. Keep the exact same `#d5dfd2` fill across the dark-to-paper boundary and into the matching pattern border. One overlay owns the whole path; no color-switch seam or second segment at the section boundary.

**Split stories layout, above viewport 900px:** the intro is on the left. Keep the stem in the open central region and turn toward the first frame in the empty band above it. Prefer turn y=`target.top - 60px`, constrained below the last card and away from the measured intro. The last vertical segment must fit the terminal flare plus bend radius and 8px safety. Near-zero horizontal displacement uses a straight route rather than a degenerate elbow.

**Stacked stories layout, viewport 900px and below:** route around the intro using the existing paper section's right padding, without narrowing or moving the intro text or pattern/copy columns:

- Add a scoped class such as `.lp-stories--portfolio-entry` to the existing stories section. Its top padding is at least `calc(clamp(40px, 5.5vw, 80px) + 48px)` in this mode. This creates a route band below the shaped corner footprint and above the intro. Do not change the cutout shapes/colors.
- Choose a right escape lane at `stories.right - paddingRight/2`. Require at least neckHalfWidth+4px clearance from both the intro's right edge and the section's outer edge. Existing 22px minimum padding gives an 11px half-padding lane; verify computed values rather than assuming them.
- Continue incoming spine through the section boundary at a central/flat-edge x. If the phone's left spine would enter a corner notch, first move it inward **inside the dark-side exit corridor**. Boundary crossing x must lie outside both corner footprints plus 8px clearance; choose the measured section center when needed. Use rounded elbows with validated runway, or a gentle small-displacement curve when a tiny x adjustment cannot fit two elbows.
- In the upper paper band, turn from that entry x toward the right lane. Set horizontal turn y between `stories.top + cornerExtent + 8px + bendRadius` and `intro.top - 8px - bendRadius`; choose the midpoint of the valid interval. The scoped top padding above is sized to make that interval nonempty for a 12px compact bend. Validate the whole bend envelope, not just this centerline.
- Descend in the right padding lane alongside the intro. No line crosses its heading/body rectangle.
- Reserve at least **72px total clear vertical gap** between intro bottom and first frame top. Use narrowly scoped grid-row gap and feature-track margin rules whose sum provides this band, for example 32px row gap plus 40px track top margin. Override the older 25px/30px values only under the scoped stacked-story class. Keep the three feature rows and their phone columns/links otherwise unchanged.
- Return horizontally toward the target in that lower band: turn y=`intro.bottom + 24px`, with 12px bends. With a 72px gap, the final 48px vertical leg fits a 16px flare, 12px bend and safety clearance. If actual frame alignment/flare parameters need more room, grow this explicit gap before rendering; do not draw through text. The return crosses above both frame and first feature-copy text, never through either.
- Attach to the actual first frame top center. Validate caption, intro, first feature-copy heading, corners and frame as obstacles. The source `FeatureStories` spacing is part of this bounded change because continuous safe routing requires it.

No diagram stem ends at the section boundary. No old dashboard stub, `.lp-overview-thread`, `.lp-feature-entrance` or `.lp-stories::before` route is resurrected. Retain existing pattern-to-pattern links; this plan does not rebuild those.

### 5.5 Layout lifecycle and invalidation

Copy the lifecycle pattern from `Landing.tsx:78–97`, with these explicit extensions:

- First valid measurement in `useLayoutEffect`, after cards and target refs are attached.
- Read all DOM boxes and computed layout mode in one read pass. Build geometry purely from that snapshot; publish one route state update if it materially changed.
- Coalesce resize/font/resolution invalidations to one rAF; do not run an animation loop.
- Observe host, frame, stage, hub, all card surfaces, overview, caption, stories section, intro, feature track and first feature frame. Width changes, row-height changes, content growth and the downstream section moving must invalidate geometry.
- Observe relevant overview heading/caption layout boxes as needed for position-only changes not represented by a card size change. Remeasure explicitly after a React content/topology change.
- Remeasure on window resize, `document.fonts.ready`, and font `loadingdone` where available. Remove the font listener in cleanup and guard the ready promise with a live flag.
- Watch `(resolution: ${dpr}dppx)` with `matchMedia`; on change update DPR, re-arm the listener and schedule measurement. Clean up the previous media listener.
- Cleanup disconnects observer, removes window/font/media listeners and cancels pending rAF. StrictMode remount cannot leave a second observer or late state update.
- SVG remains absolutely positioned and cannot affect measured layout. No callback writes to the size of observed cards or parent, preventing ResizeObserver loops.
- No overlay until the snapshot is valid. HTML cards remain visible when geometry is unavailable. Add a development diagnostic with route ID/reason for invalid geometry; do not silently render NaN paths or hide broken routes and call the task complete.

### 5.6 Layers and clipping

Use one explicit stacking scheme within an isolated outer `FeatureFlow`:

1. Panel backgrounds and existing cutouts.
2. HTML card/hub surfaces and artwork, laid out normally.
3. Global decorative SVG above those surfaces, using only the reserved gutters and 1px terminal penetration. Starting overlay z-index can remain 5.

The overlay must remain above panel backgrounds even when container queries create a stacking context inside the diagram. Its routes never cross text; pointer-events remain disabled. An overlay behind a solid section background would disappear, so do not rely on a negative z-index.

Keep overflow visible on the **overlay and its FeatureFlow host**. Keep the overlay outside section and card clipping. Set `display:block` on SVG. Do not introduce `contain:paint`, `clip-path`, rounded clipping, transforms or a new overflow wrapper around the entire route.

Keep both ends and every bend inside the overall host bounds with safe clearance. Merely setting `overflow:visible` does not justify drawing beyond the page edge. Test the actual corner/background colors at the dark-to-paper transition.

## 6. Implementation file map and proposed contracts

These are proposed local modules, not claims that these APIs already exist.

| File | Responsibility |
| --- | --- |
| `src/components/PortfolioDiagram.tsx` | Semantic figure, six cards, central supplied mark, original compact graphics, typed card IDs/metadata and refs. |
| `src/components/portfolio-diagram.css` | Scoped `lp-portfolio-*` / `lp-portfolio-flow-*` classes, palette tokens, named container modes, sizes and local artwork clipping. |
| `src/components/portfolio-diagram-geometry.ts` | Pure box/port conversion, topology routing, filled ribbons, clearance diagnostics; no DOM calls. |
| `src/components/usePortfolioConnections.ts` | DOM measurement, CSS mode read, observers/font/DPR lifecycle and immutable snapshot update. |
| `src/assets/inzu-mark.svg` | Unmodified copy of supplied isolated symbol. |
| `src/components/Landing.tsx` | Remove `Dashboard`; replace overview content with diagram; pass hub/card/frame refs and first feature-frame ref to shared measurement; render new overlay. |
| `src/components/landing.css` | Deliberate removal of now-unused dashboard rules and replacement of old overview-tail/overlay ownership rules. Preserve unrelated cascade. |
| `scripts/check-portfolio-geometry.ts` | Focused assertions for geometry invariants using Node built-ins and installed tsx. |
| `docs/INZU-LANDING-DESIGN-MANUAL.md` | Update component map, overview story, connector lifecycle/modes and actual verification results; correct stale phone-feature note. |

Suggested type boundaries:

```ts
type PortfolioCardId =
  | 'tenants' | 'payments' | 'portfolio'
  | 'connections' | 'import' | 'maintenance';
type PortfolioLayout = 'desktop' | 'tablet' | 'phone';
type Point = { x: number; y: number };
type Box = { left: number; top: number; right: number; bottom: number };
type Port = { point: Point; side: 'left' | 'right' | 'top' | 'bottom' };
// Snapshot includes layout, host size, DPR, stage, hub, cards, overview,
// caption, stories/padding/corners, intro/text obstacles, track and target.
// Geometry output includes filled path(s), attachment metadata and diagnostics.
```

Keep one literal typed card registry for render order, title, body, planned flag and graphic kind. Ref maps use stable IDs; do not derive attachment identity from array index, title text or querySelector traversal. A small component per graphic is acceptable; do not duplicate card shells six times.

The measurement hook can return geometry to `FeatureFlow`, while `PortfolioDiagram` receives the typed refs/registration callbacks. The outer host and target remain owned by `FeatureFlow`. Avoid a second nested overlay or a separate hook for the outgoing stem.

Retain `FeatureStories` as the existing component. Only its ref plumbing, scoped entry-corridor spacing and narrowly necessary terminal-layer styling should change. Keep Landing's imports clean after moving the old hook logic; `RefObject` remains needed for the existing pattern-ref signature unless deliberately refactored.

## 7. Implementation phases and gates

Execute consecutively. Each phase is small enough to diagnose in isolation, but completion requires all phases; the staged gates are not requests for additional user approval.

### Phase 1 — freeze content, asset and integration boundary

**Implement:** Re-read manual sections 7–8 and the current source map; inspect worktree. Copy the exact supplied mark. Establish the typed six-card registry and scoped CSS tokens from sections 3–4. Record graphic example provenance. Snapshot current desktop/phone section if browser tooling is available.

**References:** This plan sections 2–3; frontend `public/brand/inzu-mark.svg`, `src/components/inzu-brand.tsx:11–18`; landing `Landing.tsx:52–102` and `BrandMark.tsx`.

**Verify:** Exactly six stable card IDs; import and connections have Planned labels; correct symbol/aspect ratio; no authenticated APIs or external asset dependency; pre-existing images untouched.

**Guards:** Do not implement import, payment collection, messaging, a new login, a provider-logo fetch or a second landing page. Do not modify the product app.

### Phase 2 — build final HTML and responsive layout

**Implement:** Build `PortfolioDiagram` with the original mini-graphics and all three topologies. Replace `Dashboard` in the overview. Reserve explicit route gutters, caption and exit corridor, including the scoped upper/lower paper-side bands for stacked FeatureStories. Remove old dashboard markup and only its obsolete rules; replace tail captions/spacing deliberately. Container queries drive both layout and exposed CSS mode.

**References:** This plan sections 3–4; manual sections 3–4, 7 and 10; existing `PanelCorners` and paired overview/story colors.

**Verify:** Six cards visible at 320, 390, 768, 1024, 1280 and 1440 viewport widths; text/Planned badges wrap naturally; no truncation, horizontal scrolling or clipped artwork at outer edges. Central mark preserves shape; desktop rows fit minimum widths. Following feature stories keep their current phone layout.

**Guards:** No absolute y-positioning for content cards, transform scale, max-height clip, line-clamp, hidden sixth card or global `.lp-panel` overflow change. Do not make layout dimensions depend on SVG geometry.

### Phase 3 — pure connector geometry and focused checks

**Implement:** Build measured-box/port helpers, desktop six-branch routes, tablet/phone spine networks, single-outline flares and outgoing route. Add a focused verification script using Node `assert`, running via installed `tsx`. Model the reference desktop coordinates and varied/invalid layouts as fixtures.

**References:** This plan section 5; continuous filled bridge at `Landing.tsx:71`; manual section 8. Read the official DOM/DPR documentation in section 2.5 before implementing measurement conversion.

**Verify:** Independent invariants described in section 8.2 pass; no NaN/Infinity, invalid arc or attachment outside a flat surface; short/zero-displacement routes have valid output; deliberate bad layouts yield named diagnostics. Reference six ports agree with the coordinate table. Minimum H=160 uses offsets 42/80/118 with compact hub-side flares; test H=183/184 around the policy change.

**Guards:** No copying minified Rainbrand geometry, path-union dependency, guessed percentage endpoint or separate CSS flare. Tests check endpoints/clearance/collisions rather than snapshotting the exact implementation string.

### Phase 4 — measured overlay and continuous exit

**Implement:** Copy the existing observer/rAF/cleanup lifecycle, extended as section 5.5 specifies. Mount one global overlay on `FeatureFlow`, reanchor to hub bottom, connect into actual first frame border. Remove the previous dashboard route so there is exactly one outgoing connector owner. Keep all topology changes atomic.

**References:** `Landing.tsx:78–99`, `landing.css:300–303`; this plan section 5; React/ResizeObserver/font/DPR references in section 2.5.

**Verify:** Resize slowly across both container thresholds; inspect delayed font load and fallback font, DPR/zoom change, route away/back under StrictMode, and content growth. All paths update with their cards; no old desktop stubs survive. Exit remains continuous across dark/paper and terminates in the actual frame border. Console has no observer-loop warnings or unmount updates.

**Guards:** No second SVG owner, permanent rAF loop, arbitrary 100ms delay, polling measurement, scroll-driven React renders or negative-z overlay behind solid backgrounds.

### Phase 5 — visual verification, documentation and handoff

**Implement:** Run the full checks below, fix observed failures, update the design manual to describe actual rendering and verified limits. Save whole-composition screenshots and close-ups of every changed attachment. Review final diff for bounded scope.

**References:** This plan section 8; manual sections 11–12; the active bottom-of-file mobile feature overrides.

**Verify:** Build, TypeScript and geometry assertions pass. Browser matrix and joint ledger are completed with observed outcomes, including edge cases. Record unavailable browsers/viewports honestly. The remaining page still behaves correctly.

**Guards:** Passing code checks is not visual signoff. Do not deploy/push as part of this request. Do not mark a hidden, off-screen, covered-by-nav or uninspected join as passed.

## 8. Verification specification and acceptance criteria

### 8.1 Commands

From the landing checkout, during implementation:

```powershell
npm run lint
npm run build
node ./node_modules/tsx/dist/cli.mjs scripts/check-portfolio-geometry.ts
```

Use the existing dev/preview scripts for browser QA. A preview serves `dist`; rebuild after source changes and refresh the correct page. Select the actual available port, not a remembered one. Search for obsolete references with `rg`:

```powershell
rg -n 'Dashboard|lp-dashboard|dash-greeting|dash-cards|dash-chart|ILLUSTRATIVE VIEW' src/components
rg -n 'lp-measured-thread|lp-overview-thread|lp-feature-entrance|lp-stories::before' src/components
```

The first search should have no obsolete dashboard component/styling after cleanup. The second is an audit: remove new duplicate owners and obsolete route rules in the touched scope, while checking all occurrences before deleting anything. Do not broadly clean unrelated CSS.

### 8.2 Meaningful geometry assertions

Use actual fixture rectangles and independently calculated expected attachment edges; avoid tests that simply call the same helper to generate both expected and actual results.

- Exactly six declared card attachments; every expected card ID is connected; no accidental seventh card or omitted planned card.
- Correct hub start and first pattern-frame destination for the exit.
- Port-to-surface normal error at most `0.5 / DPR` CSS px from snapping; configured terminal penetration at least 1px. No exposed join is allowed merely because a numeric tolerance passes.
- Entire flare base lies within the flat-edge interval, including 4px corner clearance.
- Branch centerlines and filled envelopes stay in reserved gutters; no crossing of unrelated card or text rectangles, including flare footprints.
- Filled path envelopes fit within the overall host; no unintended page-edge overflow.
- Both sides of every ribbon remain finite with positive thickness; valid bend radii; no self-intersections.
- DPR values 1, 1.25, 1.5, 2 and 3; fractional host origins and card edges; 125% text size; unequal paired card heights; minimum-width stage; target shifting sideways or vertically; vertical-only target alignment.
- Mode boundary fixtures at frame widths 599/600/601 and 999/1000/1001; small-hub flare policy at H=160,183,184; independently split/stacked story layouts around viewport 900px.
- Stacked-story bypass clears the complete intro and first-copy boxes, crosses outside notch footprints, stays inside the right padding lane and fits the measured 72px lower band. Test maximum wrapped intro height and smallest phone padding.
- Invalid fixtures: missing/zero-size target, insufficient gutter/runway, flare landing near a rounded corner, impossible card collision. Each returns a useful diagnostic and does not emit malformed SVG.

Node geometry assertions cannot prove actual glyph sizes, CSS stacking or antialiasing. They complement browser inspection.

### 8.3 Browser matrix

| Dimension | Required coverage |
| --- | --- |
| Representative viewport widths | 320, 375/390, 560, 768, 900, 1024, 1280, 1440 and 1920 CSS px. |
| Existing breakpoint neighbors | 559/560/561, 699/700/701 and 899/900/901 where they can affect adjacent content or header. |
| New actual frame thresholds | Resize until the measured diagram frame is 599/600/601 and 999/1000/1001; viewport widths differ because of shell/panel padding. |
| Browser zoom | 80%, 100%, 125%, 150% and 200% in the primary Chromium browser. At 200%, use the naturally reflowed topology; do not force desktop. |
| Device scaling | Actual available display scale/DPR; include 1 and 2 where browser QA tooling supports emulation. Numeric fixtures cover other DPRs; record actual visual coverage separately. |
| Text/font stress | Delayed/blocked web font, fallback sans-serif, 200% text enlargement, one title/body about 30% longer, status badge wrapping. |
| Lifecycle | Cold load, reload, live resize wide→narrow→wide, route to About and back, below-fold render, orientation change. |
| Accessibility | Reduced motion, keyboard-only navigation, screen-reader reading order, no SVG focus targets, text/badge contrast. |
| Engines | Primary Chromium mandatory. Firefox/WebKit if available; do not claim them tested if unavailable. |

Primary screenshots: whole diagram and its destination at normal scale, then close-ups of each joint. Scroll so the fixed nav does not cover the joint being inspected. Check both outside edges, all bends, dark/paper boundary and terminal border. Inspect at native browser zoom; enlarging a saved screenshot alone is not a browser-zoom test.

On narrow screens the figure becomes tall. That is acceptable. Missing content, microscopic text, internal scroll areas or horizontal page overflow are not.

### 8.4 Joint ledger

Record `pass / fail / not inspected`, viewport/frame width, zoom/DPR and screenshot reference for:

| Joint group | What must be inspected |
| --- | --- |
| Six card entries | Every card's flare base, straight-edge clearance and 1px penetration. |
| Six desktop hub entries | Correct side-port position, smooth neck and corner clearance. |
| Compact network entries | Every tablet T-junction / phone spine branch; no orphaned desktop port. |
| Hub bottom | Filled flare begins at actual visible bottom, not the old dashboard anchor. |
| Exit bends | Last-card/caption clearance, corner-safe boundary crossing, compact right-lane bypass, intro clearance, lower-band return, consistent width and smooth turns. |
| Dark-to-paper transition | One continuous route, correct backing surfaces, no strip/sliver/color seam. |
| First feature-frame arrival | Centered on actual outer border; flare fully contained on flat top edge. |
| Outer shaped corners | Both overview corners and adjoining story edge; no clipping caused by new wrappers/layers. |

Visual acceptance is **zero visible gaps, clipped curves, stray stubs, double edges, abrupt color switches, misaligned necks or rectangular protrusions** at the inspected conditions. A geometric tolerance does not waive visible defects. Consistent edge antialiasing under fractional scaling is not itself a gap; inspect the underlying shared anchor and surface overlap before applying a fix.

### 8.5 Accessibility, behavior and regression

- Keep `#features`, existing h2 and logical h3 card titles. Use one semantic figure with a caption and six articles/list items; no repeated screen-reader descriptions of mini-graphics.
- Planned status is text, not color alone. No tiny low-contrast all-caps numbered decoration.
- Decorative SVG is hidden from accessibility and noninteractive. Central Inzu identity is announced once. No information requires motion, hover or reading an image.
- Start with static graphics. Do not animate card positions or connector draw-in. Existing unrelated page motion continues to honor reduced motion.
- Verify no unexpected horizontal overflow (`scrollWidth` versus viewport), clipped headings, fixed heights hiding text or hit-blocking overlays.
- Existing skip link, header at scroll threshold 80px, mobile menu/Escape, footer links, request-access and sign-in destinations still work. No real form submission or outbound message is needed for visual QA.
- Smoke-check About and legal/access routes for style leakage. Existing unrelated unresolved legal/pricing issues are outside this section.
- No new runtime dependency, provider request, authentication requirement or production data access. Only the local supplied mark is added as an asset.

## 9. Failure handling and decision rules

| Observed issue | Correct response |
| --- | --- |
| Thin gap at surface | Inspect raw rect, snapped port, shared fill and 1px overlap. Fix shared geometry; do not add a detached patch shape. |
| Flare clipped although SVG overflow is visible | Inspect every ancestor and owning section. Move cross-section overlay to outer host; keep artwork clipping local. |
| Hub port too near curve | Enforce flat-edge clearance; move port inward or use compact flare. Do not change only its centerline. |
| Layout too tight | Change topology at available-width threshold or increase reserved gap/row height. Do not shrink body text or scale the whole diagram. |
| Route crosses caption/card | Increase the explicit corridor or alter topology/routing; measure obstacles. Do not hide the caption or erase the crossing with background paint. |
| Font/zoom leaves stale route | Confirm font/resolution observers and actual mode read, then remeasure. Do not schedule arbitrary timeout retries. |
| Old mobile rule wins | Search all selector occurrences and the computed cascade. Fix the scoped ownership/import order rather than adding repeated global overrides. |
| Snapshot invalid while mounting | Keep HTML visible, withhold malformed geometry, remeasure on the next legitimate layout invalidation. Completion still requires valid geometry. |
| Browser tooling unavailable | Finish source/pure checks, record the specific visual checks as unverified and restore browser QA before visual signoff. Do not equate tests with inspection. |

No user decision is required to start implementation using this proposal. Defaults are explicit: supplied mark, maintenance as card six, honest Planned labels, text-only provider chips, static graphics, responsive measured routing and continuation into the existing first feature frame. If stronger availability claims are later requested, verify the relevant deployed product first; do not block this diagram on integration work.

## 10. Final handoff contract

Implementation is complete when all six cards, exact supplied hub mark, all responsive connector topologies and continuous downstream connection are present; the old illustrative dashboard and duplicate route are gone; code and geometry checks pass; visual acceptance and regressions have been inspected; and the manual reflects the implemented system and actual verification coverage.

Handoff should include changed files, screenshots of desktop/tablet/phone, joint-ledger results, command results and any precise unverified condition. Preserve the three existing hero images. No deployment or push is part of this planning request.

To resume in a fresh implementation conversation: read this plan and the design manual, recheck the current source/worktree, then execute phases 1–5 in order. Product and reference evidence are recorded above; the plan does not depend on remembering this chat.
