import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { TabbiedPattern } from 'tabbied/react';
import radius from 'tabbied/patterns/radius';
import blossom from 'tabbied/patterns/blossom';
import veil from 'tabbied/patterns/veil';
import BrandMark from './BrandMark';
import Aurora from './Aurora';
import wordmark from '../assets/inzu-wordmark-canva.svg';
import './landing.css';

const ArrowLink = ({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) =>
  <Link className={`lp-button ${light ? 'lp-button-light' : ''}`} to={to}><span className="lp-button-label">{children}</span><span className="lp-button-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></Link>;

// The shapes and paths are decorative and do not affect the document order.
export function PanelCorners({ bottom = false }: { bottom?: boolean }) {
  return <div className={`lp-corners ${bottom ? 'lp-corners-bottom' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 80 80"><path d="M0 0H80C60 0 60 9 60 21V25C60 43 48 52 32 52H27C10 52 0 62 0 80Z" /></svg>
    <svg viewBox="0 0 80 80"><path d="M0 0H80C60 0 60 9 60 21V25C60 43 48 52 32 52H27C10 52 0 62 0 80Z" /></svg>
  </div>;
}

function FinalThread() {
  return <svg className="lp-final-thread" viewBox="0 0 1200 850" preserveAspectRatio="none" aria-hidden="true"><path d="M600 0 V40 Q600 54 610 63 L780 230 Q788 238 800 238 H850 Q862 238 870 246 L1010 385 Q1020 395 1020 408 V850" fill="none" stroke="#f5f7f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /><circle cx="1020" cy="510" r="15" fill="#14291b" stroke="#f5f7f6" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><circle cx="1020" cy="510" r="3" fill="#f5f7f6" /></svg>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className={`lp-header ${scrolled && !open ? 'is-compact' : ''} ${open ? 'is-open' : ''}`}>
    <nav className="lp-nav" aria-label="Main navigation">
      <BrandMark />
      <div className="lp-nav-links"><Link to="/#pricing">Pricing</Link><Link to="/about">About</Link></div>
      <div className="lp-nav-actions"><a href="https://app.inzu.co/sign-in">Sign in</a></div>
      <button className="lp-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="landing-mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div className="lp-mobile-menu" id="landing-mobile-menu"><Link onClick={() => setOpen(false)} to="/#pricing">Pricing</Link><Link onClick={() => setOpen(false)} to="/about">About</Link><a href="https://app.inzu.co/sign-in">Sign in</a></div>}
  </header>;
}

function Dashboard({ anchorRef }: { anchorRef: RefObject<HTMLDivElement | null> }) {
  return <div ref={anchorRef} className="lp-dashboard" aria-label="Illustrative portfolio dashboard">
    <div className="dash-top"><span className="dash-logo">inzu<span>.</span></span><span>Portfolio overview</span><span className="dash-dot">●</span></div>
    <div className="dash-greeting"><div><span className="dash-label">YOUR PORTFOLIO</span><h3>A clearer picture,<br />all in one place.</h3></div><span className="dash-example">ILLUSTRATIVE VIEW</span></div>
    <div className="dash-cards"><div><span>Properties</span><strong>04</strong><small>Across your portfolio</small></div><div><span>Occupancy</span><strong>92<span>%</span></strong><small>At a glance</small></div><div><span>Open requests</span><strong>03</strong><small>For your attention</small></div></div>
    <div className="dash-bottom"><div><span className="dash-label">PORTFOLIO ACTIVITY</span><h4>Everything in its place.</h4><p>See the details behind your properties, tenants and records.</p></div><div className="dash-chart" aria-hidden="true">{[38,56,46,70,58,80,66,90,76].map((n,i)=><i key={i} style={{height:`${n}%`}} />)}</div></div>
  </div>;
}

const features = [
  { number: '01', highlight: 'See', title: 'the whole picture', description: 'Keep properties, units and portfolio information together, so the details are easier to find.', pattern: radius, seed: 'inzu-home', palette: ['#e5ece1', '#32533d', '#90b494', '#c4d5b7', '#f4f6e9', '#ff704a'] },
  { number: '02', highlight: 'Track', title: 'the numbers', description: 'Bring invoices, payment records and financial views into your day-to-day workflow.', pattern: veil, seed: 'inzu-ledger', palette: ['#284a35', '#90b494', '#e5ece1', '#597e5f', '#f5f7f1', '#ff704a'] },
  { number: '03', highlight: 'Stay close', title: 'to what matters', description: 'Keep tenant details and maintenance records in view as your portfolio grows.', pattern: blossom, seed: 'inzu-people', palette: ['#f5efe2', '#32533d', '#90b494', '#efb48f', '#ff704a', '#d4e2c7'] },
];

function FeatureStories({ firstPatternRef }: { firstPatternRef: RefObject<HTMLDivElement | null> }) {
  return <section className="lp-stories lp-panel lp-shaped">
    <div className="lp-story-intro"><h2>Less searching.<br />More knowing.</h2><p>A place for the records and conversations that keep a property moving.</p></div>
    <div className="lp-feature-track">{features.map(({ number, highlight, title, description, pattern, seed, palette }, index) => <article className="lp-feature-row" key={number}>
      <div className="lp-pattern-node" aria-hidden="true"><div ref={index === 0 ? firstPatternRef : undefined} className="lp-pattern-frame"><div className="lp-pattern-motion"><TabbiedPattern pattern={pattern} seed={seed} palette={palette} fit="cover" options={{ grid: '4x6' }} /></div></div>{index < features.length - 1 && <svg className="lp-node-link" viewBox="0 0 64 100" preserveAspectRatio="none"><path d="M0 0 C20 0 31 0 31 28 V72 C31 100 20 100 0 100 H64 C44 100 33 100 33 72 V28 C33 0 44 0 64 0 Z" /></svg>}</div>
      <div className="lp-feature-copy"><h3><mark>{highlight}</mark> {title}</h3><p>{description}</p></div>
    </article>)}</div>
    <div className="lp-story-image"><span>ROOM TO GROW / INZU</span></div><PanelCorners bottom />
  </section>;
}

function FeatureFlow() {
  const container = useRef<HTMLDivElement>(null);
  const dashboard = useRef<HTMLDivElement>(null);
  const firstPattern = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<{ width: number; height: number; x1: number; y1: number; x2: number; y2: number } | null>(null);
  useLayoutEffect(() => {
    const host = container.current, from = dashboard.current, to = firstPattern.current;
    if (!host || !from || !to) return;
    let frame = 0;
    const measure = () => {
      const bounds = host.getBoundingClientRect(), a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
      setRoute({ width: bounds.width, height: bounds.height, x1: a.left + a.width / 2 - bounds.left, y1: a.bottom - bounds.top, x2: b.left + b.width / 2 - bounds.left, y2: b.top - bounds.top });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    [host, from, to].forEach(element => observer.observe(element));
    window.addEventListener('resize', schedule);
    measure();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('resize', schedule); };
  }, []);
  return <div className="lp-feature-flow" ref={container}>
    {route && <svg className="lp-measured-thread" viewBox={`0 0 ${route.width} ${route.height}`} aria-hidden="true"><path d={`M ${route.x1} ${route.y1} C ${route.x1} ${route.y1 + 45}, ${route.x2} ${route.y2 - 75}, ${route.x2} ${route.y2 - 27}`} fill="none" stroke="#d5dfd2" strokeWidth="2" /><path d={`M ${route.x2 - 32} ${route.y2 + 1} C ${route.x2 - 12} ${route.y2 + 1}, ${route.x2 - 1} ${route.y2 + 1}, ${route.x2 - 1} ${route.y2 - 28} L ${route.x2 + 1} ${route.y2 - 28} C ${route.x2 + 1} ${route.y2 + 1}, ${route.x2 + 12} ${route.y2 + 1}, ${route.x2 + 32} ${route.y2 + 1} Z`} fill="#d5dfd2" /></svg>}
    <section className="lp-overview lp-panel lp-shaped" id="features"><PanelCorners /><div className="lp-overview-heading"><div><h2>Your portfolio.<br /><em>In perspective.</em></h2></div><p>From the big picture to the details, bring the information you need together in one considered space.</p></div><Dashboard anchorRef={dashboard} /><div className="lp-overview-tail"><div className="lp-overview-foot"><span>DESIGNED FOR A CLEARER DAY-TO-DAY</span><span>ONE PORTFOLIO, MANY MOVING PARTS ↗</span></div></div><PanelCorners bottom /></section>
    <FeatureStories firstPatternRef={firstPattern} />
  </div>;
}

export default function Landing() {
  return <div className="lp"><a className="lp-skip" href="#main">Skip to content</a><Header /><main id="main">
    <section className="lp-hero lp-panel">
      <div className="lp-hero-copy"><h1>Make room for <em>better</em> property management.</h1><p>Meet Inzu. A clearer way to keep up with your properties, tenants and finances, all in one place.</p><div className="lp-hero-actions"><ArrowLink to="/request-access">Get to know <img className="lp-button-wordmark" src={wordmark} alt="Inzu" /></ArrowLink></div></div>
      <PanelCorners bottom />
    </section>

    <section className="lp-manifesto" id="how-it-works"><div className="lp-hero-thread" aria-hidden="true"><span className="lp-thread-line" /><svg className="lp-thread-flare lp-thread-top" viewBox="0 0 64 28"><path d="M0 0 C20 0 31 0 31 28 H33 C33 0 44 0 64 0 Z" /></svg><svg className="lp-thread-flare lp-thread-bottom" viewBox="0 0 64 28"><path d="M0 0 C20 0 31 0 31 28 H33 C33 0 44 0 64 0 Z" /></svg></div><span className="lp-section-label lp-manifesto-label">A LITTLE MORE CLARITY</span><p>Property comes with a lot of moving parts. <strong>Keeping track of them should feel a little more human.</strong></p></section>

    <FeatureFlow />

    <section className="lp-pricing" id="pricing"><h2>A better view starts<br /><em>with a conversation.</em></h2><p>Tell us about your properties and find out how Inzu could fit the way you work. Get in touch for access and pricing information.</p><div className="lp-pricing-action"><ArrowLink to="/request-access">Request access</ArrowLink></div></section>
    <div className="lp-final-flow"><FinalThread /><div className="lp-pricing-thread" aria-hidden="true"><svg className="lp-pricing-flare" viewBox="0 0 64 28"><path d="M0 0 C20 0 31 0 31 28 H33 C33 0 44 0 64 0 Z" /></svg></div>
    <section className="lp-final lp-panel lp-shaped"><PanelCorners /><Aurora /><div className="lp-final-copy"><span className="lp-section-label">A LITTLE MORE ROOM TO THINK</span><h2>Good things happen<br />when you have <em>clarity.</em></h2><ArrowLink light to="/request-access">Let's get started</ArrowLink></div></section></div>
  </main><footer className="lp-footer lp-panel lp-home-footer"><svg className="lp-footer-edge" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90 V78 Q0 56 22 56 H42 Q65 56 65 33 V22 Q65 0 87 0 H1113 Q1135 0 1135 22 V33 Q1135 56 1158 56 H1178 Q1200 56 1200 78 V90 Z" /><path d="M994 0 C1014 0 1019 -8 1019 -28 H1021 C1021 -8 1026 0 1046 0 Z" /></svg><div><BrandMark /><p>A clearer perspective on property.</p></div><div className="lp-footer-links"><a href="#how-it-works">How it works</a><a href="#features">The platform</a><Link to="/about">About</Link><a href="mailto:hello@inzu.co">Contact</a></div><div className="lp-footer-links"><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-of-service">Terms of service</Link><a href="https://app.inzu.co/sign-in">Sign in <ArrowRight size={13}/></a></div><div className="lp-footer-bottom"><span>© {new Date().getFullYear()} INZU</span><span>NAIROBI, KENYA</span><a href="#main">BACK TO TOP ↑</a></div></footer></div>;
}
