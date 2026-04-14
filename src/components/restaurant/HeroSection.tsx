import { motion } from "framer-motion";
import heroImg from "@/assets/hero-restaurant.jpg";

export default function HeroSection() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <img src={heroImg} alt="Aurum restaurant interior" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/50 to-surface-dark/90" />
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="relative text-center px-6 max-w-3xl">
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-body">Fine Dining Experience</p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-surface-dark-foreground mb-6 leading-tight">
          Aurum
        </h1>
        <p className="text-surface-dark-foreground/70 text-lg md:text-xl mb-10 font-body font-light">
          Where Every Dish Tells a Story
        </p>
        <button onClick={() => scrollTo("#reservation")} className="gold-gradient text-primary-foreground px-8 py-3.5 rounded-sm text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity">
          Book a Table
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}
