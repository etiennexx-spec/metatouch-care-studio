import { useState, useEffect, useRef, useMemo } from "react";
import { useSiteSection } from "@/hooks/useSiteSection";
import { Briefcase, Send, Upload, FileText, X, MapPin, Clock, Loader2, Calendar, CalendarDays, CalendarRange, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { usePublicNewsFeed, type NewsItem } from "@/hooks/useNewsFeed";
import { useDynamicPrograms } from "@/hooks/useDynamicContent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import activityPlaceholder from "@/assets/activity-reunion.jpg";

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

// Activités gérées 100% depuis le dashboard (/admin/programs)
const activities: Activity[] = [];

const periodFilters: { key: ProgramPeriod; label: string; icon: typeof Calendar }[] = [
  { key: "hebdomadaire", label: "Hebdomadaire", icon: Calendar },
  { key: "mensuel", label: "Mensuel", icon: CalendarDays },
  { key: "annuel", label: "Annuel", icon: CalendarRange },
];

const CameroonJobsSection = () => {
  const { data: section } = useSiteSection("cameroon_jobs");
  const { data: newsItems = [] } = usePublicNewsFeed();
  const { data: dynamicPrograms = [] } = useDynamicPrograms();
  const [selectedJob, setSelectedJob] = useState<typeof cameroonJobs[0] | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
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

  // Merge static + dynamic programs
  const mergedActivities: Activity[] = useMemo(() => [
    ...activities,
    ...dynamicPrograms.map((p: any, idx: number) => ({
      id: 1000 + idx,
      title: p.title,
      description: p.description || "",
      image: p.image_url || actReunion,
      type: "programme",
      period: (p.period as ProgramPeriod) || "hebdomadaire",
      date: p.event_date || undefined,
    })),
  ], [dynamicPrograms]);

  const filteredNews = useMemo(
    () => newsItems.filter((n) => n.period === activePeriod),
    [newsItems, activePeriod]
  );

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
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1">{job.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.type}
                          </span>
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

        {/* Programmes & Activités */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-6 md:mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-3">
              Programmes & Activités
            </span>
            <h3 className="text-xl md:text-3xl font-bold text-foreground mb-2">
              Nos <span className="gradient-text">activités</span> au Cameroun
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
              Découvrez nos programmes hebdomadaires, mensuels et annuels au service des patients et des communautés.
            </p>
          </div>

          {/* Period filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            {periodFilters.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActivePeriod(key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activePeriod === key
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border/50 hover:border-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Activities grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePeriod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {mergedActivities
                .filter((a) => a.period === activePeriod)
                .map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedActivity(activity)}
                    className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-card cursor-pointer group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 inline-block px-2 py-0.5 rounded-full bg-background/90 text-foreground text-xs font-medium capitalize">
                        {activity.type}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{activity.title}</h4>
                      {activity.date && (
                        <p className="text-xs text-primary font-medium mb-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {activity.date}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                    </div>
                  </motion.div>
                ))}

              {/* Dynamic news items from admin */}
              {filteredNews.map((news) => (
                <motion.div
                  key={`news-${news.id}`}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedNews(news)}
                  className="bg-card rounded-xl overflow-hidden border border-secondary/30 shadow-card cursor-pointer group"
                >
                  <div className="relative h-40 overflow-hidden bg-muted">
                    {news.media_url ? (
                      news.media_type === "video" ? (
                        <video
                          src={news.media_url}
                          muted
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <img
                          src={news.media_url}
                          alt={news.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <VideoIcon className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 inline-block px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      Actualité
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{news.title}</h4>
                    {news.event_date && (
                      <p className="text-xs text-secondary font-medium mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {news.event_date}
                      </p>
                    )}
                    {news.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{news.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Social Media Panel */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 text-center">
            Suivez-nous sur les réseaux sociaux
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Restez connectés avec l'actualité de Meta Cares Cameroun
          </p>

          <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border/50 shadow-card p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100090137613823"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-background border border-border/50 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">Facebook</span>
                <span className="text-xs text-muted-foreground">Meta Cares</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@meta.cares.camero?lang=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-background border border-border/50 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-background" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">TikTok</span>
                <span className="text-xs text-muted-foreground">@meta.cares.camero</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/metacares_group/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-background border border-border/50 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-foreground">Instagram</span>
                <span className="text-xs text-muted-foreground">@metacares_group</span>
              </a>
            </div>
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
              <DialogDescription className="flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
                  {selectedActivity?.type}
                </span>
                {selectedActivity?.date && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedActivity.date}
                  </span>
                )}
                <span className="text-xs text-muted-foreground capitalize">
                  • Programme {selectedActivity?.period}
                </span>
              </DialogDescription>
            </DialogHeader>
            <img
              src={selectedActivity?.image}
              alt={selectedActivity?.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">{selectedActivity?.description}</p>
          </DialogContent>
        </Dialog>

        {/* News Item Detail Dialog */}
        <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedNews?.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 flex-wrap">
                <span className="inline-block px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-medium">
                  Actualité {selectedNews?.period}
                </span>
                {selectedNews?.event_date && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedNews.event_date}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            {selectedNews?.media_url && (
              selectedNews.media_type === "video" ? (
                <video
                  src={selectedNews.media_url}
                  controls
                  className="w-full rounded-lg max-h-[60vh] bg-black"
                />
              ) : (
                <img
                  src={selectedNews.media_url}
                  alt={selectedNews.title}
                  className="w-full max-h-[60vh] object-contain rounded-lg bg-muted"
                />
              )
            )}
            {selectedNews?.description && (
              <p className="text-muted-foreground whitespace-pre-line">{selectedNews.description}</p>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default CameroonJobsSection;
