# UI/UX Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 20 identified UI/UX issues across the Inzu landing page, from critical accessibility and layout bugs through to polish-level improvements.

**Architecture:** Each task targets one or two specific component files. No new dependencies needed — all fixes use existing stack (motion/react, Tailwind v4, lucide-react). Changes are additive/surgical; no full rewrites.

**Tech Stack:** React 19, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`), `motion` v12 (import from `'motion/react'`), `react-router-dom` v7, `lucide-react`.

---

## File Map

| File | Changes |
|---|---|
| `src/components/Hero.tsx` | Fix `min-h-screen` → `min-h-[100dvh]`; fix float rotation |
| `src/components/Solution.tsx` | Remove banned word; left-align headline; enlarge visuals; add `viewport={{ once: true }}` |
| `src/components/Problem.tsx` | Replace 3-equal-card layout with numbered-row asymmetric layout |
| `src/components/SectionReveal.tsx` | Add `useReducedMotion` guard |
| `src/components/SocialProof.tsx` | Add marquee fade edges; deduplicate stats vs Stats section |
| `src/components/HowItWorks.tsx` | Left-align headline; left-align step layout on desktop |
| `src/components/Stats.tsx` | Vary bento cell heights |
| `src/components/Pricing.tsx` | Left-align headline; remove `scale-105`; fix overflow risk |
| `src/components/FinalCTA.tsx` | Convert to split layout |
| `src/components/Footer.tsx` | Add label to newsletter input; strengthen separator |
| `src/components/RequestAccessPage.tsx` | Add disabled state styles; improve loading state |
| `components/ui/testimonial-stack.tsx` | Remove `"use client"` directive |
| `src/index.css` | Fix float animation rotation |

---

## Task 1: Fix Hero viewport height bug

**Files:**
- Modify: `src/components/Hero.tsx` (line 6)

- [ ] Open `src/components/Hero.tsx`. Change line 6:
  ```tsx
  // BEFORE
  <section className="relative min-h-screen flex items-center pt-24 lg:pt-28 overflow-hidden bg-obsidian">

  // AFTER
  <section className="relative min-h-[100dvh] flex items-center pt-24 lg:pt-28 overflow-hidden bg-obsidian">
  ```

- [ ] Verify dev server still renders the hero at full viewport height on mobile breakpoint (resize browser to 375px width).

- [ ] Commit:
  ```bash
  git add src/components/Hero.tsx
  git commit -m "fix: use min-h-[100dvh] in Hero to prevent iOS Safari layout jump"
  ```

---

## Task 2: Fix Hero float animation rotation

**Files:**
- Modify: `src/index.css` (lines 54–57)

- [ ] Open `src/index.css`. Replace the `@keyframes float` block:
  ```css
  /* BEFORE */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-1deg); }
    50%       { transform: translateY(-12px) rotate(-1deg); }
  }

  /* AFTER */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-12px) rotate(-0.5deg); }
  }
  ```

- [ ] Check the hero dashboard card in browser — it should float naturally without a permanent tilt.

- [ ] Commit:
  ```bash
  git add src/index.css
  git commit -m "fix: remove permanent rotation from float keyframe animation"
  ```

---

## Task 3: Add reduced-motion support to SectionReveal

**Files:**
- Modify: `src/components/SectionReveal.tsx`

- [ ] Replace the entire file content:
  ```tsx
  import React, { useRef } from 'react';
  import { motion, useInView, useReducedMotion } from 'motion/react';

  const SectionReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; key?: React.Key; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const prefersReduced = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
        transition={{ duration: prefersReduced ? 0 : 0.8, ease: [0.23, 1, 0.32, 1], delay: prefersReduced ? 0 : delay }}
      >
        {children}
      </motion.div>
    );
  };

  export default SectionReveal;
  ```

- [ ] Test: enable "Prefers reduced motion" in OS settings (or Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`). All `SectionReveal` wrappers should appear instantly without animation.

- [ ] Commit:
  ```bash
  git add src/components/SectionReveal.tsx
  git commit -m "feat(a11y): respect prefers-reduced-motion in SectionReveal"
  ```

---

## Task 4: Fix Solution section — remove banned word, left-align headline

**Files:**
- Modify: `src/components/Solution.tsx` (lines 8–15)

