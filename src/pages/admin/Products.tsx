import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductForm {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const emptyForm: ProductForm = { id: "", name: "", description: "", price: "", category: "", image: "" };

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [editProduct, setEditProduct] = useState<ProductForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*");
      return data ?? [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (form: ProductForm) => {
      if (isNew) {
        const { error } = await supabase.from("products").insert({
          id: form.id || crypto.randomUUID(),
          name: form.name, description: form.description,
          price: form.price, category: form.category, image: form.image,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").update({
          name: form.name, description: form.description,
          price: form.price, category: form.category, image: form.image,
        }).eq("id", form.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditProduct(null);
      toast.success(isNew ? "Produit créé" : "Produit mis à jour");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Produit supprimé");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editProduct) return;
    if (!file.type.startsWith("image/")) { toast.error("Fichier image requis"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5 Mo"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `products/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file);
    if (error) { toast.error("Erreur upload"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(path);
    setEditProduct({ ...editProduct, image: publicUrl });
    setUploading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Produits</h1>
        <Button onClick={() => { setIsNew(true); setEditProduct({ ...emptyForm }); }} className="gradient-bg text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Ajouter
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Nom</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Prix</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Catégorie</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {products?.map(p => (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" decoding="async" />
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{p.price}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => { setIsNew(false); setEditProduct(p as ProductForm); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(p.id); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!editProduct} onOpenChange={open => !open && setEditProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isNew ? "Nouveau produit" : "Modifier le produit"}</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(editProduct); }} className="space-y-4">
              <Input placeholder="Nom" value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} required />
              <Textarea placeholder="Description" value={editProduct.description} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} required />
              <Input placeholder="Prix (ex: 12,99 €)" value={editProduct.price} onChange={e => setEditProduct({ ...editProduct, price: e.target.value })} required />
              <select
                value={editProduct.category}
                onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="">Catégorie...</option>
                {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                {editProduct.image && <img src={editProduct.image} alt="" className="w-24 h-24 rounded-lg object-cover mb-2" loading="lazy" decoding="async" />}
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 text-sm">
                  <Upload className="w-4 h-4" />
                  {uploading ? "Upload..." : "Choisir une image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditProduct(null)}>Annuler</Button>
                <Button type="submit" disabled={saveMutation.isPending} className="gradient-bg text-primary-foreground">
                  {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Enregistrer
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
