"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { HeroImage } from "@/features/admin/types";
import {
  deleteHeroImage,
  fetchHeroImages,
  updateHeroImageLabel,
  upsertHeroImage,
} from "@/features/admin/services/heroImages";

export function useHeroImages() {
  const [items, setItems] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const rows = await fetchHeroImages();
      setItems(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load hero images.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const uploadForSlot = useCallback(async (slot: number, file: File, label?: string) => {
    setError(null);
    setIsSaving(true);
    try {
      const updated = await upsertHeroImage(slot, file, label);
      setItems((prev) => {
        const withoutSlot = prev.filter((x) => x.slot !== slot);
        return [...withoutSlot, updated].sort((a, b) => a.slot - b.slot);
      });
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to upload hero image.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const saveLabelForSlot = useCallback(async (slot: number, label?: string) => {
    setError(null);
    setIsSaving(true);
    try {
      const updated = await updateHeroImageLabel(slot, label);
      setItems((prev) => {
        const withoutSlot = prev.filter((x) => x.slot !== slot);
        return [...withoutSlot, updated].sort((a, b) => a.slot - b.slot);
      });
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save hero image label.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeFromSlot = useCallback(async (slot: number) => {
    const current = items.find((x) => x.slot === slot);
    if (!current) return false;
    setError(null);
    setIsSaving(true);
    try {
      await deleteHeroImage(current);
      setItems((prev) => prev.filter((x) => x.slot !== slot));
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete hero image.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [items]);

  const bySlot = useMemo(() => {
    const map = new Map<number, HeroImage>();
    items.forEach((item) => map.set(item.slot, item));
    return map;
  }, [items]);

  return {
    items,
    bySlot,
    isLoading,
    isSaving,
    error,
    refresh: load,
    uploadForSlot,
    saveLabelForSlot,
    removeFromSlot,
  };
}
