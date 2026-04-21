import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const steps = [
  {
    step: "1",
    title: "Portfolio Onboarding",
    body: "Share your unit list, current tenant details, and collection dates. Our team migrates your portfolio in 24 hours.",
  },
  {
    step: "2",
    title: "Tenants Activate",
    body: "Each tenant receives a personalised WhatsApp invite. They connect their preferred payment method and are ready to go.",
  },
  {
    step: "3",
    title: "You Observe, We Operate",
    body: "Open your app on the 5th. Collections are already in. There's one maintenance confirmation waiting. You tap approve. That took eleven seconds. That's the month done.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-32 bg-ivory relative overflow-hidden"
    >
      {/* Section header */}
      <div className="container-custom mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-5xl md:text-7xl text-obsidian leading-tight max-w-3xl"
        >
          Live in 48 hours.<br />
          No agent required.
        </motion.h2>
      </div>

      <div className="container-custom relative">

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block">

          {/* Animated connector line */}
          <div className="absolute top-6 left-0 w-full h-[1px] overflow-hidden">
            <div className="absolute inset-0 border-t border-dashed border-forest/15" />
            <motion.div
              className="absolute top-0 left-0 h-[1px] w-full bg-forest/40 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>

          {/* Steps grid */}
          <div className="grid lg:grid-cols-3 gap-16 relative z-10">
            {steps.map((item, idx) => (
              <div key={item.step} className="text-left">

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="w-12 h-12 rounded-full bg-forest text-silk flex items-center justify-center font-display font-semibold text-xl mb-8 shadow-[0_0_0_6px_rgba(50,83,61,0.1)]"
                >
                  <motion.span
                    initial={{ opacity: 0.4 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0.4 }}
                    transition={{ delay: 0.6 + idx * 0.25, duration: 0.4 }}
                  >
                    {item.step}
                  </motion.span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 + idx * 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="font-body font-medium text-xl text-obsidian mb-4"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.65 + idx * 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className="text-sm font-light text-ash leading-relaxed max-w-xs"
                >
                  {item.body}
                </motion.p>

              </div>
            ))}
          </div>

        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden relative">

          <div className="absolute left-5 top-0 bottom-0 w-[1px] overflow-hidden">
            <div className="absolute inset-0 border-l border-dashed border-forest/15" />
            <motion.div
              className="absolute top-0 left-0 w-[1px] h-full bg-forest/40 origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>

          <div className="flex flex-col gap-12 relative z-10">
            {steps.map((item, idx) => (
              <div key={item.step} className="flex items-start gap-8 pl-0">

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="w-10 h-10 rounded-full bg-forest text-silk flex items-center justify-center font-display font-semibold text-lg shrink-0 shadow-[0_0_0_5px_rgba(50,83,61,0.1)]"
                >
                  {item.step}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="pt-1"
                >
                  <h3 className="font-body font-medium text-lg text-obsidian mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-ash leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
