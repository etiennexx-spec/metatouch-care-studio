import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FooterSimple from "@/components/FooterSimple";
import ProductCarousel from "@/components/ProductCarousel";
import { useCategories, useProducts } from "@/hooks/useProducts";

const Marketplace = () => {
  const { data: categories = [] } = useCategories();
  const { data: products = [] } = useProducts();
  const [activeCategory, setActiveCategory] = useState("");

  // Set default active category when data loads
  const effectiveCategory = activeCategory || categories[0]?.id || "";

  const activeProducts = useMemo(
    () => products.filter((p) => p.category === effectiveCategory),
    [products, effectiveCategory]
  );
  const activeCategoryData = categories.find((c) => c.id === effectiveCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 md:pt-32">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Catalogue Premium
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Nos <span className="gradient-text">Produits Médicaux</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Découvrez notre gamme complète d'équipements médicaux de qualité professionnelle. 
                Sécurité, confort et innovation au service du soin.
              </p>
              
              <Button
                size="lg"
                className="gradient-bg gradient-bg-hover text-primary-foreground group"
                asChild
              >
                <a
                  href="https://metacares.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Visiter la boutique
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Category Tabs - On Page */}
        <section className="py-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative px-5 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300
                    ${activeCategory === category.id 
                      ? "gradient-bg text-white shadow-meta-md scale-105" 
                      : "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-meta-sm"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Category Carousel */}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {activeCategoryData && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCarousel
                  category={activeCategoryData}
                  products={activeProducts}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à passer commande ?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Rendez-vous sur notre boutique en ligne pour finaliser vos achats 
                et bénéficier de nos offres exclusives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-bg gradient-bg-hover text-primary-foreground"
                  asChild
                >
                  <a
                    href="https://metacares.shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Accéder à la boutique
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href="#contact">
                    Nous contacter
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterSimple />
    </div>
  );
};

export default Marketplace;
