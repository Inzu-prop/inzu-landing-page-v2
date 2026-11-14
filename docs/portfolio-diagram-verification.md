# Portfolio diagram verification

Date: 14 November 2026 (Africa/Nairobi)

Status: Implemented locally; automated checks passed; **browser visual signoff pending**.

Local development preview: [http://127.0.0.1:3000/](http://127.0.0.1:3000/). The server was alive and returned HTTP 200 at the final automated handoff.

Screenshots of the new implementation: **none**.

## Scope and source review

The old illustrative dashboard under **Your portfolio. In perspective.** is replaced by six HTML cards, a supplied central Inzu mark and one measured connector overlay that continues into the first feature frame below.

Implemented files:

- `src/components/PortfolioDiagram.tsx`: semantic figure, six static mini-graphics, stable card refs, exact supplied mark and accessible channel-name equivalent.
- `src/components/portfolio-diagram-content.ts`: typed six-card order/copy/status registry and caption.
- `src/components/portfolio-diagram.css`: scoped styling, named container modes, shared surface fill, global SVG layer and explicit exit corridors.
- `src/components/portfolio-diagram-geometry.ts`: pure raw-viewport snapshot conversion, DPR snapping, filled-ribbon construction, routing and validation.
- `src/components/usePortfolioConnections.ts`: DOM measurement, observers, font/resolution invalidation, atomic state updates and lifecycle cleanup.
- `src/components/Landing.tsx`: diagram integration, complete visible-anchor refs and one global SVG outside both clipped panels.
- `src/components/landing.css`: obsolete dashboard/duplicate overview route rules removed, with unrelated CSS retained.
- `src/assets/inzu-mark.svg`: byte-identical copy of the supplied frontend `public/brand/inzu-mark.svg`; SHA-256 equality was checked in phase 1.
- `scripts/check-portfolio-geometry.ts`: focused geometry assertions using Node built-ins and the already installed `tsx` runner.

No dependencies were added. Package manifests/lockfile were not changed. No backend/product-app code, authenticated APIs, real tenant records, payment requests or messaging services were used. The existing heading, routes, CTA destinations, feature stories and other sections remain in scope only for anchor plumbing and the necessary entry spacing. Pre-existing untracked hero images remain untouched. No commit, push or deployment was performed.

Import and channel connectivity have visible **Planned** labels. The payment card describes recorded payments. The source does not claim active bank feeds, working M-Pesa collection or automatic reconciliation.

## Automated command results

The owning agent ran the final checks against the integrated source. This documentation pass changed no application source afterward.

| Check | Result | Meaning / limitation |
| --- | --- | --- |
| `npm run lint` | PASS | Repository TypeScript check, `tsc --noEmit`. |
| `npm run build` | PASS | Production Vite build; 1,723 modules transformed; main bundle 141.84 KB gzip. No runtime browser inspection implied. |
| `node ./node_modules/tsx/dist/cli.mjs scripts/check-portfolio-geometry.ts` | PASS, 71 cases | Pure geometry and attachment invariants against independent synthetic rectangle fixtures. |
| `git diff --check` | PASS | No patch whitespace errors. |
| Source search for old dashboard/route selectors | PASS | No obsolete `.lp-dashboard`, `.dash-*`, `.lp-overview-tail`, `.lp-overview-foot`, `.lp-overview-thread`, `.lp-feature-entrance`, `.lp-measured-thread` or `.lp-stories::before` ownership remains in the touched stylesheet. |
| GET `http://127.0.0.1:3000/` | HTTP 200 | Vite is serving HTML. Does not prove JavaScript execution, fonts, CSS layout or connector readiness. |

The environment blocked an initial TypeScript-runner/compiler subprocess with sandbox `spawn EPERM`; required execution was handled through the approved escalated path. This is distinct from the browser verification blocker below.

## What the 71 geometry cases cover

The fixtures create raw viewport rectangles without using the geometry helper to place the elements. They are not browser screenshots or CSS-layout tests.

| Cases | Coverage |
| ---: | --- |
| 40 | Eight mode/width combinations at DPR 1, 1.25, 1.5, 2 and 3: phone 268/599px; tablet 600/601/999px; desktop 1000/1001/1200px. |
| 4 | Hub heights 160/183/184/192px, compact-versus-desktop side-flare policy, and the constrained 42/42/118px left-side ports at H=160, with shared ports for branching. |
| 3 | Phone/tablet/desktop text-growth rectangle stress: larger unequal card rows, taller caption and fractional DPR. This simulates text-driven geometry growth; it does not inspect actual fonts. |
| 2 | Story layout selected independently of diagram mode: tablet with split stories, desktop with stacked stories. |
| 2 | DPR-grid-aligned origin translation/page-scroll fixtures produce identical host-local paths. No actual browser scrolling was tested. |
| 1 | Fractional/negative viewport box and point conversion, snapping edges once and subtracting the raw host origin. |
| 3 | Straight ribbon, tiny lateral displacement and reversed-axis primitive routes. |
| 1 | Too-short flare runway throws rather than emitting an invalid primitive. |
| 1 | Filled-neck width is 2px and symmetric around sampled circular turns. |
| 14 | Invalid inputs are diagnosed and emit zero paths: zero target, missing card, nonfinite coordinate, unknown mode, impossible notch crossing, upper/lower entry bands too short, insufficient right escape lane, caption consuming the dark corridor, tiny hub flare footprint, neighboring hub-port overlap, wrong-facing attachment, card in the exit and text in a branch. |
| **71** | Total. |

For every valid network, assertions require all six card IDs plus the exit, six card attachments, hub and target exit attachments, expected snapped edges, 1px terminal penetration, complete flat-edge flare clearance, finite closed path outlines and host-contained envelopes. Runtime geometry also validates self-intersections, card/hub/text collisions and desktop branch crossings before declaring the network valid.

These checks do not establish actual card text wrapping, computed style/layering, browser SVG rendering, endpoint antialiasing, clipping or accessible reading behavior. The browser gate remains open.

## Browser blocker and inspected coverage

The browser connector host was unavailable. Native Windows browser control attempts were then **stopped by CUA because the current browser URL could not be verified confidently**. No further GUI/browser actions were allowed in that turn.

Consequently:

- No newly implemented portfolio card or connector was visually inspected.
- No actual responsive transition, zoom, delayed-font, reduced-motion or keyboard test was completed.
- No new screenshot, seam close-up or visual comparison was saved.
- No browser engine, viewport, DPR or joint below has visual signoff.

## Visual joint ledger

All visual entries are **NOT INSPECTED**. Synthetic geometry passes do not change these statuses.

| Joint / surface | Modes to inspect | Visual status | Screenshot |
| --- | --- | --- | --- |
| Tenant-card attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Payment-card attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Portfolio-card attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Planned-connections attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Planned-import attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Maintenance-card attachment and complete flare footprint | Desktop/tablet/phone | NOT INSPECTED | None |
| Six independent desktop hub-side entries | Desktop, including small hub | NOT INSPECTED | None |
| Central T-junctions | Tablet | NOT INSPECTED | None |
| Left-spine branch junctions and upper hub turn | Phone | NOT INSPECTED | None |
| Actual supplied mark proportions and hub/card surfaces | Desktop/tablet/phone | NOT INSPECTED | None |
| Hub-bottom flare and outgoing spine | Desktop/tablet/phone | NOT INSPECTED | None |
| Caption clearance and inward lower-corner-safe turn | Desktop/tablet/phone | NOT INSPECTED | None |
| Overview outer corners and backing colors | Desktop/tablet/phone | NOT INSPECTED | None |
| Continuous dark-to-paper boundary crossing | Split/stacked stories | NOT INSPECTED | None |
| Upper paper turn, right-padding bypass and intro clearance | Stacked stories | NOT INSPECTED | None |
| Lower return above the first frame/copy | Stacked stories | NOT INSPECTED | None |
| First pattern-frame top-border arrival | Desktop/tablet/phone | NOT INSPECTED | None |
| Surrounding pattern links, footer, header and other routes | Existing responsive modes | NOT INSPECTED | None |

## Resume browser verification

First restore a supported, confidently identified browser-control surface in a fresh verification turn. Reuse the Vite server if still running; otherwise start the existing `npm run dev` script. Confirm the actual URL and reload the latest source. Do not continue from an old production-build preview or assume HTTP 200 means the figure has rendered correctly.

1. Inspect `.lp-portfolio-flow` for `data-portfolio-connections="ready"` and absent/empty `data-portfolio-errors`. Its one `.lp-portfolio-connections` SVG should contain seven route IDs: tenants, payments, portfolio, connections, import, maintenance and exit. `pending` means no complete measurement yet; `invalid` means inspect the route/code metadata and development console before accepting any visual result.
2. Read actual computed `--portfolio-layout` on `.lp-portfolio-stage` and `--portfolio-story-layout` on `.lp-stories--portfolio-entry`. Frame width thresholds are 600/1000px; stories independently reflow at viewport 900px. A ready state is only the geometry gate; perform visual inspection as well.
3. Inspect the whole composition, then both ends and every bend of each route at normal scale and close up. Scroll joints clear of the fixed nav. Check zero visible gaps, clipped curves, stubs, protrusions, double edges or color-switch seams. Inspect the complete flare width on a straight surface, not only its center.
4. Resize wide to narrow and back without reload. Include viewport widths 320, 375/390, 560, 768, 900, 1024, 1280, 1440 and 1920; existing breakpoint neighbors 559/560/561, 699/700/701 and 899/900/901; and actual frame widths 599/600/601 and 999/1000/1001.
5. Check browser zoom 80%, 100%, 125%, 150% and 200%, available display scaling/DPR, delayed/blocked web font, fallback font, text enlargement, longer copy and wrapping Planned badges. Inspect the 160px-hub side ports and the phone exit's 128px bottom corridor carefully.
6. Verify route-away/back and StrictMode lifecycle, cold load, live font changes and orientation resize. Watch for observer-loop warnings, late-unmount updates or stale route positions. Confirm `ready` stays valid after each layout settles.
7. Check six logical card headings, visible Planned status, accessible provider names, a single announced central identity, hidden/nonfocusable decorative SVG, keyboard navigation, reduced motion, no horizontal overflow and no clipping of actual text.
8. Smoke-check the header's 80px compression threshold, mobile menu/Escape, skip link, CTA/sign-in destinations, About/legal/access routes and unchanged phone feature columns/visible pattern links. No real form submission, invitation, message or payment is needed.
9. Save desktop/tablet/phone whole-composition screenshots and close-ups of every changed joint. Record actual viewport/frame size, zoom/DPR, engine, result and screenshot against the ledger. Check Firefox/WebKit if available, and leave unavailable engines unverified.

The design manual and [implementation plan](plans/2026-11-14-portfolio-perspective-diagram.md) remain the geometry/content references. Mark visual acceptance complete only after these observed checks pass; no deployment is implied by this local verification work.