- [ ] In `Solution.tsx`, update the section header div (lines 8–15):
  ```tsx
  // BEFORE
  <div className="container-custom text-center mb-20">
    <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
      THE SOLUTION
    </span>
    <h2 className="font-display text-5xl md:text-8xl text-silk leading-tight">
      Your agent, <span className="italic">replaced.</span><br />
      Your portfolio, <span className="text-sage italic">elevated.</span>
    </h2>
  </div>

  // AFTER
  <div className="container-custom mb-20">
    <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
      THE SOLUTION
    </span>
    <h2 className="font-display text-5xl md:text-8xl text-silk leading-tight max-w-4xl">
      Your agent, <span className="italic">replaced.</span><br />
      Your portfolio, <span className="text-sage italic">liberated.</span>
    </h2>
  </div>
  ```

- [ ] Verify "elevated" no longer appears anywhere in the codebase:
  ```bash
  grep -r "elevated" src/
  ```
  Expected: no matches.

- [ ] Commit:
  ```bash
  git add src/components/Solution.tsx
  git commit -m "fix: remove banned word 'elevated', left-align Solution headline"
  ```

---

## Task 5: Enlarge Solution card visuals + fix animation viewport

**Files:**
- Modify: `src/components/Solution.tsx` (lines 24–104, the `visual` props)

- [ ] For each card's `visual` prop, increase the container height and add `viewport={{ once: true }}` to any `whileInView` motion divs. Apply these changes:

  **Card 01 visual** — increase height from implicit to `mt-8 h-16`:
  ```tsx
  // BEFORE
  <div className="mt-8 flex items-center justify-between px-4">

  // AFTER
  <div className="mt-8 flex items-center justify-between px-4 h-16">
  ```

  **Card 02 visual** — increase height from `h-12` to `h-24`:
  ```tsx
  // BEFORE
  <div className="mt-8 h-12 flex items-end gap-1">
    {[20, 40, 30, 60, 45, 80, 70, 95].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        className="flex-1 bg-sage/40 rounded-t-sm"
      />
    ))}
  </div>

  // AFTER
  <div className="mt-8 h-24 flex items-end gap-1">
    {[20, 40, 30, 60, 45, 80, 70, 95].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="flex-1 bg-sage/40 rounded-t-sm"
      />
    ))}
  </div>
  ```

  **Card 03 visual** — increase padding:
  ```tsx
  // BEFORE
  <div className="mt-8 flex flex-col gap-2">

  // AFTER
  <div className="mt-8 flex flex-col gap-2 min-h-[80px] justify-end">
  ```

  **Card 04 visual** — increase height:
  ```tsx
  // BEFORE
  <div className="mt-8 flex items-center gap-3 p-3 bg-obsidian rounded-xl border border-sage/10">

  // AFTER
  <div className="mt-8 flex items-center gap-3 p-4 bg-obsidian rounded-xl border border-sage/10 min-h-[64px]">
  ```

- [ ] Commit:
  ```bash
  git add src/components/Solution.tsx
  git commit -m "feat: enlarge Solution card visuals, fix whileInView once:true"
  ```

---

## Task 6: Refactor Problem section to numbered-row layout

**Files:**
- Modify: `src/components/Problem.tsx`

- [ ] Replace the entire component with the numbered-row pattern (no equal cards):
  ```tsx
  import { EyeOff, Wrench, UserMinus, type LucideIcon } from 'lucide-react';
  import SectionReveal from './SectionReveal';

  const problems: { icon: LucideIcon; num: string; title: string; body: string }[] = [
    {
      icon: EyeOff,
      num: '01',
      title: 'No Real-Time Visibility',
      body: 'Reconciled reports arrive weeks late. You never know your actual collections vs arrears until it\'s too late to act.',
    },
    {
      icon: Wrench,
      num: '02',
      title: 'Maintenance Black Hole',
      body: 'Repair requests disappear into WhatsApp threads. Forgotten tasks, subpar work, and tenants who quietly leave instead of complain.',
    },
    {
      icon: UserMinus,
      num: '03',
      title: 'Agent Dependence',
      body: 'Your entire KES 1M+ monthly portfolio depends on an individual whose process is opaque, unscalable, and entirely replaceable — by software.',
    },
  ];

  const Problem = () => {
    return (
      <section id="for-landlords" className="py-32 bg-ivory">
        <div className="container-custom grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
              THE PROBLEM
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-obsidian leading-none tracking-tight mb-8">
              Agent friction is<br />
              <span className="italic">costing you more</span><br />
              than their fee.
            </h2>
            <p className="text-lg font-body font-light text-ash leading-relaxed max-w-md">
              You bought the property. You pay the mortgage. You carry the risk.
              And then you hand the whole operation to someone whose incentives,
              honestly, are not perfectly aligned with yours. That's the arrangement
              most landlords in Nairobi are living with. Inzu is the alternative.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-forest/8">
            {problems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={idx} delay={idx * 0.1}>
                  <div className="py-8 group flex items-start gap-6 hover:pl-2 transition-all duration-500">
                    <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage/50 uppercase shrink-0 pt-1 w-6">
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-forest/8 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-sage" />
                        </div>
                        <h3 className="font-body font-medium text-lg text-obsidian">{item.title}</h3>
                      </div>
                      <p className="text-sm font-light text-ash leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  export default Problem;
  ```

