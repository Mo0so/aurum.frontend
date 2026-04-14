import { motion } from "framer-motion";
import chefImg from "@/assets/chef.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-surface-dark-elevated">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
          <h2 className="font-display text-4xl md:text-5xl text-surface-dark-foreground">A Legacy of Excellence</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="aspect-[4/5] rounded-sm overflow-hidden">
              <img src={chefImg} alt="Chef Laurent" loading="lazy" width={640} height={800} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h3 className="font-display text-3xl text-surface-dark-foreground">Meet Chef Laurent</h3>
            <p className="text-surface-dark-foreground/60 leading-relaxed">
              With over two decades of experience in Michelin-starred kitchens across Paris, Tokyo, and New York, Chef Laurent brings a unique philosophy to Aurum — one that honors tradition while embracing innovation.
            </p>
            <p className="text-surface-dark-foreground/60 leading-relaxed">
              Every dish at Aurum is crafted with the finest seasonal ingredients sourced from artisan producers around the world. Our commitment to excellence extends beyond the plate to every aspect of your dining experience.
            </p>
            <div className="flex gap-12 pt-4">
              <div>
                <p className="font-display text-3xl text-gold">20+</p>
                <p className="text-surface-dark-foreground/50 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">3</p>
                <p className="text-surface-dark-foreground/50 text-sm">Michelin Stars</p>
              </div>
              <div>
                <p className="font-display text-3xl text-gold">50+</p>
                <p className="text-surface-dark-foreground/50 text-sm">Awards Won</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
