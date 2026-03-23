import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, ShoppingBag, Briefcase, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-metacares.png";
import AdminLoginModal from "@/components/AdminLoginModal";

const Header = () => {
  const { isAdmin, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCareersPage = location.pathname === "/carrieres";
  const isMarketplacePage = location.pathname === "/marketplace";

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

  const marketplaceLinks = [
    { href: "#securite-transfert", label: "Sécurité & Transfert" },
    { href: "#soins", label: "Soins" },
    { href: "#protection", label: "Protection" },
    { href: "#instruments", label: "Instruments" },
  ];

  const navLinks = isHomePage
    ? homeLinks
    : isCareersPage
    ? careerLinks
    : isMarketplacePage
    ? marketplaceLinks
    : homeLinks;

  const handleMetacaresClick = () => {
    if (user && isAdmin) {
      // Already logged in as admin, go to dashboard
      window.location.href = "/admin";
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-card">
        {/* Top bar */}
        <div className="gradient-bg py-1.5 sm:py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-primary-foreground text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="tel:+32487431321" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+32 487 43 13 21</span>
              </a>
              <a href="mailto:contact@metacares.be" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                <Mail className="w-3 h-3" />
                <span className="hidden sm:inline">contact@metacares.be</span>
              </a>
            </div>
            <span className="text-xs">🇧🇪 Belgique • 🇨🇲 Cameroun</span>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 cursor-pointer relative z-10">
              <img src={logo} alt="Meta Cares Logo" className="h-10 sm:h-12 w-auto pointer-events-none" />
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

              {/* Dropdown Menu - Nos Produits */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-foreground/80 hover:text-primary font-medium transition-colors duration-200 text-sm">
                    Nos Produits
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/marketplace" className="flex items-center gap-2 cursor-pointer">
                      <ShoppingBag className="w-4 h-4" />
                      Espace Clients
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://metacares.shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Boutique en ligne
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Page switcher */}
              {!isCareersPage ? (
                <Link
                  to="/carrieres"
                  className="flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors duration-200 text-sm border-b-2 border-primary pb-1"
                >
                  <Briefcase className="w-4 h-4" />
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
                <a href="#contact">Nous Contacter</a>
              </Button>
              {/* Metacares Admin Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMetacaresClick}
                className="text-muted-foreground hover:text-primary text-xs gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                Metacares
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

                {/* Mobile - Nos Produits Section */}
                <div className="border-t border-border pt-3 mt-2">
                  <span className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                    Nos Produits
                  </span>
                  <Link
                    to="/marketplace"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary font-medium py-2 pl-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Espace Clients
                  </Link>
                  <a
                    href="https://metacares.shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary font-medium py-2 pl-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Boutique en ligne
                  </a>
                </div>

                {/* Page switcher mobile */}
                {!isCareersPage ? (
                  <Link
                    to="/carrieres"
                    className="flex items-center gap-2 text-primary font-semibold py-2 border-l-4 border-primary pl-3 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="w-4 h-4" />
                    Carrières & Offres d'emploi
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="text-primary font-semibold py-2 border-l-4 border-primary pl-3 mt-2"
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
                    <a href="#contact">Nous Contacter</a>
                  </Button>
                  {/* Mobile Metacares Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleMetacaresClick();
                    }}
                    className="text-muted-foreground hover:text-primary text-xs gap-1 w-full justify-center"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Metacares
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Admin Login Modal */}
      <AdminLoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;
