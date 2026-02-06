import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product, Category } from "@/data/products";

interface ProductCarouselProps {
  category: Category;
  products: Product[];
}

const ProductCarousel = ({ category, products }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-12"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {category.name}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {category.description}
            </p>
          </div>
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard
                name={product.name}
                price={product.price}
                description={product.description}
                image={product.image}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.min(count, 8) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current % 8
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ProductCarousel;
