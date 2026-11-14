# Inzu landing page design manual

**Scope:** The public landing page and its About page in this repository.  
**Status:** Working design manual, updated for the six-card portfolio diagram on 14 November 2026. Its source and automated checks are verified; browser visual signoff is pending. See [portfolio verification](portfolio-diagram-verification.md). Update this manual whenever the visual system or implementation changes.

**Source of truth:** The running page and the files listed below. This manual records both intentional direction and implementation limitations; it is not a claim that every connector has been verified at every viewport.

## 1. Design direction

Inzu should make property management feel understandable and considered. The page is spacious, centered within a muted outer canvas, and built from light and dark surfaces that appear to flow into one another. Visual interest comes from the relationship between sections: stepped silhouettes, fine connecting paths, rounded flares, graphic patterns, and restrained motion.

Rainbrand was a reference for the surrounding canvas, generous space, floating navigation, asymmetrical panels and fluid connectors. It is inspiration, not a template to duplicate: use Inzu's logo, palette, product story and original graphics. In particular, the About page should have its own composition rather than repeating the homepage's vertical pattern track.

The user has repeatedly emphasized that details matter. A line ending a few pixels from a flare, a cropped corner, or a visible sliver of the underlying surface is a defect, even if the page builds successfully. Do not declare a joint fixed on the basis of code or a screenshot taken at a different breakpoint.

## 2. File map and development

| File | Responsibility |
| --- | --- |
| `src/components/Landing.tsx` | Home composition, `Header`, shared `PanelCorners`, measured portfolio/feature anchors and global connector SVG, pattern track, closing thread and footer shape. |
| `src/components/PortfolioDiagram.tsx` | Semantic six-card figure, original static mini-graphics, supplied central mark and stable card anchor refs. |
| `src/components/portfolio-diagram-content.ts` | Typed card IDs/order, approved copy, planned status and channel labels. |
| `src/components/portfolio-diagram.css` | Scoped portfolio palette/layout, container-query modes, shared SVG layer and exit corridors. Imported after `landing.css`. |
| `src/components/portfolio-diagram-geometry.ts` | Pure raw-viewport-to-host conversion, DPR snapping, filled ribbons, routing, attachments and invalid-geometry diagnostics. |
| `src/components/usePortfolioConnections.ts` | Atomic DOM snapshot, resize/font/DPR lifecycle, shared-geometry state and cleanup. |
| `scripts/check-portfolio-geometry.ts` | 76 focused layout/DPR/attachment/stress/invalid-state checks, including FAQ entrance routes. |
| `src/assets/inzu-mark.svg` | Unmodified supplied isolated two-inverted-i mark, copied from the frontend app's `public/brand/inzu-mark.svg`. |
| `src/components/AboutPage.tsx` | About composition, irregular intro surface, fixed SVG paths, value cards and their bridges. |
| `src/components/LegalPage.tsx` and `src/components/legal.css` | Shared landing-style layout for the existing Terms and Privacy text, with an on-page contents list. |
| `src/components/landing.css` | Landing-specific colors, layout, components, breakpoints, masks, layers and animation rules. |
| `src/components/Aurora.tsx` | Procedural WebGL gradient for the home closing panel and About cards. |
| `src/components/BrandMark.tsx` | Shared linked wordmark for the navigation and footer. |
| `src/assets/inzu-wordmark-canva.svg` | Dark Inzu wordmark used by the page. It is a tightly framed derivative of the supplied Canva asset. |
| `src/assets/new inzu logo darker.svg` and `src/assets/new logo inzu.svg` | Original supplied darker and light Canva exports; preserve them when changing the derived asset. |
| `src/index.css` | Global type imports and body defaults. |
| `public/images/inzu-architecture.webp` | Property image used later in the homepage story. |

The site is React + TypeScript + Vite. It uses React Router, Lucide icons and `tabbied` for generated patterns. `npm run dev` starts Vite (configured for port 3000); `npm run build` produces the production build; `npm run preview` serves a build. The current local development preview is `http://127.0.0.1:3000/`; an HTTP 200 was verified on 14 November, but browser rendering was not inspected. Ports can vary. `npm run lint` runs `tsc --noEmit`; `node ./node_modules/tsx/dist/cli.mjs scripts/check-portfolio-geometry.ts` runs the focused geometry checks with the already installed runner.

