import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Loader2, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export type FieldType = "text" | "textarea" | "select" | "number" | "image" | "file";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  accept?: string; // for file/image
  rows?: number;
}

interface CrudManagerProps {
  table: string;
  title: string;
  description: string;
  fields: FieldDef[];
  listColumns: { key: string; label: string; isImage?: boolean }[];
  orderBy?: string;
  bucket?: string;
}

const uploadFile = async (file: File, bucket: string) => {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const CrudManager = ({
  table,
  title,
  description,
  fields,
  listColumns,
  orderBy = "sort_order",
  bucket = "admin-uploads",
}: CrudManagerProps) => {
  const qc = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const { data: items = [], isLoading } = useQuery({
    queryKey: [`admin-${table}`],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as any)
        .select("*")
        .order(orderBy, { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      if (editing?.id) {
        const { error } = await supabase
          .from(table as any)
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table as any).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [`admin-${table}`] });
      toast.success(editing ? "Mis à jour" : "Ajouté avec succès");
      setDialogOpen(false);
      setEditing(null);
      setFormData({});
    },
    onError: (e: any) => toast.error(e.message || "Erreur"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [`admin-${table}`] });
      toast.success("Supprimé");
      setConfirmDelete(null);
    },
    onError: (e: any) => toast.error(e.message || "Erreur"),
  });

  const openCreate = () => {
    setEditing(null);
    const init: Record<string, any> = {};
    fields.forEach((f) => {
      init[f.name] = f.type === "number" ? 0 : "";
    });
    setFormData(init);
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    const init: Record<string, any> = {};
    fields.forEach((f) => {
      init[f.name] = item[f.name] ?? (f.type === "number" ? 0 : "");
    });
    setFormData(init);
    setDialogOpen(true);
  };

  const handleFileChange = async (
    field: FieldDef,
    file: File | null,
  ) => {
    if (!file) return;
    setUploading(field.name);
    try {
      const url = await uploadFile(file, bucket);
      setFormData((p) => ({ ...p, [field.name]: url }));
      toast.success("Fichier uploadé");
    } catch (e: any) {
      toast.error(e.message || "Échec upload");
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !formData[f.name]) {
        toast.error(`${f.label} est requis`);
        return;
      }
    }
    saveMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="gradient-bg rounded-2xl p-6 text-primary-foreground shadow-md flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-sm text-primary-foreground/80">{description}</p>
        </div>
        <Button onClick={openCreate} variant="secondary" className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-card border border-primary/10 rounded-xl p-10 text-center text-muted-foreground">
          Aucun élément. Cliquez sur « Ajouter » pour commencer.
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-primary/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/5 border-b border-primary/10">
                <tr>
                  {listColumns.map((c) => (
                    <th key={c.key} className="px-4 py-3 text-left font-medium text-foreground">
                      {c.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => (
                  <tr key={item.id} className="border-b border-primary/5 hover:bg-primary/5">
                    {listColumns.map((c) => (
                      <td key={c.key} className="px-4 py-3 text-foreground">
                        {c.isImage && item[c.key] ? (
                          <img src={item[c.key]} alt="" className="w-12 h-12 object-cover rounded-md" />
                        ) : (
                          <span className="line-clamp-2 max-w-xs inline-block">
                            {String(item[c.key] ?? "—")}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(item)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setConfirmDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier" : "Ajouter"}</DialogTitle>
            <DialogDescription>
              Remplissez les informations ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {f.label} {f.required && <span className="text-destructive">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <Textarea
                    value={formData[f.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                    rows={f.rows || 4}
                    required={f.required}
                  />
                ) : f.type === "select" ? (
                  <select
                    value={formData[f.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                    required={f.required}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Choisir...</option>
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : f.type === "number" ? (
                  <Input
                    type="number"
                    value={formData[f.name] ?? 0}
                    onChange={(e) => setFormData((p) => ({ ...p, [f.name]: Number(e.target.value) }))}
                  />
                ) : f.type === "image" || f.type === "file" ? (
                  <div className="space-y-2">
                    {formData[f.name] && f.type === "image" && (
                      <img src={formData[f.name]} alt="" className="w-32 h-32 object-cover rounded-md border" />
                    )}
                    {formData[f.name] && f.type === "file" && (
                      <div className="text-xs text-muted-foreground break-all bg-primary/5 p-2 rounded">
                        {formData[f.name]}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept={f.accept || (f.type === "image" ? "image/*" : "*")}
                          className="hidden"
                          onChange={(e) => handleFileChange(f, e.target.files?.[0] || null)}
                        />
                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-input text-sm hover:bg-primary/5">
                          {uploading === f.name ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          Uploader
                        </span>
                      </label>
                      <Input
                        value={formData[f.name] || ""}
                        onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                        placeholder="ou collez une URL"
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    type="text"
                    value={formData[f.name] || ""}
                    onChange={(e) => setFormData((p) => ({ ...p, [f.name]: e.target.value }))}
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {editing ? "Enregistrer" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDelete && deleteMutation.mutate(confirmDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CrudManager;
