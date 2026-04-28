"use client";

import { FormEvent, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductCategories } from "@/features/admin/hooks/useProductCategories";

const initialForm = {
  title: "",
  specs: "",
  description: "",
  uses: "",
  sort_order: 100,
};

export function ProductCategoriesTab() {
  const { categories, isLoading, isSaving, error, create, update, remove } = useProductCategories();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const canSubmit = useMemo(
    () =>
      form.title.trim().length > 1 &&
      form.specs.trim().length > 1 &&
      form.description.trim().length > 4 &&
      form.uses.trim().length > 1,
    [form]
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (editingId) {
      await update({
        id: editingId,
        title: form.title.trim(),
        specs: form.specs.trim(),
        description: form.description.trim(),
        uses: form.uses.trim(),
        sort_order: Number(form.sort_order) || 100,
      });
    } else {
      await create({
        title: form.title.trim(),
        specs: form.specs.trim(),
        description: form.description.trim(),
        uses: form.uses.trim(),
        sort_order: Number(form.sort_order) || 100,
      });
    }
    setEditingId(null);
    setForm(initialForm);
    setIsDialogOpen(false);
  };

  const startEdit = (id: string) => {
    const row = categories.find((x) => x.id === id);
    if (!row) return;
    setEditingId(id);
    setForm({
      title: row.title,
      specs: row.specs,
      description: row.description,
      uses: row.uses,
      sort_order: row.sort_order,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const startCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="layer-1">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>Current Product Categories</CardTitle>
            <Button type="button" onClick={startCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? <p className="text-sm text-muted-foreground">Loading categories...</p> : null}
          {!isLoading && categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No categories yet.</p>
          ) : null}
          {!isLoading && categories.length > 0 ? (
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="layer-2 flex flex-col gap-3 rounded-lg p-4 md:flex-row md:items-start md:justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-foreground">{category.title}</p>
                    <p className="text-xs font-mono text-muted-foreground">{category.specs}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                    <p className="text-xs text-foreground/80">{category.uses}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" type="button" onClick={() => startEdit(category.id)}>
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => void remove(category.id)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Product Category" : "Add Product Category"}</DialogTitle>
            <DialogDescription>
              Manage product category details shown on the landing page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              className="layer-1 rounded-md px-3 py-2 text-sm"
              placeholder="Category title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              className="layer-1 rounded-md px-3 py-2 text-sm"
              placeholder="Specs"
              value={form.specs}
              onChange={(e) => setForm((f) => ({ ...f, specs: e.target.value }))}
            />
            <textarea
              className="layer-1 rounded-md px-3 py-2 text-sm md:col-span-2"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
            <input
              className="layer-1 rounded-md px-3 py-2 text-sm md:col-span-2"
              placeholder="Uses (comma-separated)"
              value={form.uses}
              onChange={(e) => setForm((f) => ({ ...f, uses: e.target.value }))}
            />
            <input
              type="number"
              className="layer-1 rounded-md px-3 py-2 text-sm"
              placeholder="Sort order"
              value={form.sort_order}
              onChange={(e) =>
                setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))
              }
            />

            <DialogFooter className="md:col-span-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!canSubmit || isSaving}>
                {isSaving ? "Saving..." : editingId ? "Save Changes" : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
