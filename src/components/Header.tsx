import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-metacares.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "À Propos" },
    { href: "#partenaires", label: "Partenaires" },
    { href: "#professionnels", label: "Professionnels" },
    { href: "#contact", label: "Contact" },
  ];

  const careerLinks = [
    { href: "#join", label: "Nous rejoindre" },
    { href: "#offres", label: "Offres" },
    { href: "#equipe", label: "Équipe" },
  ];

  const navLinks = isHomePage ? homeLinks : careerLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-card">
      {/* Top bar */}
      <div className="gradient-bg py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-primary-foreground text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+32123456789" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+32 123 456 789</span>
            </a>
            <a href="mailto:contact@metacares.be" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">contact@metacares.be</span>
            </a>
          </div>
          <span className="text-xs">Belgique • Cameroun</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Meta Cares Logo" className="h-10 sm:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
            
            {/* Page switcher */}
            {isHomePage ? (
              <Link
                to="/carrieres"
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 text-sm border-b-2 border-primary pb-1"
              >
                Carrières
              </Link>
            ) : (
              <Link
                to="/"
                className="text-primary font-semibold hover:text-primary/80 transition-colors duration-200 text-sm border-b-2 border-primary pb-1"
              >
                Accueil
              </Link>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                En savoir plus
              </a>
            </Button>
            <Button className="gradient-bg gradient-bg-hover text-primary-foreground" asChild>
              <a href="#contact">
                Nous Contacter
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Page switcher mobile */}
              {isHomePage ? (
                <Link
                  to="/carrieres"
                  className="text-primary font-semibold py-2 border-l-4 border-primary pl-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🚀 Carrières & Offres d'emploi
                </Link>
              ) : (
                <Link
                  to="/"
                  className="text-primary font-semibold py-2 border-l-4 border-primary pl-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🏠 Retour à l'accueil
                </Link>
              )}
              
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" className="border-primary text-primary w-full" asChild>
                  <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                    En savoir plus
                  </a>
                </Button>
                <Button className="gradient-bg text-primary-foreground w-full" asChild>
                  <a href="#contact">
                    Nous Contacter
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
