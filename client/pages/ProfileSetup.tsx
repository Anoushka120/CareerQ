import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [fullName, setFullName] = useState(user?.email.split('@')[0] || "");
  const [address, setAddress] = useState("");
  const [interests, setInterests] = useState("");
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoData(String(reader.result));
    reader.readAsDataURL(f);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api("/api/auth/profile", { method: "PUT", body: JSON.stringify({ name: fullName, address, interests: interests.split(/,|\n/).map(s => s.trim()).filter(Boolean), photo: photoData }) });
      nav("/career-pack");
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-xl mt-12 p-6 rounded-2xl bg-card shadow-card">
        <h1 className="text-2xl font-semibold text-white mb-2">Complete your profile</h1>
        <p className="text-white/70 mb-6">Provide a few more details to personalize your experience.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-2 text-white">Full name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block mb-2 text-white">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block mb-2 text-white">Areas of interest (comma separated)</label>
            <input value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" placeholder="react, backend, data science" />
          </div>
          <div>
            <label className="block mb-2 text-white">Profile photo (optional)</label>
            <input type="file" accept="image/*" onChange={handleFile} className="text-sm text-white" />
            {photoData && <img src={photoData} alt="preview" className="mt-3 w-24 h-24 rounded-full object-cover" />}
          </div>
          {error && <div className="text-destructive">{error}</div>}
          <div className="flex gap-3">
            <button disabled={loading} className="btn-primary">{loading ? 'Saving...' : 'Save & Continue'}</button>
            <button type="button" onClick={() => nav('/career-pack')} className="btn-ghost">Skip</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
