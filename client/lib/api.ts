type Method = "GET" | "POST" | "PUT" | "DELETE";

function delay(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}

// In-memory mock data (frontend-only)
const JOBS = [
  { id: "1", title: "Frontend Engineer", company: "Acme", location: "Remote", url: "https://example.com/job/1" },
  { id: "2", title: "Backend Engineer", company: "Beta", location: "NYC", url: "https://example.com/job/2" },
  { id: "3", title: "Data Analyst", company: "Gamma", location: "SF", url: "https://example.com/job/3" },
  { id: "4", title: "Fullstack Developer", company: "Delta", location: "Remote", url: "https://example.com/job/4" },
  { id: "5", title: "Machine Learning Engineer", company: "Epsilon", location: "Boston", url: "https://example.com/job/5" },
  { id: "6", title: "DevOps Engineer", company: "Zeta", location: "Austin", url: "https://example.com/job/6" },
  { id: "7", title: "Product Engineer", company: "Theta", location: "Seattle", url: "https://example.com/job/7" },
  { id: "8", title: "Data Engineer", company: "Iota", location: "Remote", url: "https://example.com/job/8" },
  { id: "9", title: "UI/UX Engineer", company: "Kappa", location: "LA", url: "https://example.com/job/9" },
  { id: "10", title: "QA Engineer", company: "Lambda", location: "Chicago", url: "https://example.com/job/10" },
];

let TESTIMONIALS = [
  { id: "t1", name: "Sam", message: "This helped me get a job!", photoUrl: "", rating: 5 },
  { id: "t2", name: "Priya", message: "Great roadmap and projects.", photoUrl: "", rating: 4 },
];

let AUTH_USER: { id: string; email: string; name?: string } | null = null;
let AUTH_TOKEN: string | null = null;

