import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Send, ExternalLink, UserPlus } from "lucide-react";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  process: string;
}

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
}

type ModalStep = "details" | "contact" | "form";

const ServiceDetailModal = ({ service, onClose }: ServiceDetailModalProps) => {
  const [step, setStep] = useState<ModalStep>("details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    // Reset and go back to details
    setFormData({ name: "", email: "", phone: "", message: "" });
    setStep("details");
    onClose();
  };

  const handleClose = () => {
    setStep("details");
    setFormData({ name: "", email: "", phone: "", message: "" });
    onClose();
  };

  const goToContact = () => setStep("contact");
  const goToForm = () => setStep("form");
  const goBack = () => {
    if (step === "form") setStep("contact");
    else if (step === "contact") setStep("details");
  };

  if (!service) return null;

  const ServiceIcon = service.icon;

  return (
    <Dialog open={!!service} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header with back button */}
        {step !== "details" && (
          <button
            onClick={goBack}
            className="absolute left-4 top-4 flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        )}

        {/* STEP 1: Service Details */}
        {step === "details" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                  <ServiceIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {service.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-base text-muted-foreground leading-relaxed pt-2">
                {service.fullDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Benefits */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-meta-green/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-meta-green" />
                  </span>
                  Avantages
                </h4>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-meta-green shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="bg-muted/50 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Comment ça fonctionne ?
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {service.process}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  className="gradient-bg hover:opacity-90 flex-1"
                  onClick={goToContact}
                >
                  Contacter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: Contact Options */}
        {step === "contact" && (
          <>
            <DialogHeader className="pt-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                  <ServiceIcon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    {service.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Comment souhaitez-vous nous contacter ?
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 mt-6">
              {/* Option 1: Write a message */}
              <button
                onClick={goToForm}
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Écrire un message
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Envoyez-nous votre demande directement via le formulaire
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </button>

              {/* Option 2: Go to metacares.be */}
              <a
                href="https://metacares.be"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-meta-blue/50 hover:bg-muted/50 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-meta-blue/10 flex items-center justify-center group-hover:bg-meta-blue/20 transition-colors">
                  <ExternalLink className="w-6 h-6 text-meta-blue" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-meta-blue transition-colors">
                    Visiter metacares.be
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Découvrez notre offre complète et les informations globales
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-meta-blue group-hover:translate-x-1 transition-all" />
              </a>

              {/* Option 3: Register via metacares.app */}
              <a
                href="https://metacares.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-meta-green/50 hover:bg-muted/50 transition-all group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-meta-green/10 flex items-center justify-center group-hover:bg-meta-green/20 transition-colors">
                  <UserPlus className="w-6 h-6 text-meta-green" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-meta-green transition-colors">
                    S'inscrire sur metacares.app
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Créez votre compte pour accéder à nos services
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-meta-green group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </>
        )}

        {/* STEP 3: Contact Form */}
        {step === "form" && (
          <>
            <DialogHeader className="pt-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                  <ServiceIcon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-foreground">
                    Demande pour : {service.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Remplissez le formulaire ci-dessous
                  </p>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom complet <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-background border-border"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-background border-border"
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Téléphone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+32 xxx xxx xxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border-border"
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Votre message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez votre besoin..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background border-border min-h-[120px] resize-none"
                  maxLength={1000}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  type="submit"
                  className="gradient-bg hover:opacity-90 flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le message
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par Meta Cares concernant votre demande.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
