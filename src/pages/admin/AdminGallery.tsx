import { useState } from "react";
import { Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminGallery() {
  const [gallery, setGallery] = useState(store.getGallery());

  const remove = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    store.setGallery(updated);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-surface-dark-foreground">Gallery</h1>
        <p className="text-surface-dark-foreground/50 text-sm mt-1">Manage gallery images</p>
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
    </AdminLayout>
  );
}
