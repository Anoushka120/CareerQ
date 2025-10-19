import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import QuizRadarChart from "@/components/QuizRadarChart";

export default function CareerPack() {
  const [tab, setTab] = useState<"skills" | "projects" | "resources">("skills");
  const result = useMemo(() => {
    const last = localStorage.getItem("last_quiz_result");
    return last ? JSON.parse(last) as { scores: { skill: string; score: number }[]; topTracks: string[] } : null;
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [tab]);

  return (
    <Layout>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-white text-3xl font-extrabold">Career Pack</h1>
            <p className="text-white/70 mt-2">Curated skill map, project templates, and learning resources to help you land your next role.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab("skills")} className={`px-4 py-2 rounded-lg ${tab === "skills" ? "bg-primary text-primary-foreground" : "bg-secondary text-white"}`}>Skill Map</button>
            <button onClick={() => setTab("projects")} className={`px-4 py-2 rounded-lg ${tab === "projects" ? "bg-primary text-primary-foreground" : "bg-secondary text-white"}`}>Projects</button>
            <button onClick={() => setTab("resources")} className={`px-4 py-2 rounded-lg ${tab === "resources" ? "bg-primary text-primary-foreground" : "bg-secondary text-white"}`}>Resources</button>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {tab === "skills" && (
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="text-xl text-white font-semibold mb-4">Personalized Skill Map</h2>
                {result ? (
                  <QuizRadarChart data={result.scores} />
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-white/70">Take the quiz to generate your skill map.</p>
                  </div>
                )}
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {result?.scores.map((s: any) => (
                    <div key={s.skill} className="rounded-lg p-3 bg-[var(--input-background)] border border-border">
                      <div className="flex items-center justify-between text-white">
                        <strong>{s.skill}</strong>
                        <span className="text-white/80">{s.score}%</span>
                      </div>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-2 bg-primary" style={{ width: `${s.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "projects" && (
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="text-xl text-white font-semibold mb-4">Project Ideas & Templates</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ProjectCard title="Portfolio App" desc="Build a deployable portfolio showcasing projects, tests, and CI." tags={["react", "vite", "deploy"]} />
                  <ProjectCard title="API + Dashboard" desc="Create an API with auth and a dashboard to visualize data." tags={["node", "express", "postgres"]} />
                  <ProjectCard title="E-commerce Clone" desc="Implement product CRUD, cart, and checkout flows." tags={["react", "stripe", "testing"]} />
                  <ProjectCard title="Data ETL Pipeline" desc="Ingest CSVs, process and visualize insights." tags={["python", "sql", "etl"]} />
                </div>
              </div>
            )}

            {tab === "resources" && (
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="text-xl text-white font-semibold mb-4">Curated Resources</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <ResourceCard title="Roadmap.sh" desc="Guided learning paths for multiple careers." url="https://roadmap.sh" />
                  <ResourceCard title="MDN" desc="Comprehensive web docs and examples." url="https://developer.mozilla.org" />
                  <ResourceCard title="Frontend Mentor" desc="Real-world frontend challenges to practice." url="https://frontendmentor.io" />
                  <ResourceCard title="System Design Basics" desc="Introductory materials to system design." url="#" />
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-2xl bg-gradient-to-b from-white/5 to-white/3 border border-border p-6 backdrop-blur-sm">
            <h3 className="text-white font-semibold">Why Career Pack?</h3>
            <p className="text-white/70 mt-2">Combines your skill strengths with practical projects and resources to build a strong portfolio and prepare for interviews.</p>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-[var(--input-background)] border border-border">
                <strong className="text-white">Mentorship</strong>
                <p className="text-white/70 text-sm">Guidance on project scope and interviews.</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--input-background)] border border-border">
                <strong className="text-white">Portfolio-ready</strong>
                <p className="text-white/70 text-sm">Projects designed to showcase job-ready skills.</p>
              </div>
              <div className="p-3 rounded-lg bg-[var(--input-background)] border border-border">
                <strong className="text-white">Interview Prep</strong>
                <p className="text-white/70 text-sm">Resources & tips to ace interviews.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function ProjectCard({ title, desc, tags }: { title: string; desc: string; tags: string[] }) {
  return (
    <div className="rounded-lg bg-[var(--input-background)] border border-border p-4">
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-white/80 mt-2">{desc}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded-full bg-secondary text-white">{t}</span>
        ))}
      </div>
    </div>
  );
}

function ResourceCard({ title, desc, url }: { title: string; desc: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="block rounded-lg bg-[var(--input-background)] border border-border p-4">
      <h4 className="text-white font-semibold">{title}</h4>
      <p className="text-white/80 mt-2">{desc}</p>
    </a>
  );
}
