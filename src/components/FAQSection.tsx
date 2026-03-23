import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteSection } from "@/hooks/useSiteSection";

const faqs = [
  {
    question: "Comment demander des soins à domicile ?",
    answer: "Vous pouvez nous contacter via notre formulaire en ligne ou par téléphone. Un conseiller vous accompagnera pour définir vos besoins et organiser l'intervention d'un professionnel de santé qualifié à votre domicile.",
  },
  {
    question: "Dans quelles zones Meta Cares intervient-il ?",
    answer: "Meta Cares est présent en Belgique et au Cameroun. Nous couvrons la plupart des grandes villes et leurs périphéries. Contactez-nous pour vérifier la disponibilité dans votre zone.",
  },
  {
    question: "Quels types de professionnels de santé proposez-vous ?",
    answer: "Nous disposons d'un réseau de professionnels qualifiés : infirmiers, aides-soignants, kinésithérapeutes, médecins et autres spécialistes de santé, tous certifiés et expérimentés.",
  },
  {
    question: "Comment rejoindre l'équipe Meta Cares ?",
    answer: "Les professionnels de santé peuvent déposer leur candidature via notre plateforme dédiée. Nous étudions chaque profil et vous recontactons sous 48h pour un entretien.",
  },
  {
    question: "Les soins sont-ils remboursés ?",
    answer: "Selon votre pays et votre couverture santé, certains soins peuvent être pris en charge. Nous vous accompagnons dans les démarches administratives nécessaires.",
  },
  {
    question: "Proposez-vous des formations pour les professionnels ?",
    answer: "Oui, Meta Cares propose des programmes de développement professionnel et des formations continues pour aider les professionnels de santé à maintenir et améliorer leurs compétences.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus posées par nos patients et partenaires.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border border-border/50 px-6 shadow-card"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
