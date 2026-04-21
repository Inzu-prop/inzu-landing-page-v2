import { EyeOff, Wrench, UserMinus, type LucideIcon } from 'lucide-react';
import SectionReveal from './SectionReveal';

const problems: { icon: LucideIcon; num: string; title: string; body: string }[] = [
  {
    icon: EyeOff,
    num: '01',
    title: 'No Real-Time Visibility',
    body: "Reconciled reports arrive weeks late. You never know your actual collections vs arrears until it's too late to act.",
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
    body: "Your entire KES 1M+ monthly portfolio depends on an individual whose process is opaque, unscalable, and entirely replaceable — by software.",
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
                <div className="py-8 group flex items-start gap-6 transition-colors duration-200">
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
