import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  categories as staticCategories,
  products as staticProducts,
  type Category,
  type Product,
} from "@/data/products";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error || !data?.length) return staticCategories;
      return data.map((c) => ({
        id: c.id,
        name: c.name,
        icon: c.icon,
        description: c.description,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");
      if (error || !data?.length) return staticProducts;
      return data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.image,
        category: p.category,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}
