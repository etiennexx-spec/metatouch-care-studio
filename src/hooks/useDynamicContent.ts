import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetcher = (table: string) => async () => {
  const { data, error } = await supabase
    .from(table as any)
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
};

export const useDynamicTeam = (branch?: "belgique" | "cameroun") =>
  useQuery({
    queryKey: ["dyn-team", branch || "all"],
    queryFn: async () => {
      let q = supabase
        .from("team_members")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (branch) q = q.eq("branch", branch);
      const { data, error } = await q;
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });

export const useDynamicPrograms = () =>
  useQuery({
    queryKey: ["dyn-programs"],
    queryFn: fetcher("programs"),
    staleTime: 60_000,
  });

export const useDynamicWorks = () =>
  useQuery({
    queryKey: ["dyn-works"],
    queryFn: fetcher("works"),
    staleTime: 60_000,
  });

export const useDynamicTestimonials = () =>
  useQuery({
    queryKey: ["dyn-testimonials"],
    queryFn: fetcher("testimonials"),
    staleTime: 60_000,
  });

export const useDynamicPartners = () =>
  useQuery({
    queryKey: ["dyn-partners"],
    queryFn: fetcher("partners"),
    staleTime: 60_000,
  });

export const useDynamicServices = () =>
  useQuery({
    queryKey: ["dyn-services"],
    queryFn: fetcher("services"),
    staleTime: 60_000,
  });
