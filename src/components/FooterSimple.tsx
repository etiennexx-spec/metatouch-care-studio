import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-metacares.png";

const FooterSimple = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Meta Cares" className="h-8 w-auto brightness-0 invert" />
            <span className="text-card text-sm font-medium">Retour à l'accueil</span>
          </Link>
          
          <p className="text-card/50 text-sm">
            © {currentYear} Meta Cares. Tous droits réservés.
          </p>
          
          <p className="text-card/50 text-xs flex items-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-destructive" /> en Belgique & Cameroun
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;
