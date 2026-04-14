import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { store, type MenuItem } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminMenu() {
  const [items, setItems] = useState(store.getMenu());
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = (item: MenuItem) => {
    let updated: MenuItem[];
    if (isNew) {
      updated = [...items, { ...item, id: Date.now().toString() }];
    } else {
      updated = items.map((i) => i.id === item.id ? item : i);
    }
    setItems(updated);
    store.setMenu(updated);
    setEditing(null);
    setIsNew(false);
  };

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    store.setMenu(updated);
  };

  const toggleAvail = (id: string) => {
    const updated = items.map((i) => i.id === id ? { ...i, available: !i.available } : i);
    setItems(updated);
    store.setMenu(updated);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-surface-dark-foreground">Menu</h1>
          <p className="text-surface-dark-foreground/50 text-sm mt-1">Manage dishes and categories</p>
        </div>
        <button onClick={() => { setEditing({ id: "", name: "", description: "", price: 0, category: "starters", image: "", available: true }); setIsNew(true); }} className="gold-gradient text-primary-foreground px-4 py-2 rounded-sm text-sm flex items-center gap-2">
          <Plus size={16} /> Add Dish
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-surface-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-dark-elevated border border-border/20 rounded-sm w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl text-surface-dark-foreground">{isNew ? "Add Dish" : "Edit Dish"}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-surface-dark-foreground/40 hover:text-surface-dark-foreground"><X size={20} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); save(editing); }} className="space-y-4">
              <input type="text" placeholder="Dish Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50" required />
              <textarea placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 resize-none" rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50" required />
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as MenuItem["category"] })} className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50">
                  <option value="starters">Starters</option>
                  <option value="mains">Main Courses</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <input type="text" placeholder="Image URL" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50" />
              <button type="submit" className="w-full gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium">
                {isNew ? "Add Dish" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-surface-dark-elevated border border-border/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/10">
              <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Dish</th>
              <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Category</th>
              <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Price</th>
              <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Status</th>
              <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/5 hover:bg-surface-dark/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-sm object-cover" />}
                    <div>
                      <p className="text-surface-dark-foreground">{item.name}</p>
                      <p className="text-surface-dark-foreground/40 text-xs truncate max-w-[200px]">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-surface-dark-foreground/70 capitalize">{item.category}</td>
                <td className="p-4 text-gold">${item.price}</td>
                <td className="p-4">
                  <button onClick={() => toggleAvail(item.id)} className={`text-xs px-2 py-1 rounded-sm ${item.available ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                    {item.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(item); setIsNew(false); }} className="text-surface-dark-foreground/40 hover:text-gold transition-colors"><Pencil size={16} /></button>
                    <button onClick={() => remove(item.id)} className="text-destructive/60 hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