- [ ] Check the layout at 375px and 1280px breakpoints in browser.

- [ ] Commit:
  ```bash
  git add src/components/Problem.tsx
  git commit -m "refactor: replace 3-equal-card Problem layout with numbered-row design"
  ```

---

## Task 7: Deduplicate SocialProof stats + add marquee fade edges

**Files:**
- Modify: `src/components/SocialProof.tsx`

The `Stats` bento section already shows `48hrs`, `Zero spreadsheets`, `100%`. Change `SocialProof` stats to non-overlapping metrics.

- [ ] In `SocialProof.tsx`, replace the stats array (around line 35):
  ```tsx
  // BEFORE
  { value: 'KES 480M+', label: 'managed' },
  { value: '99.2%',     label: 'collected on time' },
  { value: 'Zero',      label: 'spreadsheets' },

  // AFTER
  { value: 'KES 480M+', label: 'in rent managed' },
  { value: '40+',        label: 'landlords in early access' },
  { value: '18%',        label: 'avg collections uplift' },
  ```

- [ ] Add marquee fade edges. Wrap the marquee `<div className="relative flex overflow-hidden">` with a mask:
  ```tsx
  // BEFORE
  <div className="relative flex overflow-hidden">

  // AFTER
  <div
    className="relative flex overflow-hidden"
    style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
  >
  ```

- [ ] Commit:
  ```bash
  git add src/components/SocialProof.tsx
  git commit -m "feat: deduplicate stats, add fade edges to marquee"
  ```

---

## Task 8: Left-align Pricing headline, fix featured card scale

**Files:**
- Modify: `src/components/Pricing.tsx`

- [ ] Remove `text-center` from section header and left-align the headline:
  ```tsx
  // BEFORE
  <div className="container-custom text-center mb-20">
    <h2 className="font-display text-5xl md:text-7xl text-obsidian leading-tight">
      Simple, <span className="italic">honest pricing.</span><br />
      No hidden fees. No agents.
    </h2>
  </div>

  // AFTER
  <div className="container-custom mb-20">
    <h2 className="font-display text-5xl md:text-7xl text-obsidian leading-tight max-w-3xl">
      Simple, <span className="italic">honest pricing.</span><br />
      No hidden fees. No agents.
    </h2>
  </div>
  ```

- [ ] Replace `scale-105` on the Enterprise card with a border accent that can't overflow:
  ```tsx
  // BEFORE
  <div className="bg-forest p-12 rounded-2xl border border-sage/20 shadow-2xl scale-105 relative z-10 flex flex-col">

  // AFTER
  <div className="bg-forest p-12 rounded-2xl border-2 border-sage/50 shadow-2xl relative z-10 flex flex-col ring-1 ring-sage/20 ring-offset-2 ring-offset-ivory">
  ```

- [ ] Verify pricing cards don't overflow at 375px mobile width.

- [ ] Commit:
  ```bash
  git add src/components/Pricing.tsx
  git commit -m "fix: left-align Pricing headline, replace scale-105 with border accent"
  ```

---

## Task 9: Left-align HowItWorks headline

**Files:**
- Modify: `src/components/HowItWorks.tsx` (lines 33–43)

- [ ] Remove `text-center` from the section header:
  ```tsx
  // BEFORE
  <div className="container-custom text-center mb-24">
    <motion.h2
      ...
      className="font-display text-5xl md:text-7xl text-obsidian leading-tight"
    >

  // AFTER
  <div className="container-custom mb-24">
    <motion.h2
      ...
      className="font-display text-5xl md:text-7xl text-obsidian leading-tight max-w-3xl"
    >
  ```

- [ ] Also change desktop step layout from `text-center` to left-aligned text with step number top-left:
  ```tsx
  // BEFORE (line 64)
  <div key={item.step} className="text-center">

  // AFTER
  <div key={item.step} className="text-left">
  ```

  ```tsx
  // BEFORE — step circle has mx-auto
  className="w-12 h-12 rounded-full bg-forest text-silk flex items-center justify-center font-display font-semibold text-xl mx-auto mb-8 shadow-[0_0_0_6px_rgba(50,83,61,0.1)]"

  // AFTER — remove mx-auto
  className="w-12 h-12 rounded-full bg-forest text-silk flex items-center justify-center font-display font-semibold text-xl mb-8 shadow-[0_0_0_6px_rgba(50,83,61,0.1)]"
  ```

  ```tsx
  // BEFORE — paragraph has mx-auto
  className="text-sm font-light text-ash leading-relaxed max-w-xs mx-auto"

  // AFTER
  className="text-sm font-light text-ash leading-relaxed max-w-xs"
  ```

