import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, Mail, Briefcase, Image } from "lucide-react";

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

const Dashboard = () => {
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Tableau de bord</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Produits" value={products ?? 0} color="bg-primary" />
        <StatCard icon={Mail} label="Messages" value={messages ?? 0} color="bg-secondary" />
        <StatCard icon={Briefcase} label="Candidatures" value={applications ?? 0} color="bg-accent-foreground" />
        <StatCard icon={Image} label="Images" value={images ?? 0} color="bg-primary" />
      </div>
      {(unreadMessages ?? 0) > 0 && (
        <div className="mt-6 bg-primary/10 rounded-xl p-4 border border-primary/20">
          <p className="text-primary font-medium">📬 Vous avez {unreadMessages} message(s) non lu(s)</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