**CSS caveat:** `landing.css` has accumulated successive overrides, superseded rules and some selectors for earlier designs. Search all occurrences and inspect the computed style and cascade before editing. An early value is not necessarily active. Remove obsolete rules only as a deliberate, separately verified cleanup. Do not assume a code comment describes the current rendering; for example, the closing panel now uses a WebGL canvas, despite older CSS-gradient comments.

## 3. Canvas, spacing and color

The page sits inside a muted gray-green outer field, with visible breathing room around its centered panels. The standard landing shell `.lp` defines these values:

| Role | Current value | Notes |
| --- | --- | --- |
| Main ink | `#213a2a` | Headings, body emphasis and dark logo lettering. |
| Paper | `#f8f9f4` | Light section surfaces and many connector fills. |
| Outer canvas | `#d9ded5` | Space around and between panels; also the fill for cutouts exposed against this background. |
| Moss token | `#a7bd9e` | Supporting green. |
| Primary button / logo detail | `#90b494` | Sage green; the logo's light-green parts use this. |
| Dark overview | `#294c34` | Portfolio section and some pattern colors. |
| Pattern frame / path | `#d5dfd2` | Border and connectors in the feature sequence. |
| Coral accent | `#ff704a` | High-contrast accent in patterns; the shader has its own palette values. |

The `.lp` shell normally uses 20px top padding, fluid side padding `clamp(14px, 3vw, 48px)`, and 28px bottom padding. At 560px and below, the shell uses 10px padding. Primary panels are capped at 1440px and centered. Use generous section padding and deliberate empty space, but keep the hero's message high enough that it does not look stranded beneath the navigation. Use `clamp()` and grid rather than hard-coded desktop widths for content.

Color roles are contextual, not interchangeable. A corner SVG represents the *surface behind* the panel, while a fluid connector usually takes the color of the panel or card it is joining. Verify the actual adjacent backgrounds before setting a fill. The About hero and homepage hero have rounded top corners; later shaped sections use notched edges.

## 4. Typography and writing

The landing shell uses **Be Vietnam Pro**, falling back to sans-serif. It is imported in `src/index.css`. Headings use the same family with tight tracking; `em` inside landing `h1` and `h2` is explicitly normalized to the inherited family, weight and non-italic style. Some older font imports and obsolete serif rules remain in the repository, but they are not a direction to introduce contrasting italic or serif words into headings.

Use large, legible headings with short supporting copy and a clear information hierarchy. The user dislikes decorative all-caps numbered eyebrows such as `THE INZU PLATFORM / 01`, `WHAT GUIDES US / 03`, and `LET'S TALK / 03`; these were deliberately removed from the relevant sections. Do not add them back as default decoration. Functional labels that have a clear purpose, such as the existing small manifesto pill, are different and should not be removed without a reason.

Describe concrete property-management work: seeing portfolio records, keeping track of rent and payments, and making the landlord-tenant relationship easier to manage. Keep claims aligned with real or explicitly planned product capabilities. Do not add invented statistics, customer claims or implementation details, and do not mention the messaging channel merely to explain how payments work. The old illustrative dashboard and its example metrics have been removed. The six-card figure labels its graphics illustrative; portfolio import and channel connectivity have visible **Planned** labels. The channel names also have a screen-reader equivalent outside the hidden decorative artwork. Do not imply that the planned import, live bank feeds, disabled M-Pesa processing or automatic reconciliation are active services.

## 5. Wordmark and navigation

Use the supplied Inzu artwork, not text typed to approximate the logo. `BrandMark` uses the derived dark SVG for the light navigation and footer. The original Canva export has an 800 x 500 outer canvas, while the derived viewBox is tightened around its artwork. The visible wordmark is sized through `.lp .lp-brand img` at 64 x 40px with `object-fit: contain`; keep the artwork's aspect ratio intact. SVG is resolution-independent, but extra viewBox padding or distorted proportions can still make it appear too small, too large or wrong. Check the actual visible artwork, not just the image element's box.

