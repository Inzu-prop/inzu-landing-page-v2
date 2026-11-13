# Inzu landing page redesign plan

Date: 13 November 2026  
Status: Proposed; implementation has not started.

## Goal and direction

Create a vivid, credible introduction to Inzu for property owners. The reference is Rainbrand's spacious framed composition, changing visual rhythm, connected panels and compact floating navigation. Translate those qualities into an original Inzu experience, using its green palette, property imagery and real product patterns. The primary visitor journey should explain the product, show what using it looks like and offer an honest next step.

The current repository is a React 19 / Vite 6 SPA, deployed on Vercel, with Tailwind v4 and `motion/react`. This plan targets that existing checkout and retains its deployment setup. The Sites skill guides design and local implementation; publishing or creating a separate hosted Site is not part of this planning task.

## Phase 0 — Discovery and constraints

Before implementation, read the files cited below and check the current worktree and changes since this plan. Inspect the current page at desktop and mobile sizes, and inspect the local app preview before selecting product imagery. The reference recording and screenshots supplied in the conversation establish the visual direction; do not copy Rainbrand's artwork, brand, copy or exact layouts.

**Allowed existing patterns and sources**

- `src/App.tsx`: React Router routes, landing section assembly, hash navigation and loader; preserve `/`, `/about`, `/request-access`, `/privacy-policy`, `/terms-of-service`, `#how-it-works`, `#pricing`, and the app sign-in destination unless intentionally replaced with an equivalent.
- `src/index.css`: Tailwind v4 `@theme` tokens and existing typography; `src/components/Logo.tsx` and `src/assets/inzu-logo.svg`: current identity. The app's matching palette is in `../inzu-frontend-main/inzu-frontend-main/src/styles/inzu-brand.css` (relative to the workspace parent).
- `src/components/SectionReveal.tsx`: existing `motion/react` reveal and reduced-motion pattern. `package.json` supplies React Router, Motion and Lucide; do not invent API calls or add libraries without a need.
- `D:/PROJECT SWE/zuwena-cards-main/zuwena-cards-main/src/components/ui/navbar.tsx` and `use-scroll.ts`: reference for the 80px threshold, compact centered header and cleanup of passive scroll listener. Adapt the interaction; do not copy Zuwena-specific branding, modal event, or dependencies.
- `D:/PROJECT SWE/inzu-frontend-main/inzu-frontend-main/src/components/dashboard-view.tsx` and `src/components/local-preview.tsx`: product visual references. The development-only local preview uses fictional data; label example data and never capture real customer data.
- `D:/PROJECT SWE/inzu-backend-main/inzu-backend-main/RECONCILIATION_SAFETY.md`, `LOCAL_DEMO_SAFETY.md`, and payment callback/reconciliation actions: operational caveats. Code presence is not evidence of a live service.
- `src/components/RequestAccessPage.tsx` and `Footer.tsx`: current forms only simulate success. There is no verified submission or newsletter integration in this checkout.

**Verification:** Record current routes and destinations, actual product states, asset provenance, and any existing uncommitted work. Confirm assumptions against the current code. Do not claim that demo data, planned features, payment processing, messaging, testimonials, statistics, pricing or service commitments are verified simply because they appear in existing marketing copy.

## Phase 1 — Content and visual specification

1. Draft a concise message for property owners, grounded in the actual app: an overview of properties and units, tenant records, invoices, financial views and maintenance records. Describe them at the level verified during implementation; avoid promising automated reconciliation, completed M-Pesa processing, AI contractor dispatch, 48-hour onboarding or WhatsApp automation without confirmation.
2. Establish the page sequence:
   - **Hero:** wide ivory panel on a muted sage-gray canvas; simple navigation; a direct headline, short explanation and primary action. Combine an architectural image with a legible product glimpse, keeping space around both.
   - **Bridge:** one short editorial statement on the canvas that describes the benefit of a clearer portfolio view.
   - **Product overview:** a contrasting forest panel with a connected diagram showing the relationship between properties, tenants, financial records and maintenance. Labels should describe verified capabilities.
   - **Feature stories:** two or three varied light panels pairing authentic, fictional-data product views with property photography or restrained illustrations. Demonstrate the landlord's tasks rather than repeat marketing slogans.
   - **Getting started:** a simple, accurate path from inquiry to the next confirmed step. Preserve `#how-it-works`.
   - **Pricing / questions:** retain `#pricing`; show the 8% and included services only if confirmed. Otherwise use a clear pricing inquiry and omit unsupported pricing promises.
   - **Final invitation and footer:** a concise CTA, sign-in, contact and legal navigation; no simulated newsletter signup.
3. Use the existing forest `#32533D`, sage `#90B494`, dark `#13270D`, and ivory as anchors. Establish a muted outer canvas, strong readable typography, generous but responsive gutters, and a consistent panel shape. Refine the current type pairing after visual testing; prioritize legibility over decorative type.
4. Create an asset brief: several cohesive, licensed or generated property/architectural images suited to the Kenyan context, plus safe screenshots or faithful illustrative app views. Do not represent generated buildings as actual Inzu properties. Optimize images, supply alt text, and avoid using private app data.

