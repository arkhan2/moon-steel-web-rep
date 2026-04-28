import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ProductCategory } from "@/features/admin/types";

export async function fetchProductCategories() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("product_categories")
    .select("id,title,specs,description,uses,sort_order,created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as ProductCategory[];
}

type CreatePayload = {
  title: string;
  specs: string;
  description: string;
  uses: string;
  sort_order: number;
};

export async function createProductCategory(payload: CreatePayload) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("product_categories")
    .insert(payload)
    .select("id,title,specs,description,uses,sort_order,created_at")
    .single();

  if (error) throw error;
  return data as ProductCategory;
}

export async function deleteProductCategory(id: string) {
  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.from("product_categories").delete().eq("id", id);
  if (error) throw error;
}

type UpdatePayload = {
  id: string;
  title: string;
  specs: string;
  description: string;
  uses: string;
  sort_order: number;
};

export async function updateProductCategory(payload: UpdatePayload) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("product_categories")
    .update({
      title: payload.title,
      specs: payload.specs,
      description: payload.description,
      uses: payload.uses,
      sort_order: payload.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payload.id)
    .select("id,title,specs,description,uses,sort_order,created_at")
    .single();

  if (error) throw error;
  return data as ProductCategory;
}
