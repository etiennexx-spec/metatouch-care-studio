import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type NewsPeriod = "hebdomadaire" | "mensuel" | "annuel";
export type NewsMediaType = "image" | "video";

export interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string | null;
  media_type: NewsMediaType;
  period: NewsPeriod;
  event_date: string | null;
  sort_order: number | null;
  is_published: boolean;
  created_at: string;
}

export const usePublicNewsFeed = () => {
  return useQuery({
    queryKey: ["public-news-feed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_feed")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as NewsItem[];
    },
    staleTime: 60 * 1000,
  });
};
