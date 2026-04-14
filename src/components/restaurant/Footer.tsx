import { Instagram, Facebook, Twitter } from "lucide-react";
import { store } from "@/lib/store";

export default function Footer() {
  const settings = store.getSettings();
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-surface-dark border-t border-border/10 px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-gold mb-4">AURUM</h3>
          <p className="text-surface-dark-foreground/50 text-sm leading-relaxed">{settings.tagline}</p>
        </div>

        <div>
          <h4 className="text-surface-dark-foreground text-sm font-medium uppercase tracking-wider mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {["#hero:Home", "#menu:Menu", "#about:About", "#gallery:Gallery", "#contact:Contact"].map((l) => {
              const [href, label] = l.split(":");
              return <button key={label} onClick={() => scrollTo(href)} className="text-left text-surface-dark-foreground/50 text-sm hover:text-gold transition-colors">{label}</button>;
            })}
          </div>
        </div>

        <div>
          <h4 className="text-surface-dark-foreground text-sm font-medium uppercase tracking-wider mb-4">Hours</h4>
          <p className="text-surface-dark-foreground/50 text-sm">{settings.openingHours}</p>
        </div>

        <div>
          <h4 className="text-surface-dark-foreground text-sm font-medium uppercase tracking-wider mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href={settings.socialMedia.instagram} className="text-surface-dark-foreground/50 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href={settings.socialMedia.facebook} className="text-surface-dark-foreground/50 hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href={settings.socialMedia.twitter} className="text-surface-dark-foreground/50 hover:text-gold transition-colors"><Twitter size={20} /></a>
          </div>
          <p className="text-surface-dark-foreground/50 text-sm mt-4">{settings.phone}</p>
          <p className="text-surface-dark-foreground/50 text-sm">{settings.email}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/10 text-center">
        <p className="text-surface-dark-foreground/30 text-xs">© 2026 Aurum. All rights reserved.</p>
      </div>
    </footer>
  );
}
