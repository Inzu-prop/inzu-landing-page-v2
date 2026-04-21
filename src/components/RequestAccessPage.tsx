import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

const RequestAccessPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      {/* Left Panel (40%) */}
      <div className="lg:w-[40%] bg-obsidian lg:fixed lg:inset-y-0 lg:left-0 p-8 lg:p-16 flex flex-col justify-between z-20">
        <div className="flex justify-between items-center lg:block">
          <Link to="/"><Logo className="h-8 lg:h-12" /></Link>
          <Link to="/" className="lg:hidden text-sage text-sm font-medium">Back</Link>
        </div>

        <div className="py-12 lg:py-0">
          <h2 className="font-display text-4xl lg:text-5xl text-silk leading-[1.1] mb-10">
            You're one step away from<br />
            never chasing rent again.
          </h2>
          <div className="space-y-4">
            {[
              "No agent required from day one",
              "Your tenant data stays private",
              "Live in 48 hours, not 48 days",
              "Cancel any time. We earn your trust monthly."
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-3 text-silk/65 text-sm font-light">
                <span className="text-sage text-[10px]">◆</span>
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <p className="font-display font-light italic text-silk/50 text-lg leading-relaxed mb-4">
            "I was sceptical. Then I saw the dashboard. I cancelled my agent's contract that afternoon."
          </p>
          <p className="font-body text-silk/40 text-xs uppercase tracking-widest">— David O., 12 units, Karen</p>
        </div>
      </div>

      {/* Right Panel (60%) */}
      <div className="lg:w-[60%] lg:ml-[40%] p-8 lg:p-20 bg-ivory">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-12">
                <h1 className="font-display text-4xl lg:text-5xl text-obsidian mb-4">Tell us about your portfolio.</h1>
                <p className="text-ash font-body font-light text-sm lg:text-base">We review every application. You'll hear back within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 max-w-xl">
                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">YOUR NAME</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors"
                  />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">EMAIL</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors"
                  />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">PHONE (WhatsApp preferred)</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors"
                  />
                  <p className="text-[10px] text-ash/60 mt-2 italic">We'll send your onboarding details here</p>
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">HOW MANY UNITS DO YOU MANAGE?</label>
                  <select className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors appearance-none cursor-pointer">
                    <option>1 – 3 units</option>
                    <option>4 – 10 units</option>
                    <option>11 – 25 units</option>
                    <option>26 – 50 units</option>
                    <option>50+ units (Enterprise)</option>
                  </select>
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">MONTHLY RENTAL INCOME (APPROX)</label>
                  <select className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors appearance-none cursor-pointer">
                    <option>KES 1M – 3M</option>
                    <option>KES 3M – 10M</option>
                    <option>KES 10M – 30M</option>
                    <option>KES 30M+</option>
                  </select>
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">HOW ARE YOU CURRENTLY MANAGING?</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. agent, self-managed, mixed..."
                    className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors placeholder:text-ash/30"
                  />
                  <p className="text-[10px] text-ash/60 mt-2 italic">Optional — helps us prepare your onboarding</p>
                </div>

                <div className="group relative">
                  <label className="block text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-1">HOW DID YOU FIND US?</label>
                  <select className="w-full bg-transparent border-b border-stone py-3 font-body text-obsidian focus:outline-none focus:border-forest transition-colors appearance-none cursor-pointer">
                    <option>Referral from another landlord</option>
                    <option>LinkedIn</option>
                    <option>Google search</option>
                    <option>Nairobi property community</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button
                    disabled={isLoading}
                    className="w-full py-5 rounded-full bg-forest text-silk font-medium text-sm hover:bg-obsidian transition-all flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
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
                  </button>
                  <p className="mt-6 text-[11px] text-stone text-center leading-relaxed">
                    By submitting, you agree to our Privacy Policy.<br />
                    We do not share your data with third parties. Ever.
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h1 className="font-display text-5xl lg:text-7xl text-obsidian mb-8">Application received.</h1>
              <p className="text-ash font-body font-light text-lg max-w-xl mx-auto mb-16 leading-relaxed">
                We'll review your portfolio details and reach out within 24 hours
                via the email and number you provided. Check your WhatsApp too.
              </p>

              <div className="max-w-3xl mx-auto">
                <p className="text-[10px] font-body font-medium tracking-widest text-ash uppercase mb-12">WHILE YOU WAIT — HERE'S WHAT ONBOARDING LOOKS LIKE</p>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { step: "1", title: "Review", body: "We verify your portfolio details" },
                    { step: "2", title: "Setup", body: "We migrate your units in 24h" },
                    { step: "3", title: "Launch", body: "Your tenants activate via WhatsApp" }
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="w-10 h-10 rounded-full border border-forest/20 flex items-center justify-center font-display text-obsidian mx-auto mb-4">
                        {item.step}
                      </div>
                      <h4 className="font-body font-medium text-sm mb-2">{item.title}</h4>
                      <p className="text-xs text-ash font-light">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RequestAccessPage;
