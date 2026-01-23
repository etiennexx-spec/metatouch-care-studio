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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Contactez <span className="gradient-text">Meta Cares</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une question, un projet de partenariat ou une demande de soins ? 
            Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:contact@metacares.be" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@metacares.be
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <a href="tel:+32123456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +32 123 456 789 (Belgique)
                    </a>
                    <br />
                    <a href="tel:+237612345678" className="text-muted-foreground hover:text-primary transition-colors">
                      +237 612 345 678 (Cameroun)
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adresses</p>
                    <p className="text-muted-foreground">Bruxelles, Belgique</p>
                    <p className="text-muted-foreground">Douala, Cameroun</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Suivez-nous
              </h3>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com/metacares" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Facebook className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </a>
                <a 
                  href="https://instagram.com/meta_cares_group" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Instagram className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </a>
                <a 
                  href="https://www.metacares.be" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all group"
                >
                  <Globe className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border"
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
                    className="bg-muted/50 border-border"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-muted/50 border-border"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="Sujet"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border"
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
                  rows={5}
                  className="bg-muted/50 border-border resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full gradient-bg gradient-bg-hover text-primary-foreground">
                Envoyer le message
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
