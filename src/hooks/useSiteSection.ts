import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteSection {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  metadata: Record<string, unknown> | null;
}

export const useSiteSection = (sectionKey: string) => {
  return useQuery({
    queryKey: ["site-section", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_sections")
        .select("*")
        .eq("section_key", sectionKey)
        .maybeSingle();
      if (error) throw error;
      return data as SiteSection | null;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSiteSections = () => {
  return useQuery({
    queryKey: ["site-sections-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_sections")
        .select("*")
        .order("section_key");
      if (error) throw error;
      return data as SiteSection[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
