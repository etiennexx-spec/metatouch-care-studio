import { Facebook, Instagram, Globe, Heart } from "lucide-react";
import logo from "@/assets/logo-metacares.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Meta Cares" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-card/70 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour des services de santé de qualité 
              en Belgique et au Cameroun.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/metacares" 
                className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4 text-card" />
              </a>
              <a 
                href="https://instagram.com/meta_cares_group" 
                className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4 text-card" />
              </a>
              <a 
                href="https://www.metacares.be" 
                className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Globe className="w-4 h-4 text-card" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-card mb-4">Nos Services</h4>
            <ul className="space-y-2">
              {[
                "Mise à disposition du personnel",
                "Formation professionnelle",
                "Placement de santé",
                "Remplacement temporaire",
                "Soins à domicile",
              ].map((item, index) => (
                <li key={index}>
                  <a href="#services" className="text-card/60 hover:text-primary text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {[
                { label: "Accueil", href: "#accueil" },
                { label: "À propos", href: "#about" },
                { label: "Pour les patients", href: "#patients" },
                { label: "Pour les professionnels", href: "#professionnels" },
                { label: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-card/60 hover:text-primary text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-card mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-card/60">
                <strong className="text-card/80">Belgique:</strong><br />
                Bruxelles<br />
                +32 123 456 789
              </li>
              <li className="text-card/60 mt-3">
                <strong className="text-card/80">Cameroun:</strong><br />
                Douala<br />
                +237 612 345 678
              </li>
              <li className="mt-3">
                <a href="mailto:contact@metacares.be" className="text-primary hover:underline">
                  contact@metacares.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-card/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-card/50 text-sm">
              © {currentYear} Meta Cares. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-card/50 hover:text-card transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-card/50 hover:text-card transition-colors">
                Politique de confidentialité
              </a>
            </div>
            <p className="text-card/50 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-3 h-3 text-destructive" /> en Belgique & Cameroun
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
