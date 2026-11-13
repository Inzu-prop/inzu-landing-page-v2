import { Link } from 'react-router-dom';
import { Header } from './Landing';
import BrandMark from './BrandMark';
import './legal.css';

type LegalSection = { num: string; title: string; content: string };

export default function LegalPage({ title, metadata, sections }: { title: string; metadata: string; sections: LegalSection[] }) {
  return <div className="lp lp-legal">
    <a className="lp-skip" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <header className="lp-panel lp-legal-hero">
        <h1>{title}</h1>
        <p>{metadata}</p>
      </header>
      <div className="lp-panel lp-legal-document">
        <nav className="lp-legal-index" aria-label="On this page">
          <h2>On this page</h2>
          <ol>{sections.map(section => <li key={section.num}><a href={`#section-${section.num}`}>{section.title}</a></li>)}</ol>
        </nav>
        <article className="lp-legal-content" aria-label={title}>
          {sections.map(section => <section className="lp-legal-section" id={`section-${section.num}`} key={section.num}>
            <h2>{section.title}</h2>
            <div className="lp-legal-text">{section.content}</div>
          </section>)}
        </article>
      </div>
    </main>
    <footer className="lp-footer lp-panel">
      <div><BrandMark /><p>A clearer perspective on property.</p></div>
      <div className="lp-footer-links"><Link to="/#how-it-works">How it works</Link><Link to="/#features">The platform</Link><Link to="/about">About</Link><a href="mailto:hello@inzu.co">Contact</a></div>
      <div className="lp-footer-links"><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-of-service">Terms of service</Link><a href="https://app.inzu.co/sign-in">Sign in</a></div>
      <div className="lp-footer-bottom"><span>© {new Date().getFullYear()} INZU</span><span>NAIROBI, KENYA</span><Link to="/">BACK TO HOME ↑</Link></div>
    </footer>
  </div>;
}
