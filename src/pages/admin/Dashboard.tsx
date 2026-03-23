import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Package, Mail, Briefcase, Image, Shield, FileText, Settings, Eye, Pencil, Trash2, Upload } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, gradient }: { icon: any; label: string; value: number; gradient?: boolean }) => (
  <div className={`rounded-xl p-5 shadow-sm border transition-transform hover:scale-[1.02] ${gradient ? "gradient-bg text-primary-foreground border-transparent" : "bg-card border-border/50"}`}>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gradient ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
        <Icon className={`w-5 h-5 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
      </div>
      <div>
        <p className={`text-2xl font-bold ${gradient ? "text-primary-foreground" : "text-foreground"}`}>{value}</p>
        <p className={`text-sm ${gradient ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</p>
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
      {/* Header with gradient accent */}
      <div className="gradient-bg rounded-2xl p-6 text-primary-foreground shadow-md">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-sm text-primary-foreground/80">Bienvenue, {user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Produits" value={products ?? 0} gradient />
        <StatCard icon={Mail} label="Messages" value={messages ?? 0} />
        <StatCard icon={Briefcase} label="Candidatures" value={applications ?? 0} />
        <StatCard icon={Image} label="Images" value={images ?? 0} />
      </div>

      {(unreadMessages ?? 0) > 0 && (
        <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
          <p className="text-secondary font-medium">📬 Vous avez {unreadMessages} message(s) non lu(s)</p>
        </div>
      )}

      {/* Role & Permissions */}
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Rôle & Permissions</h2>
            <p className="text-sm text-muted-foreground">Votre rôle : <span className="font-semibold gradient-text">Administrateur</span></p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {permissions.map((perm, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
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
      <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">📊 Résumé des contenus éditables</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg gradient-bg text-center">
            <p className="text-2xl font-bold text-primary-foreground">{sections ?? 0}</p>
            <p className="text-xs text-primary-foreground/80">Sections du site</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-center">
            <p className="text-2xl font-bold text-primary">{products ?? 0}</p>
            <p className="text-xs text-muted-foreground">Produits en catalogue</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10 text-center">
            <p className="text-2xl font-bold text-secondary">{images ?? 0}</p>
            <p className="text-xs text-muted-foreground">Images en galerie</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
