import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import SectionReveal from './SectionReveal';
import { InzuRequestButton } from "@/components/ui/button-with-icon";

const AboutPage = () => {
  return (
    <div className="bg-ivory">
      <Navbar />
      {/* Section A — ABOUT HERO */}
      <section className="relative bg-obsidian min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(106,125,110,0.15),transparent_70%)]" />

        <div className="container-custom relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-body font-medium tracking-[0.2em] text-sage uppercase mb-8 block"
          >
            OUR STORY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-silk leading-[1.0] mb-8"
          >
            We built what we<br />
            <span className="italic">wished existed.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display font-light italic text-xl md:text-2xl text-silk/60 max-w-2xl leading-relaxed"
          >
            "Every landlord we spoke to had the same story. A great agent once,
            then a gap, then months of excuses, then a hard lesson about trust."
          </motion.p>
        </div>
      </section>

      {/* Section B — THE ORIGIN STORY */}
      <section className="py-32 bg-ivory overflow-hidden">
        <div className="container-custom space-y-32">
          {/* Chapter 01 */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center relative">
            <div className="relative">
              <span className="font-display text-[120px] lg:text-[180px] text-stone/40 leading-none absolute -top-12 -left-4 lg:-left-12 select-none">
                01
              </span>
              <h3 className="font-display text-4xl text-obsidian relative z-10 uppercase tracking-tight">CHAPTER 01 — The Origin</h3>
            </div>
            <div className="text-lg font-body font-light text-ash leading-relaxed max-w-xl">
              <p className="mb-6">For years, we managed our own properties the way everyone does in Nairobi — through an agent, on faith, and with a lot of patience we probably shouldn't have extended.</p>
              <p className="mb-6">
                The month we realised we hadn't seen our actual figures in three months wasn't a surprise. It was just the moment we finally admitted the system was broken.
              </p>
              <p className="mb-6">
                We were paying for a service. We were getting silence.
              </p>
              <p>We started asking other landlords. Nobody had a better story.</p>
            </div>
          </div>

          {/* Chapter 02 */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center relative">
            <div className="text-lg font-body font-light text-ash leading-relaxed max-w-xl order-2 lg:order-1">
              <p className="mb-6">Inzu is not a marketplace. It is not a CRM. It is not another app your tenant has to download and forget about.</p>
              <p className="mb-6">
                It is the part that runs quietly in the background — payments, maintenance, communication — so that you never have to think about it.
              </p>
              <p className="mb-6">
                Tenants use WhatsApp, the way they already communicate. You see everything in a dashboard that tells the truth in real time. The AI handles the rest, without being asked twice.
              </p>
              <p>We are not trying to modernise the property agent. We are making the property agent unnecessary.</p>
            </div>
            <div className="relative order-1 lg:order-2 text-right">
              <span className="font-display text-[120px] lg:text-[180px] text-stone/40 leading-none absolute -top-12 -right-4 lg:-right-12 select-none">
                02
              </span>
              <h3 className="font-display text-4xl text-obsidian relative z-10 uppercase tracking-tight">CHAPTER 02 — What We Built</h3>
            </div>
          </div>

          {/* Chapter 03 */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center relative">
            <div className="relative">
              <span className="font-display text-[120px] lg:text-[180px] text-stone/40 leading-none absolute -top-12 -left-4 lg:-left-12 select-none">
                03
              </span>
              <h3 className="font-display text-4xl text-obsidian relative z-10 uppercase tracking-tight">CHAPTER 03 — Who We Built It For</h3>
            </div>
            <div className="text-lg font-body font-light text-ash leading-relaxed max-w-xl">
              <p className="mb-6">Landlords who have been burned once.</p>
              <p className="mb-6">Who've had to apologise to a tenant for a repair that was "scheduled" three weeks ago. Who check their phone on the 8th hoping the money is there. Who manage their portfolio from between meetings, on a phone, across time zones.</p>
              <p className="mb-6">These are not people who need another app. They need a system that works without them.</p>
              <p>That is what we are building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section C — THE PRINCIPLES */}
      <section className="py-32 bg-obsidian text-silk">
        <div className="container-custom">
          <h2 className="font-display text-5xl md:text-6xl mb-20">How we think</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Invisibility",
                body: "The best property management is the kind you forget exists. If you're thinking about Inzu, we haven't done our job yet."
              },
              {
                title: "Honesty",
                body: "Every shilling is traceable. Every timestamp is real. We have no interest in telling you what you want to hear — only what is true."
              },
              {
                title: "Craft",
                body: "We believe that software built for serious people should feel serious. Not intimidating. Not flashy. Just built properly, with care, down to the details you'll never notice because they're exactly right."
              }
            ].map((p, idx) => (
              <SectionReveal key={idx} delay={idx * 0.1}>
                <div className="bg-forest/20 p-10 rounded-2xl border border-sage/10 backdrop-blur-sm hover:border-sage/40 hover:bg-forest/30 hover:shadow-[0_20px_40px_rgba(144,180,148,0.05)] hover:-translate-y-2 transition-all duration-500 h-full">
                  <h4 className="font-display text-2xl text-sage mb-4">{p.title}</h4>
                  <p className="text-sm font-light text-silk/60 leading-relaxed">{p.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section D — THE TEAM */}
      <section className="py-32 bg-obsidian text-silk text-center">
        <div className="container-custom">
          <p className="font-display text-3xl md:text-4xl italic mb-4">A small team in Nairobi, building for Nairobi.</p>
          <div className="w-20 h-[1px] bg-sage/30 mx-auto" />
        </div>
      </section>

      {/* Section E — ABOUT PAGE CTA */}
      <section className="py-32 bg-obsidian text-silk text-center border-t border-sage/10">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-5xl mb-12">
            If this sounds like what you've been looking for,<br />
            <span className="italic">we should talk.</span>
          </h2>
          <InzuRequestButton href="/request-access" label="Request Early Access" />
          <p className="mt-8 text-sm text-sage/60">Or reach us directly at hello@inzu.co</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
