import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/quiz", label: "Quiz" },
  { to: "/results", label: "Results" },
  { to: "/career-pack", label: "Career Pack" },
  { to: "/jd-analyzer", label: "JD Analyzer" },
  { to: "/testimonials", label: "Testimonials" },
];

export default function Header() {
  const { user, token, logout } = useAuth();
  const navr = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-[rgba(10,12,20,0.35)]/60 border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary shadow-card grid place-items-center text-primary-foreground font-black">Q</div>
          <span className="font-semibold text-white">CareerQ</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  "text-sm text-white/80 hover:text-white transition-colors",
                  isActive && "text-white"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className="text-white/80 hover:text-white text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Sign up</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="text-white/80 text-sm hover:underline">{user?.email}</Link>
              <button onClick={() => { logout(); navr('/'); }} className="inline-flex items-center rounded-lg px-3 py-2 bg-secondary text-white text-sm">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
