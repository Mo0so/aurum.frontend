import { useState } from "react";
import { motion } from "framer-motion";
import { store } from "@/lib/store";

const categories = [
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Main Courses" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks", label: "Drinks" },
] as const;

export default function MenuSection() {
  const [active, setActive] = useState<string>("mains");
  const menu = store.getMenu().filter((i) => i.available);
  const filtered = menu.filter((i) => i.category === active);

  return (
    <section id="menu" className="section-padding bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Menu</p>
          <h2 className="font-display text-4xl md:text-5xl text-surface-dark-foreground">Culinary Masterpieces</h2>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setActive(c.key)} className={`px-6 py-2 rounded-sm text-sm tracking-wide transition-all ${active === c.key ? "gold-gradient text-primary-foreground" : "border border-border/20 text-surface-dark-foreground/60 hover:border-gold/40 hover:text-gold"}`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-surface-dark-elevated border border-border/10 rounded-sm overflow-hidden hover:border-gold/20 transition-colors">
              <div className="aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} loading="lazy" width={640} height={640} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg text-surface-dark-foreground">{item.name}</h3>
                  <span className="text-gold font-display text-lg">${item.price}</span>
                </div>
                <p className="text-surface-dark-foreground/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
