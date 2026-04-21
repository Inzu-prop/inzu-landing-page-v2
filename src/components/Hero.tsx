import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { InzuRequestButton } from "@/components/ui/button-with-icon";

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 lg:pt-28 overflow-hidden bg-obsidian">

      {/* Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_65%_35%,rgba(50,83,61,0.45)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_15%_85%,rgba(130,93,66,0.12)_0%,transparent_60%)]" />
      </div>

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

        {/* LEFT COLUMN */}
        <div className="flex flex-col">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase">
              PROPERTY MANAGEMENT REIMAGINED
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-silk leading-[0.93] tracking-tight mb-6"
            style={{ fontSize: 'clamp(52px, 6.5vw, 88px)' }}
          >
            Property that<br />
            <span className="text-sage italic">works</span> for you.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-body font-light text-silk/70 leading-relaxed mb-8"
            style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', maxWidth: '44ch' }}
          >
            Inzu handles everything your agent was supposed to —
            without the excuses, the delays, or the mystery.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-wrap items-center gap-5 mb-10"
          >
            <InzuRequestButton href="/request-access" label="Request Early Access" />
          </motion.div>

          {/* Social proof micro-line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-2"
          >
            <div className="w-1 h-1 rounded-full bg-sage shrink-0" />
            <p className="font-body text-[11px] text-silk/50">
              Trusted by 40+ premium Nairobi landlords in early access
            </p>
          </motion.div>

        </div>

        {/* RIGHT COLUMN — Dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1], delay: 0.6 }}
          className="relative w-full mt-8 lg:mt-0"
        >
          <div className="animate-float rounded-2xl border border-sage/20 shadow-[0_0_60px_rgba(50,83,61,0.18)]">
            <div className="bg-obsidian/60 rounded-2xl p-5 lg:p-8 border border-sage/10 backdrop-blur-sm">

              {/* Window Chrome */}
              <div className="flex gap-1.5 mb-6 lg:mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-alert/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-sage/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone/40" />
              </div>

              <div className="space-y-5 lg:space-y-6">
                <div>
                  <p className="text-[10px] font-body text-sage uppercase tracking-wider mb-1">
                    Net Collections — October 2025
                  </p>
                  <h2 className="font-display text-4xl lg:text-5xl text-silk tracking-tighter">
                    KES 3,840,000
                  </h2>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-1.5 rounded-full bg-sage/10 border border-sage/20 text-[10px] text-sage">
                    ↑ 12% vs last month
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-stone/5 border border-stone/10 text-[10px] text-stone">
                    4 units · 0 arrears
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="flex items-end gap-2 h-20 pt-2" aria-hidden="true">
                  <div className="flex-1 bg-forest/30 rounded-t-sm h-[40%]" />
                  <div className="flex-1 bg-forest/50 rounded-t-sm h-[65%]" />
                  <div className="flex-1 bg-sage rounded-t-sm h-[90%]" />
                  <div className="flex-1 bg-forest/20 rounded-t-sm h-[30%]" />
                  <div className="flex-1 bg-forest/40 rounded-t-sm h-[55%]" />
                </div>

                {/* Recent Activity */}
                <div className="space-y-3 pt-4 border-t border-sage/10">
                  <div className="flex items-center gap-3 text-[11px] text-stone">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full shrink-0" />
                    <span className="flex-1 truncate">Rent received — Flat 3A · KES 195k</span>
                    <span className="opacity-40 shrink-0">just now</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-stone">
                    <div className="w-1.5 h-1.5 bg-sage rounded-full shrink-0" />
                    <span className="flex-1 truncate">AI scheduled plumber — Unit B4</span>
                    <span className="opacity-40 shrink-0">2:00 PM</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sage"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>

    </section>
  );
};

export default Hero;
