"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  AlertCircle,
  PackagePlus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryBadge, StockBadge } from "@/components/ui/status-badge";
import type { Product } from "@/lib/types";

const PLACEHOLDER = "https://placehold.co/800x600/1763c4/ffffff?text=No+Image";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB — mirrors the server limit

const EMPTY_FORM: Omit<Product, "id" | "inStock" | "features"> = {
  name: "",
  category: "door",
  pricePerSqft: 0,
  description: "",
  image: "",
  material: "",
};

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-ring/40";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] =
    useState<Omit<Product, "id" | "inStock" | "features">>(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Product[]) => setProductList(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function openAdd() {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setSaveError(null);
    setUploadError(null);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditProduct(product);
    setForm({
      name: product.name ?? "",
      category: product.category ?? "door",
      pricePerSqft: product.pricePerSqft ?? 0,
      description: product.description ?? "",
      image: product.image ?? "",
      material: product.material ?? "",
    });
    setSaveError(null);
    setUploadError(null);
    setModalOpen(true);
  }

  async function handleImageUpload(file: File) {
    setUploadError(null);
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("Unsupported file type. Use JPEG, PNG, WebP or AVIF.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError("Image exceeds the 8 MB size limit.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Upload failed (${res.status}).`);
      }
      setForm((f) => ({ ...f, image: data.url }));
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!form.name || !form.pricePerSqft) return;
    setSaving(true);
    setSaveError(null);
    try {
      if (editProduct) {
        const res = await fetch(`/api/products/${editProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? `Server error ${res.status}`);
        }
        const updated: Product = await res.json();
        setProductList((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, inStock: true, features: [] }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error ?? `Server error ${res.status}`);
        }
        const created: Product = await res.json();
        setProductList((prev) => [created, ...prev]);
      }
      setModalOpen(false);
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Save failed. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" }).catch(() => {});
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            Products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {productList.length} products in catalogue
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary transition-[transform,box-shadow] hover:shadow-primary-lg active:translate-y-px"
        >
          <Plus className="size-4" />
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/[0.07]">
        {loading ? (
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4">
                <div className="size-10 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : productList.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent text-primary">
              <PackagePlus className="size-6" />
            </div>
            <p className="font-semibold text-foreground">No products yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first product to start building the catalogue.
            </p>
            <button
              onClick={openAdd}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary"
            >
              <Plus className="size-4" />
              Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Product", "Category", "Price / sq.ft", "Stock", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/[0.06]">
                          <Image
                            src={product.image || PLACEHOLDER}
                            alt={product.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.material}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <CategoryBadge category={product.category} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      ₹{(product.pricePerSqft ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StockBadge inStock={product.inStock} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(product)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil className="size-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(product.id)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive-subtle hover:text-destructive"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/[0.07]"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-5">
                <h3 className="text-lg font-bold text-foreground">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4 px-6 py-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="e.g. Classic Teak Panel Door"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          category: e.target.value as "door" | "window",
                        }))
                      }
                      className={inputCls}
                    >
                      <option value="door">Door</option>
                      <option value="window">Window</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Price / sq.ft (₹) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={form.pricePerSqft || ""}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          pricePerSqft: Number(e.target.value),
                        }))
                      }
                      placeholder="850"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Material
                  </label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, material: e.target.value }))
                    }
                    placeholder="e.g. Grade-A Teak Wood"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Describe the product..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Image
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, image: e.target.value }))
                      }
                      placeholder="Paste an image URL, or upload →"
                      className={`${inputCls} flex-1`}
                    />
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                        e.target.value = ""; // allow re-selecting the same file
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center justify-center rounded-xl border border-border bg-background px-3 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-60"
                      aria-label="Upload image"
                    >
                      {uploading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </button>
                  </div>
                  {uploadError && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-destructive">
                      <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                      {uploadError}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    JPEG, PNG, WebP or AVIF · up to 8 MB · resized to 800×600.
                  </p>
                  {form.image && (
                    <div className="relative mt-2 h-24 w-36 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                      <Image
                        src={form.image}
                        alt="preview"
                        fill
                        sizes="144px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>

              {saveError && (
                <div className="mx-6 mb-2 flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive-subtle px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {saveError}
                </div>
              )}
              <div className="sticky bottom-0 flex justify-end gap-3 border-t border-border bg-card px-6 py-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.name || !form.pricePerSqft || saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-primary transition-[transform,box-shadow] hover:shadow-primary-lg active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {editProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              role="alertdialog"
              aria-modal="true"
              className="relative w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-foreground/[0.07]"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-destructive-subtle text-destructive">
                <Trash2 className="size-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Delete Product?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This action cannot be undone. The product will be permanently
                removed from your catalogue.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
