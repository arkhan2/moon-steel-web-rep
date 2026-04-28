import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { HeroImage } from "@/features/admin/types";

const BUCKET = "hero-images";

function normalizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
}

function getStoragePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function fetchHeroImages() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("hero_images")
    .select("id,slot,image_url,label,created_at")
    .order("slot", { ascending: true });

  if (error) throw error;
  return (data ?? []) as HeroImage[];
}

export async function upsertHeroImage(slot: number, file: File, label?: string) {
  const supabase = createSupabaseBrowserClient();
  const filePath = `${slot}/${crypto.randomUUID()}-${Date.now()}-${normalizeFileName(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, { upsert: false, contentType: file.type });
  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  const imageUrl = publicData.publicUrl;

  const { data, error } = await supabase
    .from("hero_images")
    .upsert(
      {
        slot,
        image_url: imageUrl,
        label: label ?? null,
      },
      { onConflict: "slot" },
    )
    .select("id,slot,image_url,label,created_at")
    .single();

  if (error) {
    await supabase.storage.from(BUCKET).remove([filePath]);
    throw error;
  }

  return data as HeroImage;
}

export async function updateHeroImageLabel(slot: number, label?: string) {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("hero_images")
    .update({ label: label ?? null })
    .eq("slot", slot)
    .select("id,slot,image_url,label,created_at")
    .single();

  if (error) throw error;
  return data as HeroImage;
}

export async function deleteHeroImage(heroImage: HeroImage) {
  const supabase = createSupabaseBrowserClient();
  const storagePath = getStoragePathFromUrl(heroImage.image_url);

  if (storagePath) {
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([storagePath]);
    if (storageError) throw storageError;
  }

  const { error: dbError } = await supabase.from("hero_images").delete().eq("id", heroImage.id);
  if (dbError) throw dbError;
}