// Quiz questions constant (10 questions as provided)
const QUIZ_QUESTIONS = [
  {
    id: "q1",
    text: "On a team project, you naturally become the person who:",
    options: [
      { id: "a", label: "Takes the lead, delegates tasks, and presents the final work.", weight: 1, skill: "leadership" },
      { id: "b", label: "Organizes the schedule and keeps all the files and data in perfect order.", weight: 1, skill: "organization" },
      { id: "c", label: "Comes up with the original, creative vision for the project.", weight: 1, skill: "creative" },
      { id: "d", label: "Makes sure everyone feels included and works well together.", weight: 1, skill: "people" },
    ],
  },
  {
    id: "q2",
    text: "Which of these weekend activities sounds most appealing to you?",
    options: [
      { id: "a", label: "Building a piece of furniture or fixing a complex gadget.", weight: 1, skill: "hands_on" },
      { id: "b", label: "Researching a topic you're curious about just for the sake of knowing more.", weight: 1, skill: "research" },
      { id: "c", label: "Starting a small online side-hustle or business.", weight: 1, skill: "business" },
      { id: "d", label: "Designing a poster for a local community event.", weight: 1, skill: "creative" },
    ],
  },
  {
    id: "q3",
    text: "When you face a difficult problem, your first instinct is to:",
    options: [
      { id: "a", label: "Analyze all the available data to find a logical, evidence-based solution.", weight: 1, skill: "analysis" },
      { id: "b", label: "Brainstorm an unconventional solution that no one else has thought of.", weight: 1, skill: "creative" },
      { id: "c", label: "Talk it through with others to get different perspectives and build consensus.", weight: 1, skill: "people" },
      { id: "d", label: "Follow a reliable, step-by-step process that has worked in the past.", weight: 1, skill: "organization" },
    ],
  },
  {
    id: "q4",
    text: "You would feel most energized working in:",
    options: [
      { id: "a", label: "A workshop, a science lab, or outdoors.", weight: 1, skill: "hands_on" },
      { id: "b", label: "A fast-paced, competitive office focused on achieving business targets.", weight: 1, skill: "business" },
      { id: "c", label: "A collaborative environment like a school, hospital, or non-profit.", weight: 1, skill: "people" },
      { id: "d", label: "A quiet, structured setting like a library or data-focused office.", weight: 1, skill: "analysis" },
    ],
  },
  {
    id: "q5",
    text: "What brings you the most professional satisfaction?",
    options: [
      { id: "a", label: "Knowing you have helped someone directly with their problems.", weight: 1, skill: "people" },
      { id: "b", label: "Creating a perfect, error-free spreadsheet or a highly organized system.", weight: 1, skill: "organization" },
      { id: "c", label: "Seeing a tangible result that you built with your own hands.", weight: 1, skill: "hands_on" },
      { id: "d", label: "Successfully leading a team to surpass its goals.", weight: 1, skill: "leadership" },
    ],
  },
  {
    id: "q6",
    text: "You are asked to learn a new software tool. You would prefer to:",
    options: [
      { id: "a", label: "Read the official documentation thoroughly to understand how it works.", weight: 1, skill: "research" },
      { id: "b", label: "Immediately start a personal project and learn by experimenting with features.", weight: 1, skill: "hands_on" },
      { id: "c", label: "Participate in a group workshop where you can learn with others.", weight: 1, skill: "people" },
      { id: "d", label: "Follow a structured, official training module from start to finish.", weight: 1, skill: "organization" },
    ],
  },
  {
    id: "q7",
    text: "Which of these book titles would you be most likely to read?",
    options: [
      { id: "a", label: "The Art of Negotiation: How to Close Any Deal", weight: 1, skill: "business" },
      { id: "b", label: "A Guide to DIY Home Repair", weight: 1, skill: "hands_on" },
      { id: "c", label: "The Psychology of Teamwork", weight: 1, skill: "people" },
      { id: "d", label: "The Hidden Patterns: An Introduction to Data Analysis", weight: 1, skill: "analysis" },
    ],
  },
  {
    id: "q8",
    text: "You are most proud of your ability to:",
    options: [
      { id: "a", label: "Empathize with others and provide support.", weight: 1, skill: "people" },
      { id: "b", label: "Negotiate effectively and close a deal.", weight: 1, skill: "business" },
      { id: "c", label: "Pay close attention to every detail to ensure accuracy and quality.", weight: 1, skill: "organization" },
      { id: "d", label: "Think critically to solve complex, abstract puzzles.", weight: 1, skill: "analysis" },
    ],
  },
  {
    id: "q9",
    text: "If you had one month to work on a single task, you would choose to:",
    options: [
      { id: "a", label: "Analyze a large dataset to find hidden market trends.", weight: 1, skill: "analysis" },
      { id: "b", label: "Develop a wellness program and train new employees.", weight: 1, skill: "people" },
      { id: "c", label: "Build a functional prototype of a new physical product.", weight: 1, skill: "hands_on" },
      { id: "d", label: "Audit a company's finances to ensure everything is compliant.", weight: 1, skill: "business" },
    ],
  },
  {
    id: "q10",
    text: "Your ultimate long-term career goal is to:",
    options: [
      { id: "a", label: "Invent something or make a discovery that changes your field.", weight: 1, skill: "creative" },
      { id: "b", label: "Create a famous piece of work, like a novel or an iconic design.", weight: 1, skill: "creative" },
      { id: "c", label: "Build and lead your own successful company.", weight: 1, skill: "leadership" },
      { id: "d", label: "Master a practical, hands-on skill or trade.", weight: 1, skill: "hands_on" },
    ],
  },
];

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  await delay(150); // simulate network

  const method = ((options?.method as Method) || "GET") as Method;

  // Only handle frontend mock routes under /api
  if (!url.startsWith("/api")) {
    // fallback to real fetch for external URLs
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as T;
  }

  // Simple router
  try {
    // GET /api/jobs
    if (url === "/api/jobs" && method === "GET") {
      return { jobs: JOBS } as unknown as T;
    }

    // GET /api/testimonials
    if (url === "/api/testimonials" && method === "GET") {
      return { testimonials: TESTIMONIALS } as unknown as T;
    }

    // POST /api/testimonials
    if (url === "/api/testimonials" && method === "POST") {
      const body = options?.body ? JSON.parse(String(options.body)) : {};
      const t = { id: String(Date.now()), name: body.name || "Anonymous", message: body.message || "", photoUrl: body.photoUrl || "", rating: body.rating || 5 };
      TESTIMONIALS = [t, ...TESTIMONIALS];
      return t as unknown as T;
    }

    // Quiz questions
    if (url === "/api/quiz/questions" && method === "GET") {
      return { questions: QUIZ_QUESTIONS } as unknown as T;
    }

    // Quiz submit handler
    if (url === "/api/quiz/submit" && method === "POST") {
      const body = options?.body ? JSON.parse(String(options.body)) : {};
      const answers: Record<string, string> = body.answers || {};
      // tally
      const totals: Record<string, number> = {};
      const totalQuestions = QUIZ_QUESTIONS.length;
      for (const q of QUIZ_QUESTIONS) {
        const aid = answers[q.id];
        if (!aid) continue;
        const opt = (q as any).options.find((o: any) => o.id === aid);
        if (!opt) continue;
        totals[opt.skill] = (totals[opt.skill] || 0) + (opt.weight || 1);
      }
      // normalize to 0-100 by dividing by totalQuestions and multiplying 100
      const scores = Object.keys(totals).map((skill) => ({ skill, score: Math.round((totals[skill] / totalQuestions) * 100) }));
      // ensure all skills present
      const allSkills = Array.from(new Set(QUIZ_QUESTIONS.flatMap((q: any) => (q as any).options.map((o: any) => o.skill))));
      for (const s of allSkills) {
        if (!scores.find((x) => x.skill === s)) scores.push({ skill: s, score: 0 });
      }
      // sort descending
      scores.sort((a, b) => b.score - a.score);
      const trackMap: Record<string, string> = {
        leadership: "Team Leader",
        organization: "Operations / PM",
        creative: "Creative / Design",
        people: "People / HR",
        hands_on: "Engineer / Maker",
        research: "Research / Data",
        business: "Business / Product",
        analysis: "Data Analyst",
      };
      const topTracks = scores.slice(0, 3).map((s) => trackMap[s.skill] || s.skill);
      return { scores, topTracks } as unknown as T;
    }

    // Auth (mock)
    if (url === "/api/auth/login" && method === "POST") {
      const body = options?.body ? JSON.parse(String(options.body)) : {};
      // accept any credentials
      AUTH_TOKEN = "mock-token-" + Date.now();
      AUTH_USER = { id: String(Date.now()), email: body.email || "user@example.com", name: body.name || "User" };
      return { token: AUTH_TOKEN, user: AUTH_USER } as unknown as T;
    }

    if (url === "/api/auth/register" && method === "POST") {
      const body = options?.body ? JSON.parse(String(options.body)) : {};
      AUTH_TOKEN = "mock-token-" + Date.now();
      AUTH_USER = { id: String(Date.now()), email: body.email || "user@example.com", name: body.name || "User" };
      return { token: AUTH_TOKEN, user: AUTH_USER } as unknown as T;
    }

    if (url === "/api/auth/profile" && method === "GET") {
      if (!AUTH_USER) throw new Error("Not authenticated");
      return AUTH_USER as unknown as T;
    }

    if (url === "/api/auth/profile" && method === "PUT") {
      const body = options?.body ? JSON.parse(String(options.body)) : {};
      AUTH_USER = { ...(AUTH_USER || { id: String(Date.now()), email: body.email || "user@example.com" }), ...body };
      return AUTH_USER as unknown as T;
    }

    // Jobs used in Results page
    if (url === "/api/jobs" && method === "GET") {
      return { jobs: JOBS } as unknown as T;
    }

    throw new Error(`No mock route for ${method} ${url}`);
  } catch (err: any) {
    throw new Error(err?.message || String(err));
  }
}
