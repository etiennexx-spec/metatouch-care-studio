import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Package, Mail, Briefcase, Image, Shield, FileText, Settings, Eye, Pencil, Trash2, Upload } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) => (
  <div className="bg-card rounded-xl p-5 border border-border/50 shadow-sm">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  </div>
);

const permissions = [
  { icon: Eye, label: "Voir tous les contenus", category: "Lecture" },
  { icon: Pencil, label: "Modifier les textes des sections", category: "Écriture" },
  { icon: Upload, label: "Uploader des images", category: "Écriture" },
  { icon: Package, label: "Gérer les produits (CRUD)", category: "Écriture" },
  { icon: Mail, label: "Lire et gérer les messages", category: "Lecture" },
  { icon: Briefcase, label: "Gérer les candidatures", category: "Écriture" },
  { icon: Image, label: "Gérer la galerie d'images", category: "Écriture" },
  { icon: FileText, label: "Modifier les sections du site", category: "Écriture" },
  { icon: Trash2, label: "Supprimer des éléments", category: "Suppression" },
  { icon: Settings, label: "Accès complet au dashboard", category: "Admin" },
];

const Dashboard = () => {
  const { user } = useAuth();

  const { data: products } = useQuery({ queryKey: ["admin-products-count"], queryFn: async () => {
    const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
    return count ?? 0;
  }});
  const { data: messages } = useQuery({ queryKey: ["admin-messages-count"], queryFn: async () => {
    const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true });
    return count ?? 0;
  }});
  const { data: unreadMessages } = useQuery({ queryKey: ["admin-unread-count"], queryFn: async () => {
    const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false);
    return count ?? 0;
  }});
  const { data: applications } = useQuery({ queryKey: ["admin-apps-count"], queryFn: async () => {
    const { count } = await supabase.from("job_applications").select("*", { count: "exact", head: true });
    return count ?? 0;
  }});
  const { data: images } = useQuery({ queryKey: ["admin-images-count"], queryFn: async () => {
    const { count } = await supabase.from("gallery_images").select("*", { count: "exact", head: true });
    return count ?? 0;
  }});
  const { data: sections } = useQuery({ queryKey: ["admin-sections-count"], queryFn: async () => {
    const { count } = await supabase.from("site_sections").select("*", { count: "exact", head: true });
    return count ?? 0;
  }});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Bienvenue, {user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Produits" value={products ?? 0} color="bg-primary" />
        <StatCard icon={Mail} label="Messages" value={messages ?? 0} color="bg-secondary" />
        <StatCard icon={Briefcase} label="Candidatures" value={applications ?? 0} color="bg-accent-foreground" />
        <StatCard icon={Image} label="Images" value={images ?? 0} color="bg-primary" />
      </div>

      {(unreadMessages ?? 0) > 0 && (
        <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
          <p className="text-primary font-medium">📬 Vous avez {unreadMessages} message(s) non lu(s)</p>
        </div>
      )}

      {/* Role & Permissions */}
      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Rôle & Permissions</h2>
            <p className="text-sm text-muted-foreground">Votre rôle : <span className="font-semibold text-primary">Administrateur</span></p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {permissions.map((perm, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <perm.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">{perm.label}</p>
                <span className="text-xs text-muted-foreground">{perm.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick summary */}
      <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">📊 Résumé des contenus éditables</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold text-primary">{sections ?? 0}</p>
            <p className="text-xs text-muted-foreground">Sections du site</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold text-primary">{products ?? 0}</p>
            <p className="text-xs text-muted-foreground">Produits en catalogue</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold text-primary">{images ?? 0}</p>
            <p className="text-xs text-muted-foreground">Images en galerie</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