The portfolio hub uses the supplied isolated mark (`inzu-mark.svg`), not the navigation wordmark. Preserve its `viewBox="560 240 380 1020"` and `preserveAspectRatio="xMidYMid meet"`. The SVG declares a square intrinsic element size; use a square image box with `object-fit:contain` (112px maximum desktop, 96px tablet/small desktop, 88px phone). The artwork itself remains tall and narrow. Do not stretch it or apply a tall CSS image box that can double-letterbox it.

`Header` is shared between Home and About. On desktop it contains the logo, Pricing, About and Sign in. The user removed Request access, How it works and The platform from the navigation; access calls to action remain in the page content and the latter links remain in the footer. At 900px and below the desktop links/actions are hidden in favor of a menu with equivalent remaining destinations; it exposes `aria-expanded`, `aria-controls`, and closes on Escape.

The navigation compacts after `scrollY > 80`. It stays `position: fixed` in both states, with transitions on top, horizontal bounds, max-width, background, radius, shadow and nav height/padding. The compact bar is capped at 800px and the compact nav height is 54px; its expanded nav height is 84px. This shared coordinate system prevents the earlier jump caused by changing positioning modes. Test the threshold by scrolling slowly in both directions, especially near 80px; avoid changing layout or top offsets in ways that cause oscillation or jumps. Respect reduced motion.

The homepage hero has one centered primary action. Its `Get to know` label includes a small version of the wordmark with accessible alt text. There is no separate hero `Explore the platform` action. Other page-level calls to action may use the sliding arrow bubble (`.lp-button`); preserve the existing focus treatment and reduced-motion behavior. Do not give the compact navigation button that animation.

## 6. The page sequence

### Homepage

1. Light animated hero with centered message, supporting sentence and a single call to action. Its white-based mesh fades to paper above the stepped lower edge, which has rounded top corners and stepped cutouts.
2. A thin vertical connection flares out of the hero and into the small `A little more clarity` pill above the manifesto.
3. Dark green portfolio panel with six cards for tenants, recorded payments, portfolio overview, planned channel connections, planned portfolio import and maintenance, joined to the supplied central Inzu mark. The same measured SVG continues into the first patterned frame in the adjoining light feature area. Three feature frames remain beside their descriptions and colored word highlights, followed by a property image.
4. Conversation / access section, then a large dark animated closing stage with a fine line passing through it.
5. A light footer overlapping the closing stage with shaped shoulders and a connection integrated into the top edge.

### About

The light hero leads to `The idea`, then to `A better way to keep track`. A connector leads to a smaller, asymmetric `Clarity in the details` surface. Another path leads to three compact cards, each with a moving mesh and copy about a practical benefit. A centered exit leads toward the `Let's talk` label and final access section. The page ends with a light footer.

The About intro surface is intentionally not a large plain rectangle. Its stepped outline is one SVG background, while its copy remains real HTML. The three cards have green, coral and blue motion. Do not put the old `01 / INZU` overlay pills on the moving art or repeat numbered `WHAT GUIDES US` labels on the cards. The labels were removed at the user's request.

## 7. Stepped surfaces and cutouts

A distinctive panel is made of solid surfaces with smoothly rounded insets and shoulders, not jagged triangles. `PanelCorners` supplies paired decorative SVGs (`viewBox="0 0 80 80"`) placed at a panel's left and right corners; the right is mirrored. A bottom pair is vertically flipped. The SVGs are absolutely positioned and `pointer-events: none`. Their current scale is `clamp(40px, 5.5vw, 80px)`.

Important implementation detail: `PanelCorners` paints the *outside/background* color over the panel. If the panel is dark and the visible adjacent surface is light, the cutout must use the light surface's exact color. If the outside is the gray-green canvas, it must use `--canvas`. The overview and feature sections meet directly: `.lp-overview .lp-corners-bottom svg` uses paper, and `.lp-stories > .lp-corners:not(.lp-corners-bottom) svg` uses the dark overview color. About page corners use canvas; a 2-unit matching stroke is applied there to reduce edge hairlines. Never reuse a corner fill blindly when moving a component.

`.lp-shaped` removes the normal rounded rectangle radius because that rectangle can clip a stepped silhouette or expose a second outline. Explicit exceptions restore the rounded *top* corners of Home and About heroes. `overflow`, border radius, pseudo-elements and SVG clipping must be considered together; an unrelated wrapper with `overflow: hidden` can cut off a flare or leave a visible line at the outside edge. Keep interactive content above decorative layers.

