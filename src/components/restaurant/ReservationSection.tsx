import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Users, User, Phone, MessageSquare, Check } from "lucide-react";
import { store, type Reservation } from "@/lib/store";

const timeSlots = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"];

export default function ReservationSection() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2", specialRequests: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Please fill in all required fields.");
      return;
    }
    const reservation: Reservation = {
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      specialRequests: form.specialRequests,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    store.addReservation(reservation);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <section id="reservation" className="section-padding bg-surface-dark">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
            <Check className="text-primary-foreground" size={32} />
          </div>
          <h2 className="font-display text-3xl text-surface-dark-foreground mb-4">Reservation Confirmed</h2>
          <p className="text-surface-dark-foreground/60 mb-8">Thank you, {form.name}. We look forward to welcoming you on {form.date} at {form.time}.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", date: "", time: "", guests: "2", specialRequests: "" }); }} className="text-gold text-sm underline underline-offset-4 hover:text-gold-light transition-colors">
            Make another reservation
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="reservation" className="section-padding bg-surface-dark">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Reservations</p>
          <h2 className="font-display text-4xl md:text-5xl text-surface-dark-foreground">Book Your Table</h2>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField icon={<User size={18} />} type="text" placeholder="Full Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <InputField icon={<Phone size={18} />} type="tel" placeholder="Phone Number *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <InputField icon={<CalendarIcon size={18} />} type="date" placeholder="Date *" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
            <div className="relative">
              <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
              <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-12 pr-4 py-3.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 appearance-none">
                <option value="">Select Time *</option>
                {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="relative">
              <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
              <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-12 pr-4 py-3.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 appearance-none">
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
              </select>
            </div>
          </div>
          <div className="relative">
            <MessageSquare size={18} className="absolute left-4 top-4 text-gold/60" />
            <textarea placeholder="Special Requests (optional)" value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-12 pr-4 py-3.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 min-h-[100px] resize-none" />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" className="w-full gold-gradient text-primary-foreground py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity">
            Reserve Now
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function InputField({ icon, type, placeholder, value, onChange }: { icon: React.ReactNode; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/60">{icon}</div>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm pl-12 pr-4 py-3.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50 placeholder:text-surface-dark-foreground/40" />
    </div>
  );
}
