import { CalendarDays, UtensilsCrossed, Star, Users } from "lucide-react";
import { store } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  const reservations = store.getReservations();
  const menu = store.getMenu();
  const reviews = store.getReviews();
  const today = new Date().toISOString().split("T")[0];
  const todayBookings = reservations.filter((r) => r.date === today);
  const upcoming = reservations.filter((r) => r.date >= today && r.status !== "cancelled");

  const stats = [
    { label: "Total Reservations", value: reservations.length, icon: CalendarDays, color: "text-gold" },
    { label: "Today's Bookings", value: todayBookings.length, icon: Users, color: "text-gold" },
    { label: "Upcoming", value: upcoming.length, icon: CalendarDays, color: "text-gold" },
    { label: "Menu Items", value: menu.length, icon: UtensilsCrossed, color: "text-gold" },
  ];

  const statusCounts = { pending: 0, confirmed: 0, cancelled: 0, completed: 0 };
  reservations.forEach((r) => statusCounts[r.status]++);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-surface-dark-foreground">Dashboard</h1>
        <p className="text-surface-dark-foreground/50 text-sm mt-1">Welcome back. Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface-dark-elevated border border-border/10 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon size={20} className={s.color} />
            </div>
            <p className="font-display text-3xl text-surface-dark-foreground">{s.value}</p>
            <p className="text-surface-dark-foreground/50 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-dark-elevated border border-border/10 rounded-sm p-6">
          <h3 className="font-display text-lg text-surface-dark-foreground mb-4">Reservation Status</h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${status === "pending" ? "bg-yellow-500" : status === "confirmed" ? "bg-green-500" : status === "cancelled" ? "bg-red-500" : "bg-blue-500"}`} />
                  <span className="text-surface-dark-foreground/70 text-sm capitalize">{status}</span>
                </div>
                <span className="text-surface-dark-foreground font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-dark-elevated border border-border/10 rounded-sm p-6">
          <h3 className="font-display text-lg text-surface-dark-foreground mb-4">Recent Reservations</h3>
          {reservations.length === 0 ? (
            <p className="text-surface-dark-foreground/40 text-sm">No reservations yet.</p>
          ) : (
            <div className="space-y-3">
              {reservations.slice(-5).reverse().map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-border/5 last:border-0">
                  <div>
                    <p className="text-surface-dark-foreground text-sm">{r.name}</p>
                    <p className="text-surface-dark-foreground/40 text-xs">{r.date} at {r.time} · {r.guests} guests</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-sm capitalize ${r.status === "pending" ? "bg-yellow-500/10 text-yellow-500" : r.status === "confirmed" ? "bg-green-500/10 text-green-500" : r.status === "cancelled" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"}`}>{r.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