The About intro is a different construction: `.about-intro-shape` is an absolutely positioned filled SVG, stretched over a relatively positioned isolated container. The top is narrower than the lower shoulder. Keep text well within the filled region at every width; if the shape, copy length, font size or width changes, retest text against the notch. SVG `preserveAspectRatio="none"` scales the silhouette non-uniformly, so its apparent curve changes with the container's aspect ratio. It is not a responsive geometry solver.

The closing footer uses `.lp-footer-edge`, a single filled SVG shoulder, overlapping the dark panel via a negative top margin. Its main white surface and its shaped edge need to overlap without a transparent band. At small widths the height and overlap change. Keep the footer connection in the same visual layer as the edge.

## 8. Fluid lines: construction and alignment

The visual goal is a narrow continuous thread that grows smoothly from a surface, travels through the canvas or across panels, and widens into the next surface. Flared ends are curved filled shapes; they are not detached triangles or decorative spikes. Lines should never terminate abruptly in empty space. Keep decorative paths `aria-hidden` and `pointer-events: none` so they do not interfere with interaction or reading order.

### The robust approach: measure actual endpoints

`FeatureFlow` in `Landing.tsx` owns one SVG overlay outside both section panels. `usePortfolioConnections` reads raw viewport border boxes for the host, frame/stage, hub, all six card surfaces, overview/heading/invisible route anchor, actual bottom-corner extent, stories/intro/track, first-copy obstacle and first pattern-frame target. The pure `buildPortfolioGeometry` function alone converts these to host coordinates: snap viewport edges/ports once to the current DPR grid, then subtract the **raw, unsnapped host origin**. Do not normalize in the hook and again in geometry.

Each portfolio card keeps its solid connector-colored outer surface and places existing property photos and a distinct color accent inside the artwork. Four local images are reused with different crops across the six cards; preserve their files when preparing a commit. The artwork reflows above the details on narrow layouts.

The portfolio heading is centered. Cards show only their headings and artwork; explanatory answers appear in the homepage FAQ. The colorful inset artwork has a thinner frame, and the hub uses an original stepped SVG silhouette. Its flat side and bottom attachment areas must stay aligned with the measured hub box; changing the silhouette requires rechecking every flare.

The network uses seven filled paths: six card relationships plus the hub/spine-to-first-frame route. Each desktop branch integrates its card/hub flares into one closed ribbon; compact branches overlap the continuous spine in the same fill. The neck is 2 CSS px; terminal surfaces have 1px penetration. Cards, hub, connectors and pattern borders share `#d5dfd2`, so the path crosses the dark/paper boundary without a color-switch segment. Whole flare footprints are checked against corner tangencies. At hub heights below 184px, side endpoints use compact flares and constrained port offsets; the 160px hub uses offsets 42/42/118px on the left and 42/118/118px on the right, with shared ports creating forks.

The diagram's **available container width**, not viewport width, selects its topology and sets `--portfolio-layout` on the stage:

- At least 1000px: three compact, offset card rows around a row-two hub; different pairs share a side port to create asymmetric forks.
- 600px to below 1000px: hub above three paired rows; 64px central gutter/spine.
- Below 600px: centered hub above six stacked cards; 48px left card inset with a spine at x=12px.

The adjoining stories layout independently changes at **viewport 900px**, exposed by `--portfolio-story-layout`. In the stacked stories layout, the exit moves inside a flat boundary-crossing region, turns through a reserved upper paper band into the right-padding lane, bypasses the intro, then returns through a minimum 72px gap above the first frame. The scoped story top padding is `corner-size + 48px`; row gap 32px plus feature-track top margin 40px provides the lower band. The phone figure reserves **128px bottom padding** for the inward turn after the cards; tablet/desktop reserve 96px. Keep these corridors explicit and independent of generated SVG dimensions.

The hook measures initially in `useLayoutEffect`. A `ResizeObserver` watches all layout anchors; window resize, `document.fonts.ready`, font `loadingdone` and re-armed resolution media queries schedule one coalesced rAF measurement. Stable ref identities are effect dependencies. The complete snapshot is read before one geometry state publication, and unchanged path/size/status signatures do not cause another render. Cleanup disconnects the observer, removes listeners, cancels the queued frame and live-guards the async font callback. No scroll loop, permanent animation loop or observed-element size writes are used.

