import { useState } from "react";
import { Star, Eye, EyeOff, Trash2 } from "lucide-react";
import { store } from "@/lib/store";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminReviews() {
  const [reviews, setReviews] = useState(store.getReviews());

  const toggleApproval = (id: string) => {
    const updated = reviews.map((r) => r.id === id ? { ...r, approved: !r.approved } : r);
    setReviews(updated);
    store.setReviews(updated);
  };

  const remove = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    store.setReviews(updated);
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-surface-dark-foreground">Reviews</h1>
        <p className="text-surface-dark-foreground/50 text-sm mt-1">Manage customer reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-surface-dark-elevated border border-border/10 rounded-sm p-6 flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-surface-dark-foreground font-medium text-sm">{review.author}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? "fill-gold text-gold" : "text-surface-dark-foreground/20"} />
                  ))}
                </div>
                <span className="text-surface-dark-foreground/30 text-xs">{review.date}</span>
                {!review.approved && <span className="text-xs px-2 py-0.5 rounded-sm bg-yellow-500/10 text-yellow-500">Hidden</span>}
              </div>
              <p className="text-surface-dark-foreground/60 text-sm">{review.text}</p>
            </div>
            <div className="flex gap-2 items-start">
              <button onClick={() => toggleApproval(review.id)} className="text-surface-dark-foreground/40 hover:text-gold transition-colors" title={review.approved ? "Hide" : "Approve"}>
                {review.approved ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button onClick={() => remove(review.id)} className="text-destructive/60 hover:text-destructive transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
