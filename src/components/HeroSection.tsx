import { HeartPulse, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-32 pb-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={heroImage} 
          alt="Équipe médicale professionnelle" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeartPulse className="w-4 h-4" />
            <span className="text-sm font-medium">Services de santé professionnels</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="gradient-text block mb-2">Meta Cares</span>
            <span className="text-3xl md:text-4xl lg:text-5xl">l'expérience médicale à portée de main</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-card/80 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Meta Cares connecte les patients aux meilleurs professionnels de santé 
            et accompagne les établissements dans leur besoin en personnel qualifié.
          </motion.p>

          <div className="mb-12" />

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            {[
              { icon: Users, value: "500+", label: "Professionnels qualifiés" },
              { icon: HeartPulse, value: "10K+", label: "Patients satisfaits" },
              { icon: Shield, value: "100%", label: "Personnel certifié" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center sm:text-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-meta-green" />
                  <span className="text-2xl md:text-3xl font-bold text-card">{stat.value}</span>
                </div>
                <p className="text-card/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
