import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import CareerPack from './pages/CareerPack.jsx'
import JDAnalyzer from './pages/JDAnalyzer.jsx'
import Testimonials from './pages/Testimonials.jsx'
import { useAuth } from './components/useAuth.js'
import Toast from './components/Toast.jsx'

export default function App(){
  const { user, logout } = useAuth()
  return (
    <div>
      <nav className="nav">
        <div className="inner container">
          <div className="brand"><div className="logo">Q</div> CareerQ</div>
          <Link to="/">Home</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/results">Results</Link>
          <Link to="/career-pack">Career Pack</Link>
          <Link to="/jd-analyzer">JD Analyzer</Link>
          <Link to="/testimonials">Testimonials</Link>
          <span className="push" id="accountSpan">{user ? user.name : "your account"}</span>
          {user ? (
            <button className="btn ghost" onClick={logout}>Logout</button>
          ) : (
            <Link id="loginLink" to="/login" className="ghost btn">Login</Link>
          )}
          {!user && <Link id="signupBtn" to="/signup" className="btn">Sign up</Link>}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/results" element={<Results/>} />
          <Route path="/career-pack" element={<CareerPack/>} />
          <Route path="/jd-analyzer" element={<JDAnalyzer/>} />
          <Route path="/testimonials" element={<Testimonials/>} />
        </Routes>
      </main>

      <footer className="footer">
        <div>© 2025 CareerQ • Designed with care · Built for learners</div>
        <div style={{marginTop:6}}><a className="muted" href="#">Privacy</a> · <a className="muted" href="#">Terms</a> · <a className="muted" href="#">Contact</a></div>
      </footer>

      <Toast/>
    </div>
  )
}