**Verification:** Review the proposed content against actual app/backend behavior and the user's reference. Every section must add a distinct reason to continue. Confirm image permissions and distinguish illustrative data. Do not invent customer quotes, performance numbers or scarcity.

## Phase 2 — Page foundation and navigation

1. Establish a landing-specific outer canvas, fluid centered content width, panel spacing and responsive typography in `src/index.css` or scoped landing styles. Avoid changing the layout of legal or access pages unintentionally.
2. Adapt Zuwena's scroll threshold pattern in `src/components/Navbar.tsx`: begin as a full-width navigation integrated into the hero, then transition to a centered floating compact bar after scrolling. Keep logo, relevant anchors, sign-in and primary CTA accessible; prevent overflow on smaller screens.
3. Ensure mobile menu has a named toggle, `aria-expanded`, keyboard operation, visible focus, a predictable close action and scroll locking that is cleaned up. Respect reduced motion; make all content and navigation usable with animations disabled.
4. Review the 400ms splash loader in `src/App.tsx`; remove it if it delays access without serving the new experience. Preserve anchor navigation across routes and account for the fixed header when targeting anchors.

**Verification:** At mobile, tablet and desktop widths, test the nav at page top, while scrolling, with menu open and when returning to top. Check keyboard focus, route transitions and hash targets. Do not reuse the Zuwena `open-request-modal` event or make the only navigation inaccessible without JavaScript animation.

## Phase 3 — Visual storytelling and imagery

1. Implement the hero, bridge, connected overview and feature panels in small, maintainable React components assembled by `src/App.tsx`. Use variation in scale and image placement, with a consistent underlying grid.
2. Prepare and integrate selected optimized images with appropriate dimensions, responsive loading and descriptive alt text. Use decorative empty alt text where imagery has no information. Preserve image aspect ratios and prevent layout shift.
3. Build product visuals from the actual dashboard and local fictional preview. If a faithful screenshot cannot be produced safely, create clearly labeled illustrative UI grounded in the app; avoid fabricated live metrics and fake customer records.
4. Use subtle scroll reveals and connecting-line details where they reinforce the story. Follow `SectionReveal.tsx` and honor reduced-motion preferences. Content must remain visible and understandable without motion.

**Verification:** Visually inspect the whole page at desktop and narrow mobile widths, including long copy and image loading. Verify contrast, image crop, page weight, no horizontal overflow, clear hierarchy and reduced-motion behavior. Do not use unlicensed images or copy Rainbrand's distinctive assets.

## Phase 4 — Conversion, pricing and trust

1. Audit `src/components/RequestAccessPage.tsx`: it currently waits two seconds and displays “Application received” without submitting data. Establish a real, authorized destination and contract before implementing a submission. Show success only after verified acceptance, with validation and clear error/retry handling. If a destination is unavailable, remove the simulated submission and use a verified contact path or an honest unavailable state. Do not invent a contact address.
2. Remove the simulated newsletter success in `src/components/Footer.tsx`, or connect it only to a verified and authorized service with truthful success and failure states.
3. Verify pricing, service commitments, statistics and testimonials with an authoritative source before including them. Remove or replace unsupported claims across the landing and access page, including the 40+ landlords, KES 480M+, 18% uplift, 48-hour launch and named quotes unless substantiated.
4. Preserve working routes and legal links. If restyling secondary pages, keep the scope to consistency and functional fixes; do not alter legal terms without authorization.

**Verification:** Test the full CTA journey, including validation, actual delivery where configured, failure states and keyboard use. Verify no success message appears without a real successful submission. Check all links and ensure external sign-in goes to its existing destination.

## Phase 5 — Final verification and handoff

1. Run `npm run build` and `npm run lint` (the latter is the repository's TypeScript check). Resolve errors introduced by the work; report unrelated pre-existing failures.
2. In a browser, check `/`, About, request access, privacy and terms routes; all anchors and CTA destinations; mobile menu; reloads on nested routes; scrolling navigation; reduced motion; and representative desktop, tablet and phone widths. Verify the Vercel SPA rewrite remains intact.
3. Review the rendered page for content accuracy, visual consistency, image loading, readable contrast, focus indicators, no horizontal overflow and honest example labels. Test the inquiry path end to end only against an authorized destination.
4. Document asset provenance and any unresolved decisions. Report what is implemented, checked and still unverified. Deploy only if separately authorized or explicitly requested in the implementation stage.

## Decisions and dependencies

- **Access destination:** an actual endpoint or verified contact method is needed before enabling successful applications. This is the primary functional dependency.
- **Commercial facts:** confirm current pricing, availability, onboarding process, and any approved testimonials or metrics; otherwise omit unsupported claims.
- **Product readiness:** verify live payment, messaging and maintenance behavior before making stronger claims. The local preview is illustrative, not proof of production readiness.
- **Imagery:** choose licensed or generated architecture/property visuals and record their provenance. Do not imply they depict customer properties.

The design and most of the page can be built while these decisions are pending; the affected content and conversion controls must remain truthful.
