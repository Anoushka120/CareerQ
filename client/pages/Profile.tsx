import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    api<{ profile: any }>("/api/auth/profile").then((d) => setProfile(d.profile)).catch(() => setProfile(null));
  }, [token]);

  if (!token) return (
    <Layout>
      <div className="mt-20 grid place-items-center">
        <div className="rounded-2xl bg-card p-8 text-center">
          <h2 className="text-white text-xl font-semibold">Please login to view your profile</h2>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mt-10 max-w-3xl mx-auto rounded-2xl bg-card border border-border p-6">
        <h1 className="text-2xl text-white font-semibold">My Profile</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            {profile?.photo ? (
              <img src={profile.photo} alt="avatar" className="w-36 h-36 rounded-full object-cover" />
            ) : (
              <div className="w-36 h-36 rounded-full bg-[var(--input-background)] grid place-items-center text-white/70">No photo</div>
            )}
            <p className="mt-3 text-white/80">{profile?.name || user?.email}</p>
            <p className="text-sm text-white/60">{user?.email}</p>
          </div>
          <div className="md:col-span-2">
            <div className="mb-4">
              <h3 className="text-white font-semibold">About</h3>
              <p className="text-white/70 mt-2">{profile?.address || '—'}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Interests</h3>
              <div className="mt-2 flex gap-2 flex-wrap">
                {Array.isArray(profile?.interests) && profile.interests.length ? profile.interests.map((i: string) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-secondary text-white">{i}</span>
                )) : <span className="text-white/70">No interests set.</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
