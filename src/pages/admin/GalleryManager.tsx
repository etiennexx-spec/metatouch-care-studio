import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Upload } from "lucide-react";

const GalleryManager = () => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: images, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast.success("Image supprimée");
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) continue;
      const path = `gallery/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("site-images").upload(path, file);
      if (uploadError) continue;
      const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
      await supabase.from("gallery_images").insert({ image_url: publicUrl, title: file.name.split(".")[0] });
    }
    queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    setUploading(false);
    toast.success("Images ajoutées");
    e.target.value = "";
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Galerie d'images</h1>
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-primary-foreground cursor-pointer text-sm font-medium">
          <Upload className="w-4 h-4" />
          {uploading ? "Upload..." : "Ajouter"}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map(img => (
          <div key={img.id} className="group relative bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm">
            <img src={img.image_url} alt={img.title ?? ""} className="w-full aspect-square object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="icon" onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(img.id); }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {img.title && <p className="p-2 text-xs text-muted-foreground truncate">{img.title}</p>}
          </div>
        ))}
        {!images?.length && <p className="col-span-full text-center text-muted-foreground py-12">Aucune image</p>}
      </div>
    </div>
  );
};

export default GalleryManager;
