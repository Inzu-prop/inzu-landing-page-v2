# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (0.0.0.0)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # TypeScript type-check (tsc --noEmit) — no test suite
npm run clean     # Remove dist/
```

## Stack

- **React 19 + Vite 6** — SPA, no SSR
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin — NOT postcss, no `tailwind.config.js`
- **`motion` v12** — import from `'motion/react'`, never `'framer-motion'`
- **`react-router-dom` v7** — BrowserRouter, 5 routes
- **`lucide-react`** — only icon library used
- **`@/`** path alias — resolves to project root (configured in `vite.config.ts`)

## Architecture

The app is a pure marketing/landing SPA with no backend or auth.

**Routing** (`src/App.tsx`):
- `/` → `LandingPage` (inline component in App.tsx assembling all section components)
- `/about` → `AboutPage`
- `/request-access` → `RequestAccessPage`
- `/privacy-policy` → `PrivacyPolicyPage`
- `/terms-of-service` → `TermsOfServicePage`

App.tsx also contains a 400ms splash screen loader using `AnimatePresence` and a `ScrollToTop` component that handles hash anchors.

**Section components** (`src/components/`): Each landing page section is its own component — `Hero`, `SocialProof`, `Problem`, `Solution`, `HowItWorks`, `Stats`, `Pricing`, `TestimonialsSection`, `FinalCTA`, `Footer`. They are assembled in order inside `LandingPage` (note: `TestimonialsSection` is imported from the out-of-tree `@/components/ui/testimonial-stack`).

**Shared utilities**:
- `src/components/SectionReveal.tsx` — scroll-triggered fade-up wrapper using `useInView` from `motion/react`
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Out-of-tree component**: `components/ui/testimonial-stack.tsx` lives at project root (not in `src/`), imported via `@/components/ui/testimonial-stack`. It contains `TestimonialsSection` (exported named) and `TestimonialStack`.

## Design System

Defined entirely in `src/index.css` via `@theme {}` (Tailwind v4 syntax):

| Token | Value |
|---|---|
| `obsidian` | `#13270D` (dark bg) |
| `forest` | `#32533D` |
| `sage` | `#90B494` (primary accent) |
| `silk` | `#F5F7F6` (light text) |
| `ivory` | `#FAFBFA` (page bg) |
| `stone` | `#D4D9D5` |
| `cedar` | `#825D42` |
| `alert` | `#E22026` |

**Fonts**:
- `font-display` → `Cormorant Garamond` (headlines, `h1`–`h4` default to this)
- `font-body` → `Be Vietnam Pro` (all UI text)

**Layout**: `.container-custom` is the standard wrapper (max-width 1380px, fluid padding via `clamp`).

**Animations** defined in CSS: `.animate-float`, `.animate-scroll`, `.animate-pulse-ring`. Custom easing: `--ease-luxury: cubic-bezier(0.23, 1, 0.32, 1)` — use this value in all motion transitions.

## Key Patterns

**Scroll reveal**: Wrap sections or elements in `<SectionReveal delay={0.1}>` for viewport-triggered fade-up.

**Motion imports**:
```ts
import { motion, AnimatePresence, useInView } from 'motion/react';
```

**`cn()` utility**:
```ts
import { cn } from "@/lib/utils";
```

**Section structure**: Sections use `<section className="py-24 lg:py-32 bg-[color]">` with `.container-custom` inside.

**Navbar scroll behavior**: `Navbar.tsx` toggles `bg-obsidian/85 backdrop-blur-2xl border-b border-sage/15` after 60px scroll.

## Deployment

Deployed to Vercel. `vercel.json` has a single SPA rewrite rule (`/* → /index.html`) to support client-side routing.
