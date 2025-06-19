import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/d3224ea9-44db-41ec-a6af-439245589ba9.png"
                alt="Vintoura Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-serif font-bold text-primary">
                Vintoura
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-medium transition-colors hover:text-lime-yellow ${
                    isActive(item.path) ? "text-lime-yellow" : "text-foreground"
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime-yellow"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-lime-yellow transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 py-4 border-t border-border"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-2 text-sm font-medium transition-colors hover:text-lime-yellow ${
                      isActive(item.path)
                        ? "text-lime-yellow"
                        : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Enhanced Footer */}
      <footer className="bg-deep-navy text-cream py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/lovable-uploads/d3224ea9-44db-41ec-a6af-439245589ba9.png"
                  alt="Vintoura Logo"
                  className="h-12 w-12 object-contain"
                />
                <h3 className="text-3xl font-serif font-bold text-lime-yellow">
                  Vintoura
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-cream/90">
                Where elegance meets confidence. Discover your signature style
                with our curated fashion experience.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-8 h-8 bg-soft-pink rounded-full flex items-center justify-center">
                  <span className="text-deep-navy font-bold text-sm">V</span>
                </div>
                <div className="w-8 h-8 bg-sage-green rounded-full flex items-center justify-center">
                  <span className="text-deep-navy font-bold text-sm">T</span>
                </div>
                <div className="w-8 h-8 bg-lime-yellow rounded-full flex items-center justify-center">
                  <span className="text-deep-navy font-bold text-sm">F</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-xl text-soft-pink mb-6">
                Quick Links
              </h4>
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-lg text-cream/90 hover:text-lime-yellow transition-colors duration-300 hover:translate-x-2 transform"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact + Social Icons */}
            <div className="space-y-4 text-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-lime-yellow rounded-full"></div>
                <p className="text-cream/90">vintoura226@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-soft-pink rounded-full"></div>
                <p className="text-cream/90">+233 27 016 3765</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-sage-green rounded-full"></div>
                <p className="text-cream/90">
                  Follow us for style inspiration
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-2">
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@vintoura?_t=ZM-8uvfQeThcPP&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <img
                      src="/tiktok.svg"
                      alt="TikTok"
                      className="w-6 h-6 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100 group-hover:sepia group-hover:hue-rotate-[180deg] group-hover:saturate-[300%] transition-transform duration-300"
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/vint_oura?igsh=cWgyYWpuc2RzcTY4&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <img
                      src="/instagram.svg"
                      alt="Instagram"
                      className="w-6 h-6 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100 group-hover:sepia group-hover:hue-rotate-[290deg] group-hover:saturate-[300%] transition-transform duration-300"
                    />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/15t67vFXXJ/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <img
                      src="/facebook.svg"
                      alt="Facebook"
                      className="w-6 h-6 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100 group-hover:sepia group-hover:hue-rotate-[190deg] group-hover:saturate-[300%] transition-transform duration-300"
                    />
                  </a>
                </div>

            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-lavender/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-cream/70 text-lg">
                &copy; 2025 Vintoura. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <span className="text-cream/70 hover:text-lime-yellow transition-colors cursor-pointer">
                  Privacy Policy
                </span>
                <span className="text-cream/70 hover:text-soft-pink transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
