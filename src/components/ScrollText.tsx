import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

function RevealWord({ word, index, total, progress, emphasized }: { key?: number; word: string; index: number; total: number; progress: MotionValue<number>; emphasized: boolean }) {
  const start = (index / total) * .7;
  const opacity = useTransform(progress, [start, Math.min(start + .3, 1)], [.38, 1]);
  const y = useTransform(progress, [start, Math.min(start + .3, 1)], [8, 0]);
  return <motion.span className={emphasized ? 'lp-scroll-word is-emphasized' : 'lp-scroll-word'} style={{ opacity, y }}>{word}</motion.span>;
}

export function ManifestoText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 45%'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: .7 });
  const first = 'Property comes with a lot of moving parts.';
  const second = 'Keeping track of them should feel a little more human.';
  const words = [...first.split(' '), ...second.split(' ')];
  const firstLength = first.split(' ').length;
  return <p ref={ref} aria-label={`${first} ${second}`}>
    {reduced ? <span aria-hidden="true">{first} <strong>{second}</strong></span> : <span aria-hidden="true">{words.map((word, i) => <RevealWord key={i} word={word} index={i} total={words.length} progress={smoothProgress} emphasized={i >= firstLength} />)}</span>}
  </p>;
}

export function HeadingReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, amount: .2 });
  const reduced = useReducedMotion();
  return <motion.span ref={ref} className="lp-heading-reveal" initial={reduced ? false : { opacity: 0, y: 14 }} animate={reduced || visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.span>;
}

function BurstLetter({ char, index, length, progress }: { key?: number; char: string; index: number; length: number; progress: MotionValue<number> }) {
  // CharacterV1 from the supplied Skiper UI example: spread and rotate into place.
  const distance = index - Math.floor(length / 2);
  const x = useTransform(progress, [0, 1], [distance * 50, 0]);
  const rotateX = useTransform(progress, [0, 1], [distance * 50, 0]);
  return <motion.span className={`lp-burst-letter${char === ' ' ? ' lp-burst-space' : ''}`} style={{ x, rotateX }}>{char}</motion.span>;
}

function BurstLine({ text, progress }: { text: string; progress: MotionValue<number> }) {
  return <span className="lp-burst-line">{Array.from(text).map((char, index) => <BurstLetter key={index} char={char} index={index} length={text.length} progress={progress} />)}</span>;
}

export function PricingSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  // Assemble as the headline moves from the bottom of the viewport to its center.
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ['center end', 'center center'] });
  return <section className="lp-pricing" id="pricing"><div className="lp-pricing-stage">
    <h2><span ref={ref} className="lp-pricing-burst" aria-label="A better view starts with a conversation.">
    {reduced ? <span aria-hidden="true">A better view starts<br /><em>with a conversation.</em></span> : <span aria-hidden="true"><BurstLine text="A better view starts" progress={progress} /><em><BurstLine text="with a conversation." progress={progress} /></em></span>}
    </span></h2>
    <div className="lp-pricing-details">{children}</div>
  </div></section>;
}
