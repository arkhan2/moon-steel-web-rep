import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { CustomerLogo } from "@/features/admin/types";

const BUCKET = "customer-logos";

function normalizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
}

function getStoragePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function fetchCustomerLogos() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("customer_logos")
    .select("id,image_url,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CustomerLogo[];
}

export async function uploadCustomerLogo(file: File) {
  const supabase = createSupabaseBrowserClient();
  const filePath = `${crypto.randomUUID()}/${Date.now()}-${normalizeFileName(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { upsert: false, contentType: file.type });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  const imageUrl = publicData.publicUrl;

  const { data, error } = await supabase
    .from("customer_logos")
    .insert({ image_url: imageUrl })
    .select("id,image_url,created_at")
    .single();

  if (error) {
    await supabase.storage.from(BUCKET).remove([filePath]);
    throw error;
  }

  return data as CustomerLogo;
}

export async function deleteCustomerLogo(logo: CustomerLogo) {
  const supabase = createSupabaseBrowserClient();
  const storagePath = getStoragePathFromUrl(logo.image_url);

  if (storagePath) {
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([storagePath]);
    if (storageError) throw storageError;
  }

  const { error: dbError } = await supabase.from("customer_logos").delete().eq("id", logo.id);
  if (dbError) throw dbError;
}
