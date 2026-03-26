import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, Upload } from "lucide-react";
import { useState } from "react";

const ContentEditor = () => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState<string | null>(null);

  const { data: sections, isLoading } = useQuery({
    queryKey: ["admin-sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_sections").select("*").order("section_key");
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, title, subtitle, description, image_url }: { id: string; title: string | null; subtitle: string | null; description: string | null; image_url: string | null }) => {
      const { error } = await supabase.from("site_sections").update({ title, subtitle, description, image_url }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-sections"] });
      toast.success("Section mise à jour");
    },
    onError: () => toast.error("Erreur"),
  });

  const handleImageUpload = async (sectionId: string, file: File) => {
    if (!file.type.startsWith("image/")) { toast.error("Fichier image requis"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5 Mo"); return; }
    setUploading(sectionId);
    const path = `sections/${sectionId}-${Date.now()}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file);
    if (error) { toast.error("Erreur upload"); setUploading(null); return; }
    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
    await supabase.from("site_sections").update({ image_url: publicUrl }).eq("id", sectionId);
    queryClient.invalidateQueries({ queryKey: ["admin-sections"] });
    setUploading(null);
    toast.success("Image mise à jour");
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Gestion des contenus</h1>
      <div className="space-y-6">
        {sections?.map(section => (
          <SectionCard
            key={section.id}
            section={section}
            onSave={(data) => updateMutation.mutate({ id: section.id, ...data })}
            onImageUpload={(file) => handleImageUpload(section.id, file)}
            uploading={uploading === section.id}
            saving={updateMutation.isPending}
          />
        ))}
      </div>
    </div>
  );
};

const SectionCard = ({ section, onSave, onImageUpload, uploading, saving }: {
  section: any;
  onSave: (data: { title: string | null; subtitle: string | null; description: string | null; image_url: string | null }) => void;
  onImageUpload: (file: File) => void;
  uploading: boolean;
  saving: boolean;
}) => {
  const [title, setTitle] = useState(section.title ?? "");
  const [subtitle, setSubtitle] = useState(section.subtitle ?? "");
  const [description, setDescription] = useState(section.description ?? "");

  const sectionLabels: Record<string, string> = {
    hero: "🏠 Hero / Bannière (toutes les pages)",
    about: "ℹ️ À propos",
    services: "⚕️ Services",
    testimonials: "💬 Témoignages",
    faq: "❓ FAQ",
    professionals: "👨‍⚕️ Professionnels",
    contact: "📧 Contact",
    partners: "🤝 Partenaires",
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {sectionLabels[section.section_key] ?? section.section_key}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Titre</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Sous-titre</label>
            <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        {section.image_url && <img src={section.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />}
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 text-xs">
          <Upload className="w-3 h-3" />
          {uploading ? "Upload..." : "Image"}
          <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && onImageUpload(e.target.files[0])} className="hidden" />
        </label>
        <div className="flex-1" />
        <Button size="sm" onClick={() => onSave({ title, subtitle, description, image_url: section.image_url })} disabled={saving} className="gradient-bg text-primary-foreground">
          <Save className="w-3 h-3 mr-1" />
          Sauvegarder
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;
