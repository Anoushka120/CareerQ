import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../components/useAuth.js'
import { toast } from '../components/Toast.jsx'
export default function Signup(){
  const { signup } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [eName, setEName] = useState('')
  const [eEmail, setEEmail] = useState('')
  const [ePw, setEPw] = useState('')
  function submit(e){
    e.preventDefault(); setEName(''); setEEmail(''); setEPw('')
    const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; const pwOk=pw.length>=8&&/[A-Za-z]/.test(pw)&&/\d/.test(pw); let ok=true
    if(name.length<2){ setEName('Please enter your full name.'); ok=false }
    if(!re.test(email)){ setEEmail('Enter a valid email like user@example.com'); ok=false }
    if(!pwOk){ setEPw('Password must be 8+ chars with letters and numbers.'); ok=false }
    if(!ok) return
    signup(name,email,pw); toast('Account created'); nav('/quiz')
  }
  return (
    <div className="grid-2" style={{alignItems:'start'}}>
      <form className="card" style={{padding:22,maxWidth:520}} onSubmit={submit}>
        <h2>Create your account</h2>
        <p className="muted">Start your personalized career path.</p>
        <div className="field"><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/><div className="err">{eName}</div></div>
        <div className="field"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com"/><div className="err">{eEmail}</div></div>
        <div className="field"><label>Password</label><input value={pw} onChange={e=>setPw(e.target.value)} type="password" placeholder="At least 8 chars"/><div className="err">{ePw}</div></div>
        <button className="btn" type="submit">Create account</button>
        <p className="muted" style={{marginTop:10}}>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
      <div className="side">
        <h3>Why join?</h3>
        <ul><li>Personalized skill maps</li><li>Portfolio-ready project templates</li><li>Interview prep resources</li></ul>
      </div>
    </div>
  )
}
