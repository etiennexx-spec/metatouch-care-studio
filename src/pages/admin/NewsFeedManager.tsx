import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Pencil, Upload, Calendar, CalendarDays, CalendarRange, Image as ImageIcon, Video as VideoIcon, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

type Period = "hebdomadaire" | "mensuel" | "annuel";
type MediaType = "image" | "video";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string | null;
  media_type: MediaType;
  period: Period;
  event_date: string | null;
  sort_order: number | null;
  is_published: boolean;
  created_at: string;
}

const periodConfig: Record<Period, { label: string; icon: typeof Calendar; color: string }> = {
  hebdomadaire: { label: "Hebdomadaire", icon: Calendar, color: "bg-primary/10 text-primary" },
  mensuel: { label: "Mensuel", icon: CalendarDays, color: "bg-secondary/10 text-secondary" },
  annuel: { label: "Annuel", icon: CalendarRange, color: "bg-accent/30 text-foreground" },
};

const NewsFeedManager = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [open, setOpen] = useState(false);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-news-feed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_feed")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as NewsItem[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news_feed").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news-feed"] });
      queryClient.invalidateQueries({ queryKey: ["public-news-feed"] });
      toast.success("Actualité supprimée");
    },
    onError: () => toast.error("Erreur lors de la suppression"),
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
      const { error } = await supabase.from("news_feed").update({ is_published: value }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news-feed"] });
      queryClient.invalidateQueries({ queryKey: ["public-news-feed"] });
    },
  });

  const handleNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditing(item);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fil d'actualité</h1>
          <p className="text-sm text-muted-foreground">Publiez des photos et vidéos hebdomadaires, mensuelles ou annuelles</p>
        </div>
        <Button onClick={handleNew} className="gradient-bg text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle actualité
        </Button>
      </div>

      {items && items.length === 0 && (
        <div className="bg-card rounded-xl p-12 text-center border border-dashed border-border">
          <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Aucune actualité publiée. Cliquez sur "Nouvelle actualité" pour commencer.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => {
          const cfg = periodConfig[item.period];
          return (
            <div key={item.id} className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm flex flex-col">
              {item.media_url && (
                <div className="relative h-40 bg-muted">
                  {item.media_type === "video" ? (
                    <video src={item.media_url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  )}
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 text-xs font-medium">
                    {item.media_type === "video" ? <VideoIcon className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {item.media_type}
                  </span>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                    <cfg.icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                  {item.event_date && <span className="text-xs text-muted-foreground">{item.event_date}</span>}
                </div>
                <h4 className="font-semibold text-foreground line-clamp-1">{item.title}</h4>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1 flex-1">{item.description}</p>
                )}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => togglePublish.mutate({ id: item.id, value: !item.is_published })}
                    title={item.is_published ? "Masquer du site" : "Publier sur le site"}
                  >
                    {item.is_published ? <Eye className="w-3.5 h-3.5 text-primary" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <div className="flex-1" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Supprimer cette actualité ?")) deleteMutation.mutate(item.id);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NewsFormDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSaved={() => {
          queryClient.invalidateQueries({ queryKey: ["admin-news-feed"] });
          queryClient.invalidateQueries({ queryKey: ["public-news-feed"] });
          setOpen(false);
        }}
      />
    </div>
  );
};

const NewsFormDialog = ({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: NewsItem | null;
  onSaved: () => void;
}) => {
  const [title, setTitle] = useState(editing?.title ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [period, setPeriod] = useState<Period>(editing?.period ?? "hebdomadaire");
  const [eventDate, setEventDate] = useState(editing?.event_date ?? "");
  const [mediaUrl, setMediaUrl] = useState<string | null>(editing?.media_url ?? null);
  const [mediaType, setMediaType] = useState<MediaType>(editing?.media_type ?? "image");
  const [isPublished, setIsPublished] = useState(editing?.is_published ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset form when editing changes (or dialog opens)
  useEffect(() => {
    if (!open) return;
    setTitle(editing?.title ?? "");
    setDescription(editing?.description ?? "");
    setPeriod(editing?.period ?? "hebdomadaire");
    setEventDate(editing?.event_date ?? "");
    setMediaUrl(editing?.media_url ?? null);
    setMediaType(editing?.media_type ?? "image");
    setIsPublished(editing?.is_published ?? true);
  }, [editing, open]);

  const handleUpload = async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      toast.error("Seuls les images et vidéos sont acceptés");
      return;
    }
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(isVideo ? "Vidéo max 50 Mo" : "Image max 10 Mo");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `news/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("news-media").upload(path, file);
      if (upErr) throw upErr;
      const { data: { publicUrl } } = supabase.storage.from("news-media").getPublicUrl(path);
      setMediaUrl(publicUrl);
      setMediaType(isVideo ? "video" : "image");
      toast.success("Média téléversé");
    } catch (err) {
      console.error(err);
      toast.error("Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        media_url: mediaUrl,
        media_type: mediaType,
        period,
        event_date: eventDate.trim() || null,
        is_published: isPublished,
      };
      if (editing) {
        const { error } = await supabase.from("news_feed").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Actualité modifiée");
      } else {
        const { error } = await supabase.from("news_feed").insert(payload);
        if (error) throw error;
        toast.success("Actualité publiée");
      }
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Erreur d'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Modifier l'actualité" : "Nouvelle actualité"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Titre *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Réunion mensuelle équipe Cameroun" required />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Détails de l'événement / actualité" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Fréquence</Label>
              <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                  <SelectItem value="mensuel">Mensuel</SelectItem>
                  <SelectItem value="annuel">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date / Période (texte libre)</Label>
              <Input value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="Ex: Tous les lundis, Avril 2026..." />
            </div>
          </div>

          <div>
            <Label>Média (image ou vidéo)</Label>
            <div className="flex items-center gap-3">
              {mediaUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {mediaType === "video" ? (
                    <video src={mediaUrl} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={mediaUrl} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
              )}
              <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 cursor-pointer text-sm border border-dashed border-border">
                <Upload className="w-4 h-4" />
                {uploading ? "Téléversement..." : mediaUrl ? "Remplacer" : "Téléverser une image ou vidéo"}
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Image max 10 Mo • Vidéo max 50 Mo</p>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <Label className="cursor-pointer">Publier sur le site</Label>
              <p className="text-xs text-muted-foreground">Rendre cette actualité visible sur la page Carrières</p>
            </div>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={saving || uploading} className="gradient-bg text-primary-foreground">
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {editing ? "Enregistrer" : "Publier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsFeedManager;
