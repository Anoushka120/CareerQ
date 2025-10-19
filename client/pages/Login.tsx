import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api<{ token: string; user: { id: string; email: string } }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(res.token, res.user);
      nav("/quiz");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md mt-16 p-6 rounded-2xl bg-card shadow-card">
        <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
        <p className="text-white/70 mb-6">Log in to continue your career journey.</p>
        <form onSubmit={onSubmit} className="space-y-4">
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
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-white/70">
          New here? <Link to="/register" className="text-primary">Create an account</Link>
        </p>
      </div>
    </Layout>
  );
}
