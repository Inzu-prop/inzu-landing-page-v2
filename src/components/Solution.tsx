import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import SectionReveal from './SectionReveal';

const Solution = () => {
  return (
    <section className="py-32 bg-forest">
      <div className="container-custom mb-20">
        <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
          THE SOLUTION
        </span>
        <h2 className="font-display text-5xl md:text-8xl text-silk leading-tight max-w-4xl">
          Your agent, <span className="italic">replaced.</span><br />
          Your portfolio, <span className="text-sage italic">liberated.</span>
        </h2>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-8">
        {[
          {
            num: "01",
            title: "Pay Any Way. Reconciled Instantly.",
            body: "Tenants pay however they prefer — mobile money, card, or bank transfer. Every payment lands in your dashboard the moment it clears, with a full audit trail. No chasing. No manual reconciliation. No surprises at month end.",
            visual: (
              <div className="mt-8 flex items-center justify-between px-4 h-16">
                <div className="w-12 h-12 rounded-lg bg-obsidian flex items-center justify-center text-[10px] text-silk">Tenant</div>
                <div className="flex-1 border-t border-dashed border-sage/30 relative mx-2">
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-1 w-2 h-2 bg-sage rounded-full"
                  />
                </div>
                <div className="w-12 h-12 rounded-lg bg-sage/20 border border-sage/30 flex items-center justify-center text-[10px] text-sage">INZU</div>
                <div className="flex-1 border-t border-dashed border-sage/30 relative mx-2">
                  <motion.div
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
                    className="absolute -top-1 w-2 h-2 bg-sage rounded-full"
                  />
                </div>
                <div className="w-12 h-12 rounded-lg bg-obsidian flex items-center justify-center text-[10px] text-silk">You</div>
              </div>
            )
          },
          {
            num: "02",
            title: "Everything, In One Place",
            body: "One screen tells you everything worth knowing. What's been paid, what's outstanding, which unit is underperforming, and what your net yield looks like this month. No spreadsheets. No calls to an agent who hasn't checked either.",
            visual: (
              <div className="mt-8 h-24 flex items-end gap-1" aria-hidden="true">
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
            )
          },
          {
            num: "03",
            title: "Maintenance That Actually Gets Done",
            body: "When something breaks, your tenant messages on WhatsApp. Inzu logs it, finds the right contractor, and sends you a single message: confirm or decline. You make one tap. The rest happens. No phone calls, no follow-ups, no wondering if it was fixed.",
            visual: (
              <div className="mt-8 flex flex-col gap-2 min-h-[80px] justify-end">
                <div className="self-end bg-obsidian p-3 rounded-2xl rounded-tr-none text-[10px] text-silk/60 max-w-[80%]">
                  Leaking tap in Unit B4. Photo attached.
                </div>
                <div className="self-start bg-sage/20 border border-sage/30 p-3 rounded-2xl rounded-tl-none text-[10px] text-sage max-w-[80%]">
                  Plumber scheduled for 2:00 PM. Confirm? ✓
                </div>
              </div>
            )
          },
          {
            num: "04",
            title: "Tenants Who Stay",
            body: "Your tenants never log into a new app. They get a WhatsApp message when rent is due, when maintenance is confirmed, when you need something. It's familiar, it's fast, and it makes them feel looked after. Happy tenants don't leave. And when they do, Inzu handles offboarding too.",
            visual: (
              <div className="mt-8 flex items-center gap-3 p-4 bg-obsidian rounded-xl border border-sage/10 min-h-[64px]">
                <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sage text-[10px]">IN</div>
                <div className="flex-1">
                  <div className="h-2 w-20 bg-silk/20 rounded mb-1" />
                  <div className="h-1.5 w-32 bg-silk/10 rounded" />
                </div>
                <CheckCircle2 className="w-4 h-4 text-sage" />
              </div>
            )
          }
        ].map((feature, idx) => (
          <SectionReveal key={idx} delay={idx * 0.1}>
            <div className="bg-obsidian/50 p-10 rounded-2xl border border-sage/15 hover:border-sage/35 hover:bg-obsidian/65 transition-all duration-200 text-left group h-full flex flex-col">
              <span className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-6 block">
                {feature.num}
              </span>
              <h3 className="font-display text-2xl text-silk mb-4">{feature.title}</h3>
              <p className="text-sm font-light text-silk/60 leading-relaxed mb-auto">
                {feature.body}
              </p>
              {feature.visual}
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
};

export default Solution;
