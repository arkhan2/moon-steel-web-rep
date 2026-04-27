"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { useCustomerLogos } from "@/features/admin/hooks/useCustomerLogos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const allowedTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"]);

export function CustomerLogosTab() {
  const { logos, isLoading, isUploading, error, upload, remove } = useCustomerLogos();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!allowedTypes.has(file.type)) return;
    setSelectedFile(file);
  };

  const onUpload = async () => {
    if (!selectedFile) return;
    await upload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <Card className="layer-1">
        <CardHeader>
          <CardTitle>Upload Customer Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
            onChange={onPickFile}
            className="layer-1 w-full rounded-md px-3 py-2 text-sm"
          />

          {previewUrl ? (
            <div className="layer-2 flex items-center justify-center rounded-lg p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected logo preview"
                className="max-h-24 max-w-full object-contain"
              />
            </div>
          ) : null}

          <Button
            type="button"
            disabled={!selectedFile || isUploading}
            onClick={onUpload}
            className="inline-flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Logo"}
          </Button>
        </CardContent>
      </Card>

      <Card className="layer-1">
        <CardHeader>
          <CardTitle>Uploaded Logos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? <p className="text-sm text-muted-foreground">Loading logos...</p> : null}
          {!isLoading && logos.length === 0 ? (
            <p className="text-sm text-muted-foreground">No logos uploaded yet.</p>
          ) : null}

          {!isLoading && logos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {logos.map((logo) => (
                <div key={logo.id} className="layer-2 rounded-lg p-3">
                  <div className="layer-1 flex h-24 items-center justify-center rounded-md p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.image_url}
                      alt="Customer logo"
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => void remove(logo)}
                    className="mt-3 w-full"
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
