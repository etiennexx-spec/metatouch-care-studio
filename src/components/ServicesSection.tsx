import { useState } from "react";
import {
  UserPlus,
  GraduationCap,
  Briefcase,
  Clock,
  Home,
  Stethoscope,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceDetailModal from "./ServiceDetailModal";
import { useSiteSection } from "@/hooks/useSiteSection";

const services = [
  {
    icon: UserPlus,
    title: "Mise en disposition du personnel",
    description: "Nous mettons à votre disposition des professionnels de santé qualifiés pour répondre à vos besoins temporaires ou permanents.",
    fullDescription: "Notre service de mise à disposition du personnel vous garantit un accès rapide à des professionnels de santé rigoureusement sélectionnés et qualifiés. Que vous ayez besoin de renforcer vos équipes temporairement ou de manière permanente, Meta Cares s'engage à vous fournir les meilleurs talents du secteur médical.",
    benefits: [
      "Personnel vérifié et certifié avec validation des diplômes",
      "Disponibilité 24h/24 et 7j/7 pour les urgences",
      "Adaptation aux besoins spécifiques de votre établissement",
      "Suivi personnalisé et évaluation continue des performances",
      "Gestion administrative complète (contrats, paie, assurances)"
    ],
    process: "Après analyse de vos besoins, nous sélectionnons les profils les plus adaptés parmi notre réseau de professionnels. Un entretien de validation est organisé, puis le personnel est mis à disposition avec un suivi régulier de la qualité du service."
  },
  {
    icon: GraduationCap,
    title: "Développement professionnel et formation",
    description: "Programmes de formation continue pour les professionnels de santé afin de maintenir et améliorer leurs compétences.",
    fullDescription: "Meta Cares propose des programmes de formation innovants et certifiants destinés aux professionnels de santé. Nos formations sont conçues pour répondre aux exigences actuelles du secteur médical et permettre une montée en compétences continue.",
    benefits: [
      "Formations certifiantes reconnues par les autorités de santé",
      "Modules en présentiel et en e-learning flexibles",
      "Formateurs experts avec expérience terrain",
      "Accompagnement personnalisé et suivi post-formation",
      "Accès à une plateforme de ressources pédagogiques"
    ],
    process: "Nous établissons un diagnostic des compétences, puis proposons un parcours de formation sur mesure. Les sessions combinent théorie et pratique, avec évaluation finale et délivrance d'un certificat de compétences."
  },
  {
    icon: Briefcase,
    title: "Placement des professionnels de santé",
    description: "Service de placement pour connecter les établissements de santé avec des candidats qualifiés et expérimentés.",
    fullDescription: "Notre service de placement permanent met en relation les établissements de santé avec des professionnels qualifiés recherchant des opportunités de carrière. Nous assurons un matching parfait entre les compétences des candidats et les besoins des employeurs.",
    benefits: [
      "Base de données de candidats qualifiés et motivés",
      "Processus de recrutement rigoureux et transparent",
      "Vérification approfondie des références et antécédents",
      "Accompagnement dans l'intégration du nouveau collaborateur",
      "Garantie de remplacement en cas de départ anticipé"
    ],
    process: "Nous analysons vos besoins en recrutement, présélectionnons les candidats correspondants, organisons les entretiens et vous accompagnons jusqu'à la signature du contrat et l'intégration réussie du collaborateur."
  },
  {
    icon: Clock,
    title: "Remplacement temporaire",
    description: "Solutions de remplacement flexible pour les infirmiers indépendants et établissements de santé.",
    fullDescription: "Notre service de remplacement temporaire offre une solution rapide et fiable pour pallier les absences imprévues ou planifiées. Nous garantissons la continuité des soins avec des professionnels immédiatement opérationnels.",
    benefits: [
      "Réactivité garantie sous 24 à 48 heures",
      "Professionnels formés aux protocoles de votre établissement",
      "Flexibilité des durées de mission (de quelques jours à plusieurs mois)",
      "Tarification transparente et compétitive",
      "Gestion simplifiée des formalités administratives"
    ],
    process: "Dès réception de votre demande, nous identifions le professionnel disponible le plus adapté. Un briefing est réalisé sur les spécificités de votre établissement avant la prise de poste."
  },
  {
    icon: Home,
    title: "Soins à domicile",
    description: "Recherche et coordination de soins à domicile personnalisés pour un accompagnement de qualité.",
    fullDescription: "Meta Cares coordonne des services de soins à domicile de haute qualité, permettant aux patients de recevoir les soins nécessaires dans le confort de leur foyer. Nous mettons l'accent sur la dignité, le respect et le bien-être du patient.",
    benefits: [
      "Évaluation complète des besoins du patient à domicile",
      "Plan de soins personnalisé et évolutif",
      "Équipe pluridisciplinaire (infirmiers, aides-soignants, kinésithérapeutes)",
      "Coordination avec le médecin traitant et les spécialistes",
      "Support 24h/24 pour les familles et les aidants"
    ],
    process: "Une visite d'évaluation est effectuée au domicile du patient. Un plan de soins est établi en concertation avec la famille et les professionnels de santé. Les soins sont dispensés selon un planning adapté avec suivi régulier."
  },
  {
    icon: Stethoscope,
    title: "Consultations médicales",
    description: "Organisation de consultations avec des spécialistes pour un suivi médical optimal.",
    fullDescription: "Nous facilitons l'accès aux consultations médicales spécialisées en organisant des rendez-vous avec des médecins experts. Notre réseau de spécialistes couvre l'ensemble des disciplines médicales pour un accompagnement complet.",
    benefits: [
      "Accès rapide à un large réseau de spécialistes",
      "Prise de rendez-vous simplifiée et coordination des consultations",
      "Téléconsultations disponibles pour plus de flexibilité",
      "Transmission sécurisée des dossiers médicaux",
      "Suivi post-consultation et coordination des soins"
    ],
    process: "Après analyse de votre besoin médical, nous identifions le spécialiste le plus adapté et organisons le rendez-vous dans les meilleurs délais. Un compte-rendu est transmis à votre médecin traitant pour assurer la continuité des soins."
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const { data: section } = useSiteSection("services");

  return (
    <section id="services" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            {section?.subtitle ?? "Nos Services"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {section?.title ? (
              <>{section.title.split(" la ")[0]}{" "}<span className="gradient-text">{"la " + (section.title.split(" la ")[1] ?? "santé")}</span></>
            ) : (
              <>Des solutions complètes pour la{" "}<span className="gradient-text">santé</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            {section?.description ?? "Meta Cares offre une gamme complète de services pour accompagner les patients, les professionnels de santé et les établissements médicaux."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-meta-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl gradient-bg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                  {service.description}
                </CardDescription>
                <div className="flex items-center text-primary text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Service Detail Modal with multi-step flow */}
      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
};

export default ServicesSection;
