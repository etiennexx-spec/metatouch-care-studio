import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Users, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Lazy load below-the-fold components
const JoinTeamSection = lazy(() => import("@/components/JoinTeamSection"));
const CameroonJobsSection = lazy(() => import("@/components/CameroonJobsSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section for Careers */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-bg opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Link to="/">
                <Button variant="ghost" className="mb-6 text-primary hover:text-primary/80">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-lg font-medium mb-6"
              >
                🌍 Rejoignez l'aventure Meta Cares
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Construisons ensemble{" "}
                <span className="gradient-text">l'avenir des soins</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
                Découvrez nos opportunités de carrière et rejoignez une équipe passionnée 
                au service de l'excellence médicale entre la Belgique et le Cameroun.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                {[
                  { icon: Briefcase, label: "Offres actives", value: "5+" },
                  { icon: Users, label: "Employés", value: "12+" },
                  { icon: MapPin, label: "Pays", value: "2" },
                  { icon: Building, label: "Bureaux", value: "3" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card rounded-xl p-4 md:p-6 shadow-card border border-border/50"
                  >
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
                    <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content - Lazy Loaded */}
        <Suspense fallback={<SectionLoader />}>
          <JoinTeamSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CameroonJobsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TeamSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Careers;
