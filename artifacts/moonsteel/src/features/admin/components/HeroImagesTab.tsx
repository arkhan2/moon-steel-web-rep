"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Save, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useHeroImages } from "@/features/admin/hooks/useHeroImages";
import { useToast } from "@/hooks/use-toast";

const slots = [1, 2, 3, 4] as const;

export function HeroImagesTab() {
  const { toast } = useToast();
  const { bySlot, isLoading, isSaving, error, uploadForSlot, saveLabelForSlot, removeFromSlot } =
    useHeroImages();
  const [selected, setSelected] = useState<Record<number, File | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [labels, setLabels] = useState<Record<number, string | undefined>>({
    1: undefined,
    2: undefined,
    3: undefined,
    4: undefined,
  });
  const [fileInputKeys, setFileInputKeys] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const previewUrls = useMemo(() => {
    const next: Record<number, string | null> = { 1: null, 2: null, 3: null, 4: null };
    slots.forEach((slot) => {
      const file = selected[slot];
      if (file) next[slot] = URL.createObjectURL(file);
    });
    return next;
  }, [selected]);

  useEffect(() => {
    return () => {
      slots.forEach((slot) => {
        const preview = previewUrls[slot];
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [previewUrls]);

  const onPickFile = (slot: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file || !file.type.startsWith("image/")) return;
    setSelected((prev) => ({ ...prev, [slot]: file }));
  };

  const onUpload = async (slot: number) => {
    const file = selected[slot];
    if (!file) return;
    const label = (labels[slot] ?? "").trim() || undefined;
    const ok = await uploadForSlot(slot, file, label);
    if (!ok) return;
    setSelected((prev) => ({ ...prev, [slot]: null }));
    setFileInputKeys((prev) => ({ ...prev, [slot]: prev[slot] + 1 }));
    toast({
      title: `Hero image ${slot} updated`,
      description: "Image uploaded successfully.",
    });
  };

  const onSaveLabel = async (slot: number) => {
    if (!bySlot.get(slot)) return;
    const label = (labels[slot] ?? "").trim() || undefined;
    const ok = await saveLabelForSlot(slot, label);
    if (!ok) return;
    toast({
      title: `Hero image ${slot} label saved`,
      description: "Label updated successfully.",
    });
  };

  const onClearSelection = (slot: number) => {
    setSelected((prev) => ({ ...prev, [slot]: null }));
    setFileInputKeys((prev) => ({ ...prev, [slot]: prev[slot] + 1 }));
  };

  const onDelete = async (slot: number) => {
    const ok = await removeFromSlot(slot);
    if (!ok) return;
    setSelected((prev) => ({ ...prev, [slot]: null }));
    setLabels((prev) => ({ ...prev, [slot]: undefined }));
    setFileInputKeys((prev) => ({ ...prev, [slot]: prev[slot] + 1 }));
    toast({
      title: `Hero image ${slot} removed`,
      description: "Image deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="layer-1">
        <CardHeader>
          <CardTitle>Hero Images (4 Slots)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upload or replace each of the 4 hero images shown in the homepage image rail.
          </p>
        </CardContent>
      </Card>

      {isLoading ? <p className="text-sm text-muted-foreground">Loading hero images...</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {slots.map((slot) => {
          const existing = bySlot.get(slot);
          const preview = previewUrls[slot];
          return (
            <Card key={slot} className="layer-1">
              <CardHeader>
                <CardTitle className="text-base">Hero Image {slot}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="layer-2 flex h-36 items-center justify-center rounded-lg p-3">
                  {preview ?? existing?.image_url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview ?? existing?.image_url}
                        alt={`Hero slot ${slot}`}
                        className="max-h-32 w-full rounded-md object-cover"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                      Empty image slot
                    </div>
                  )}
                </div>

                <input
                  key={`hero-file-${slot}-${fileInputKeys[slot]}`}
                  type="file"
                  accept="image/*"
                  onChange={onPickFile(slot)}
                  className="layer-1 w-full rounded-md px-3 py-2 text-sm"
                />

                <Input
                  type="text"
                  placeholder="Image label (e.g. Prep & Sinks)"
                  value={labels[slot] ?? existing?.label ?? ""}
                  onChange={(e) => setLabels((prev) => ({ ...prev, [slot]: e.target.value }))}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    disabled={!selected[slot] || isSaving}
                    onClick={() => void onUpload(slot)}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : existing ? "Replace" : "Upload"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!existing || isSaving}
                    onClick={() => void onSaveLabel(slot)}
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Label
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!selected[slot] || isSaving}
                    onClick={() => onClearSelection(slot)}
                    className="w-full"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Selection
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!existing || isSaving}
                    onClick={() => void onDelete(slot)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
