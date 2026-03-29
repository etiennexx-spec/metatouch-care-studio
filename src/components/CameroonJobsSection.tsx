import { useState, useEffect, useRef } from "react";
import { useSiteSection } from "@/hooks/useSiteSection";
import { Briefcase, Send, Upload, FileText, X, MapPin, Clock, Loader2, Calendar, CalendarDays, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import actFormation from "@/assets/activity-formation.jpg";
import actCampagne from "@/assets/activity-campagne.jpg";
import actReunion from "@/assets/activity-reunion.jpg";
import actVisite from "@/assets/activity-visite.jpg";
import actLogistique from "@/assets/activity-logistique.jpg";
import actSensibilisation from "@/assets/activity-sensibilisation.jpg";
import actGala from "@/assets/activity-gala.jpg";
import actMarketing from "@/assets/activity-marketing.jpg";
import actPartenariat from "@/assets/activity-partenariat.jpg";

const cameroonJobs = [
  {
    id: 1,
    title: "Infirmier(ère) Diplômé(e) d'État",
    location: "Douala, Cameroun",
    type: "CDI",
    description: "Nous recherchons des infirmiers diplômés pour rejoindre notre équipe à Douala. Expérience en soins à domicile appréciée.",
    requirements: ["Diplôme d'État en soins infirmiers", "2 ans d'expérience minimum", "Permis de conduire"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Aide-Soignant(e)",
    location: "Yaoundé, Cameroun",
    type: "CDI",
    description: "Rejoignez notre équipe d'aides-soignants pour accompagner nos patients dans leurs soins quotidiens.",
    requirements: ["Formation d'aide-soignant", "Expérience en gériatrie", "Sens de l'écoute"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Kinésithérapeute",
    location: "Douala, Cameroun",
    type: "CDI",
    description: "Nous recrutons des kinésithérapeutes pour des interventions à domicile et en établissement partenaire.",
    requirements: ["Diplôme de kinésithérapie", "Autonomie", "Véhicule personnel"],
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Auxiliaire de Vie",
    location: "Bafoussam, Cameroun",
    type: "CDD/CDI",
    description: "Accompagnez nos bénéficiaires dans leur vie quotidienne et leurs activités sociales.",
    requirements: ["Formation auxiliaire de vie", "Patience et empathie", "Disponibilité"],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    title: "Sage-Femme",
    location: "Douala, Cameroun",
    type: "CDI",
    description: "Accompagnez les futures mamans à domicile pour un suivi de grossesse personnalisé.",
    requirements: ["Diplôme de sage-femme", "Expérience en suivi prénatal", "Empathie"],
    image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=300&h=200&fit=crop",
  },
];

type ProgramPeriod = "hebdomadaire" | "mensuel" | "annuel";

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  type: string;
  period: ProgramPeriod;
  date?: string;
}

const activities: Activity[] = [
  // Hebdomadaire
  {
    id: 1,
    title: "Réunion d'équipe soins à domicile",
    description: "Briefing hebdomadaire de l'équipe terrain : planification des visites, répartition des patients et suivi des cas prioritaires à Douala et Yaoundé.",
    image: actReunion,
    type: "réunion",
    period: "hebdomadaire",
    date: "Tous les lundis",
  },
  {
    id: 2,
    title: "Visites à domicile – Suivi patients",
    description: "Programme de visites régulières chez les patients chroniques et les personnes âgées. Contrôle des constantes, renouvellement des pansements et accompagnement personnalisé.",
    image: actVisite,
    type: "soins",
    period: "hebdomadaire",
    date: "Du lundi au vendredi",
  },
  {
    id: 3,
    title: "Stratégie marketing digital",
    description: "Session de travail sur les réseaux sociaux, création de contenu santé et analyse des performances des campagnes digitales de Meta Cares Cameroun.",
    image: actMarketing,
    type: "marketing",
    period: "hebdomadaire",
    date: "Tous les mercredis",
  },
  // Mensuel
  {
    id: 4,
    title: "Formation continue des soignants",
    description: "Atelier de perfectionnement pour les infirmiers et aides-soignants : nouvelles techniques de soins, protocoles d'hygiène et gestion des urgences à domicile.",
    image: actFormation,
    type: "formation",
    period: "mensuel",
    date: "1er samedi du mois",
  },
  {
    id: 5,
    title: "Campagne de sensibilisation santé",
    description: "Descente dans les quartiers de Douala pour sensibiliser les populations sur l'hypertension, le diabète et les maladies chroniques. Dépistages gratuits et conseils de prévention.",
    image: actCampagne,
    type: "campagne",
    period: "mensuel",
    date: "2ème semaine du mois",
  },
  {
    id: 6,
    title: "Approvisionnement matériel médical",
    description: "Réception et inventaire du matériel médical : équipements de soins, consommables et dispositifs médicaux pour les interventions terrain et partenaires hospitaliers.",
    image: actLogistique,
    type: "logistique",
    period: "mensuel",
    date: "Fin de mois",
  },
  // Annuel
  {
    id: 7,
    title: "Conférence annuelle Meta Cares",
    description: "Grand événement rassemblant les équipes Belgique et Cameroun : bilan de l'année, objectifs stratégiques, remise de distinctions et soirée de gala.",
    image: actGala,
    type: "événement",
    period: "annuel",
    date: "Décembre",
  },
  {
    id: 8,
    title: "Séminaire de sensibilisation nationale",
    description: "Journée nationale de sensibilisation aux soins à domicile au Cameroun. Conférences avec des médecins, témoignages de patients et tables rondes sur l'avenir de la santé.",
    image: actSensibilisation,
    type: "séminaire",
    period: "annuel",
    date: "Avril",
  },
  {
    id: 9,
    title: "Signature de nouveaux partenariats",
    description: "Cérémonie officielle de signature de conventions avec les hôpitaux et cliniques partenaires au Cameroun pour étendre la couverture des soins Meta Cares.",
    image: actPartenariat,
    type: "partenariat",
    period: "annuel",
    date: "Septembre",
  },
];

const periodFilters: { key: ProgramPeriod; label: string; icon: typeof Calendar }[] = [
  { key: "hebdomadaire", label: "Hebdomadaire", icon: Calendar },
  { key: "mensuel", label: "Mensuel", icon: CalendarDays },
  { key: "annuel", label: "Annuel", icon: CalendarRange },
];

const CameroonJobsSection = () => {
  const { data: section } = useSiteSection("cameroon_jobs");
  const [selectedJob, setSelectedJob] = useState<typeof cameroonJobs[0] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activePeriod, setActivePeriod] = useState<ProgramPeriod>("hebdomadaire");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for jobs
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 1;
      }
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("job_applications").insert({
        job_title: selectedJob.title,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        motivation: formData.message || "Candidature soumise",
      });
      if (error) throw error;
      toast.success("Candidature envoyée avec succès !");
      setSelectedJob(null);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFiles([]);
    } catch {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="offres" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {section?.subtitle ?? "Offres d'Emploi"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {section?.title ? <span className="gradient-text">{section.title}</span> : <>Opportunités au <span className="gradient-text">Cameroun</span></>}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            {section?.description ?? "Découvrez nos offres d'emploi et rejoignez une équipe dynamique dédiée aux soins de qualité."}
          </p>
        </div>

        {/* Main content - Responsive layout */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Left - Job listings scrolling */}
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 shadow-card border border-border/50">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Postes Disponibles
            </h3>
            <div
              ref={scrollRef}
              className="h-[300px] md:h-[400px] overflow-hidden relative"
              onMouseEnter={() => {
                if (scrollRef.current) {
                  scrollRef.current.style.animationPlayState = "paused";
                }
              }}
              onMouseLeave={() => {
                if (scrollRef.current) {
                  scrollRef.current.style.animationPlayState = "running";
                }
              }}
            >
              <div className="space-y-4">
                {[...cameroonJobs, ...cameroonJobs].map((job, index) => (
                  <motion.div
                    key={`${job.id}-${index}`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedJob(job)}
                    className="bg-background rounded-xl p-4 cursor-pointer border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{job.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                          <span className="mx-1">•</span>
                          <Clock className="w-3 h-3" />
                          {job.type}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Join Team CTA */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl md:rounded-2xl p-6 md:p-8 text-primary-foreground flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Rejoignez notre équipe</h3>
            <p className="text-primary-foreground/90 mb-4 md:mb-6 text-sm md:text-base">
              Meta Cares recherche des professionnels passionnés pour offrir des soins de qualité au Cameroun. 
              Bénéficiez d'une rémunération attractive, de formations continues et d'un environnement de travail stimulant.
            </p>
            <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
              {["Formation continue", "Rémunération compétitive", "Équipe dynamique", "Opportunités d'évolution"].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Button
                variant="secondary"
                size="lg"
                asChild
              >
                <a href="https://metacares.be" target="_blank" rel="noopener noreferrer">
                  En savoir plus
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <a href="https://metacares.app" target="_blank" rel="noopener noreferrer">
                  Déposer ma candidature
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Programs & Activities with Filters */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 text-center">
            Programmes & Activités
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Découvrez les activités planifiées par l'équipe Meta Cares au Cameroun
          </p>

          {/* Period Filters */}
          <div className="flex justify-center gap-2 md:gap-3 mb-6">
            {periodFilters.map((filter) => (
              <Button
                key={filter.key}
                variant={activePeriod === filter.key ? "default" : "outline"}
                onClick={() => setActivePeriod(filter.key)}
                className={activePeriod === filter.key ? "gradient-bg text-primary-foreground" : ""}
                size="sm"
              >
                <filter.icon className="w-4 h-4 mr-1.5" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Filtered Activities Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePeriod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {activities
                .filter((a) => a.period === activePeriod)
                .map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setSelectedActivity(activity)}
                    className="relative rounded-xl overflow-hidden cursor-pointer group bg-card border border-border/50 shadow-sm"
                  >
                    <img
                      src={activity.image}
                      alt={activity.title}
                      loading="lazy"
                      width={768}
                      height={512}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {activity.type}
                        </span>
                        {activity.date && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {activity.date}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Job Application Dialog */}
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedJob?.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {selectedJob?.location}
                <span className="mx-1">•</span>
                <Clock className="w-4 h-4" />
                {selectedJob?.type}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Description du poste</h4>
                <p className="text-muted-foreground">{selectedJob?.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Exigences</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  {selectedJob?.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-semibold">Postuler maintenant</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Input
                  placeholder="Votre téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Votre message de motivation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />

                {/* File upload */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 w-4 h-4" />
                    Joindre vos documents (CV, diplômes...)
                  </Button>
                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <button type="button" onClick={() => removeFile(index)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full gradient-bg gradient-bg-hover">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Envoyer ma candidature
                    </>
                  )}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {/* Activity Detail Dialog */}
        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedActivity?.title}</DialogTitle>
            </DialogHeader>
            <img
              src={selectedActivity?.image}
              alt={selectedActivity?.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">{selectedActivity?.description}</p>
            {selectedActivity?.type === "emploi" && (
              <Button asChild className="gradient-bg gradient-bg-hover">
                <a href="https://metacares.app" target="_blank" rel="noopener noreferrer">
                  Déposer ma candidature
                </a>
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CameroonJobsSection;
