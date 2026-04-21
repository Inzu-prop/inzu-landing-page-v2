import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InzuTestimonialProps {
  quote: string;
  name: string;
  detail: string;       // e.g. "7 units · Westlands"
  initials: string;     // e.g. "JM" — shown in avatar circle
  className?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
  key?: React.Key;
}

// ─── Single Card ──────────────────────────────────────────────────────────────

function TestimonialCard({
  quote,
  name,
  detail,
  initials,
  className,
  onHover,
  onLeave,
  isActive,
  onTap,
}: InzuTestimonialProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && !isActive) {
      e.preventDefault();
      onTap?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        // Base card styles — Inzu brand
        "relative flex flex-col [grid-area:stack]",
        "w-[300px] sm:w-[420px] min-h-[200px]",
        "rounded-2xl p-7 sm:p-9",
        "bg-white border border-forest/8",
        "shadow-[0_4px_24px_rgba(50,83,61,0.07)]",
        "-skew-y-[6deg] select-none",
        "cursor-pointer transition-all duration-500",
        // Hover: lift and sharpen border
        "hover:shadow-[0_8px_40px_rgba(50,83,61,0.14)] hover:border-sage/30",
        // Active ring on mobile tap
        isActive && "ring-2 ring-sage/40",
        className
      )}
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute top-5 left-7 font-display text-7xl text-forest/8 leading-none select-none pointer-events-none"
        aria-hidden
      >
        ❝
      </span>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-5 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-sage text-sage" />
        ))}
      </div>

      {/* Quote */}
      <p className="font-display font-light italic text-base sm:text-lg text-obsidian leading-relaxed mb-7 relative z-10 line-clamp-4">
        "{quote}"
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-3 mt-auto relative z-10">
        {/* Avatar circle */}
        <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center shrink-0">
          <span className="text-[10px] font-body font-medium text-silk tracking-wider">
            {initials}
          </span>
        </div>
        <div>
          <p className="font-body font-medium text-sm text-obsidian leading-none mb-0.5">
            {name}
          </p>
          <p className="font-body font-light text-xs text-ash">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stacked Container ────────────────────────────────────────────────────────

const testimonialData: Omit<InzuTestimonialProps, "onHover" | "onLeave" | "isActive" | "onTap">[] = [
  {
    // Back card
    quote: "As someone who was very skeptical of 'proptech,' Inzu changed how I think about my portfolio. It finally feels institutional.",
    name: "David O.",
    detail: "12 units · Karen · Enterprise",
    initials: "DO",
    className: [
      "[grid-area:stack]",
      // Dimmed + greyscale until hovered
      "before:absolute before:inset-0 before:rounded-2xl before:bg-white/50 before:transition-opacity before:duration-500",
      "grayscale-[80%] hover:grayscale-0 hover:before:opacity-0",
      "hover:-translate-y-10",
    ].join(" "),
  },
  {
    // Middle card
    quote: "The AI maintenance feature alone is worth it. I haven't spoken to a plumber or electrician directly in four months.",
    name: "Aisha K.",
    detail: "7 units · Westlands",
    initials: "AK",
    className: [
      "[grid-area:stack]",
      "translate-x-8 sm:translate-x-14 translate-y-6 sm:translate-y-10",
      "before:absolute before:inset-0 before:rounded-2xl before:bg-white/40 before:transition-opacity before:duration-500",
      "grayscale-[50%] hover:grayscale-0 hover:before:opacity-0",
      "hover:-translate-y-2",
    ].join(" "),
  },
  {
    // Front card — fully visible by default
    quote: "I used to dread the 5th of every month. Now I just open the app. My collections were up 18% in the second month alone.",
    name: "James M.",
    detail: "3 units · Kilimani",
    initials: "JM",
    className: [
      "[grid-area:stack]",
      "translate-x-16 sm:translate-x-28 translate-y-12 sm:translate-y-20",
      "hover:translate-y-8 sm:hover:translate-y-14",
    ].join(" "),
  },
];

function TestimonialStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCardClassName = (index: number, base: string) => {
    const focused = hoveredIndex ?? activeIndex;
    // When back card (0) is hovered, push middle and front down/right
    if (focused === 0 && index === 1)
      return base + " !translate-y-20 sm:!translate-y-32 !translate-x-12 sm:!translate-x-20";
    if (focused === 0 && index === 2)
      return base + " !translate-y-28 sm:!translate-y-44 !translate-x-20 sm:!translate-x-36";
    // When middle card (1) is hovered, push front down
    if (focused === 1 && index === 2)
      return base + " !translate-y-24 sm:!translate-y-40 !translate-x-20 sm:!translate-x-36";
    return base;
  };

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-start">
      {testimonialData.map((card, index) => (
        <TestimonialCard
          key={index}
          {...card}
          className={getCardClassName(index, card.className || "")}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          isActive={activeIndex === index}
          onTap={() => setActiveIndex(activeIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

// ─── Full Section (drop-in replacement for your Testimonials section) ─────────

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-ivory overflow-hidden">
      <div className="container-custom">

        {/* Two-column layout: headline left, stack right */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — headline + context */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
              EARLY ACCESS LANDLORDS
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-obsidian leading-tight tracking-tight mb-8">
              What they said
              <br />
              <span className="italic">after month one.</span>
            </h2>
            <p className="font-body font-light text-ash text-base leading-relaxed max-w-sm mb-10">
              Hover the cards to read each story.
              On mobile, tap to reveal.
            </p>

            {/* Small trust signal */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["JM", "AK", "DO"].map((init) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full bg-forest border-2 border-ivory flex items-center justify-center"
                  >
                    <span className="text-[9px] font-body font-medium text-silk">{init}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-ash font-light">
                40+ landlords in early access
              </p>
            </div>
          </motion.div>

          {/* Right — stacked cards */}
          {/* Extra padding-bottom so the stacked offset doesn't clip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-start justify-center lg:justify-start pb-28 sm:pb-36 pt-4"
          >
            <TestimonialStack />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
