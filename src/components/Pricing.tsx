import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What happens if a tenant doesn't pay?",
    a: "Inzu sends automated reminders via WhatsApp at 3, 7, and 14 days overdue. You'll see the arrear flagged in your dashboard immediately and can escalate directly from the app.",
  },
  {
    q: "Is your 8% cut on top of mobile money fees?",
    a: "No. The 8% covers everything — collection, reconciliation, and platform access. Your tenants' transaction fees are absorbed within that.",
  },
  {
    q: "Do I have to switch how my tenants pay?",
    a: "No. Tenants pay via M-Pesa, card, or bank transfer — whatever they already use. Inzu reconciles all channels automatically.",
  },
  {
    q: "Can I cancel if it's not working?",
    a: "Yes, monthly with 30 days notice. There are no lock-in contracts. We earn your trust every month.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sage/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-body font-medium text-sm text-silk/80 group-hover:text-sage transition-colors pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-sage/60 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="font-body font-light text-sm text-silk/50 pb-5 leading-relaxed max-w-2xl">
          {a}
        </p>
      )}
    </div>
  );
}

const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-ivory">
      <div className="container-custom mb-20">
        <h2 className="font-display text-5xl md:text-7xl text-obsidian leading-tight max-w-3xl">
          Simple, <span className="italic">honest pricing.</span><br />
          No hidden fees. No agents.
        </h2>
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-8 max-w-5xl">
        {/* Individual Landlords */}
        <div className="bg-white p-12 rounded-2xl border border-forest/10 flex flex-col">
          <span className="text-[10px] font-body font-medium tracking-widest text-sage uppercase mb-8">
            FOR INDIVIDUAL LANDLORDS
          </span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-8xl text-forest tracking-tighter">8%</span>
          </div>
          <p className="text-sm text-obsidian/65 mb-2">of monthly rent collected</p>
          <p className="text-[12px] text-obsidian/50 mb-10">Every payment method your tenants already use. Every shilling accounted for.</p>

          <div className="space-y-4 mb-12 flex-1">
            {[
              "Collections via mobile money, card, or bank transfer",
              "AI maintenance triage",
              "Landlord transparency dashboard",
              "Automated tenant communication via WhatsApp",
              "Monthly financial reports"
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm font-light text-obsidian/65">
                <Check className="w-4 h-4 text-sage shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <Link to="/request-access" className="w-full py-4 rounded-full bg-forest text-silk font-medium hover:bg-obsidian transition-all text-center">
            Request Access
          </Link>
        </div>

        {/* Estates & Developers */}
        <div className="bg-forest p-12 rounded-2xl border border-sage/30 flex flex-col">
          <span className="text-[10px] font-body font-medium tracking-widest text-sage uppercase mb-8">
            FOR ESTATES & DEVELOPERS
          </span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display text-8xl text-silk tracking-tighter">Custom</span>
          </div>
          <p className="text-sm text-silk/70 mb-12">White-glove service for large portfolios.</p>

          <div className="space-y-4 mb-12 flex-1">
            {[
              "Everything in Professional",
              "Dedicated account manager",
              "Your own branded WhatsApp number",
              "Full data export & reporting suite",
              "Priority 24/7 AI support"
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-sm font-light text-silk/70">
                <Check className="w-4 h-4 text-sage shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <Link to="/request-access" className="w-full py-4 rounded-full bg-sage text-obsidian font-semibold hover:bg-silk transition-all text-center">
            Request Access
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-obsidian mt-24">
        <div className="container-custom py-20 max-w-3xl">
          <p className="font-body font-medium text-[10px] tracking-widest text-sage/60 uppercase mb-10">
            Common Questions
          </p>
          <div>
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
