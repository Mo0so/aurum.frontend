import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { ADMIN_AUTH_KEY, ADMIN_PASSWORD } from "@/components/admin/RequireAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_AUTH_KEY, "1");
      navigate("/admin", { replace: true });
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-dark-elevated border border-border/10 rounded-sm p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
            <Lock className="text-gold" size={20} />
          </div>
          <h1 className="font-display text-3xl text-gold">AURUM</h1>
          <p className="text-surface-dark-foreground/50 text-sm mt-1">Admin Sign In</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-surface-dark-foreground/50 text-xs uppercase tracking-wider mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              autoFocus
              className="w-full bg-surface-dark border border-border/20 rounded-sm px-4 py-2.5 text-surface-dark-foreground text-sm focus:outline-none focus:border-gold/50"
            />
            {error && <p className="text-destructive text-xs mt-2">{error}</p>}
          </div>

          <button type="submit" className="w-full gold-gradient text-primary-foreground py-2.5 rounded-sm text-sm font-medium">
            Sign In
          </button>

          <p className="text-surface-dark-foreground/40 text-xs text-center">
            Demo password: <span className="text-gold">admin123</span>
          </p>
        </form>
      </div>
    </div>
  );
}
