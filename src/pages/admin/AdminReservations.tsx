import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { store, type Reservation } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminReservations() {
  const [reservations, setReservations] = useState(store.getReservations());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = reservations.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Reservation["status"]) => {
    const updated = reservations.map((r) => r.id === id ? { ...r, status } : r);
    setReservations(updated);
    store.setReservations(updated);
  };

  const deleteReservation = (id: string) => {
    const updated = reservations.filter((r) => r.id !== id);
    setReservations(updated);
    store.setReservations(updated);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-surface-dark-foreground">Reservations</h1>
        <p className="text-surface-dark-foreground/50 text-sm mt-1">Manage all bookings</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-dark-foreground/40" />
          <input type="text" placeholder="Search by name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-10 pr-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-surface-dark-elevated border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-surface-dark-elevated border border-border/10 rounded-sm p-12 text-center">
          <p className="text-surface-dark-foreground/40">No reservations found.</p>
        </div>
      ) : (
        <div className="bg-surface-dark-elevated border border-border/10 rounded-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/10">
                <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Guest</th>
                <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Date & Time</th>
                <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Guests</th>
                <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Status</th>
                <th className="text-left p-4 text-surface-dark-foreground/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border/5 hover:bg-surface-dark/30">
                  <td className="p-4">
                    <p className="text-surface-dark-foreground">{r.name}</p>
                    <p className="text-surface-dark-foreground/40 text-xs">{r.phone}</p>
                  </td>
                  <td className="p-4 text-surface-dark-foreground/70">{r.date} at {r.time}</td>
                  <td className="p-4 text-surface-dark-foreground/70">{r.guests}</td>
                  <td className="p-4">
                    <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value as Reservation["status"])} className="bg-surface-dark border border-border/20 rounded-sm px-2 py-1 text-xs text-surface-dark-foreground focus:outline-none capitalize">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button onClick={() => deleteReservation(r.id)} className="text-destructive/60 hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
