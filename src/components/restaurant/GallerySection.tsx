import { motion } from "framer-motion";
import { store } from "@/lib/store";

export default function GallerySection() {
  const gallery = store.getGallery();

  return (
    <section id="gallery" className="section-padding bg-surface-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl text-surface-dark-foreground">Moments at Aurum</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`overflow-hidden rounded-sm ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 aspect-square" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
