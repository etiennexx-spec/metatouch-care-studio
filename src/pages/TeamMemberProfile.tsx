import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Mail, Award, Briefcase, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { cameroonEmployees } from "@/data/teamMembers";

const Footer = lazy(() => import("@/components/Footer"));

const TeamMemberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const member = cameroonEmployees.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Profil introuvable</h1>
          <Link to="/carrieres">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux carrières
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <Link to="/carrieres">
              <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'équipe
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl flex-shrink-0"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center md:text-left flex-1"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {member.name}
                </h1>
                <p className="text-xl text-primary font-semibold mb-3">{member.role}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {member.location}, Cameroun
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </span>
                </div>
                <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Expérience</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{member.experience}</p>
            </motion.div>

            {/* Compétences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Compétences</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Missions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Missions principales</h2>
              </div>
              <ul className="space-y-3">
                {member.missions.map((mission, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {mission}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Certifications</h2>
              </div>
              <ul className="space-y-3">
                {member.certifications.map((cert, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-4 h-4 text-primary flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Envie de rejoindre l'équipe ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Découvrez nos offres d'emploi et rejoignez une équipe dynamique au service de l'excellence médicale.
            </p>
            <Link to="/carrieres">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                Voir les offres d'emploi
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default TeamMemberProfile;
