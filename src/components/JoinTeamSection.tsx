import { useState, useEffect, useCallback } from "react";
import { Stethoscope, HeartPulse, Brain, Baby, Bone, Users, ArrowRight, ExternalLink } from "lucide-react";
import { useSiteSection } from "@/hooks/useSiteSection";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const teamCategories = [
  {
    icon: Stethoscope,
    title: "Infirmier(ère)s",
    description: "Rejoignez notre équipe d'infirmiers pour des soins à domicile de qualité.",
    roles: ["Infirmier(ère) généraliste", "Infirmier(ère) spécialisé(e)", "Aide-soignant(e)"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop",
  },
  {
    icon: HeartPulse,
    title: "Kinésithérapeutes",
    description: "Accompagnez nos patients dans leur rééducation et leur mobilité.",
    roles: ["Kinésithérapeute général", "Kinésithérapeute respiratoire", "Kinésithérapeute sportif"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    icon: Brain,
    title: "Psychologues",
    description: "Offrez un soutien psychologique à nos patients et leurs familles.",
    roles: ["Psychologue clinicien", "Neuropsychologue", "Psychologue de la santé"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
  },
  {
    icon: Baby,
    title: "Sages-femmes",
    description: "Accompagnez les futures mamans tout au long de leur grossesse.",
    roles: ["Sage-femme libérale", "Accompagnement postnatal", "Préparation à l'accouchement"],
    image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=400&h=300&fit=crop",
  },
  {
    icon: Bone,
    title: "Ergothérapeutes",
    description: "Aidez nos patients à retrouver leur autonomie au quotidien.",
    roles: ["Ergothérapeute à domicile", "Adaptation du logement", "Rééducation fonctionnelle"],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
  },
  {
    icon: Users,
    title: "Aides à domicile",
    description: "Accompagnez nos patients dans leurs activités quotidiennes.",
    roles: ["Aide ménagère", "Auxiliaire de vie", "Accompagnateur(trice)"],
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop",
  },
];

const JoinTeamSection = () => {
  const { data: section } = useSiteSection("join_team");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Auto-scroll
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="join" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Carrières
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rejoignez{" "}
            <span className="gradient-text">notre équipe</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Meta Cares recherche des professionnels passionnés pour rejoindre notre réseau et offrir des soins de qualité à domicile.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto px-4 md:px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {teamCategories.map((category, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-card h-full flex flex-col">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{category.description}</p>
                      <div className="space-y-1 mb-4">
                        {category.roles.map((role, idx) => (
                          <div key={idx} className="text-xs text-primary flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teamCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? "bg-primary w-6" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            Intéressé(e) à rejoindre notre équipe ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild
              variant="outline"
              size="lg"
            >
              <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 w-4 h-4" />
                En savoir plus
              </a>
            </Button>
            <Button 
              asChild
              size="lg" 
              className="gradient-bg gradient-bg-hover text-primary-foreground"
            >
              <a href="https://metacares.app" target="_blank" rel="noopener noreferrer">
                S'inscrire maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
