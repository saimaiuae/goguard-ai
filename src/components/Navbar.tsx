
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-md bg-athlete-blue flex-center overflow-hidden blue-glow">
              <span className="font-bold text-white">A</span>
              <div className="absolute w-full h-1/3 bottom-0 left-0 bg-athlete-blue-dark/80"></div>
            </div>
            <span className="text-xl font-semibold tracking-tight">
              AthleteGuard<span className="text-athlete-blue">AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <NavLink href="/" active={location.pathname === '/'}>
                Home
              </NavLink>
              <NavLink href="/dashboard" active={location.pathname === '/dashboard'}>
                Dashboard
              </NavLink>
              <NavLink href="#features" active={false}>
                Features
              </NavLink>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard" className="gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white">
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-athlete-darker/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto py-6 px-4 flex flex-col gap-4">
          <NavLink 
            href="/" 
            active={location.pathname === '/'} 
            onClick={closeMobileMenu}
            mobile
          >
            Home
          </NavLink>
          <NavLink 
            href="/dashboard" 
            active={location.pathname === '/dashboard'} 
            onClick={closeMobileMenu}
            mobile
          >
            Dashboard
          </NavLink>
          <NavLink 
            href="#features" 
            active={false} 
            onClick={closeMobileMenu}
            mobile
          >
            Features
          </NavLink>
          <div className="pt-4 flex flex-col gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard" className="gap-2" onClick={closeMobileMenu}>
                <LayoutDashboard size={16} />
                Access Dashboard
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-athlete-blue hover:bg-athlete-blue-dark text-white">
              <Link to="/dashboard" onClick={closeMobileMenu}>Get Started</Link>
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
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-athlete-blue rounded-full transform -translate-y-1"></span>
      )}
    </Link>
  );
};

export default Navbar;
