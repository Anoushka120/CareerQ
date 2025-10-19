import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { id: string; email: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (token: string, user: { id: string; email: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const u = localStorage.getItem("auth_user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
  }, []);

  const login = (t: string, u: { id: string; email: string }) => {
    setToken(t);
    setUser(u);
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    // clear quiz/result related data so next user starts fresh
    localStorage.removeItem("last_quiz_result");
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