The global `.lp-portfolio-connections` overlay has z-index 5, `overflow:visible`, `pointer-events:none`, a host-sized viewBox, `aria-hidden` and no focus target. Artwork clips locally inside cards; the route is outside panel clipping. A valid network exposes `data-portfolio-connections="ready"` on the host. Invalid geometry retains the HTML cards, withholds all connector paths, exposes `data-portfolio-errors`, and logs changed diagnostics in development only. This is inspectability, not a visual guarantee: all new-card joins still require the pending browser review recorded in [the verification report](portfolio-diagram-verification.md).

When adding connections between independently responsive elements, use actual visible boundaries in this shared coordinate space. Do not recreate the removed dashboard connector, `.lp-stories::before`, `.lp-overview-thread` or `.lp-feature-entrance` as an additional owner.

The FAQ has a separate measured entrance owned by `PortfolioAndFaq`: its SVG joins the bottom of the stories section to the top of the paper-colored question panel, with no exit from the panel. It uses the shared filled-ribbon geometry and measures both surfaces in the wrapper's coordinate space; resize and font readiness trigger recalculation. Its 1px SVG viewport and matching viewBox establish a fixed one-to-one coordinate space, with visible overflow for the path: do not stretch the SVG to the wrapper's changing height, as that makes the connector jump while answers animate. On narrow screens the route passes through the right gutter to avoid the heading. Keep the entrance fill matched to both surfaces and check the joins, bends, clipping and text clearance at desktop and phone widths. The FAQ title sits outside the panel; its accessible button-driven answers animate their height and honor reduced motion. The geometry checks pass, but the new FAQ layout and connector have not yet been visually verified in a browser.

### Fixed paths in the current About page

`AboutConnector`, `.about-values-route`, the centered `.about-values-exit`, and the horizontal `.about-card-bridge` shapes use fixed SVG viewBox coordinates and responsive CSS. They are simpler, but their endpoints depend on the current widths, card geometry, viewBox scaling, breakpoints and layout. The About intro currently occupies 40% of its composition on desktop and 100% at 700px and below. The diagonal routes use shared endpoints in the composition's viewBox; their flares must sit on a *straight, filled* portion of the intro's top/bottom edge, away from its rounded stepped corner. A previous version landed the flare too near the corner, leaving part of it visibly detached; moving it inward corrected that desktop case. The incoming and outgoing paths must both be reconsidered whenever the intro's size, shape or alignment changes.

The three About cards are connected at their midpoints by small SVG bridge shapes. A bridge's width is based on the same `--about-card-gap` as the grid, with a small overlap into the neighboring cards. Their flares should merge into both card edges. At 700px and below the cards stack and the horizontal bridges are hidden. Do not leave a desktop bridge floating after the grid becomes vertical.

### Vertical track and final stage

Between homepage pattern frames, `.lp-node-link` uses a single filled SVG with curved flares and a narrow center. It overlaps the neighboring borders by approximately 1px so that the connector and `#d5dfd2` frame read as one piece. Its height follows `--lp-feature-gap`. The final active 560px-and-below CSS keeps pattern/copy rows in `.38fr / .62fr` columns, with a 50px gap between feature rows and visible `.lp-node-link` bridges; earlier stack/hide rules are superseded. Avoid a separate center line plus two independent rounded shapes: they previously produced a small rectangular protrusion and uneven neck when subpixels or browser zoom changed.

The closing section uses `.lp-final-flow` with `FinalThread` as one SVG across the space above and the dark stage. This was introduced after separately drawn segments met with a visible angle and color jump at the section boundary. The final thread also contains a small circular node and extends towards the footer edge. Keep it above the shader, but below interactive content; preserve its continuity at the footer and avoid crossing text or controls.

### Seam and alignment failure modes

