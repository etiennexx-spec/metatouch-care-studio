import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold components
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const PartnersSection = lazy(() => import("@/components/PartnersSection"));
const ProfessionalsSection = lazy(() => import("@/components/ProfessionalsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PartnersSection />
        </Suspense>
        
        {/* CTA to Careers Page */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-4">
                <Users className="w-4 h-4" />
                Rejoignez notre équipe
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Découvrez nos <span className="gradient-text">opportunités de carrière</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-sm md:text-base px-4">
                Consultez nos offres d'emploi au Cameroun et en Belgique, 
                découvrez notre équipe et postulez en ligne.
              </p>
              <Link to="/carrieres">
                <Button size="lg" className="gradient-bg gradient-bg-hover text-primary-foreground group">
                  Voir les offres
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <ProfessionalsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
