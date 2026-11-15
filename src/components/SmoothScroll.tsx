import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { cancelFrame, frame, type FrameData } from 'motion/react';
import 'lenis/dist/lenis.css';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false, lerp: .085, anchors: true });
    // Update native scroll before Motion reads it, using one shared frame loop.
    const update = ({ timestamp }: FrameData) => lenis.raf(timestamp);
    frame.setup(update, true);
    return () => { cancelFrame(update); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
