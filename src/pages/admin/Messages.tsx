import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Eye, Trash2, Loader2, Mail } from "lucide-react";

const Messages = () => {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").update({ read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const downloadCSV = () => {
    if (!messages?.length) return;
    const headers = ["Date", "Nom", "Email", "Sujet", "Message", "Lu"];
    const rows = messages.map(m => [
      new Date(m.created_at).toLocaleString("fr-FR"),
      m.name, m.email, m.subject ?? "", m.message.replace(/"/g, '""'), m.read ? "Oui" : "Non",
    ]);
    const csv = [headers.join(";"), ...rows.map(r => r.map(c => `"${c}"`).join(";"))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Messages reçus</h1>
        <Button variant="outline" onClick={downloadCSV} disabled={!messages?.length}>
          <Download className="w-4 h-4 mr-2" /> Télécharger CSV
        </Button>
      </div>

      <div className="space-y-3">
        {messages?.map(msg => (
          <div key={msg.id} className={`bg-card rounded-xl p-4 border ${msg.read ? "border-border/50" : "border-primary/30 bg-primary/5"} shadow-sm`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className={`w-4 h-4 ${msg.read ? "text-muted-foreground" : "text-primary"}`} />
                  <span className="font-medium text-foreground text-sm">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">— {msg.email}</span>
                  {!msg.read && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Nouveau</span>}
                </div>
                {msg.subject && <p className="text-sm font-medium text-foreground mb-1">{msg.subject}</p>}
                <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(msg.created_at).toLocaleString("fr-FR")}</p>
              </div>
              {!msg.read && (
                <Button variant="ghost" size="sm" onClick={() => markReadMutation.mutate(msg.id)} className="text-xs">
                  <Eye className="w-3 h-3 mr-1" /> Marquer lu
                </Button>
              )}
            </div>
          </div>
        ))}
        {!messages?.length && <p className="text-center text-muted-foreground py-12">Aucun message</p>}
      </div>
    </div>
  );
};

export default Messages;
