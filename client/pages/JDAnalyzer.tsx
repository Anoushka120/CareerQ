import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SKILL_LIST = [
  "react", "typescript", "javascript", "js", "node", "express", "sql", "postgres", "postgresql", "git", "testing", "jest", "vitest", "docker", "kubernetes", "k8s", "aws", "gcp", "azure", "html", "css", "tailwind", "design", "redux", "graphql", "python", "django", "flask", "java", "spring", "c#", "cpp", "rust",
  // data & algorithms related
  "data structures", "data structure", "datastructures", "algorithms", "algorithm", "binary tree", "binary trees", "binarytree", "binarytrees", "graph", "graphs", "dynamic programming", "dp", "dsa", "coding interview", "coding questions", "system design", "data"
];

function normalizeToken(t: string) {
  const lower = t.toLowerCase().replace(/^\.+|\.+$/g, "");
  if (!lower) return lower;
  if (lower === "js") return "javascript";
  if (lower === "ts") return "typescript";
  if (lower === "k8s") return "kubernetes";
  if (lower === "postgresql") return "postgres";
  if (lower === "c++") return "cpp";
  if (lower === "structutre") return "structure";
  return lower.replace(/[^a-z0-9 ]/g, "");
}

function levenshtein(a: string, b: string) {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[a.length][b.length];
}

function buildNgrams(tokens: string[]) {
  const out = new Set<string>();
  for (let n = 1; n <= 3; n++) {
    for (let i = 0; i + n <= tokens.length; i++) {
      const gram = tokens.slice(i, i + n).join(" ");
      out.add(gram);
    }
  }
  return out;
}

function highlight(text: string, missing: string[]) {
  const tokens = text.split(/(\W+)/);
  return tokens.map((t, i) => {
    const isWord = /\w+/.test(t);
    if (!isWord) return <span key={i}>{t}</span>;
    const lower = normalizeToken(t);
    const miss = missing.some((m) => m.includes(lower) || lower.includes(m));
    return (
      <span key={i} className={miss ? "underline decoration-wavy decoration-destructive text-destructive" : ""}>{t}</span>
    );
  });
}

export default function JDAnalyzer() {
  const { token } = useAuth();
  const nav = useNavigate();

  const [jd, setJd] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const userSkills = React.useMemo(() => skills.split(/,|\n/).map(s => normalizeToken(s.trim())).filter(Boolean), [skills]);
  const [analyzedMissing, setAnalyzedMissing] = React.useState<string[]>([]);
  const [analyzedPresent, setAnalyzedPresent] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);

  const tokens = React.useMemo(() => (jd.match(/[a-zA-Z+#.\-]+/g) || []).map(normalizeToken), [jd]);

  function analyze() {
    setMessage(null);
    const user = userSkills;
    if (!jd.trim()) {
      setMessage("Please paste a job description to analyze.");
      setAnalyzedMissing([]);
      setAnalyzedPresent([]);
      return;
    }

    const ngrams = buildNgrams(tokens);
    const found: string[] = [];

    for (const skill of SKILL_LIST) {
      const s = normalizeToken(skill);
      if (ngrams.has(s)) {
        found.push(s);
        continue;
      }
      for (const g of ngrams) {
        const dist = levenshtein(s, g);
        if (dist <= 1 || g.includes(s) || s.includes(g)) {
          found.push(s);
          break;
        }
      }
    }

    const uniqueFound = Array.from(new Set(found));
    const missingNow = uniqueFound.filter((s) => !user.includes(s));

    const subskillsMap: Record<string, string[]> = {
      "data structure": ["binary trees", "graphs", "algorithms", "coding questions"],
      "data structures": ["binary trees", "graphs", "algorithms", "coding questions"],
      "algorithms": ["dynamic programming", "graph algorithms"],
      "system design": ["scalability", "distributed systems"]
    };

    const augmented: string[] = [...missingNow];
    for (const m of missingNow) {
      const subs = subskillsMap[m];
      if (subs) {
        for (const s of subs) {
          const n = normalizeToken(s);
          if (!user.includes(n) && !augmented.includes(n)) augmented.push(n);
        }
      }
    }

    setAnalyzedPresent(uniqueFound);
    setAnalyzedMissing(augmented);
    if (augmented.length === 0) setMessage("No missing skills detected based on our list. Nice match!");
  }

  const topTracks = React.useMemo(() => {
    try {
      const last = localStorage.getItem("last_quiz_result");
      if (!last) return [];
      const parsed = JSON.parse(last) as { topTracks?: string[] };
      return parsed.topTracks || [];
    } catch {
      return [];
    }
  }, []);

  // auth guard: require login to use analyzer
  if (!token) {
    return (
      <Layout>
        <div className="mt-20 grid place-items-center">
          <div className="rounded-2xl bg-card border border-border p-8 max-w-xl text-center">
            <h2 className="text-white text-xl font-semibold mb-3">Please login to access JD Analyzer</h2>
            <p className="text-white/70 mb-6">JD Analyzer requires an account so we can match results to your profile.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => nav('/login')} className="btn-primary">Login</button>
              <button onClick={() => nav('/register')} className="btn-ghost">Create account</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <h1 className="text-white text-2xl font-semibold">JD Analyzer</h1>
          <p className="text-white/70">Paste a Job Description. We'll highlight skills you might be missing, based on your skills.</p>
          <label className="block text-white">Your skills (comma separated)</label>
          <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="react, typescript, sql" className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" />
          <label className="block text-white">Job Description</label>
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={12} className="w-full rounded-lg bg-[var(--input-background)] border border-border px-3 py-2 text-white" placeholder="Paste JD here..." />
          <div className="flex gap-3">
            <button onClick={analyze} className="rounded-lg bg-primary text-primary-foreground px-4 py-2">Analyze</button>
            <button onClick={() => { setJd(''); setSkills(''); setAnalyzedMissing([]); setAnalyzedPresent([]); setMessage(null); }} className="rounded-lg bg-secondary text-white px-4 py-2">Clear</button>
          </div>
          {message && <div className="mt-3 text-sm text-white/70">{message}</div>}
        </div>
        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="text-white font-semibold mb-3">Missing from your skills</h2>
          {analyzedMissing.length ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {analyzedMissing.map(m => <span key={m} className="px-3 py-1 rounded-full bg-destructive/20 text-destructive border border-destructive/50">{m}</span>)}
            </div>
          ) : (
            <p className="text-white/70 mb-4">No analysis yet. Paste a JD and click Analyze.</p>
          )}

          {analyzedMissing.length > 0 && (
            <div className="mb-4">
              <h3 className="text-white font-semibold mb-2">How this complements your strengths</h3>
              {topTracks.length ? (
                <ul className="list-disc list-inside text-white/80">
                  {analyzedMissing.map(m => (
                    <li key={m}><strong>{m}</strong> — Learning <em>{m}</em> pairs well with your strengths in <strong>{topTracks.slice(0,3).join(', ')}</strong>. Consider adding a small project combining them.</li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/70">No quiz data found. <a href="/register" className="text-primary underline">Register and take the quiz</a> to get personalized complements based on your top tracks.</p>
              )}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="leading-7">{highlight(jd || "Paste JD to analyze...", analyzedMissing)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
