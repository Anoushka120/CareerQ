import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../components/useAuth.js'
import { toast } from '../components/Toast.jsx'
export default function Login(){
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [errE, setErrE] = useState('')
  const [errP, setErrP] = useState('')
  function submit(e){
    e.preventDefault(); setErrE(''); setErrP('')
    try{ login(email, pw); toast('Logged in'); nav('/quiz') }
    catch(err){ if(err.message.includes('Email')) setErrE(err.message); else if(err.message.includes('password')||err.message.includes('Incorrect')) setErrP('Incorrect password'); else setErrE('No account found. Please sign up.') }
  }
  return (
    <div className="grid-2" style={{alignItems:'start'}}>
      <form className="card" style={{padding:22,maxWidth:520}} onSubmit={submit}>
        <h2>Welcome back</h2>
        <p className="muted">Log into your account</p>
        <div className="field"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@example.com" required/><div className="err">{errE}</div></div>
        <div className="field"><label>Password</label><input value={pw} onChange={e=>setPw(e.target.value)} type="password" placeholder="Your password" required/><div className="err">{errP}</div></div>
        <button className="btn" type="submit">Login</button>
        <p className="muted" style={{marginTop:10}}>New here? <Link to="/signup">Create an account</Link></p>
      </form>
      <div className="side">
        <h3>Forgot password?</h3>
        <p className="muted">This demo stores a local account in your browser only. If you forget the password, create a new account on the Sign up page.</p>
      </div>
    </div>
  )
}
