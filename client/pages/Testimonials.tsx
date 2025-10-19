import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";

type Testimonial = { id: string; name: string; message: string; rating?: number; photoUrl?: string };

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    api<{ testimonials: Testimonial[] }>("/api/testimonials").then((d) => setItems(d.testimonials));
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = await api<Testimonial>("/api/testimonials", { method: "POST", body: JSON.stringify({ name, message, rating }) });
    setItems((s) => [t, ...s]);
    setName("");
    setMessage("");
    setRating(5);
  };

  return (
    <Layout>
      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-white text-2xl font-semibold">Testimonials</h1>
          <ul className="grid sm:grid-cols-2 gap-4">
            {items.map((i) => (
              <li key={i.id} className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                    <img src={i.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(i.name)}&background=1a1f3a&color=fff&size=128`} alt={i.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90">“{i.message}”</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-white/70">— {i.name}</p>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={idx < (i.rating || 5) ? "currentColor" : "none"} stroke="currentColor" className={`w-4 h-4 ${idx < (i.rating || 5) ? '' : 'text-white/40'}`}><path d="M9.049 2.927C9.349 2.02 10.651 2.02 10.951 2.927l.708 2.38a1 1 0 00.95.69h2.5c.969 0 1.371 1.24.588 1.81l-2.023 1.42a1 1 0 00-.364 1.118l.708 2.381c.3.907-.755 1.664-1.539 1.094l-2.023-1.42a1 1 0 00-1.175 0l-2.023 1.42c-.784.57-1.838-.187-1.539-1.094l.708-2.381a1 1 0 00-.364-1.118L2.303 7.807C1.52 7.237 1.921 6 2.89 6h2.5a1 1 0 00.95-.69l.708-2.38z"/></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-2xl bg-card border border-border p-6 h-fit">
          <h2 className="text-white font-semibold mb-3">Add Testimonial</h2>
          <form onSubmit={add} className="space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your story" rows={5} className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" />
            <div>
              <label className="block mb-2 text-white">Rating</label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button type="button" key={i} onClick={() => setRating(i+1)} className={`px-3 py-1 rounded-lg ${rating >= i+1 ? 'bg-yellow-400 text-black' : 'bg-[var(--input-background)] text-white'}`}>{i+1}★</button>
                ))}
              </div>
            </div>
            <button className="w-full rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground py-2">Submit</button>
          </form>
        </aside>
      </div>
    </Layout>
  );
}