- [ ] Commit:
  ```bash
  git add src/components/HowItWorks.tsx
  git commit -m "fix: left-align HowItWorks headline and step content"
  ```

---

## Task 10: Convert FinalCTA to split layout

**Files:**
- Modify: `src/components/FinalCTA.tsx`

- [ ] Replace the centered layout with a split left-headline / right-CTA block:
  ```tsx
  import { InzuRequestButton } from "@/components/ui/button-with-icon";

  const FinalCTA = () => {
    return (
      <section className="min-h-[60vh] flex items-center py-32 bg-obsidian relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_35%_60%,rgba(50,83,61,0.4)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_20%,rgba(130,93,66,0.15)_0%,transparent_60%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — headline */}
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-silk leading-[1.0] tracking-tight">
              Your properties deserve<br />
              <span className="text-sage italic">better management.</span>
            </h2>

            {/* Right — sub-copy + CTA */}
            <div className="flex flex-col items-start gap-8">
              <p className="text-silk/50 font-body font-light text-base leading-relaxed max-w-sm">
                A small number of portfolios are admitted each month. If you're ready
                to stop managing your property manager, this is where you start.
              </p>
              <InzuRequestButton href="/request-access" label="Claim Your Early Access" />
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default FinalCTA;
  ```

- [ ] Verify the section renders correctly at 375px (stacks to single column) and 1280px (side by side).

- [ ] Commit:
  ```bash
  git add src/components/FinalCTA.tsx
  git commit -m "refactor: FinalCTA split layout — headline left, CTA right"
  ```

---

## Task 11: Fix footer newsletter label (accessibility)

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] Add a proper `<label>` and `id` to the newsletter email input. Replace the input block (around lines 59–66):
  ```tsx
  // BEFORE
  <div className="flex items-center bg-obsidian border border-sage/20 rounded-full p-1 pl-4 mb-6">
    <input
      type="email"
      placeholder="Enter your email"
      className="bg-transparent text-xs text-silk outline-none flex-1"
    />
    <button className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-obsidian">
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>

  // AFTER
  <label htmlFor="footer-email" className="sr-only">Email address</label>
  <div className="flex items-center bg-obsidian border border-sage/20 rounded-full p-1 pl-4 mb-6">
    <input
      id="footer-email"
      type="email"
      placeholder="Enter your email"
      className="bg-transparent text-xs text-silk outline-none flex-1"
    />
    <button
      type="button"
      aria-label="Subscribe"
      className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-obsidian"
    >
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
  ```

- [ ] Also strengthen the bottom border separator (line 76):
  ```tsx
  // BEFORE
  <div className="text-center pt-10 border-t border-sage/5">

  // AFTER
  <div className="text-center pt-10 border-t border-sage/10">
  ```

- [ ] Commit:
  ```bash
  git add src/components/Footer.tsx
  git commit -m "fix(a11y): add label to footer email input, strengthen bottom border"
  ```

---

## Task 12: Fix RequestAccessPage disabled/loading button state

**Files:**
- Modify: `src/components/RequestAccessPage.tsx`

- [ ] Add visual disabled styling to the submit button (around line 143):
  ```tsx
  // BEFORE
  <button
    disabled={isLoading}
    className="w-full py-5 rounded-full bg-forest text-silk font-medium text-sm hover:bg-obsidian transition-all flex items-center justify-center"
  >

  // AFTER
  <button
    disabled={isLoading}
    className="w-full py-5 rounded-full bg-forest text-silk font-medium text-sm hover:bg-obsidian transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
  >
  ```

- [ ] Replace the pulsing-opacity loading text with a spinner + text combo:
  ```tsx
  // BEFORE
  {isLoading ? (
    <motion.span
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Reviewing...
    </motion.span>
  ) : (
    "Submit Application →"
  )}

  // AFTER
  {isLoading ? (
    <span className="flex items-center gap-2">
      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      Reviewing your application...
    </span>
  ) : (
    "Submit Application →"
  )}
  ```

- [ ] Commit:
  ```bash
  git add src/components/RequestAccessPage.tsx
  git commit -m "fix: add disabled styles and proper loading spinner to submit button"
  ```

