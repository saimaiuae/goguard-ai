
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-athlete-darker/90 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'
      }`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <img src="/lovable-uploads/8237163e-bd4e-40a5-bade-b7c0ae3ca606.png" alt="AthleteGuard AI Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              AthleteGuard<span className="text-athlete-pink">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <NavLink href="/" active={location.pathname === '/'} onClick={closeMobileMenu}>
                {t('nav.home')}
              </NavLink>
              <NavLink href="/dashboard" active={location.pathname === '/dashboard'} onClick={closeMobileMenu}>
                {t('nav.dashboard')}
              </NavLink>
              <NavLink href="#features" active={false} onClick={closeMobileMenu}>
                {t('nav.features')}
              </NavLink>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard" className="gap-2">
                  <LayoutDashboard size={16} />
                  {t('nav.dashboard')}
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-athlete-pink hover:bg-athlete-pink-dark text-white">
                <Link to="/dashboard">{t('nav.getStarted')}</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="flex items-center text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-athlete-darker/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto py-6 px-4 flex flex-col gap-4">
          <NavLink 
            href="/" 
            active={location.pathname === '/'} 
            onClick={closeMobileMenu}
            mobile
          >
            {t('nav.home')}
          </NavLink>
          <NavLink 
            href="/dashboard" 
            active={location.pathname === '/dashboard'} 
            onClick={closeMobileMenu}
            mobile
          >
            {t('nav.dashboard')}
          </NavLink>
          <NavLink 
            href="#features" 
            active={false} 
            onClick={closeMobileMenu}
            mobile
          >
            {t('nav.features')}
          </NavLink>
          <div className="pt-4 flex flex-col gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard" className="gap-2" onClick={closeMobileMenu}>
                <LayoutDashboard size={16} />
                {t('nav.dashboard')}
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-athlete-pink hover:bg-athlete-pink-dark text-white">
              <Link to="/dashboard" onClick={closeMobileMenu}>{t('nav.getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
}

const NavLink = ({ href, active, children, onClick, mobile }: NavLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`relative ${
        mobile ? 'text-lg py-2 px-1' : 'text-sm'
      } font-medium transition-colors ${
        active
          ? 'text-white'
          : 'text-muted-foreground hover:text-white'
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-athlete-pink rounded-full transform -translate-y-1"></span>
      )}
    </Link>
  );
};

export default Navbar;
