"use client";

import { useCallback, useEffect, useState } from "react";
import type { CustomerLogo } from "@/features/admin/types";
import {
  deleteCustomerLogo,
  fetchCustomerLogos,
  uploadCustomerLogo,
} from "@/features/admin/services/customerLogos";

export function useCustomerLogos() {
  const [logos, setLogos] = useState<CustomerLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const rows = await fetchCustomerLogos();
      setLogos(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load logos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onUpload = useCallback(async (file: File) => {
    setError(null);
    setIsUploading(true);
    try {
      const created = await uploadCustomerLogo(file);
      setLogos((prev) => [created, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const onDelete = useCallback(async (logo: CustomerLogo) => {
    setError(null);
    const prev = logos;
    setLogos((current) => current.filter((x) => x.id !== logo.id));
    try {
      await deleteCustomerLogo(logo);
    } catch (e) {
      setLogos(prev);
      setError(e instanceof Error ? e.message : "Delete failed.");
    }
  }, [logos]);

  return {
    logos,
    isLoading,
    isUploading,
    error,
    refresh: load,
    upload: onUpload,
    remove: onDelete,
  };
}
