import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-3 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-sage/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center">
          {/* Logo - Left aligned, takes up 1/3 of space to push links to center */}
          <div className="flex-1 flex items-center">
            <Link to="/"><Logo className="h-14" /></Link>
          </div>

          {/* Desktop Links - Perfectly centered */}
          <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
            {[
              { label: 'How It Works', href: '/#how-it-works' },
              { label: 'Pricing', href: '/#pricing' },
              { label: 'About', href: '/about' }
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="relative text-sm font-body text-stone hover:text-sage transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sage transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions - Right aligned, takes up 1/3 of space */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <a href="https://app.inzu.co/sign-in" className="px-6 py-2 rounded-full border border-sage/40 text-sage text-xs font-medium hover:bg-sage/10 transition-all">
                Sign In
              </a>
              <Link to="/request-access" className="px-6 py-2 rounded-full bg-sage text-obsidian text-xs font-semibold hover:bg-silk transition-all flex items-center gap-2 group">
                Request Access
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-silk"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden"
            style={{ backgroundColor: '#13270D' }}
          >
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(144,180,148,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(144,180,148,1) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px'
              }}
            />

            {/* Top bar */}
            <div className="relative z-10 flex justify-between items-center px-6 py-4 border-b border-sage/10">
              <Link to="/" onClick={() => setIsMenuOpen(false)}><Logo className="h-8" /></Link>
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-sage/20 flex items-center justify-center text-sage hover:bg-sage/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Main content area */}
            <div className="relative z-10 flex flex-1 overflow-hidden">

              {/* LEFT — Nav Links */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.07, delayChildren: 0.15 }
                  }
                }}
                className="flex-1 flex flex-col justify-center px-8 py-12 gap-1"
              >
                {[
                  { label: 'How It Works',     num: '01', href: '/#how-it-works' },
                  { label: 'Pricing',          num: '02', href: '/#pricing' },
                  { label: 'About',            num: '03', href: '/about' },
                ].map((link) => (
                  <motion.div
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-3 py-3 border-b border-sage/5 last:border-0"
                    >
                      <span className="text-[10px] font-body text-sage/40 tracking-widest w-6 shrink-0 group-hover:text-sage transition-colors duration-300">
                        {link.num}
                      </span>
                      <span className="font-display text-3xl text-silk/80 group-hover:text-silk transition-colors duration-300 leading-none">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-sage opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ml-auto shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* RIGHT — Status card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="hidden sm:flex w-44 flex-col justify-center px-4 py-12 border-l border-sage/10"
              >
                <div className="bg-forest/30 rounded-xl p-4 border border-sage/15 backdrop-blur-sm">
                  <p className="text-[8px] font-body text-sage uppercase tracking-widest mb-3">Portfolio Health</p>
                  <p className="font-display text-xl text-silk tracking-tight mb-1">KES 3.84M</p>
                  <p className="text-[9px] text-sage mb-4">↑ 12% this month</p>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[8px] text-stone/60">
                      <span>Collections</span><span className="text-sage">100%</span>
                    </div>
                    <div className="h-1 bg-sage/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="h-full bg-sage rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] text-stone/60 mt-2">
                      <span>Arrears</span><span className="text-silk/40">0</span>
                    </div>
                    <div className="h-1 bg-sage/10 rounded-full" />
                  </div>
                </div>

                <p className="text-[8px] text-stone/30 text-center mt-4 leading-relaxed">
                  Your dashboard,<br/>always on.
                </p>
              </motion.div>
            </div>

            {/* Bottom — CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10 px-8 pb-10 pt-6 border-t border-sage/10"
            >
              <div className="flex gap-3">
                <Link
                  to="/request-access"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3.5 rounded-full bg-sage text-obsidian font-medium text-sm text-center hover:bg-silk transition-all"
                >
                  Request Access
                </Link>
                <a
                  href="https://app.inzu.co/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3.5 rounded-full border border-sage/30 text-sage text-sm font-medium text-center hover:bg-sage/5 transition-all"
                >
                  Sign In
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
