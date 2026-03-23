import { 
  TrendingUp, 
  Users, 
  Globe2, 
  BadgeCheck,
  FileText,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteSection } from "@/hooks/useSiteSection";

const benefits = [
  {
    icon: TrendingUp,
    title: "Évolution de carrière",
    description: "Opportunités de croissance professionnelle et développement continu.",
  },
  {
    icon: Users,
    title: "Réseau professionnel",
    description: "Intégrez un réseau de professionnels de santé qualifiés.",
  },
  {
    icon: Globe2,
    title: "Opportunités internationales",
    description: "Travaillez en Belgique, au Cameroun ou à l'international.",
  },
  {
    icon: BadgeCheck,
    title: "Formations certifiantes",
    description: "Accédez à des formations pour développer vos compétences.",
  },
];

const ProfessionalsSection = () => {
  const { data: section } = useSiteSection("professionals");

  return (
    <section id="professionnels" className="py-12 md:py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {section?.subtitle ?? "Pour les Professionnels"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-card mb-4 sm:mb-6">
              {section?.title ?? "Rejoignez"}{" "}
              <span className="gradient-text">Meta Cares</span>
            </h2>
            <p className="text-sm sm:text-base text-card/80 mb-6 sm:mb-8 leading-relaxed">
              {section?.description ?? "Vous êtes infirmier, aide-soignant, médecin ou professionnel de santé ? Rejoignez notre équipe et bénéficiez d'opportunités uniques de carrière et de développement professionnel."}
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card text-xs sm:text-sm">{benefit.title}</h4>
                    <p className="text-card/60 text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="gradient-bg gradient-bg-hover text-primary-foreground text-sm sm:text-base" asChild>
                <a href="https://metacares.app" target="_blank" rel="noopener noreferrer">
                  Déposer ma candidature
                  <FileText className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-card/30 text-card hover:bg-card/10 text-sm sm:text-base" asChild>
                <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                  En savoir plus
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative mt-6 lg:mt-0">
            <Card className="bg-card/10 backdrop-blur-sm border-card/20 p-4 sm:p-8">
              <CardContent className="p-0">
                <h3 className="text-lg sm:text-xl font-bold text-card mb-4 sm:mb-6">
                  Pourquoi nous rejoindre ?
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-2xl font-bold text-primary-foreground">95%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card text-sm sm:text-base">Taux de satisfaction</p>
                      <p className="text-xs sm:text-sm text-card/60">De nos collaborateurs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-2xl font-bold text-primary-foreground">48h</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card text-sm sm:text-base">Délai de réponse</p>
                      <p className="text-xs sm:text-sm text-card/60">Pour toute candidature</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg sm:text-2xl font-bold text-primary-foreground">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card text-sm sm:text-base">Pays d'intervention</p>
                      <p className="text-xs sm:text-sm text-card/60">Belgique & Cameroun</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative gradient */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full opacity-20 gradient-bg blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsSection;
