import { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const [reviews, setReviews] = useState<any[]>([]);
  const nav = useNavigate();
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const d = await api<{ testimonials: any[] }>("/api/testimonials");
      setReviews(d.testimonials || []);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Layout>
      <div className="relative overflow-hidden py-20">
        <div className="absolute -left-32 -top-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute -right-32 -bottom-10 w-96 h-96 rounded-full bg-gradient-to-tr from-accent/30 to-primary/40 blur-3xl opacity-25 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-12">
            <div className="md:max-w-2xl">
              <h1 className="hero-title">CareerQ — Your Guided Career Companion</h1>
              <p className="hero-sub mt-4">CareerQ helps you discover your strengths, build a practical project portfolio, and prepare for real job opportunities. Complete a short quiz to generate a personalized skill map, curated projects, and resource pack tailored to the top tracks suited for you.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => ((token || localStorage.getItem("auth_token")) ? nav("/quiz") : nav("/register"))} className="btn-primary rounded-full font-semibold inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M2 12h20" /></svg>
                  Start the Quiz
                </button>
                <a onClick={() => reviewsRef.current?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer inline-flex items-center rounded-full bg-secondary text-white px-5 py-3 border border-border">See Reviews</a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-card p-6 border border-border card-hover shadow-card"><p className="text-3xl font-bold text-white">10k+</p><p className="text-white/70 mt-1">Assessments</p></div>
                <div className="rounded-xl bg-card p-6 border border-border card-hover shadow-card"><p className="text-3xl font-bold text-white">92%</p><p className="text-white/70 mt-1">Job-ready</p></div>
                <div className="rounded-xl bg-card p-6 border border-border card-hover shadow-card"><p className="text-3xl font-bold text-white">4.9★</p><p className="text-white/70 mt-1">Community Rating</p></div>
              </div>
            </div>

            <div className="hidden md:block rounded-2xl bg-card border border-border p-6 w-[380px]">
              <div className="aspect-[4/3] rounded-xl bg-[var(--input-background)] grid place-items-center text-white/70 overflow-hidden">
                <ImageWithFallback src={"https://cdn.builder.io/api/v1/image/assets%2Fad24a74f1f2f440db2c333ac8ed84b91%2F60cd66b77471431b9afe0497c10710b4?format=webp&width=800"} alt="Your personalized profile" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-card border border-border p-6 shadow-card overflow-hidden">
            <div className="relative w-full h-56 md:h-64 rounded-lg overflow-hidden">
              <ImageWithFallback src={"https://cdn.builder.io/api/v1/image/assets%2Fad24a74f1f2f440db2c333ac8ed84b91%2F5c01f94e9e124041932d41c2f13a1afc?format=webp&width=1200"} alt="Community success" className="w-full h-full object-cover" />
              <div className="absolute left-6 bottom-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-md">
                <h3 className="text-white font-semibold">Community Success Stories</h3>
                <p className="text-white/80 text-sm">Join thousands of learners who launched their careers with hands-on projects and mentorship.</p>
              </div>
            </div>
          </div>

          <div ref={reviewsRef} className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Learner Reviews</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">{Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M9.049 2.927C9.349 2.02 10.651 2.02 10.951 2.927l.708 2.38a1 1 0 00.95.69h2.5c.969 0 1.371 1.24.588 1.81l-2.023 1.42a1 1 0 00-.364 1.118l.708 2.381c.3.907-.755 1.664-1.539 1.094l-2.023-1.42a1 1 0 00-1.175 0l-2.023 1.42c-.784.57-1.838-.187-1.539-1.094l.708-2.381a1 1 0 00-.364-1.118L2.303 7.807C1.52 7.237 1.921 6 2.89 6h2.5a1 1 0 00.95-.69l.708-2.38z"/></svg>
                ))}</div>
                <div className="text-white/90 font-semibold">{(reviews.reduce((s, r) => s + (r.rating || 5), 0) / Math.max(1, reviews.length)).toFixed(1)} <span className="text-white/60 text-sm">/ 5</span></div>
                <div className="text-white/60 text-sm">({reviews.length} reviews)</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.length ? reviews.map((r) => (
                <div key={r.id} className="rounded-2xl bg-card border border-border p-5 shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                      <ImageWithFallback src={r.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=1a1f3a&color=fff&size=128`} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{r.name}</h3>
                      <div className="text-sm text-white/70">{new Date(parseInt(r.id || '0')).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex text-yellow-400">{Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={i < (r.rating || 5) ? "currentColor" : "none"} stroke="currentColor" className={`w-4 h-4 ${i < (r.rating || 5) ? '' : 'text-white/40'}`}><path d="M9.049 2.927C9.349 2.02 10.651 2.02 10.951 2.927l.708 2.38a1 1 0 00.95.69h2.5c.969 0 1.371 1.24.588 1.81l-2.023 1.42a1 1 0 00-.364 1.118l.708 2.381c.3.907-.755 1.664-1.539 1.094l-2.023-1.42a1 1 0 00-1.175 0l-2.023 1.42c-.784.57-1.838-.187-1.539-1.094l.708-2.381a1 1 0 00-.364-1.118L2.303 7.807C1.52 7.237 1.921 6 2.89 6h2.5a1 1 0 00.95-.69l.708-2.38z"/></svg>
                    ))}</div>
                    <div className="text-white/80 text-sm">{(r.rating || 5).toFixed(1)}</div>
                  </div>
                  <p className="mt-4 text-white/80 leading-relaxed">"{r.message}"</p>
                </div>
              )) : (
                <div className="rounded-2xl bg-card border border-border p-6"> <p className="text-white/70">No reviews yet — be the first to share your experience.</p> </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
