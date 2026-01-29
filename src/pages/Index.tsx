import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import JoinTeamSection from "@/components/JoinTeamSection";
import CameroonJobsSection from "@/components/CameroonJobsSection";
import ProfessionalsSection from "@/components/ProfessionalsSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PartnersSection />
        <JoinTeamSection />
        <CameroonJobsSection />
        <ProfessionalsSection />
        <FAQSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
