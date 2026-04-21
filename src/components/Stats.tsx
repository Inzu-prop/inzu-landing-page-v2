import { motion } from 'motion/react';
import SectionReveal from './SectionReveal';

const Stats = () => {
  return (
    <section className="py-24 bg-obsidian overflow-hidden">
      <div className="container-custom">

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-3">

          {/* CELL 1: 48hrs */}
          <SectionReveal delay={0} className="lg:col-span-2">
            <div className="h-full min-h-[280px] bg-forest/25 rounded-2xl border border-sage/15 p-8 flex flex-col justify-between group hover:bg-forest/35 hover:border-sage/30 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-sage/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-sage/10 border border-sage/20 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                </div>
                <span className="font-display text-6xl text-sage tracking-tight leading-none block mb-3">
                  48hrs
                </span>
                <p className="font-body font-medium text-sm text-silk leading-snug">
                  To go live from signup
                </p>
              </div>

              <p className="font-body font-light text-xs text-silk/35 leading-relaxed relative z-10">
                Our team migrates your portfolio. You don't lift a finger.
              </p>
            </div>
          </SectionReveal>

          {/* CELL 2: Zero spreadsheets */}
          <SectionReveal delay={0.08} className="lg:col-span-2">
            <div className="h-full min-h-[320px] bg-obsidian/50 rounded-2xl border border-sage/10 p-8 flex flex-col justify-between group hover:border-sage/25 hover:bg-obsidian/70 transition-all duration-300 relative overflow-hidden">

              <div className="flex items-end gap-1.5 h-16 mb-6" aria-hidden="true">
                {[35, 55, 45, 70, 60, 85, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 rounded-t-sm"
                    style={{
                      background: i === 6
                        ? 'rgba(144,180,148,0.9)'
                        : `rgba(144,180,148,${0.1 + i * 0.04})`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <span className="font-display text-6xl text-silk tracking-tight leading-none block mb-3">
                  Zero
                </span>
                <p className="font-body font-medium text-sm text-silk leading-snug">
                  Spreadsheets required
                </p>
              </div>

              <p className="font-body font-light text-xs text-silk/35 leading-relaxed">
                Everything lives in one dashboard. Always real-time.
              </p>
            </div>
          </SectionReveal>

          {/* CELL 3: 100% visibility */}
          <SectionReveal delay={0.16} className="lg:col-span-2">
            <div className="h-full min-h-[280px] bg-obsidian/50 rounded-2xl border border-sage/10 p-8 flex flex-col justify-between group hover:border-sage/25 hover:bg-obsidian/70 transition-all duration-300 relative overflow-hidden">

              <div className="flex items-center gap-2 mb-6 h-16">
                <div className="w-10 h-10 rounded-lg bg-obsidian border border-sage/20 flex items-center justify-center text-[9px] text-silk/50 font-body shrink-0">
                  Tenant
                </div>
                <div className="flex-1 h-px border-t border-dashed border-sage/25 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-[3px] w-1.5 h-1.5 bg-sage rounded-full"
                  />
                </div>
                <div className="w-10 h-10 rounded-lg bg-sage/15 border border-sage/30 flex items-center justify-center text-[9px] text-sage font-body shrink-0">
                  Inzu
                </div>
                <div className="flex-1 h-px border-t border-dashed border-sage/25 relative overflow-hidden">
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 0.9 }}
                    className="absolute -top-[3px] w-1.5 h-1.5 bg-sage rounded-full"
                  />
                </div>
                <div className="w-10 h-10 rounded-lg bg-obsidian border border-sage/20 flex items-center justify-center text-[9px] text-silk/50 font-body shrink-0">
                  You
                </div>
              </div>

              <div className="relative z-10">
                <span className="font-display text-6xl text-silk tracking-tight leading-none block mb-3">
                  100%
                </span>
                <p className="font-body font-medium text-sm text-silk leading-snug">
                  Collections visibility
                </p>
              </div>

              <p className="font-body font-light text-xs text-silk/35 leading-relaxed">
                Every shilling tracked the moment it clears.
              </p>
            </div>
          </SectionReveal>

          {/* CELL 4: One tap */}
          <SectionReveal delay={0.22} className="sm:col-span-2 lg:col-span-3">
            <div className="h-full min-h-[200px] bg-obsidian/50 rounded-2xl border border-sage/10 p-8 flex flex-col sm:flex-row sm:items-center gap-8 group hover:border-sage/25 hover:bg-obsidian/70 transition-all duration-300 relative overflow-hidden">

              <div className="flex flex-col gap-2 shrink-0 sm:w-48">
                <div className="self-end bg-obsidian/80 border border-sage/10 px-3 py-2 rounded-2xl rounded-tr-none text-[10px] text-silk/50 max-w-[160px]">
                  Leaking tap in Unit B4.
                </div>
                <div className="self-start bg-sage/15 border border-sage/20 px-3 py-2 rounded-2xl rounded-tl-none text-[10px] text-sage max-w-[160px]">
                  Plumber confirmed 2PM ✓
                </div>
              </div>

              <div>
                <span className="font-display text-5xl text-silk tracking-tight leading-none block mb-3">
                  One tap
                </span>
                <p className="font-body font-medium text-sm text-silk leading-snug mb-2">
                  To approve maintenance
                </p>
                <p className="font-body font-light text-xs text-silk/35 leading-relaxed">
                  We find the contractor, schedule, and confirm. You just approve.
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* CELL 5: Editorial statement */}
          <SectionReveal delay={0.30} className="sm:col-span-2 lg:col-span-3">
            <div className="h-full min-h-[200px] bg-forest/15 rounded-2xl border border-sage/10 p-8 flex flex-col justify-between group hover:border-sage/20 hover:bg-forest/20 transition-all duration-300">

              <div className="w-8 h-px bg-sage/30 mb-6" />

              <blockquote className="font-display font-light text-xl md:text-2xl text-silk/60 leading-relaxed">
                "We are not modernising the property agent.{" "}
                <span className="text-silk not-italic font-normal">
                  We are making him unnecessary."
                </span>
              </blockquote>

              <p className="text-[10px] font-body font-medium tracking-[0.2em] text-sage/50 uppercase mt-6">
                Inzu — Nairobi, 2026
              </p>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
};

export default Stats;
