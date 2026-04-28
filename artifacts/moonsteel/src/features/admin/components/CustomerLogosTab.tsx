"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { useCustomerLogos } from "@/features/admin/hooks/useCustomerLogos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CustomerLogosTab() {
  const { logos, isLoading, isUploading, error, uploadMany, remove } = useCustomerLogos();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const previewUrls = useMemo(
    () =>
      selectedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    [selectedFiles],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewUrls]);

  const onPickFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setSelectedFiles(imageFiles);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length === 0) return;
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setSelectedFiles(imageFiles);
  };

  const onUpload = async () => {
    if (selectedFiles.length === 0) return;
    await uploadMany(selectedFiles);
    setSelectedFiles([]);
  };

  return (
    <div className="space-y-6">
      <Card className="layer-1">
        <CardHeader>
          <CardTitle>Upload Customer Logos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`layer-1 rounded-md border-2 border-dashed p-5 text-center text-sm transition-colors ${
              isDragging
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground"
            }`}
          >
            Drag and drop image files here
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onPickFile}
            className="layer-1 w-full rounded-md px-3 py-2 text-sm"
          />

          {previewUrls.length > 0 ? (
            <div className="layer-2 grid grid-cols-2 gap-3 rounded-lg p-4 sm:grid-cols-3 lg:grid-cols-4">
              {previewUrls.map((item) => (
                <div key={`${item.name}-${item.url}`} className="layer-1 rounded-md p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={`Preview ${item.name}`}
                    className="mx-auto h-16 w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <Button
            type="button"
            disabled={selectedFiles.length === 0 || isUploading}
            onClick={onUpload}
            className="inline-flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading
              ? "Uploading..."
              : selectedFiles.length > 1
                ? `Upload ${selectedFiles.length} Logos`
                : "Upload Logo"}
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
