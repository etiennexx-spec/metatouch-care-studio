// Product data extracted from documents
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "securite-transfert",
    name: "Sécurité & Transfert",
    icon: "🛡️",
    description: "Lève-personnes, sangles, verticalisateurs et équipements de sécurité"
  },
  {
    id: "soins",
    name: "Soins & Pansements",
    icon: "🩹",
    description: "Pansements, solutions de nettoyage, instruments médicaux"
  },
  {
    id: "protection",
    name: "Protection & Maintien",
    icon: "🛏️",
    description: "Protections de lit, ceintures de sécurité, moufles de protection"
  },
  {
    id: "instruments",
    name: "Instruments Médicaux",
    icon: "🔬",
    description: "Ciseaux, pinces, bassins et équipements de stérilisation"
  }
];

export const products: Product[] = [
  // Sécurité & Transfert
  {
    id: "leve-personne-lifty",
    name: "Lève-personne électrique Lifty Bronze",
    price: "1 531,00 €",
    description: "Lève personne électrique 200 kg, pliant, fléau 4 points, démontable. Système de descente d'urgence électrique et mécanique.",
    image: "leve-personne",
    category: "securite-transfert"
  },
  {
    id: "leve-personne-fox",
    name: "Lève-personne Lifty Fox Bronze",
    price: "1 654,00 €",
    description: "Plus léger et design. Permet le ramassage au sol. Écartement des pieds sans effort. Fléau 4 crochets pivotant à 360°.",
    image: "leve-personne",
    category: "securite-transfert"
  },
  {
    id: "leve-personne-homelift",
    name: "Lève-personne Homelift Fox avec sangle",
    price: "1 657,00 €",
    description: "Système mécanique et électrique de descente d'urgence. Pliant pour déplacement et stockage vertical. Livré avec sangle confort.",
    image: "leve-personne",
    category: "securite-transfert"
  },
  {
    id: "leve-personne-ecartement",
    name: "Lève-personne écartement électrique",
    price: "2 013,00 €",
    description: "Design compact avec réglage électrique de l'écartement des roues. Repose-pieds réglables électriquement. Batterie amovible.",
    image: "leve-personne",
    category: "securite-transfert"
  },
  {
    id: "leve-personne-levitop",
    name: "Lève-personne Levitop 230 kg",
    price: "4 092,00 €",
    description: "Élévateur mobile élégant et rapide pour le levage et transport de personnes à mobilité réduite.",
    image: "leve-personne",
    category: "securite-transfert"
  },
  {
    id: "verticalisateur-vertihelp",
    name: "Lève-personne manuel VertiHelp",
    price: "1 769,00 €",
    description: "Pour déplacer un patient d'une position assise à une autre. Facilite le changement de pansements et l'hygiène.",
    image: "verticalisateur",
    category: "securite-transfert"
  },
  {
    id: "verticalisateur-mover-flex",
    name: "Verticalisateur Mover-Flex Sky",
    price: "1 489,00 €",
    description: "Transport rapide, stable et sûr vers lit, chaise ou toilettes. Siège rembourré pivotant et support pour genoux.",
    image: "verticalisateur",
    category: "securite-transfert"
  },
  {
    id: "molift-transfer-pro",
    name: "Molift Transfer Pro",
    price: "3 177,90 €",
    description: "Plateforme de transfert pour les transferts assis entre lit, fauteuil roulant et toilettes. Durée de vie 10 ans.",
    image: "verticalisateur",
    category: "securite-transfert"
  },
  {
    id: "sangle-standard-filet",
    name: "Sangle standard filet avec têtière",
    price: "À partir de 181,00 €",
    description: "Tissu filet résistant, micro-aéré et apte au contact avec l'eau.",
    image: "sangle-transfert",
    category: "securite-transfert"
  },
  {
    id: "sangle-toilette",
    name: "Sangles de toilette filet avec têtière",
    price: "À partir de 381,00 €",
    description: "Fabriquées en tissu filet résistant pour utilisation hygiénique.",
    image: "sangle-transfert",
    category: "securite-transfert"
  },
  {
    id: "sangle-universelle",
    name: "Sangle universelle qualité supérieure",
    price: "À partir de 396,00 €",
    description: "Pourvue de slots de couleur. Fournit un soutien complet pour le corps.",
    image: "sangle-transfert",
    category: "securite-transfert"
  },
  {
    id: "sangle-confort",
    name: "Sangles Confort avec têtière loop",
    price: "À partir de 279,00 €",
    description: "Sangles distinctes pour chaque jambe. Conception anti-chute. Compatible fléaux 2, 3 et 4 points.",
    image: "sangle-transfert",
    category: "securite-transfert"
  },

  // Soins & Pansements
  {
    id: "mepitel-film",
    name: "Mepitel Film 6 x 7 cm stérile",
    price: "18,20 €",
    description: "Pansement transparent stérile avec technologie Safetac pour retrait indolore. Boîte de 10.",
    image: "pansement-film",
    category: "soins"
  },
  {
    id: "steri-strip",
    name: "Steri-Strip sutures adhésives",
    price: "À partir de 49,80 €",
    description: "Sutures cutanées adhésives pour refermer les plaies sans douleur. Support microporeux hypoallergénique.",
    image: "pansement-film",
    category: "soins"
  },
  {
    id: "prontosan-solution",
    name: "Prontosan Solution 350 ml",
    price: "19,80 €",
    description: "Solution stérile pour nettoyage avancé des plaies. Dissout la fibrine, réduit les bactéries, absorbe les odeurs.",
    image: "solution-nettoyante",
    category: "soins"
  },
  {
    id: "prontosan-gel",
    name: "Prontosan Wound-Gel X 50g",
    price: "43,10 €",
    description: "Hydrogel médical pour nettoyer, hydrater et accélérer la cicatrisation. Dissout les dépôts et le biofilm.",
    image: "solution-nettoyante",
    category: "soins"
  },
  {
    id: "neoderm-cleanser",
    name: "Neoderm Cleanser 250 ml",
    price: "5,90 €",
    description: "Solution nettoyante pour la peau sans eau. Application pratique par vaporisateur.",
    image: "solution-nettoyante",
    category: "soins"
  },
  {
    id: "sanoskin-cleanser",
    name: "SanoSkin Cleanser 250 ml",
    price: "10,90 €",
    description: "Solution nettoyante pour plaies à base de chlorhexidine. Pour ulcères, escarres et plaies post-opératoires.",
    image: "solution-nettoyante",
    category: "soins"
  },
  {
    id: "ecolav-solution",
    name: "Ecolav Solution d'irrigation",
    price: "À partir de 1,30 €",
    description: "Liquide de rinçage au chlorure de sodium 0,9% pour nettoyage précis des plaies. Ampoules 30 ml.",
    image: "serum-physiologique",
    category: "soins"
  },
  {
    id: "serum-physiologique",
    name: "Sérum physiologique Physiodose",
    price: "À partir de 4,30 €",
    description: "Solution isotonique pour nettoyage des yeux, nez, oreilles et plaies. Format unidose 5 ml.",
    image: "serum-physiologique",
    category: "soins"
  },
  {
    id: "lamiderm-spray",
    name: "Lamiderm Repair First Aid 50 ml",
    price: "9,50 €",
    description: "Spray désinfectant cutané à base de chlorhexidine 0,3% pour éraflures et coupures.",
    image: "solution-nettoyante",
    category: "soins"
  },
  {
    id: "set-pansement-1",
    name: "Set à pansement Evocare n°1",
    price: "35,50 €",
    description: "Solution complète et stérile pour le soin des plaies. Carton de 50 sets.",
    image: "set-pansement",
    category: "soins"
  },
  {
    id: "set-pansement-3",
    name: "Set à pansement Evocare n°3",
    price: "32,70 €",
    description: "Kit stérile avec 5 compresses, pince anatomique et champ de protection. Carton de 50.",
    image: "set-pansement",
    category: "soins"
  },

  // Protection & Maintien
  {
    id: "moufles-rembourrée",
    name: "Moufles de protection rembourrées",
    price: "33,60 €",
    description: "Maintient les mains du patient au lit. Tissu en maille polyester haute résistance et respirabilité.",
    image: "moufles-protection",
    category: "protection"
  },
  {
    id: "moufles-sangle",
    name: "Moufles avec sangle et velcro",
    price: "27,40 €",
    description: "Limite la capacité de se blesser. Matériau en maille favorisant la circulation d'air. Lavable et réutilisable.",
    image: "moufles-protection",
    category: "protection"
  },
  {
    id: "moufles-nuit",
    name: "Moufles de nuit bleu marine M",
    price: "36,80 €",
    description: "Anti-escarres, anti-bactériennes et anti-odeurs.",
    image: "moufles-protection",
    category: "protection"
  },
  {
    id: "attache-poignets-nylon",
    name: "Attache-poignets en nylon (paire)",
    price: "11,50 €",
    description: "Empêche la pression sur les poignets. Tissu intérieur hypoallergénique.",
    image: "ceinture-securite",
    category: "protection"
  },
  {
    id: "attache-poignets-fourrure",
    name: "Attache-poignets fourrure synthétique",
    price: "52,40 €",
    description: "Peau de mouton synthétique de qualité supérieure. Hypoallergénique, douce et souple.",
    image: "ceinture-securite",
    category: "protection"
  },
  {
    id: "protection-barriere-clips",
    name: "Protection barrière avec clips",
    price: "À partir de 104,00 €",
    description: "Recouvre les barrières du lit médical. Mousse double face et fixation par attache rapide.",
    image: "protection-barriere",
    category: "protection"
  },
  {
    id: "protection-barriere-mousse",
    name: "Protection barrière en mousse",
    price: "147,00 €",
    description: "Mousse épaisse haute densité. Tissu lavable, antibactérien, imperméable et ignifuge.",
    image: "protection-barriere",
    category: "protection"
  },
  {
    id: "protection-barriere-zip",
    name: "Protection barrière avec zip",
    price: "À partir de 139,00 €",
    description: "Entretien par lingette décontaminante. Protection du résident agité.",
    image: "protection-barriere",
    category: "protection"
  },
  {
    id: "ceinture-eco",
    name: "Ceinture de sécurité Eco",
    price: "91,80 €",
    description: "Ceinture articulée pour le lit. Polyester léger et résistant. Taille unique jusqu'à 105 cm.",
    image: "ceinture-securite",
    category: "protection"
  },
  {
    id: "ceinture-salvaclip",
    name: "Ceinture articulée Salvaclip",
    price: "À partir de 239,00 €",
    description: "Pour lit ou fauteuil. Évite les risques de chute tout en permettant le changement de position.",
    image: "ceinture-securite",
    category: "protection"
  },
  {
    id: "ceinture-pelvienne-eco",
    name: "Ceinture pelvienne Eco Salvafix",
    price: "239,00 €",
    description: "Maintient le patient sur le dos. Fournie avec clé/aimant et 3 fermetures magnétiques.",
    image: "ceinture-securite",
    category: "protection"
  },
  {
    id: "ceinture-pelvienne-standard",
    name: "Ceinture pelvienne Salvafix Standard L",
    price: "290,00 €",
    description: "Maintient efficacement le patient agité. Système de fermeture magnétique avec clé.",
    image: "ceinture-securite",
    category: "protection"
  },

  // Instruments Médicaux
  {
    id: "ciseaux-iridectomie",
    name: "Ciseaux iridectomie droits 10 cm",
    price: "3,97 €",
    description: "Acier inoxydable précision chirurgicale. Stérilisables jusqu'à 135°C.",
    image: "ciseaux-medicaux",
    category: "instruments"
  },
  {
    id: "ciseaux-gesco",
    name: "Ciseaux de Gesco 19 cm",
    price: "4,95 €",
    description: "Autoclavables. Découpe de tout type de matériau (cuir, tissu, vinyle, liège).",
    image: "ciseaux-medicaux",
    category: "instruments"
  },
  {
    id: "ciseaux-bandage",
    name: "Ciseaux pour bandage 14 cm",
    price: "12,58 €",
    description: "Acier inoxydable spécial bandages. Stérilisables à 135°C.",
    image: "ciseaux-medicaux",
    category: "instruments"
  },
  {
    id: "pince-echarde",
    name: "Pince à écharde 11 cm",
    price: "3,10 €",
    description: "Acier inoxydable. Stérilisable à 135°C. Idéale pour extraction sécurisée.",
    image: "ciseaux-medicaux",
    category: "instruments"
  },
  {
    id: "pince-adson",
    name: "Pince Adson sans griffes 12 cm",
    price: "4,99 €",
    description: "Acier inoxydable pour manipulation délicate de tissus. Stérilisable à 135°C.",
    image: "ciseaux-medicaux",
    category: "instruments"
  },
  {
    id: "bassin-carton",
    name: "Bassin réniforme Evocare carton",
    price: "À partir de 9,39 €",
    description: "Solution écologique biodégradable. Excellente absorption et résistance aux liquides.",
    image: "bassin-reniforme",
    category: "instruments"
  },
  {
    id: "bassin-inox",
    name: "Bassin réniforme inox 25 cm",
    price: "9,21 €",
    description: "Acier inoxydable 18/10. Autoclavable jusqu'à 130°C. Pour hôpitaux et cliniques.",
    image: "bassin-reniforme",
    category: "instruments"
  },
  {
    id: "alcool-isopropylique",
    name: "Alcool isopropylique 70° 250 ml",
    price: "6,55 €",
    description: "Solution désinfectante rapide. Élimine bactéries et impuretés. Flacon à clapet.",
    image: "solution-nettoyante",
    category: "instruments"
  },
  {
    id: "plateaux-cellulose",
    name: "Plateaux cellulose usage unique",
    price: "114,96 €",
    description: "Carton recyclé, jetables et empilables. Carton de 840 unités.",
    image: "bassin-reniforme",
    category: "instruments"
  },
  {
    id: "sacs-sterilisation",
    name: "Sacs laminés Self Seal Surgipack",
    price: "39,52 €",
    description: "Stérilisation optimale avec bande auto-adhésive. Boîte de 200.",
    image: "set-pansement",
    category: "instruments"
  },
  {
    id: "test-autoclave",
    name: "Tests autoclave 3M Comply Bowie & Dick",
    price: "489,20 €",
    description: "Vérification efficacité des stérilisateurs. Changement de couleur clair. Boîte de 20.",
    image: "set-pansement",
    category: "instruments"
  },
  {
    id: "boite-sterilisation",
    name: "Boîte de stérilisation inox",
    price: "À partir de 22,99 €",
    description: "Protection optimale des instruments. Compatible autoclaves. Stérilisable à 135°C.",
    image: "bassin-reniforme",
    category: "instruments"
  }
];
