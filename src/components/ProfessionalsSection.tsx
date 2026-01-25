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
  return (
    <section id="professionnels" className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              Pour les Professionnels
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-card mb-6">
              Rejoignez{" "}
              <span className="gradient-text">Meta Cares</span>
            </h2>
            <p className="text-card/80 mb-8 leading-relaxed">
              Vous êtes infirmier, aide-soignant, médecin ou professionnel de santé ? 
              Rejoignez notre équipe et bénéficiez d'opportunités uniques de carrière 
              et de développement professionnel.
            </p>

            {/* Benefits grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card text-sm">{benefit.title}</h4>
                    <p className="text-card/60 text-xs mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-bg gradient-bg-hover text-primary-foreground" asChild>
                <a href="https://metacares.app" target="_blank" rel="noopener noreferrer">
                  Déposer ma candidature
                  <FileText className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-card/30 text-card hover:bg-card/10" asChild>
                <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                  En savoir plus
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <Card className="bg-card/10 backdrop-blur-sm border-card/20 p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-card mb-6">
                  Pourquoi nous rejoindre ?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">95%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card">Taux de satisfaction</p>
                      <p className="text-sm text-card/60">De nos collaborateurs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">48h</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card">Délai de réponse</p>
                      <p className="text-sm text-card/60">Pour toute candidature</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-card">Pays d'intervention</p>
                      <p className="text-sm text-card/60">Belgique & Cameroun</p>
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
