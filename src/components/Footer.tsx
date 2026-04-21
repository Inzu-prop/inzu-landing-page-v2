import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-obsidian pt-32 pb-10 border-t border-sage/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <Logo className="h-7" />
            </div>
            <p className="text-sm text-ash italic mb-6">The 100% Agent-Free Premium</p>
            <div className="flex items-center gap-2 text-xs text-ash">
              <div className="w-1 h-1 bg-sage rounded-full" />
              Nairobi, Kenya
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-widest text-silk uppercase mb-8">PRODUCT</h4>
            <ul className="space-y-4 text-sm text-ash">
              {[
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'For Landlords', href: '/#for-landlords' },
                { label: 'Pricing', href: '/#pricing' },
                { label: 'Request Access', href: '/request-access' }
              ].map(item => (
                <li key={item.label}><Link to={item.href} className="hover:text-sage transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-widest text-silk uppercase mb-8">COMPANY</h4>
            <ul className="space-y-4 text-sm text-ash">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: 'mailto:hello@inzu.co' }
              ].map(item => (
                <li key={item.label}>
                  {item.href.startsWith('mailto') ? (
                    <a href={item.href} className="hover:text-sage transition-colors">{item.label}</a>
                  ) : (
                    <Link to={item.href} className="hover:text-sage transition-colors">{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-body font-medium tracking-widest text-silk uppercase mb-8">STAY UPDATED</h4>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-sage mb-6 py-3">
                <Check className="w-4 h-4" />
                <span>You're on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <div className="flex items-center bg-obsidian border border-sage/20 rounded-full p-1 pl-4 mb-6">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent text-xs text-silk outline-none flex-1"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-obsidian hover:bg-silk transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
            <div className="flex gap-4 text-[11px] text-ash">
              <Link to="/privacy-policy" className="hover:text-sage transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-sage transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="text-center pt-10 border-t border-sage/10">
          <p className="text-[11px] text-ash">
            © 2026 Inzu Technologies Ltd. · Built for the Kenyan Property Elite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
