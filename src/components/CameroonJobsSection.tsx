import { useState, useEffect, useRef } from "react";
import { Briefcase, Send, Upload, FileText, X, MapPin, Clock, Loader2 } from "lucide-react";
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

const activities = [
  {
    id: 1,
    title: "Formation Continue 2024",
    description: "Nos équipes participent régulièrement à des formations pour maintenir un haut niveau de compétence.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    type: "formation",
  },
  {
    id: 2,
    title: "Journée Portes Ouvertes",
    description: "Venez découvrir nos locaux et rencontrer nos équipes lors de notre prochaine journée portes ouvertes.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop",
    type: "evenement",
  },
  {
    id: 3,
    title: "Partenariat avec l'Hôpital Laquintinie",
    description: "Nouveau partenariat stratégique pour améliorer l'accès aux soins de qualité à Douala.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
    type: "partenariat",
  },
  {
    id: 4,
    title: "Recrutement Massif Infirmiers",
    description: "Meta Cares recrute 20 infirmiers pour renforcer son équipe au Cameroun.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    type: "emploi",
  },
];

const CameroonJobsSection = () => {
  const [selectedJob, setSelectedJob] = useState<typeof cameroonJobs[0] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:recrutement@metacares.be?subject=Candidature: ${selectedJob?.title}&body=Nom: ${formData.name}%0AEmail: ${formData.email}%0ATéléphone: ${formData.phone}%0A%0AMessage:%0A${formData.message}`;
    window.location.href = mailtoLink;
    setSelectedJob(null);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setFiles([]);
  };

  return (
    <section id="offres" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Offres d'Emploi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Opportunités au <span className="gradient-text">Cameroun</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Découvrez nos offres d'emploi et rejoignez une équipe dynamique dédiée aux soins de qualité.
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

        {/* Activities Grid */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 text-center">
            Actualités & Activités
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedActivity(activity)}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground text-xs mb-2">
                    {activity.type}
                  </span>
                  <h4 className="text-sm font-semibold text-white line-clamp-2">{activity.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
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

                <Button type="submit" className="w-full gradient-bg gradient-bg-hover">
                  <Send className="mr-2 w-4 h-4" />
                  Envoyer ma candidature
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
