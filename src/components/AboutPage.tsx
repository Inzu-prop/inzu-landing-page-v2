import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Header } from './Landing';
import BrandMark from './BrandMark';
import './landing.css';

export default function AboutPage() {
  return <div className="lp lp-about"><Header /><main>
    <section className="lp-panel lp-about-hero">
      <span className="lp-section-label">A LITTLE ABOUT INZU / 01</span>
      <h1>Property deserves a clearer perspective.</h1>
      <p>Inzu is being built to help property owners keep the details of their portfolios in view, without losing sight of the people behind them.</p>
      <a className="lp-text-link" href="#our-approach">Our approach <span aria-hidden="true">↓</span></a>
    </section>
    <section className="lp-about-intro" id="our-approach"><span className="lp-section-label">THE IDEA</span><p>Good property management starts with knowing what is happening, and having the information to act.</p></section>
    <section className="lp-panel lp-about-content"><div><span className="lp-section-label">WHAT WE'RE BUILDING / 02</span><h2>A better way to keep track.</h2></div><div><p>Properties bring together a lot of moving parts: units, tenants, invoices, payments and maintenance. Inzu brings those records into one place, so owners can find the details they need.</p><p>We're building for a more considered day-to-day, with a clearer view of the things that make a property work.</p><Link to="/#features" className="lp-text-link">Explore the platform <ArrowUpRight size={16} /></Link></div></section>
    <section className="lp-panel lp-about-values"><span className="lp-section-label">WHAT GUIDES US / 03</span><h2>Clarity in the details.</h2><div className="lp-about-values-grid"><article><span>01</span><h3>Make it clear</h3><p>Information should be easy to find and easy to understand.</p></article><article><span>02</span><h3>Keep it useful</h3><p>Build around the real work of looking after a property.</p></article><article><span>03</span><h3>Pay attention</h3><p>Thoughtful details make everyday tasks easier.</p></article></div></section>
    <section className="lp-about-cta"><span className="lp-section-label">LET'S TALK</span><h2>See what Inzu could do for you.</h2><p>Tell us about your portfolio and ask us anything.</p><Link className="lp-button" to="/request-access"><span className="lp-button-label">Request access</span><span className="lp-button-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></Link></section>
  </main><footer className="lp-footer lp-panel"><div><BrandMark /><p>A clearer perspective on property.</p></div><div className="lp-footer-links"><Link to="/#how-it-works">How it works</Link><Link to="/#features">The platform</Link><Link to="/about">About</Link><a href="mailto:hello@inzu.co">Contact</a></div><div className="lp-footer-links"><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-of-service">Terms of service</Link><a href="https://app.inzu.co/sign-in">Sign in</a></div><div className="lp-footer-bottom"><span>© {new Date().getFullYear()} INZU</span><span>NAIROBI, KENYA</span><Link to="/">BACK TO HOME ↑</Link></div></footer></div>;
}
