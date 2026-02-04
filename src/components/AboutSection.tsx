import { CheckCircle2, Award, Globe, Heart } from "lucide-react";
import videoPresentation from "@/assets/video-presentation.mp4";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Nous plaçons l'humain au cœur de notre démarche",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons l'excellence dans tous nos services",
  },
  {
    icon: Globe,
    title: "Accessibilité",
    description: "Des soins de qualité accessibles à tous",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-meta-lg">
              <video 
                src={videoPresentation} 
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 sm:h-64 md:h-80 lg:h-auto object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-card p-3 sm:p-6 rounded-lg sm:rounded-xl shadow-meta-md max-w-[160px] sm:max-w-xs">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm sm:text-base">+15 ans</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">d'expérience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              Qui sommes-nous
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Votre partenaire de confiance en{" "}
              <span className="gradient-text">services de santé</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Meta Cares est une entreprise spécialisée dans les services de santé, 
              présente en Belgique et au Cameroun. Notre mission est de faciliter 
              l'accès aux soins de qualité en connectant les patients aux meilleurs 
              professionnels de santé.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Nous accompagnons également les établissements de santé dans leur 
              recrutement et offrons des opportunités de carrière aux professionnels 
              du secteur médical.
            </p>

            {/* Checklist */}
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                "Personnel qualifié et certifié",
                "Service personnalisé et réactif",
                "Présence internationale",
                "Accompagnement 24/7",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm sm:text-base text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {values.map((value, index) => (
                <div key={index} className="text-center p-2 sm:p-4 rounded-lg bg-muted/50">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <p className="font-semibold text-foreground text-xs sm:text-sm">{value.title}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 hidden sm:block">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
