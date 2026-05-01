import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, X, ImageIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDynamicWorks } from "@/hooks/useDynamicContent";
import videoPresentation from "@/assets/video-presentation.mp4";
import video2 from "@/assets/works/video-2.mp4";
import flyer1 from "@/assets/works/flyer-1.png";
import flyer2 from "@/assets/works/flyer-2.jpg";
import flyer3 from "@/assets/works/flyer-3.jpg";
import flyer4 from "@/assets/works/flyer-4.jpg";
import flyer5 from "@/assets/works/flyer-5.jpg";

type WorkItem =
  | { type: "video"; src: string; title: string }
  | { type: "image"; src: string; title: string };

const staticWorks: WorkItem[] = [
  { type: "video", src: videoPresentation, title: "Présentation Meta Cares" },
  { type: "video", src: video2, title: "Notre équipe en action" },
  { type: "image", src: flyer1, title: "Moniteur Multi-Paramètres Comen NC5" },
  { type: "image", src: flyer2, title: "Culottes imperméables en PVC" },
  { type: "image", src: flyer3, title: "Thermomètre sans contact Rossmax HC700 BT" },
  { type: "image", src: flyer4, title: "Station de diagnostic Comen NC3" },
  { type: "image", src: flyer5, title: "Promotion -5% Thermomètre Rossmax" },
];

const CameroonWorksSection = () => {
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const [paused, setPaused] = useState(false);
  const { data: dynamicWorks = [] } = useDynamicWorks();

  const works: WorkItem[] = useMemo(() => [
    ...staticWorks,
    ...dynamicWorks.map((w: any): WorkItem => ({
      type: w.media_type === "video" ? "video" : "image",
      src: w.media_url,
      title: w.title,
    })),
  ], [dynamicWorks]);

  // Duplicate for seamless loop
  const loopItems = [...works, ...works];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3"
          >
            🎬 Nos Travaux
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Découvrez <span className="gradient-text">notre savoir-faire</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Vidéos de présentation et créations marketing de l'équipe Meta Cares Cameroun.
            Cliquez sur un élément pour l'agrandir.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex flex-row gap-4 p-4 w-max"
            animate={{ x: paused ? undefined : ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {loopItems.map((item, idx) => (
              <button
                key={`${item.title}-${idx}`}
                onClick={() => setSelected(item)}
                className="group relative w-[220px] md:w-[260px] shrink-0 aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow"
                aria-label={`Agrandir ${item.title}`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ImageIcon className="w-4 h-4 text-primary" />
                    </div>
                  </>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs md:text-sm font-medium line-clamp-2">
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-background">
          {selected && (
            <div className="relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              {selected.type === "video" ? (
                <video
                  src={selected.src}
                  className="w-full max-h-[85vh] bg-black"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full max-h-[85vh] object-contain bg-black"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">{selected.title}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CameroonWorksSection;
