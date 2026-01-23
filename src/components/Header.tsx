import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-metacares.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#services", label: "Nos Services" },
    { href: "#about", label: "À Propos" },
    { href: "#patients", label: "Patients" },
    { href: "#professionnels", label: "Professionnels" },
    { href: "#contact", label: "Contact" },
  ];

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
          <a href="#accueil" className="flex items-center gap-2">
            <img src={logo} alt="Meta Cares Logo" className="h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Nous Contacter
            </Button>
            <Button className="gradient-bg gradient-bg-hover text-primary-foreground">
              Rejoindre l'équipe
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
            <div className="flex flex-col gap-3">
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
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="border-primary text-primary">
                  Nous Contacter
                </Button>
                <Button className="gradient-bg text-primary-foreground">
                  Rejoindre l'équipe
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
