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