- **Mismatched centers:** a line at 50% of a parent is not necessarily at 50% of a nested or padded card. Measure both actual endpoints or share one explicit coordinate system.
- **Disconnected flare:** the line and flare have separately calculated ends, different stroke thickness, or different transforms. Combine them, or derive both from one anchor and overlap them slightly.
- **Flare outside a step:** its footprint extends past the flat edge and into a notch. Place the entire flare on a flat, filled region, not merely its center.
- **Sudden color switch:** separately colored segments meet at the boundary between dark and light panels. Design the layers together; route one continuous line over the transition, or use one path in a color that remains visible on both surfaces. If a line deliberately changes color for contrast, the change must be aligned precisely and look intentional.
- **Double notches or strips at edges:** both adjoining sections cut their corners independently, revealing the wrong underlying background. Make one section the actual backing surface and paint cutouts in that backing color; do not stack two incompatible edge systems.
- **Hairline along a clipped edge:** a corner overlay meets a panel boundary at fractional pixels, while the panel background or border peeks through. Check fill colors, clipping, stroke, device-pixel ratio, zoom, dimensions and overlap. A matching stroke or slight overlap can hide anti-aliasing, but it is not a substitute for matching geometry.
- **Misleading screenshot:** the joint is hidden by the sticky nav, off-screen, or viewed only at one size. Scroll it into full view, including both attachment points. Inspect a close-up and the whole composition.

The saved Rainbrand implementation inspected during this project uses measurements (`getBoundingClientRect`), resize observation and device-pixel-aware geometry for its routes, with clipping/layers around sections. That supports the general measured-anchor approach; do not assume every Inzu connector now uses that machinery. Avoid copying Rainbrand's proprietary assets or wholesale implementation.

## 9. Patterns, mesh graphics and motion

**Homepage feature patterns:** `TabbiedPattern` renders seeded `radius`, `veil` and `blossom` patterns using Inzu green, cream and coral palettes. The decorative pattern frames are approximately 1.6:1 with a 7px `#d5dfd2` border and rounded corners. `.lp-pattern-motion` gently translates the artwork horizontally while scaled; the three rows use roughly 13, 15 and 14 second cycles. Keep the boxes level: do not rotate the artwork and make the layout look tilted. At reduced motion, animation stops and the graphic remains visible.

**Closing panel and About-card meshes:** `Aurora.tsx` renders an original procedural WebGL shader, not a downloaded video and not the previous fixed single sine-wave ribbon. A time-varying warped field creates irregular moving bands on dark backgrounds. The `home` palette uses dark green, sage and coral; About variants use green, coral and blue. Different starting time offsets help the cards avoid identical motion. The canvas fills the containing visual area and is decorative. The Home stage is tall (at least `max(700px, 100dvh)` in the current rules) with a dark overlay to protect text contrast; on small screens it uses at least `max(630px, 100dvh)`.

The shader caps rendering resolution at 1.5 device pixels per CSS pixel, uses a resize observer, stops scheduling frames when out of view or the document is hidden, honors `prefers-reduced-motion`, and cleans up observers, animation frames and WebGL resources on unmount. A solid background remains if WebGL is unavailable. Three About cards mean three canvas contexts: assess performance on mobile and low-power hardware before adding more. If the context is lost or shader compilation fails, ensure the fallback remains legible. The current shader uses approximate procedural motion; it does not prove how Rainbrand's specific visual was implemented.

Do not replace the motion with a static rectangular image or a single predictable looping sine wave. Bands should vary in width and direction, enter or leave the edges, and retain enough dark negative space to keep the heading and CTA readable. Do not place labels over the About mesh: the user removed those so the graphic can stand alone.

## 10. Responsive and accessible behavior

- At viewport 900px and below, navigation collapses and feature stories stack their intro above the track. The new portfolio network remains active through its independently selected 1000px/600px container modes and routes around that intro. At 700px and below, About cards stack and their horizontal bridges hide. At 560px and below, homepage feature rows keep their final `.38fr / .62fr` pattern/copy columns with visible vertical pattern links; overview side padding becomes 16px, shell margins tighten, and footer overlap changes.
- When a connector is hidden for a breakpoint, make sure it leaves no floating flare or stray stub. The page should still make visual sense without it. Do not stretch a desktop diagonal line blindly into the mobile arrangement.
- Keep body text readable against surfaces and animation. Check contrast across multiple frames, including the brightest coral or pale-green parts. Ensure the page still works with the font fallback and without WebGL.
- Use semantic headings, links and buttons, meaningful logo alt text, and a visible keyboard focus state. Decorative SVG/canvas should not receive pointer events or be announced as meaningful content. Preserve the homepage skip link and the menu's accessible state and Escape handling.
- Honor `prefers-reduced-motion`: no essential information should depend on animation. Avoid unnecessary animations on the navigation access button.

