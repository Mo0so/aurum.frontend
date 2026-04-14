import { useState } from "react";
import { store, type RestaurantSettings } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";
import { Check } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState(store.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.setSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-surface-dark-foreground">Settings</h1>
        <p className="text-surface-dark-foreground/50 text-sm mt-1">Update restaurant information</p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        <Field label="Restaurant Name" value={settings.name} onChange={(v) => setSettings({ ...settings, name: v })} />
        <Field label="Tagline" value={settings.tagline} onChange={(v) => setSettings({ ...settings, tagline: v })} />
        <Field label="Phone" value={settings.phone} onChange={(v) => setSettings({ ...settings, phone: v })} />
        <Field label="Email" value={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
        <Field label="Address" value={settings.address} onChange={(v) => setSettings({ ...settings, address: v })} />
        <Field label="Opening Hours" value={settings.openingHours} onChange={(v) => setSettings({ ...settings, openingHours: v })} />

        <div className="border-t border-border/10 pt-6">
          <h3 className="text-surface-dark-foreground font-medium text-sm mb-4">Social Media</h3>
          <div className="space-y-4">
            <Field label="Instagram" value={settings.socialMedia.instagram} onChange={(v) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, instagram: v } })} />
            <Field label="Facebook" value={settings.socialMedia.facebook} onChange={(v) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, facebook: v } })} />
            <Field label="Twitter" value={settings.socialMedia.twitter} onChange={(v) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, twitter: v } })} />
          </div>
        </div>

        <button type="submit" className="gold-gradient text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2">
          {saved ? <><Check size={16} /> Saved</> : "Save Settings"}
        </button>
      </form>
    </AdminLayout>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface-dark-elevated border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50" />
    </div>
  );
}
