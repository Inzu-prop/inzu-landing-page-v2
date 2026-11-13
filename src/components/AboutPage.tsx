import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Header, PanelCorners } from './Landing';
import BrandMark from './BrandMark';
import Aurora from './Aurora';
import './landing.css';

const values = [
  { number: '01', verb: 'Know where things stand', body: 'Keep property, tenancy and payment records together, so you can find the details when you need them.', variant: 'green' },
  { number: '02', verb: 'Make payments easier', body: 'Give tenants a simpler way to pay rent, and give landlords a clearer view of what has been paid.', variant: 'coral' },
  { number: '03', verb: 'Keep everyone in the loop', body: 'Bring the everyday details of a tenancy together, so landlords and tenants can spend less time chasing information.', variant: 'blue' },
] as const;

function AboutConnector() {
  return <div className="about-connector" aria-hidden="true"><svg viewBox="0 0 1000 120" preserveAspectRatio="none"><path d="M468 0 C488 0 499 0 499 22 Q499 35 489 40 L261 81 Q249 84 249 94 C249 120 238 120 218 120 H282 C262 120 251 120 251 94 Q251 86 263 83 L491 42 Q501 36 501 22 C501 0 512 0 532 0 Z" fill="#f8f9f4" /></svg></div>;
}

export default function AboutPage() {
  return <div className="lp lp-about"><Header /><main id="main">
    <section className="lp-panel lp-about-hero lp-shaped">
      
      <h1>Property deserves a clearer perspective.</h1>
      <p>Inzu is being built to help property owners keep the details of their portfolios in view, without losing sight of the people behind them.</p>
      <a className="lp-text-link" href="#our-approach">Our approach <ArrowDown size={16} /></a><PanelCorners bottom />
    </section>
    <section className="lp-about-intro" id="our-approach"><div className="lp-hero-thread" aria-hidden="true"><span className="lp-thread-line"/><svg className="lp-thread-flare lp-thread-top" viewBox="0 0 64 28"><path d="M0 0 C20 0 31 0 31 28 H33 C33 0 44 0 64 0 Z"/></svg><svg className="lp-thread-flare lp-thread-bottom" viewBox="0 0 64 28"><path d="M0 0 C20 0 31 0 31 28 H33 C33 0 44 0 64 0 Z"/></svg></div><span className="lp-section-label lp-manifesto-label">THE IDEA</span><p>Good property management starts with knowing what is happening, and having the information to act.</p></section>
    <section className="lp-panel lp-about-content lp-shaped"><PanelCorners/><div><h2>A better way to keep track.</h2></div><div><p>Properties bring together a lot of moving parts: units, tenants, invoices, payments and maintenance. Inzu brings those records into one place, so owners can find the details they need.</p><p>We're building for a more considered day-to-day, with a clearer view of the things that make a property work.</p><Link to="/#features" className="lp-text-link">Explore the platform <ArrowUpRight size={16} /></Link></div><PanelCorners bottom/></section>
    <AboutConnector />
    <section className="about-values-composition" aria-labelledby="about-values-title"><div className="about-values-intro"><svg className="about-intro-shape" viewBox="0 0 800 360" preserveAspectRatio="none" aria-hidden="true"><path d="M0 24 Q0 0 24 0 H610 Q634 0 634 24 V100 Q634 125 660 125 H776 Q800 125 800 149 V336 Q800 360 776 360 H24 Q0 360 0 336 Z" /></svg><h2 id="about-values-title">Clarity in the details.</h2><p>A clearer view of property starts with the details that matter.</p><span className="about-values-intro-foot">THREE PRINCIPLES / ONE CLEARER VIEW</span></div><svg className="about-values-route" viewBox="0 0 1000 130" preserveAspectRatio="none" aria-hidden="true"><path d="M218 0 C238 0 249 0 249 28 Q249 36 259 42 L489 103 Q499 108 499 112 C499 130 488 130 468 130 H532 C512 130 501 130 501 112 Q501 107 491 101 L261 40 Q251 34 251 28 C251 0 262 0 282 0 Z" fill="#f8f9f4"/></svg><div className="about-values-cards">{values.map(({number, verb, body, variant}, index) => <article className="about-principle" key={number}><div className={`about-principle-art about-principle-art-${variant}`}><Aurora variant={variant} /></div>{index < values.length - 1 && <svg className="about-card-bridge" viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 C0 20 0 31 28 31 H72 C100 31 100 20 100 0 V64 C100 44 100 33 72 33 H28 C0 33 0 44 0 64 Z"/></svg>}<div className="about-principle-copy"><h3>{verb}</h3><p>{body}</p></div></article>)}</div><div className="about-values-exit" aria-hidden="true"><svg viewBox="0 0 64 120" preserveAspectRatio="none"><path d="M0 0 C20 0 31 0 31 28 V92 C31 120 20 120 0 120 H64 C44 120 33 120 33 92 V28 C33 0 44 0 64 0 Z"/></svg></div></section>
    <section className="lp-about-cta"><span className="lp-section-label">LET'S TALK</span><h2>See what Inzu could do for you.</h2><p>Tell us about your portfolio and ask us anything.</p><Link className="lp-button" to="/request-access"><span className="lp-button-label">Request access</span><span className="lp-button-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></Link></section>
  </main><footer className="lp-footer lp-panel"><div><BrandMark /><p>A clearer perspective on property.</p></div><div className="lp-footer-links"><Link to="/#how-it-works">How it works</Link><Link to="/#features">The platform</Link><Link to="/about">About</Link><a href="mailto:hello@inzu.co">Contact</a></div><div className="lp-footer-links"><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-of-service">Terms of service</Link><a href="https://app.inzu.co/sign-in">Sign in</a></div><div className="lp-footer-bottom"><span>© {new Date().getFullYear()} INZU</span><span>NAIROBI, KENYA</span><Link to="/">BACK TO HOME ↑</Link></div></footer></div>;
}
