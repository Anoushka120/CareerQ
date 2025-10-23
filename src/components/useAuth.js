import { useState, useEffect } from 'react'
const KEY = 'careerq-user'
export function useAuth(){
  const [user, setUser] = useState(null)
  useEffect(()=>{ try{ setUser(JSON.parse(localStorage.getItem(KEY)||'null')) }catch{} }, [])
  const login = (email, pw) => {
    const saved = JSON.parse(localStorage.getItem(KEY)||'null')
    if(!saved) throw new Error('No account')
    if(saved.email !== email) throw new Error('Email not registered')
    if(saved.pw !== pw) throw new Error('Incorrect password')
    setUser(saved); return saved
  }
  const signup = (name, email, pw) => {
    const u = { name, email, pw }
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u); return u
  }
  const logout = () => { localStorage.removeItem(KEY); setUser(null); location.reload() }
  return { user, login, signup, logout }
}
