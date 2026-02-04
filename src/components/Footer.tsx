import { Facebook, Instagram, Globe, Heart, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-metacares.png";

const faqs = [
  {
    question: "Comment demander des soins à domicile ?",
    answer: "Vous pouvez nous contacter via notre formulaire en ligne ou par téléphone. Un conseiller vous accompagnera pour définir vos besoins et organiser l'intervention d'un professionnel de santé qualifié à votre domicile.",
  },
  {
    question: "Dans quelles zones Meta Cares intervient-il ?",
    answer: "Meta Cares est présent en Belgique et au Cameroun. Nous couvrons la plupart des grandes villes et leurs périphéries. Contactez-nous pour vérifier la disponibilité dans votre zone.",
  },
  {
    question: "Quels types de professionnels de santé proposez-vous ?",
    answer: "Nous disposons d'un réseau de professionnels qualifiés : infirmiers, aides-soignants, kinésithérapeutes, médecins et autres spécialistes de santé, tous certifiés et expérimentés.",
  },
  {
    question: "Comment rejoindre l'équipe Meta Cares ?",
    answer: "Les professionnels de santé peuvent déposer leur candidature via notre plateforme dédiée. Nous étudions chaque profil et vous recontactons sous 48h pour un entretien.",
  },
  {
    question: "Les soins sont-ils remboursés ?",
    answer: "Selon votre pays et votre couverture santé, certains soins peuvent être pris en charge. Nous vous accompagnons dans les démarches administratives nécessaires.",
  },
  {
    question: "Proposez-vous des formations pour les professionnels ?",
    answer: "Oui, Meta Cares propose des programmes de développement professionnel et des formations continues pour aider les professionnels de santé à maintenir et améliorer leurs compétences.",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer className="bg-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* FAQ Section */}
        <div className="mb-12 pb-12 border-b border-card/10">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
              FAQ
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-card">
              Questions <span className="text-primary">fréquentes</span>
            </h3>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card/5 rounded-lg border border-card/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-card/10 transition-colors"
                >
                  <span className="font-medium text-card text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-4 pb-4 text-card/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                href="https://www.facebook.com/profile.php?id=100090137613823" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4 text-card" />
              </a>
              <a 
                href="https://www.instagram.com/metacares_group" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4 text-card" />
              </a>
              <a 
                href="https://www.metacares.be" 
                target="_blank"
                rel="noopener noreferrer"
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
