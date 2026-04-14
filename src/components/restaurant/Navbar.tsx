import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/90 backdrop-blur-md border-b border-border/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => scrollTo("#hero")} className="font-display text-2xl tracking-wider text-gold">
          AURUM
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.label} onClick={() => scrollTo(l.href)} className="text-sm tracking-wide text-surface-dark-foreground/70 hover:text-gold transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#reservation")} className="gold-gradient text-primary-foreground px-5 py-2 rounded-sm text-sm font-medium tracking-wide hover:opacity-90 transition-opacity">
            Book a Table
          </button>
        </div>

        <button className="md:hidden text-surface-dark-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-surface-dark border-t border-border/10 px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left text-surface-dark-foreground/70 hover:text-gold transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#reservation")} className="gold-gradient text-primary-foreground px-5 py-2 rounded-sm text-sm font-medium w-fit">
              Book a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
