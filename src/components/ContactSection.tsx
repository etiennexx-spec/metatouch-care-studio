import { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Contact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Contactez <span className="gradient-text">Meta Cares</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Une question, un projet de partenariat ou une demande de soins ? 
            Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Nos coordonnées
              </h3>
            </div>
            {/* Siège Social - Belgique */}
            <div className="bg-card rounded-xl p-5 sm:p-6 shadow-card border border-border/50 mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                Siège Social Belgique
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avenue des Alliés 41/3</p>
                    <p className="text-sm text-muted-foreground">6000 Charleroi, Belgique</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+32487431321" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +32 487 43 13 21
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:contact@metacares.be" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    contact@metacares.be
                  </a>
                </div>
              </div>
            </div>

            {/* Siège Connexe - Cameroun */}
            <div className="bg-card rounded-xl p-5 sm:p-6 shadow-card border border-border/50">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                Siège Connexe Cameroun
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+237689505161" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +237 689 505 161
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:contact@metacares.be" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    contact@metacares.be
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                Suivez-nous
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100090137613823" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground" />
                </a>
                <a 
                  href="https://www.instagram.com/metacares_group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground" />
                </a>
                <a 
                  href="https://www.metacares.be" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl md:rounded-2xl p-5 sm:p-8 shadow-card border border-border/50">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Envoyez-nous un message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-muted/50 border-border text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="Sujet"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border text-sm sm:text-base"
                  />
                </div>
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Votre message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-muted/50 border-border resize-none text-sm sm:text-base"
                />
              </div>
              <Button type="submit" size="lg" className="w-full gradient-bg gradient-bg-hover text-primary-foreground text-sm sm:text-base">
                Envoyer le message
                <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
