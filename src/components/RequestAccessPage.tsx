import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import './landing.css';

export default function RequestAccessPage() {
  return <main className="lp" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center' }}>
    <section className="lp-panel" style={{ background: '#f8f9f4', width: '100%', maxWidth: '1100px', padding: 'clamp(28px, 7vw, 90px)' }}>
      <BrandMark />
      <div style={{ maxWidth: '700px', padding: 'clamp(60px, 10vw, 140px) 0' }}>
        <p className="lp-section-label">LET'S START A CONVERSATION</p>
        <h1>Let's talk about <em>your properties.</em></h1>
        <p style={{ color: '#6e8070', lineHeight: 1.8, maxWidth: '490px', marginBottom: '32px' }}>Interested in Inzu? Email us to ask about access, pricing, and how the platform could fit your portfolio.</p>
        <a className="lp-button" href="mailto:hello@inzu.co?subject=Inzu%20access%20enquiry">Email the Inzu team <ArrowUpRight size={16} /></a>
        <p style={{ color: '#6e8070', fontSize: '12px', marginTop: '18px' }}>This opens your email app. You can also write to hello@inzu.co.</p>
      </div>
      <Link className="lp-text-link" to="/"><ArrowLeft size={15} /> Back to home</Link>
    </section>
  </main>;
}
