import { 
  Syringe, 
  Activity, 
  TestTube, 
  Pill, 
  HeartHandshake, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const careTypes = [
  { icon: Syringe, label: "Pansements" },
  { icon: Activity, label: "Injections" },
  { icon: TestTube, label: "Prélèvements" },
  { icon: Pill, label: "Suivi médical" },
  { icon: HeartHandshake, label: "Aide à domicile" },
  { icon: Calendar, label: "Rendez-vous" },
];

const steps = [
  {
    number: "01",
    title: "Choisissez votre soin",
    description: "Sélectionnez le type de soin dont vous avez besoin parmi notre catalogue.",
  },
  {
    number: "02",
    title: "Prenez rendez-vous",
    description: "Choisissez une date et un créneau horaire qui vous convient.",
  },
  {
    number: "03",
    title: "Recevez votre soin",
    description: "Un professionnel qualifié se rend chez vous pour vous prodiguer les soins.",
  },
];

const PatientsSection = () => {
  return (
    <section id="patients" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
            Pour les Patients
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Des soins à domicile{" "}
            <span className="gradient-text">adaptés à vos besoins</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meta Cares vous facilite l'accès aux soins à domicile. 
            Choisissez le type de soin et nous nous occupons du reste.
          </p>
        </div>

        {/* Types of care */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {careTypes.map((care, index) => (
            <div 
              key={index}
              className="bg-card p-4 rounded-xl text-center hover:shadow-meta-md transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/30"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <care.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{care.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Comment ça marche ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold gradient-text opacity-50 mb-4">
                  {step.number}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="gradient-bg gradient-bg-hover text-primary-foreground">
              Demander des soins à domicile
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientsSection;
