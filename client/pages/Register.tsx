import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ token: string; user: { id: string; email: string } }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
      login(res.token, res.user);
      nav("/profile-setup");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md mt-16 p-6 rounded-2xl bg-card shadow-card">
        <h1 className="text-2xl font-semibold text-white mb-2">Create your account</h1>
        <p className="text-white/70 mb-6">Start your personalized career path.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-white">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-white">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-destructive">{error}</p>}
          <button
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground py-2.5 font-medium transition-colors"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-white/70">
          Already have an account? <Link to="/login" className="text-primary">Log in</Link>
        </p>
      </div>
    </Layout>
  );
}
