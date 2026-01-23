import { ArrowRight, HeartPulse, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-healthcare.jpg";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-32 pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Équipe médicale professionnelle" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground mb-6 animate-fade-in">
            <HeartPulse className="w-4 h-4" />
            <span className="text-sm font-medium">Services de santé professionnels</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-6 leading-tight animate-fade-in-up">
            Votre partenaire pour des{" "}
            <span className="gradient-text">soins de qualité</span>
          </h1>

          <p className="text-lg md:text-xl text-card/80 mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Meta Cares connecte les patients aux meilleurs professionnels de santé 
            et accompagne les établissements dans leur besoin en personnel qualifié.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="gradient-bg gradient-bg-hover text-primary-foreground group">
              Demander des soins
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-card/50 text-card hover:bg-card/10">
              En savoir plus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Users className="w-5 h-5 text-meta-green" />
                <span className="text-2xl md:text-3xl font-bold text-card">500+</span>
              </div>
              <p className="text-card/70 text-sm">Professionnels qualifiés</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <HeartPulse className="w-5 h-5 text-meta-green" />
                <span className="text-2xl md:text-3xl font-bold text-card">10K+</span>
              </div>
              <p className="text-card/70 text-sm">Patients satisfaits</p>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <Shield className="w-5 h-5 text-meta-green" />
                <span className="text-2xl md:text-3xl font-bold text-card">100%</span>
              </div>
              <p className="text-card/70 text-sm">Personnel certifié</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
