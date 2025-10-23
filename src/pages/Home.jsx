import React from 'react'
export default function Home(){
  return (
    <section className="hero">
      <div>
        <h1>CareerQ — Your Guided Career Companion</h1>
        <p className="muted">Discover your strengths, build a practical project portfolio, and prepare for real job opportunities. Take a short quiz to generate a personalized skill map, curated projects, and a resource pack tailored to you.</p>
        <div className="kpis">
          <div className="k card"><div className="num">10k+</div><div className="label">Assessments</div></div>
          <div className="k card"><div className="num">92%</div><div className="label">Job-Ready</div></div>
          <div className="k card"><div className="num">4.9★</div><div className="label">Community Rating</div></div>
        </div>
      </div>
      <div className="card" style={{padding:0, position:'relative'}}>
        <img className="media" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" alt="Learners" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        <div className="caption">Community Success Stories</div>
      </div>
    </section>
  )
}
