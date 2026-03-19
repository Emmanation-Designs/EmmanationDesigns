import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import { servicesData } from '@/data/services';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      if (isHome) {
        const sections = ['hero', 'about', 'process', 'portfolio', 'services'];
        let current = '';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: 'Home', href: '/#hero', id: 'hero' },
    { name: 'About', href: '/#about', id: 'about' },
    { name: 'Process', href: '/#process', id: 'process' },
    { name: 'Portfolio', href: '/#portfolio', id: 'portfolio' },
    { name: 'Services', href: '/#services', id: 'services', isDropdown: true },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setServicesOpen(false);
    if (!isHome && href.startsWith('/#')) {
      return;
    }
    
    if (isHome && href.startsWith('/#')) {
      const elementId = href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <nav
        className={cn(
          'transition-all duration-500 ease-out border dark:border-white/10 pointer-events-auto',
          scrolled 
            ? 'bg-white/90 dark:bg-black/80 backdrop-blur-xl rounded-full py-3 px-6 shadow-2xl shadow-blue-900/10 border-slate-200 w-full max-w-5xl' 
            : 'bg-transparent border-transparent py-4 px-4 w-full max-w-7xl'
        )}
      >
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 group" 
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 group-hover:border-blue-500/50 transition-colors">
              <img src="/mylogo.png" alt="Emmanation Designs Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors hidden sm:block">
              Emmanation
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {isHome ? (
                    <a
                      href={link.href.replace('/', '')}
                      className={cn(
                        "text-sm font-medium transition-colors flex items-center gap-1",
                        activeSection === link.id ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      <span className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300",
                        activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                      )} />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                  )}
                  
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 p-2 flex flex-col gap-1">
                          {servicesData.map((service) => (
                            <Link
                              key={service.id}
                              to={service.path}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                              onClick={() => setServicesOpen(false)}
                            >
                              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                                <service.icon className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : isHome ? (
                <a
                  key={link.name}
                  href={link.href.replace('/', '')}
                  className={cn(
                    "text-sm font-medium transition-colors relative group",
                    activeSection === link.id ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300",
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            {isHome ? (
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('/#services');
                }}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  "bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-50 hover:scale-105"
                )}
              >
                Get Started
              </a>
            ) : (
              <Link
                to="/#services"
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  "bg-slate-900 text-white dark:bg-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-50 hover:scale-105"
                )}
              >
                Get Started
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="text-slate-900 dark:text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="md:hidden w-full max-w-5xl mt-4 overflow-hidden bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl pointer-events-auto"
          >
            <div className="px-6 py-8 flex flex-col gap-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  {isHome ? (
                    <a
                      href={link.href.replace('/', '')}
                      className={cn(
                        "text-xl font-bold transition-colors",
                        activeSection === link.id ? "text-blue-600 dark:text-blue-400" : "text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {link.isDropdown && (
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 dark:border-white/10">
                      {servicesData.map((service) => (
                        <Link
                          key={service.id}
                          to={service.path}
                          className="text-base font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-3"
                          onClick={() => setIsOpen(false)}
                        >
                          <service.icon className="w-4 h-4" />
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 mt-2">
                {isHome ? (
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('/#services');
                    }}
                    className="flex items-center justify-center w-full px-6 py-4 rounded-xl text-lg font-bold transition-all bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Get Started
                  </a>
                ) : (
                  <Link
                    to="/#services"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full px-6 py-4 rounded-xl text-lg font-bold transition-all bg-blue-600 text-white hover:bg-blue-500"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
