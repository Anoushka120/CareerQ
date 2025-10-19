import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { api } from "@/lib/api";
import QuizRadarChart from "@/components/QuizRadarChart";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type Question = { id: string; text: string; options: { id: string; label: string; weight: number; skill: string }[] };

type SubmitResp = { scores: { skill: string; score: number }[]; topTracks: string[] };

export default function Quiz() {
  const { token } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!token) nav("/register");
  }, [token]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SubmitResp | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    api<{ questions: Question[] }>("/api/quiz/questions").then((d) => setQuestions(d.questions));
  }, [token]);

  const answeredAll = useMemo(() => questions.length > 0 && Object.keys(answers).length === questions.length, [answers, questions]);

  const submit = async () => {
    setLoading(true);
    try {
      const payload = { answers };
      const res = await api<SubmitResp>("/api/quiz/submit", { method: "POST", body: JSON.stringify(payload) });
      setResult(res);
      localStorage.setItem("last_quiz_result", JSON.stringify(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mt-10 grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h1 className="text-white text-2xl font-semibold">Career Fit Quiz</h1>
          <p className="text-white/70">Answer a few quick questions to map your strengths.</p>

          {!token && <p className="text-destructive mt-4">You must register or login to take the quiz.</p>}

          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="rounded-xl bg-card p-4 border border-border">
                <p className="text-white mb-3">{q.text}</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {q.options.map((o) => (
                    <label key={o.id} className={`cursor-pointer rounded-lg px-3 py-2 border ${answers[q.id] === o.id ? "border-primary bg-[var(--input-background)]" : "border-border bg-[var(--input-background)]"}`}>
                      <input
                        type="radio"
                        name={q.id}
                        value={o.id}
                        className="mr-2"
                        onChange={() => setAnswers((s) => ({ ...s, [q.id]: o.id }))}
                        checked={answers[q.id] === o.id}
                      />
                      <span className="text-white/90">{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={!answeredAll || loading}
            onClick={submit}
            className="inline-flex items-center rounded-xl px-5 py-3 bg-primary hover:bg-primary-hover text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Calculating..." : "Submit & Generate Profile"}
          </button>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6">
          <h2 className="text-white text-xl font-semibold mb-2">Your Skill Map</h2>
          {result ? (
            <QuizRadarChart data={result.scores} />
          ) : (
            <p className="text-white/70">Complete the quiz to visualize your skills.</p>
          )}
          {result && (
            <div className="mt-6 text-white/90">
              <h3 className="font-semibold mb-2">Top Tracks</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.topTracks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
