import { motion } from "framer-motion";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Import all product images
import levePersonne from "@/assets/products/leve-personne.jpg";
import mouflesProtection from "@/assets/products/moufles-protection.jpg";
import ceintureSecurite from "@/assets/products/ceinture-securite.jpg";
import pansementFilm from "@/assets/products/pansement-film.jpg";
import solutionNettoyante from "@/assets/products/solution-nettoyante.jpg";
import ciseauxMedicaux from "@/assets/products/ciseaux-medicaux.jpg";
import sangleTransfert from "@/assets/products/sangle-transfert.jpg";
import protectionBarriere from "@/assets/products/protection-barriere.jpg";
import bassinReniforme from "@/assets/products/bassin-reniforme.jpg";
import serumPhysiologique from "@/assets/products/serum-physiologique.jpg";
import verticalisateur from "@/assets/products/verticalisateur.jpg";
import setPansement from "@/assets/products/set-pansement.jpg";

const imageMap: Record<string, string> = {
  "leve-personne": levePersonne,
  "moufles-protection": mouflesProtection,
  "ceinture-securite": ceintureSecurite,
  "pansement-film": pansementFilm,
  "solution-nettoyante": solutionNettoyante,
  "ciseaux-medicaux": ciseauxMedicaux,
  "sangle-transfert": sangleTransfert,
  "protection-barriere": protectionBarriere,
  "bassin-reniforme": bassinReniforme,
  "serum-physiologique": serumPhysiologique,
  "verticalisateur": verticalisateur,
  "set-pansement": setPansement,
};

interface ProductCardProps {
  name: string;
  price: string;
  description: string;
  image: string;
  index?: number;
}

const ProductCard = ({ name, price, description, image, index = 0 }: ProductCardProps) => {
  // Support both local image keys and external URLs (admin uploads)
  const isExternalUrl = image?.startsWith("http") || image?.startsWith("blob:");
  const imageSrc = isExternalUrl ? image : (imageMap[image] || levePersonne);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-white to-muted/30 p-4">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-5 space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold gradient-text">
              {price}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
            {description}
          </p>

          {/* CTA Button */}
          <Button
            className="w-full gradient-bg gradient-bg-hover text-primary-foreground group/btn mt-2"
            asChild
          >
            <a
              href="https://metacares.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Acheter
              <ExternalLink className="w-3 h-3 opacity-60 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
