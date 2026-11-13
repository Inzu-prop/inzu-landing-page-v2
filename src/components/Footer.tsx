import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return <footer className="bg-obsidian py-16 text-silk"><div className="container-custom flex flex-wrap justify-between gap-10">
    <div><Logo className="h-16" /><p className="text-sm text-silk/70">A clearer perspective on property.</p></div>
    <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-silk/70"><Link to="/#how-it-works">How it works</Link><Link to="/about">About</Link><a href="mailto:hello@inzu.co">Contact</a><Link to="/privacy-policy">Privacy policy</Link><Link to="/terms-of-service">Terms of service</Link></nav>
  </div></footer>;
}