## 11. Verification and handoff checklist

After changing shapes, SVG paths, typography, copy or responsive layout:

1. Run `npm run build`, `npm run lint` and `node ./node_modules/tsx/dist/cli.mjs scripts/check-portfolio-geometry.ts` after changing the portfolio network. These catch build/type/geometry failures, not rendered visual alignment defects.
2. Start or reuse the local server. Check the actual updated page; a Vite **preview** serves the built `dist` and may need a fresh build and browser refresh. Do not assume an old tab has hot-reloaded.
3. Inspect Home and About at a wide desktop viewport, a medium/tablet width, and a narrow phone width. Include the current breakpoints (around 900, 700 and 560px), both sides of each breakpoint, and browser zoom / device scaling if practical.
4. Scroll slowly through the header compression threshold. Check the page at the top and after scrolling, with the menu closed and open on mobile. No jump, overlap, clipped title or unreachable control.
5. Inspect every changed seam at normal scale and zoomed in: both outer corners, the center of each flare, the full path, and both neighboring surfaces. In particular: hero to manifesto pill; all six portfolio-card entries, hub ports/spine and exit to first frame; pattern-to-pattern necks; About content to intro; intro to middle card; between all three About cards; About exit to CTA; final stage to footer.
6. Look for stray horizontal/vertical slivers, detached flares, protruding rectangular pixels, mismatched centerlines or colors, sharp angle changes and cut-off curves. Check that the background seen through each notch is the intended neighbor. Test long copy / resized windows because fixed percentages and text wrapping can change positions.
7. Watch the meshes and patterns over time, not just one frame. Confirm the art fills its container, changes shape, maintains text contrast, respects reduced motion, and does not keep the page busy off-screen. Check the static fallback where WebGL is unavailable.
8. Check the requested destinations, keyboard focus, menu controls and screen-reader labels after changing markup. Do not click a form submission or send a request as part of visual QA.
9. Report what was actually verified and any unverified viewport or joint. If computer use is interrupted, do not imply the visual check passed. Preserve other people's work; do not deploy or push unless requested.

## 12. Current limitations and maintenance priorities

- The homepage hero uses a light mesh that fades to the original paper-colored surface before the stepped strip and connector. A paper background is the WebGL fallback. Bottom corner overlays are offset downward by 2px to overlap the clipped panel edge; the hero and corner seams need close visual verification at phone widths and browser zoom levels.

- The new homepage portfolio network implements three measured topologies and a separate stacked-story bypass. Build/TypeScript and the 73-case geometry suite pass, but **no new portfolio card, flare, bend, boundary seam or destination was visually inspected** in this implementation session. Browser access was unavailable and native browser control was stopped by CUA URL-confidence enforcement. See the all-uninspected joint ledger in [the verification report](portfolio-diagram-verification.md). This system does not replace the fixed About connectors.
- The About routes and card bridges use fixed SVG/CSS geometry, not the measured connector. Their alignment is sensitive to changes in width, aspect ratio, text wrapping and the stepped intro. Revisit with measured anchors if the composition changes or a new seam appears.
- The About outgoing route and incoming route use viewBox coordinates that assume the current intro's width and contour. Keep flares inside a straight portion of the surface. The desktop upper connection was visually checked after a detached flare was moved inward; that does not verify every mobile size or zoom level.
- There are duplicate/overriding CSS blocks and legacy declarations. Refactoring them is useful, but only with before/after visual checks at all affected breakpoints; deleting a seemingly obsolete rule can expose an older one.
- The last About and home copy/navigation revision passed build and TypeScript checks; the About visual review was interrupted. Check the updated About hero corners, spacing and card copy in the browser before treating that revision as fully visually verified.
- Pricing is currently an access/contact section, not a published pricing table. Do not invent prices or suggest a completed pricing workflow.
- The existing Terms text still asserts an 8% fee and refers to a pricing page; it has not been reconciled with the current access/contact pricing flow. The legal-page redesign preserved existing policy content and dates; it did not verify those claims or visually verify the new layouts.
