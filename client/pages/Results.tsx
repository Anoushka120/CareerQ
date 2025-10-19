import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";
import QuizRadarChart from "@/components/QuizRadarChart";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type Job = { id: string; title: string; company: string; location: string; url: string };

type Result = { scores: { skill: string; score: number }[]; topTracks: string[] } | null;

export default function Results() {
  const { token } = useAuth();
  const nav = useNavigate();

  // do not auto-redirect to register here; show contextual CTA below
  useEffect(() => {
    // noop
  }, [token]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [result, setResult] = useState<Result>(null);

  useEffect(() => {
    const last = localStorage.getItem("last_quiz_result");
    if (last) setResult(JSON.parse(last));
    api<{ jobs: Job[] }>("/api/jobs").then((d) => setJobs(d.jobs));
  }, []);

  return (
    <Layout>
      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-card border border-border p-6">
            <h1 className="text-white text-2xl font-semibold mb-4">Your Results</h1>
            {result ? (
              <>
                <QuizRadarChart data={result.scores} />
                <div className="mt-6 text-white">
                  <h3 className="font-semibold mb-2">Top 3 Tracks</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.topTracks.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-secondary text-white">{t}</span>
                    ))}
                  </div>

                  {/* Track-specific resources */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Recommended Resources by Track</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.topTracks.map((track) => {
                        const resourcesMap: Record<string, { name: string; url: string }[]> = {
                          "Data Analyst": [
                            { name: "Kaggle", url: "https://www.kaggle.com" },
                            { name: "Analytics Vidhya", url: "https://www.analyticsvidhya.com" },
                            { name: "DataJobs", url: "https://datajobs.com" },
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                          ],
                          "Engineer / Maker": [
                            { name: "Wellfound (AngelList)", url: "https://wellfound.com" },
                            { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs" },
                            { name: "GitHub Jobs Archive", url: "https://jobs.github.com" },
                            { name: "RemoteOK", url: "https://remoteok.com" },
                            { name: "Hacker News (Who is hiring?)", url: "https://news.ycombinator.com/jobs" },
                            { name: "Product Hunt Jobs", url: "https://www.producthunt.com/jobs" },
                          ],
                          "Team Leader": [
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                            { name: "The Muse", url: "https://www.themuse.com/jobs" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                            { name: "LinkedIn Learning (upskilling)", url: "https://www.linkedin.com/learning" },
                          ],
                          "Operations / PM": [
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Mind the Product Jobs", url: "https://jobs.mindtheproduct.com" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                            { name: "Product Hunt Jobs", url: "https://www.producthunt.com/jobs" },
                          ],
                          "Creative / Design": [
                            { name: "Dribbble Jobs", url: "https://dribbble.com/jobs" },
                            { name: "Behance JobList", url: "https://www.behance.net/joblist" },
                            { name: "AIGA Design Jobs", url: "https://www.aiga.org/careers" },
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                          ],
                          "People / HR": [
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "SHRM Career Center", url: "https://jobs.shrm.org" },
                            { name: "Workable", url: "https://www.workable.com" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                          ],
                          "Business / Product": [
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                            { name: "AngelList", url: "https://angel.co/jobs" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                            { name: "Product Hunt Jobs", url: "https://www.producthunt.com/jobs" },
                          ],
                          "Research / Data": [
                            { name: "Kaggle", url: "https://www.kaggle.com" },
                            { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                            { name: "Indeed", url: "https://www.indeed.com" },
                            { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                            { name: "ResearchGate Jobs", url: "https://www.researchgate.net/jobs" },
                            { name: "Wellfound", url: "https://wellfound.com" },
                          ],
                        };
                        const resources = resourcesMap[track] || [
                          { name: "LinkedIn", url: "https://www.linkedin.com/jobs" },
                          { name: "Indeed", url: "https://www.indeed.com" },
                          { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm" },
                          { name: "Wellfound", url: "https://wellfound.com" },
                          { name: "RemoteOK", url: "https://remoteok.com" },
                        ];

                        return (
                          <div key={track} className="rounded-lg p-4 bg-[var(--input-background)] border border-border">
                            <h4 className="text-white font-medium mb-2">{track}</h4>
                            <ul className="text-sm space-y-1">
                              {resources.map((r) => (
                                <li key={r.url}><a href={r.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{r.name}</a></li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-white/70">You need to complete the quiz to view personalized results.</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button onClick={() => nav(token ? "/quiz" : "/register")} className="rounded-lg bg-primary text-primary-foreground px-5 py-2">{token ? 'Take Quiz' : 'Register & Take Quiz'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <aside className="rounded-2xl bg-card border border-border p-6">
          <h2 className="text-white text-xl font-semibold mb-4">Job Openings</h2>
          <ul className="space-y-4">
            {jobs.map((j) => (
              <li key={j.id} className="p-4 rounded-lg bg-[var(--input-background)] border border-border">
                <a href={j.url} className="text-primary hover:underline" target="_blank" rel="noreferrer">{j.title}</a>
                <p className="text-white/80">{j.company} · {j.location}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <h3 className="text-white font-semibold mb-2">Job Resources</h3>
            <p className="text-white/70 text-sm mb-3">Places to search and apply for roles:</p>
            <ul className="space-y-3 text-sm">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/jobs", desc: "Professional networking and job listings across industries." },
                { name: "Indeed", url: "https://www.indeed.com", desc: "Large job aggregator with company reviews and salary insights." },
                { name: "Glassdoor", url: "https://www.glassdoor.com/Job/index.htm", desc: "Company reviews, salary data, and job listings." },
                { name: "AngelList / Wellfound", url: "https://wellfound.com", desc: "Startup jobs and early-stage company roles." },
                { name: "Stack Overflow Jobs", url: "https://stackoverflow.com/jobs", desc: "Developer-focused job listings and company tech profiles." },
                { name: "RemoteOK", url: "https://remoteok.com", desc: "Remote-first job listings across tech and product roles." },
              ].map((r) => (
                <li key={r.name} className="flex flex-col">
                  <a href={r.url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">{r.name}</a>
                  <span className="text-white/70">{r.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
