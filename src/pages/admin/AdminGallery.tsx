import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import { store } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminGallery() {
  const [gallery, setGallery] = useState(store.getGallery());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const [error, setError] = useState("");

  const remove = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    store.setGallery(updated);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !src.trim()) {
      setError("Title and image are required");
      return;
    }
    const updated = [...gallery, { id: `${Date.now()}`, src: src.trim(), alt: title.trim() }];
    setGallery(updated);
    store.setGallery(updated);
    setTitle("");
    setSrc("");
    setError("");
    setOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-surface-dark-foreground">Gallery</h1>
          <p className="text-surface-dark-foreground/50 text-sm mt-1">Manage gallery images</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="gold-gradient text-primary-foreground px-4 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2"
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((img) => (
          <div key={img.id} className="relative group bg-surface-dark-elevated border border-border/10 rounded-sm overflow-hidden">
            <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-surface-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button onClick={() => remove(img.id)} className="bg-destructive text-destructive-foreground p-2 rounded-sm hover:opacity-90"><Trash2 size={18} /></button>
            </div>
            <p className="p-3 text-surface-dark-foreground/60 text-xs">{img.alt}</p>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setOpen(false)}>
          <div className="bg-surface-dark-elevated border border-border/10 rounded-sm w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl text-surface-dark-foreground">Add Gallery Image</h2>
              <button onClick={() => setOpen(false)} className="text-surface-dark-foreground/50 hover:text-surface-dark-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block">Image URL</label>
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              <div>
                <label className="text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block">Or upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full text-surface-dark-foreground/70 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:bg-gold/10 file:text-gold file:text-xs file:cursor-pointer"
                />
              </div>

              {src && (
                <div className="rounded-sm overflow-hidden border border-border/10">
                  <img src={src} alt="Preview" className="w-full aspect-video object-cover" />
                </div>
              )}

              {error && <p className="text-destructive text-xs">{error}</p>}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-border/20 text-surface-dark-foreground py-2.5 rounded-sm text-sm hover:bg-surface-dark transition-colors"
                >
                  Cancel
                </button>
                <button type="submit" className="flex-1 gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium">
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
