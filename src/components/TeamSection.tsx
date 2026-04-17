import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, Building2, Users, Globe, Megaphone, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSection } from "@/hooks/useSiteSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cameroonEmployees } from "@/data/teamMembers";
import managerCameroun from "@/assets/manager-cameroun.jpg";

const TeamSection = () => {
  const { data: teamSection } = useSiteSection("team");
  const [employeeApi, setEmployeeApi] = useState<CarouselApi>();
  const [employeeCurrent, setEmployeeCurrent] = useState(0);

  const onEmployeeSelect = useCallback(() => {
    if (!employeeApi) return;
    setEmployeeCurrent(employeeApi.selectedScrollSnap());
  }, [employeeApi]);

  useEffect(() => {
    if (!employeeApi) return;
    onEmployeeSelect();
    employeeApi.on("select", onEmployeeSelect);
    return () => {
      employeeApi.off("select", onEmployeeSelect);
    };
  }, [employeeApi, onEmployeeSelect]);

  // Auto-scroll for employee carousel
  useEffect(() => {
    if (!employeeApi) return;
    const interval = setInterval(() => {
      employeeApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [employeeApi]);

  const belgiumStats = [
    { icon: UserCheck, label: "Directeur Général", value: "Monsieur PIERRE TAHAM NELSTOR" },
    { icon: Users, label: "Managers", value: "11 managers" },
    { icon: Globe, label: "Présence internationale", value: "Belgique • Cameroun • France • Canada" },
    { icon: Megaphone, label: "Marketing", value: " 10 équipes marketing" },
  ];

  return (
    <section id="equipe" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Cameroon Branch Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm md:text-lg font-medium mb-4 md:mb-6"
          >
            {teamSection?.subtitle ?? "🇨🇲 Rejoindre la branche camerounaise"}
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {teamSection?.title ? (
              <span className="gradient-text">{teamSection.title}</span>
            ) : (
              <>
                Notre <span className="gradient-text">Équipe</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            {teamSection?.description ?? "Découvrez les visages derrière Meta Cares en Belgique et au Cameroun."}
          </p>
        </div>

        {/* Branch Cameroun: Manager + Siège Belgique side by side */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
            🌍 Branche Cameroun et Siège Belgique
          </h3>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {/* Manager Cameroun */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50"
            >
              <div className="relative h-72 md:h-80">
                <img
                  src={managerCameroun}
                  alt="Manager du Cameroun"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  width={768}
                  height={1024}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold mb-2">
                    🇨🇲 Cameroun
                  </span>
                  <h4 className="text-2xl font-bold">Manager du Cameroun</h4>
                  <p className="text-sm opacity-90 mt-1">Responsable des opérations Meta Cares Cameroun</p>
                </div>
              </div>
            </motion.div>

            {/* Siège Belgique */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 md:p-7 text-primary-foreground shadow-card flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary-foreground/20 text-xs font-semibold mb-1">
                    🇧🇪 Belgique
                  </span>
                  <h4 className="text-2xl font-bold">Siège Belgique</h4>
                </div>
              </div>

              <ul className="space-y-4 flex-1">
                {belgiumStats.map((stat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wide opacity-75 font-medium">{stat.label}</p>
                      <p className="text-sm md:text-base font-semibold leading-snug mt-0.5">{stat.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Cameroon Employees */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 text-center">
            🇨🇲 Équipe Cameroun - {cameroonEmployees.length} Professionnels
          </h3>
          <div className="max-w-6xl mx-auto px-4 md:px-12">
            <Carousel
              setApi={setEmployeeApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {cameroonEmployees.map((employee, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50"
                    >
                      <div className="relative">
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="w-full h-48 object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <h4 className="font-semibold text-sm">{employee.name}</h4>
                          <p className="text-xs opacity-90">{employee.role}</p>
                          <p className="text-xs opacity-75">{employee.location}</p>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to={`/equipe/${employee.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-primary hover:text-primary/80 text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Voir plus
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center gap-1 mt-4">
              {cameroonEmployees.map((_, index) => (
                <button
                  key={index}
                  onClick={() => employeeApi?.scrollTo(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === employeeCurrent ? "bg-primary w-4" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
