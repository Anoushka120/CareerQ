import React, { useEffect, useState } from 'react'
import { toast } from '../components/Toast.jsx'
const KEY='careerq-quiz'; const initial={Q1:'Frontend',Q2:'AI/ML',Q3:'Cloud',Q4:'Data'}
export default function Quiz(){
  const [ans,setAns]=useState(()=>{ try{return JSON.parse(localStorage.getItem(KEY)||'null')||initial}catch{return initial} })
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(ans)) },[ans])
  function pick(q,v){ setAns(a=>({...a,[q]:v})); toast('Saved') }
  return (<div><h2>Career Fit Quiz</h2><p className="muted">Pick the option that best matches you.</p>
    <div className="grid-2">
      <div className="card" style={{padding:16}}>
        <Q title="Q1. Which task sounds fun?"><Opt q="Q1" v="Frontend" onPick={pick}>Design a landing page</Opt><Opt q="Q1" v="Data" onPick={pick}>Analyze a dataset</Opt><Opt q="Q1" v="Backend" onPick={pick}>Build an API</Opt><Opt q="Q1" v="Security" onPick={pick}>Find security bugs</Opt></Q>
        <Q title="Q2. What would you learn next?"><Opt q="Q2" v="AI/ML" onPick={pick}>Machine Learning</Opt><Opt q="Q2" v="Cloud" onPick={pick}>AWS & Docker</Opt><Opt q="Q2" v="Mobile" onPick={pick}>Android/iOS</Opt><Opt q="Q2" v="DevOps" onPick={pick}>CI/CD pipelines</Opt></Q>
        <Q title="Q3. Favourite project type?"><Opt q="Q3" v="Cloud" onPick={pick}>Deploying apps</Opt><Opt q="Q3" v="Frontend" onPick={pick}>Interactive UI</Opt><Opt q="Q3" v="Data" onPick={pick}>Dashboards</Opt><Opt q="Q3" v="Security" onPick={pick}>Audits</Opt></Q>
        <Q title="Q4. Strength area?"><Opt q="Q4" v="Data" onPick={pick}>Math & Stats</Opt><Opt q="Q4" v="Frontend" onPick={pick}>Visual design</Opt><Opt q="Q4" v="Backend" onPick={pick}>Systems thinking</Opt><Opt q="Q4" v="Cloud" onPick={pick}>Automation</Opt></Q>
      </div>
      <div className="side"><b>Your Skill Map</b><pre className="muted" style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(ans,null,2)}</pre></div>
    </div></div>)}
function Q({title,children}){return(<div style={{marginBottom:18}}><h4>{title}</h4><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(120px,1fr))',gap:10}}>{children}</div></div>)}
function Opt({q,v,children,onPick}){return <button className="btn ghost quiz-opt" onClick={()=>onPick(q,v)}>{children}</button>}
