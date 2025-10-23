CareerQ – Personalized Career Guidance & Portfolio Builder

CareerQ is a web-based application that helps students and early professionals discover their ideal career path, explore industry-relevant learning tracks, build a strong portfolio, and prepare for actual job roles through skill mapping, curated resources, projects, and job recommendations.

🚀 Features


🎯 Personalized Skill Quiz

Short interactive quiz designed to identify your strengths and interests.

Generates a custom career track (e.g., Web Development, Data Science, Cloud Computing).

📊 Career Recommendations

Displays top 3 suitable career paths.

Includes real-world job roles with company names and locations.

Jobs can be filtered, sorted, and managed.

📚 Career Pack

Curated learning roadmap for each path.

Ready-to-build portfolio projects.

Add, search, sort, and delete learning resources.

🤖 JD Analyzer (Job Description Scanner)

Paste any job description.

The system highlights missing skills compared to your profile.

Helps you understand what to learn next to become job-ready.

⭐ Testimonials Section

Includes feedback from users.

Allows new submissions to build social proof and trust.

🔐 Authentication

Local account creation with email & password.

Login and logout functionality using browser storage (demo mode).

🛠 Tech Stack
Technology	Purpose
React (Vite)	Frontend Framework
React Router	Navigation
JavaScript	Logic & Interactivity
LocalStorage	Client-side state persistence
Pure CSS	Styling with a custom modern theme
📂 Folder Structure
careerq-react/
└── src/
    ├── components/     # Reusable UI components (Toast, Auth hook)
    ├── pages/          # Main pages (Quiz, Results, CareerPack, etc.)
    ├── App.jsx         # Routes + Layout
    ├── main.jsx        # Entry point
    └── styles.css      # Theme and global styling

🔧 Installation & Setup
# Clone the project
git clone https://github.com/your-username/careerq.git

# Navigate into the folder
cd careerq-react

# Install dependencies
npm install

# Start the development server
npm run dev


Open the app at: http://localhost:5173

🧭 How It Works (User Flow)

Sign up / Log in

Take the Skill Quiz

View recommended career tracks

Explore job roles and filter/sort them

Go to the Career Pack → follow roadmap & start projects

Use the JD Analyzer to compare your skills with real job descriptions

Add your experience in Testimonials and share your journey

🎯 Project Goals

Help students identify the right career path using data-backed insights.

Encourage skill-based learning rather than random tutorials.

Provide structure and clarity to achieve job readiness.

Bridge the gap between learning and real employment requirements.

📌 Future Enhancements

Integration with real APIs for job listings.

User profiles with progress tracking.

Admin dashboard for adding new career tracks.

Gamification and badges for milestone completion.
