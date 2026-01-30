import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import admin images
import admin1 from "@/assets/admin-1.jpg";
import admin2 from "@/assets/admin-2.jpg";
import admin3 from "@/assets/admin-3.jpg";

// Import Cameroon employee images
import employee1 from "@/assets/employee-cm-1.jpg";
import employee2 from "@/assets/employee-cm-2.jpg";
import employee3 from "@/assets/employee-cm-3.jpg";
import employee4 from "@/assets/employee-cm-4.jpg";
import employee5 from "@/assets/employee-cm-5.jpg";
import employee6 from "@/assets/employee-cm-6.jpg";
import employee7 from "@/assets/employee-cm-7.jpg";
import employee8 from "@/assets/employee-cm-8.jpg";
import employee9 from "@/assets/employee-cm-9.jpg";

const belgiumAdmins = [
  {
    name: "Marc Duval",
    role: "Directeur Général",
    location: "Bruxelles, Belgique",
    image: admin1,
    description: "15 ans d'expérience dans le secteur de la santé",
  },
  {
    name: "Sylvie Mbeki",
    role: "Directrice des Opérations",
    location: "Bruxelles, Belgique",
    image: admin2,
    description: "Experte en gestion des ressources humaines médicales",
  },
  {
    name: "Philippe Nkomo",
    role: "Directeur Administratif",
    location: "Bruxelles, Belgique",
    image: admin3,
    description: "Spécialiste en développement stratégique",
  },
];

const cameroonEmployees = [
  {
    name: "Emmanuel Fotso",
    role: "Responsable Marketing Digital",
    location: "Douala",
    image: employee1,
  },
  {
    name: "Grace Ngoumou",
    role: "Directrice Communication",
    location: "Yaoundé",
    image: employee2,
  },
  {
    name: "Paul Mbarga",
    role: "Chef de Projet Digital",
    location: "Douala",
    image: employee3,
  },
  {
    name: "Hervé Nguema",
    role: "Social Media Manager",
    location: "Douala",
    image: employee4,
  },
  {
    name: "Jean-Pierre Essomba",
    role: "Responsable Contenu",
    location: "Douala",
    image: employee5,
  },
  {
    name: "Clarisse Eyenga",
    role: "Chargée de Communication",
    location: "Yaoundé",
    image: employee6,
  },
  {
    name: "Blaise Tchinda",
    role: "Responsable SEO/SEA",
    location: "Douala",
    image: employee7,
  },
  {
    name: "Solange Atangana",
    role: "Directrice Marketing",
    location: "Yaoundé",
    image: employee8,
  },
  {
    name: "Michel Kouam",
    role: "Responsable Stratégie Digitale",
    location: "Douala",
    image: employee9,
  },
];

const TeamSection = () => {
  const [adminApi, setAdminApi] = useState<CarouselApi>();
  const [employeeApi, setEmployeeApi] = useState<CarouselApi>();
  const [adminCurrent, setAdminCurrent] = useState(0);
  const [employeeCurrent, setEmployeeCurrent] = useState(0);

  const onAdminSelect = useCallback(() => {
    if (!adminApi) return;
    setAdminCurrent(adminApi.selectedScrollSnap());
  }, [adminApi]);

  const onEmployeeSelect = useCallback(() => {
    if (!employeeApi) return;
    setEmployeeCurrent(employeeApi.selectedScrollSnap());
  }, [employeeApi]);

  useEffect(() => {
    if (!adminApi) return;
    onAdminSelect();
    adminApi.on("select", onAdminSelect);
    return () => {
      adminApi.off("select", onAdminSelect);
    };
  }, [adminApi, onAdminSelect]);

  useEffect(() => {
    if (!employeeApi) return;
    onEmployeeSelect();
    employeeApi.on("select", onEmployeeSelect);
    return () => {
      employeeApi.off("select", onEmployeeSelect);
    };
  }, [employeeApi, onEmployeeSelect]);

  // Auto-scroll for admin carousel
  useEffect(() => {
    if (!adminApi) return;
    const interval = setInterval(() => {
      adminApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [adminApi]);

  // Auto-scroll for employee carousel
  useEffect(() => {
    if (!employeeApi) return;
    const interval = setInterval(() => {
      employeeApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [employeeApi]);

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
            🇨🇲 Rejoindre la branche camerounaise
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Notre <span className="gradient-text">Équipe</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Découvrez les visages derrière Meta Cares en Belgique et au Cameroun.
          </p>
        </div>

        {/* Belgium Administrators */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 text-center">
            🇧🇪 Direction - Belgique
          </h3>
          <div className="max-w-4xl mx-auto px-4 md:px-12">
            <Carousel
              setApi={setAdminApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {belgiumAdmins.map((admin, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 text-center"
                    >
                      <div className="relative">
                        <img
                          src={admin.image}
                          alt={admin.name}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-5 -mt-16 relative z-10">
                        <div className="w-20 h-20 rounded-full border-4 border-card overflow-hidden mx-auto mb-3">
                          <img
                            src={admin.image}
                            alt={admin.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-bold text-foreground text-lg">{admin.name}</h4>
                        <p className="text-primary font-medium text-sm">{admin.role}</p>
                        <p className="text-muted-foreground text-xs mt-1">{admin.location}</p>
                        <p className="text-muted-foreground text-sm mt-3">{admin.description}</p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {belgiumAdmins.map((_, index) => (
                <button
                  key={index}
                  onClick={() => adminApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === adminCurrent ? "bg-primary w-6" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cameroon Employees */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6 text-center">
            🇨🇲 Équipe Cameroun - 9 Professionnels
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
                      className="bg-card rounded-xl overflow-hidden shadow-card border border-border/50 cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={employee.image}
                          alt={employee.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                          <h4 className="font-semibold text-sm">{employee.name}</h4>
                          <p className="text-xs opacity-90">{employee.role}</p>
                          <p className="text-xs opacity-75">{employee.location}</p>
                        </div>
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
