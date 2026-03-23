import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Loader2, Briefcase, CheckCircle, XCircle } from "lucide-react";

const Applications = () => {
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const { data, error } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      toast.success("Statut mis à jour");
    },
  });

  const downloadCSV = () => {
    if (!applications?.length) return;
    const headers = ["Date", "Nom", "Email", "Téléphone", "Poste", "Motivation", "Statut"];
    const rows = applications.map(a => [
      new Date(a.created_at).toLocaleString("fr-FR"),
      a.full_name, a.email, a.phone ?? "", a.job_title,
      a.motivation.replace(/"/g, '""'), a.status,
    ]);
    const csv = [headers.join(";"), ...rows.map(r => r.map(c => `"${c}"`).join(";"))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `candidatures_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    reviewed: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Candidatures</h1>
        <Button variant="outline" onClick={downloadCSV} disabled={!applications?.length}>
          <Download className="w-4 h-4 mr-2" /> Télécharger CSV
        </Button>
      </div>

      <div className="space-y-3">
        {applications?.map(app => (
          <div key={app.id} className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground text-sm">{app.full_name}</span>
                  <span className="text-xs text-muted-foreground">— {app.email}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status] ?? "bg-muted text-muted-foreground"}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Poste : {app.job_title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{app.motivation}</p>
                {app.phone && <p className="text-xs text-muted-foreground mt-1">📞 {app.phone}</p>}
                <p className="text-xs text-muted-foreground mt-1">{new Date(app.created_at).toLocaleString("fr-FR")}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" title="Accepter" onClick={() => updateStatus.mutate({ id: app.id, status: "accepted" })}>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="icon" title="Refuser" onClick={() => updateStatus.mutate({ id: app.id, status: "rejected" })}>
                  <XCircle className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {!applications?.length && <p className="text-center text-muted-foreground py-12">Aucune candidature</p>}
      </div>
    </div>
  );
};

export default Applications;
