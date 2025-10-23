import React, { useMemo, useState } from 'react'
const JKEY='careerq-jobs'
const base=[{id:1,title:'Software Engineer',company:'Google',place:'Bengaluru'},{id:2,title:'Data Analyst',company:'TCS',place:'Hyderabad'},{id:3,title:'Cloud Associate',company:'AWS',place:'Remote'},{id:4,title:'Frontend Developer',company:'Infosys',place:'Pune'},{id:5,title:'QA Engineer',company:'Zoho',place:'Chennai'}]
export default function Results(){
  const saved=JSON.parse(localStorage.getItem('careerq-quiz')||'{}')
  const map={"Frontend":"Full-Stack Web","AI/ML":"Data Science","Cloud":"Cloud & DevOps","Data":"Business Analytics","Security":"Cybersecurity","Mobile":"Mobile Dev"}
  const top=Array.from(new Set(Object.values(saved).map(v=>map[v]||v))).slice(0,3)
  const [q,setQ]=useState(''); const [sort,setSort]=useState('title'); const [jobs,setJobs]=useState(()=>JSON.parse(localStorage.getItem(JKEY)||'null')||base)
  function del(id){ const j=jobs.filter(x=>x.id!==id); setJobs(j); localStorage.setItem(JKEY, JSON.stringify(j)) }
  const view=useMemo(()=>[...jobs].filter(j=>(j.title+' '+j.company).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>(a[sort]||'').localeCompare(b[sort]||'')),[q,sort,jobs])
  return (<div className="grid-2">
    <div className="card" style={{padding:16,minHeight:340}}><h3>Your Results</h3><div className="muted" style={{height:160,display:'grid',placeItems:'center',border:'1px dashed rgba(255,255,255,.15)',borderRadius:12}}>Graph</div><h4>Top 3 Tracks</h4><div style={{display:'flex',gap:8}}>{(top.length?top:["Data Science","Full-Stack Web","Cloud & DevOps"]).map(t=><span key={t} className="tag">{t}</span>)}</div></div>
    <div className="side"><h3>Job Openings <span className="badge">{view.length} results</span></h3><div className="controls"><input value={q} onChange={e=>setQ(e.target.value)} type="search" placeholder="Filter by title/company"/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="title">Sort: Title A→Z</option><option value="company">Company A→Z</option></select></div>
    <div className="list">{view.map(j=>(<div key={j.id} className="card" style={{padding:14}}><b>{j.title}</b><div className="muted">{j.company} — {j.place}</div><div style={{marginTop:8}}><button className="icon-btn" onClick={()=>del(j.id)}>Delete</button></div></div>))}</div></div></div>)}
