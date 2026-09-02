"use client";

import { useState } from "react";
import { X, Plus, Trash2, FolderPlus, Loader2, Tag, CheckCircle2 } from "lucide-react";

export default function CategoryManagerModal({
  isOpen,
  onClose,
  categories = [],
  onCategoryCreated,
  onCategoryDeleted,
}) {
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      setError("Please enter category name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCatName.trim(),
          description: newCatDesc.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create category");

      setNewCatName("");
      setNewCatDesc("");
      if (onCategoryCreated) onCategoryCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name, count) => {
    if (count > 0) {
      if (!confirm(`This category is used in ${count} article(s). Are you sure you want to delete it?`)) {
        return;
      }
    } else {
      if (!confirm(`Delete category "${name}"?`)) return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete category");
      if (onCategoryDeleted) onCategoryDeleted(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-neutral-300 w-full max-w-lg flex flex-col shadow-2xl rounded-none overflow-hidden max-h-[85vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-none">
              <FolderPlus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-black uppercase tracking-wider">
                Category Management
              </h3>
              <p className="text-[10px] text-neutral-500 font-normal">
                Create and manage article categories saved in database
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black cursor-pointer rounded-none hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-none">
              {error}
            </div>
          )}

          {/* Create New Form */}
          <form onSubmit={handleCreate} className="bg-neutral-50 border border-neutral-200 p-3 space-y-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-black flex items-center gap-1.5">
              <Plus className="w-3 h-3" />
              <span>Add New Category</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Category name (e.g. Kundali Matching, Numerology)..."
                className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black bg-white"
              />
              <input
                type="text"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Optional short description..."
                className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !newCatName.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Create Category</span>
                </>
              )}
            </button>
          </form>

          {/* Existing Categories List */}
          <div className="space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Existing Categories ({categories.length})
            </div>

            <div className="border border-neutral-200 divide-y divide-neutral-100 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <div
                  key={cat._id || cat.id}
                  className="p-2.5 flex items-center justify-between gap-2 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Tag className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-medium text-black">{cat.name}</span>
                      <span className="text-[10px] text-neutral-400 ml-2 font-mono">
                        ({cat.count || 0} posts)
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(cat._id || cat.id, cat.name, cat.count || 0)}
                    disabled={deletingId === (cat._id || cat.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer rounded-none transition-colors shrink-0"
                    title="Delete Category"
                  >
                    {deletingId === (cat._id || cat.id) ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-400" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
