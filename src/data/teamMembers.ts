import employee1 from "@/assets/employee-cm-1.jpg";
import employee2 from "@/assets/employee-cm-2.jpg";
import employee3 from "@/assets/employee-cm-3.jpg";
import employee4 from "@/assets/employee-cm-4.jpg";
import employee5 from "@/assets/employee-cm-5.jpg";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  bio: string;
  skills: string[];
  experience: string;
  missions: string[];
  certifications: string[];
  email: string;
}

export const cameroonEmployees: TeamMember[] = [
  {
    id: "dongho-alicone",
    name: "DONGHO Aliçone",
    role: "Responsable Marketing Digital",
    location: "Yaoundé",
    image: employee1,
    bio: "Spécialiste en stratégie digitale avec une expertise approfondie en acquisition de leads et en développement de campagnes marketing performantes pour le secteur de la santé.",
    skills: ["SEO/SEM", "Google Ads", "Stratégie de contenu", "Analytics", "Marketing automation", "Gestion de campagnes"],
    experience: "3 ans d'expérience en marketing digital, spécialisé dans la promotion des services de santé et le recrutement de professionnels médicaux en Afrique centrale.",
    missions: [
      "Élaboration et mise en œuvre de la stratégie digitale de Meta Cares au Cameroun",
      "Gestion des campagnes Google Ads et Facebook Ads",
      "Analyse des KPIs et optimisation des performances marketing",
      "Développement de partenariats stratégiques avec les acteurs locaux de la santé",
    ],
    certifications: ["Google Digital Marketing", "HubSpot Inbound Marketing", "Meta Blueprint"],
    email: "dongho.alicone@metacares.app",
  },
  {
    id: "mengada-grace",
    name: "MENGADA Grace",
    role: "Responsable Marketing Digital",
    location: "Yaoundé",
    image: employee2,
    bio: "Experte en communication digitale et en gestion des réseaux sociaux, Grace pilote la présence en ligne de Meta Cares avec créativité et rigueur analytique.",
    skills: ["Community Management", "Social Media Marketing", "Création de contenu", "Email marketing", "Branding", "UX Writing"],
    experience: "4 ans d'expérience en marketing digital et communication, avec une spécialisation dans le secteur médical et paramédical.",
    missions: [
      "Gestion et animation des réseaux sociaux (Facebook, Instagram, LinkedIn, TikTok)",
      "Création de calendriers éditoriaux et de contenus engageants",
      "Suivi et analyse des métriques d'engagement et de conversion",
      "Coordination avec l'équipe de Belgique pour la cohérence de la marque",
    ],
    certifications: ["Google Analytics", "Hootsuite Social Marketing", "Canva Design"],
    email: "mengada.grace@metacares.app",
  },
  {
    id: "pegou-nelson",
    name: "PEGOU Nelson",
    role: "Responsable Marketing Digital",
    location: "Yaoundé",
    image: employee3,
    bio: "Passionné par le data-driven marketing, Nelson transforme les données en insights actionnables pour améliorer la visibilité et l'impact de Meta Cares.",
    skills: ["Data Analytics", "SEO technique", "A/B Testing", "CRM", "Publicité programmatique", "Reporting"],
    experience: "3 ans dans le marketing digital avec une forte orientation data et performance, spécialisé dans l'optimisation des tunnels de conversion.",
    missions: [
      "Mise en place et suivi des outils d'analyse (Google Analytics, Tag Manager)",
      "Optimisation SEO du site web et des landing pages",
      "Réalisation de tests A/B pour améliorer les taux de conversion",
      "Production de rapports de performance mensuels pour la direction",
    ],
    certifications: ["Google Analytics Certified", "SEMrush SEO Toolkit", "Google Tag Manager"],
    email: "pegou.nelson@metacares.app",
  },
  {
    id: "bissila-etienne",
    name: "BISSILA Etienne",
    role: "Responsable Marketing Digital",
    location: "Yaoundé",
    image: employee4,
    bio: "Créatif et stratège, Etienne conçoit des campagnes marketing innovantes qui renforcent la notoriété de Meta Cares auprès des professionnels de santé camerounais.",
    skills: ["Stratégie de marque", "Marketing d'influence", "Vidéo marketing", "Copywriting", "Design graphique", "Growth hacking"],
    experience: "3 ans d'expérience en marketing digital et branding, avec un focus sur le marketing d'influence et la création de contenu vidéo.",
    missions: [
      "Conception et production de contenus vidéo pour les réseaux sociaux",
      "Identification et gestion des partenariats avec des influenceurs santé",
      "Développement de la stratégie de marque employeur de Meta Cares",
      "Organisation d'événements digitaux (webinaires, lives) pour le recrutement",
    ],
    certifications: ["Adobe Creative Suite", "YouTube Content Strategy", "Facebook Blueprint"],
    email: "bissila.etienne@metacares.app",
  },
  {
    id: "obam-alexandre",
    name: "OBAM Alexandre",
    role: "Responsable Contenu",
    location: "Yaoundé",
    image: employee5,
    bio: "Rédacteur et stratège de contenu, Alexandre produit des contenus à forte valeur ajoutée qui positionnent Meta Cares comme référence dans le secteur de la santé.",
    skills: ["Rédaction web", "Content Strategy", "Storytelling", "SEO rédactionnel", "Newsletters", "Podcasting"],
    experience: "4 ans d'expérience en rédaction et stratégie de contenu, spécialisé dans la vulgarisation médicale et la communication institutionnelle.",
    missions: [
      "Rédaction d'articles de blog, études de cas et livres blancs",
      "Élaboration de la stratégie éditoriale multi-canal",
      "Optimisation SEO des contenus publiés sur le site",
      "Coordination de la production de podcasts et newsletters thématiques",
    ],
    certifications: ["Content Marketing Institute", "Yoast SEO", "Mailchimp Email Marketing"],
    email: "obam.alexandre@metacares.app",
  },
];
