import React, { useState } from 'react'
export default function JDAnalyzer(){
  const [skills,setSkills]=useState('C++, React, MySQL, HTML, CSS, JavaScript, Git')
  const [jd,setJD]=useState('We are hiring a Full Stack Developer with experience in React, Node.js, REST APIs, TypeScript, Docker, AWS, CI/CD, unit testing, and SQL/NoSQL databases. Familiarity with Redux, GraphQL, and microservices is a plus.')
  const [missing,setMissing]=useState([])
  function analyze(){ const have=skills.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean); const words=Array.from(new Set(jd.toLowerCase().match(/[a-zA-Z+#.]{2,}/g)||[]));
    const stop=new Set(['and','the','with','for','you','in','to','of','a','an','is','are','we','plus']); const miss=words.filter(w=>!have.includes(w)&&!stop.has(w)).slice(0,25); setMissing(miss) }
  return (<div><h2>JD Analyzer</h2><p className="muted">Paste a job description. We'll highlight skills you might be missing based on your skills.</p>
    <div className="grid-2"><div className="card" style={{padding:14}}><div className="field"><label>Your skills (comma separated)</label><input value={skills} onChange={e=>setSkills(e.target.value)} /></div>
      <div className="field"><label>Job Description</label><textarea value={jd} onChange={e=>setJD(e.target.value)} /></div><div className="cta"><button className="btn" onClick={analyze}>Analyze</button> <button className="btn ghost" onClick={()=>{setSkills('');setJD('');setMissing([])}}>Clear</button></div></div>
      <div className="side"><h3>Missing from your skills</h3><div style={{marginTop:10}}>{missing.map(m=><span key={m} className="tag" style={{margin:4}}>{m}</span>)}</div></div></div></div>)}