---

## Task 13: Remove "use client" from testimonial-stack

**Files:**
- Modify: `components/ui/testimonial-stack.tsx` (line 1)

- [ ] Delete line 1 (`"use client";`) from the file. This directive is a Next.js App Router concept and is meaningless in a Vite SPA.

- [ ] Verify the testimonials section still renders and hover interactions work.

- [ ] Commit:
  ```bash
  git add components/ui/testimonial-stack.tsx
  git commit -m "chore: remove Next.js 'use client' directive from Vite component"
  ```

---

## Task 14: Vary Stats bento cell heights

**Files:**
- Modify: `src/components/Stats.tsx`

The three top cells are all `min-h-[280px]`. Give the centre cell more visual presence.

- [ ] Change the height of the second top cell (Cell 2, "Zero spreadsheets") from `min-h-[280px]` to `min-h-[320px]`:
  ```tsx
  // Cell 2 — BEFORE
  <div className="h-full min-h-[280px] bg-obsidian/50 rounded-2xl border border-sage/10 p-8 flex flex-col justify-between ...">

  // Cell 2 — AFTER
  <div className="h-full min-h-[320px] bg-obsidian/50 rounded-2xl border border-sage/10 p-8 flex flex-col justify-between ...">
  ```

- [ ] Check the bento grid visually — the middle top cell should be slightly taller, creating rhythm.

- [ ] Commit:
  ```bash
  git add src/components/Stats.tsx
  git commit -m "style: vary bento cell heights for visual rhythm in Stats"
  ```

---

## Task 15: Fix About page hero centering (anti-pattern audit)

**Files:**
- Modify: `src/components/AboutPage.tsx`

The About hero is `justify-center text-center` — same anti-center pattern as the landing page sections.

- [ ] Update the About hero section header (lines 12–42):
  ```tsx
  // BEFORE
  <section className="relative bg-obsidian min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-6 text-center overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(106,125,110,0.15),transparent_70%)]" />
    <div className="max-w-4xl relative z-10">

  // AFTER
  <section className="relative bg-obsidian min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(106,125,110,0.15),transparent_70%)]" />
    <div className="container-custom relative z-10">
  ```

  Also remove `text-center` classes from the eyebrow span and quote paragraph inside this section, and remove `mx-auto` from the quote:
  ```tsx
  // BEFORE
  className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-8 block"
  // AFTER
  className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-8 block"
  // (no change needed on span — it has no text-center)

  // Quote paragraph — BEFORE
  className="font-display font-light italic text-xl md:text-2xl text-silk/60 max-w-2xl mx-auto leading-relaxed"
  // AFTER
  className="font-display font-light italic text-xl md:text-2xl text-silk/60 max-w-2xl leading-relaxed"
  ```

  Also fix "How we think" section which is also centred:
  ```tsx
  // BEFORE (line 108)
  <h2 className="font-display text-5xl md:text-6xl text-center mb-20">How we think</h2>

  // AFTER
  <h2 className="font-display text-5xl md:text-6xl mb-20">How we think</h2>
  ```

- [ ] Commit:
  ```bash
  git add src/components/AboutPage.tsx
  git commit -m "fix: left-align About page hero and Principles headline"
  ```

---

## Task 16: Final verification pass

- [ ] Run `npm run lint` — expect zero TypeScript errors:
  ```bash
  cd "e:/PROJECT SWE/INZU/inzu-landing-page-v2-main" && npm run lint
  ```
  Expected: exits with code 0, no errors.

- [ ] Run `npm run build` — expect clean build:
  ```bash
  npm run build
  ```
  Expected: `dist/` produced, no warnings about missing modules.

- [ ] Manually check each fixed section at 375px (mobile) and 1280px (desktop):
  - Hero: no layout jump, float looks natural
  - Problem: numbered rows with border dividers, no equal cards
  - Solution: "liberated" (not "elevated"), left-aligned headline, taller visuals
  - HowItWorks: left-aligned headline and step content
  - Stats: middle bento cell is slightly taller
  - Pricing: left-aligned headline, no scale-105
  - Testimonials: hover/tap interactions still work
  - FinalCTA: side-by-side at desktop, stacked at mobile
  - Footer: email input has accessible label, bottom border is visible
  - RequestAccess: button grays out while loading, spinner shows

- [ ] Check with DevTools reduced-motion emulation: all SectionReveal animations skip instantly.

- [ ] Final commit:
  ```bash
  git add -A
  git commit -m "chore: final verification pass — all 16 UI/UX improvements complete"
  ```
