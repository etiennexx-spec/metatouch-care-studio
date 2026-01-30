import { useEffect, useState } from "react";
import { Building2, Hospital, Users, Briefcase, GraduationCap, Heart, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const partnerTypes = [
  {
    icon: Hospital,
    title: "Hôpitaux & Cliniques",
    description: "Collaborez avec nous pour étendre vos services de soins à domicile et améliorer le suivi post-hospitalisation.",
    services: ["Soins post-opératoires", "Suivi des patients chroniques", "Transfert de soins"],
  },
  {
    icon: Building2,
    title: "Maisons de repos",
    description: "Partenariat pour des soins infirmiers spécialisés et un accompagnement personnalisé de vos résidents.",
    services: ["Soins infirmiers", "Kinésithérapie", "Accompagnement quotidien"],
  },
  {
    icon: Users,
    title: "Mutuelles",
    description: "Offrez à vos membres un accès privilégié à nos services de soins à domicile de qualité.",
    services: ["Tarifs préférentiels", "Réseau de professionnels", "Suivi personnalisé"],
  },
  {
    icon: Briefcase,
    title: "Entreprises",
    description: "Proposez des services de santé à domicile à vos employés pour améliorer leur bien-être.",
    services: ["Médecine du travail", "Prévention santé", "Soins à domicile"],
  },
  {
    icon: GraduationCap,
    title: "Écoles & Universités",
    description: "Accueillez nos stagiaires ou formez vos étudiants avec nos professionnels expérimentés.",
    services: ["Stages pratiques", "Formations", "Séminaires"],
  },
  {
    icon: Heart,
    title: "Associations",
    description: "Unissons nos forces pour améliorer l'accès aux soins pour les populations vulnérables.",
    services: ["Actions solidaires", "Soins aux plus démunis", "Événements santé"],
  },
];

const PartnersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<typeof partnerTypes[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partnerTypes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePartnerClick = (partner: typeof partnerTypes[0]) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Nous reviendrons vers vous rapidement pour discuter de ce partenariat.",
    });
    setIsModalOpen(false);
    setFormData({ name: "", email: "", organization: "", message: "" });
  };

  return (
    <section id="partenaires" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
            Nos Partenaires
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Développons ensemble{" "}
            <span className="gradient-text">l'avenir des soins</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meta Cares collabore avec différents acteurs du secteur de la santé pour offrir des services de qualité.
          </p>
        </div>

        {/* Auto-scrolling slideshow */}
        <div className="relative overflow-hidden mb-12">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {partnerTypes.map((partner, index) => (
              <div 
                key={index}
                className="min-w-full px-4"
              >
                <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card max-w-3xl mx-auto text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                    <partner.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{partner.title}</h3>
                  <p className="text-muted-foreground mb-6">{partner.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {partner.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <Button 
                    onClick={() => handlePartnerClick(partner)}
                    className="gradient-bg gradient-bg-hover text-primary-foreground"
                  >
                    Devenir partenaire
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {partnerTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick partner grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partnerTypes.map((partner, index) => (
            <button
              key={index}
              onClick={() => handlePartnerClick(partner)}
              className={`bg-card p-4 rounded-xl text-center hover:shadow-meta-md transition-all duration-300 group cursor-pointer border ${
                index === currentIndex ? "border-primary" : "border-transparent hover:border-primary/30"
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <partner.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{partner.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Partnership Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Partenariat - {selectedPartner?.title}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Nom de votre organisation"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
            <Textarea
              placeholder="Décrivez votre projet de partenariat..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
            />
            <Button type="submit" className="w-full gradient-bg gradient-bg-hover text-primary-foreground">
              Envoyer la demande
            </Button>
          </form>

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <a 
              href="https://metacares.be" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              En savoir plus sur metacares.be
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PartnersSection;
