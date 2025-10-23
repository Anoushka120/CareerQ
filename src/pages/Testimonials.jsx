import React, { useState } from 'react'
const TKEY='careerq-testi'
const seed=[{name:'Sam',story:'This helped me get a job!',rating:'5',date:Date.now()-86400000*2},{name:'Aisha',story:'Clear roadmap, mock interviews were gold.',rating:'5',date:Date.now()-86400000*5}]
export default function Testimonials(){
  const [items,setItems]=useState(()=>JSON.parse(localStorage.getItem(TKEY)||'null')||seed)
  function add(e){ e.preventDefault(); const name=e.target.name.value.trim()||'Anonymous'; const story=e.target.story.value.trim()||'Great experience!'; const rating=e.target.rating.value||'5';
    const next=[...items,{name,story,rating,date:Date.now()}]; setItems(next); localStorage.setItem(TKEY, JSON.stringify(next)); e.target.reset() }
  return (<div className="grid-2"><div><h2>Testimonials</h2><div className="reviews">{items.map((t,i)=>(<div key={i} className="card review" style={{padding:16}}><div className="head"><div className="ava">{t.name[0].toUpperCase()}</div><div><b>{t.name}</b><div className="muted">{new Date(t.date).toDateString()}</div></div></div><div className="stars">★★★★★</div><p>{t.story}</p></div>))}</div></div>
    <div className="card" style={{padding:16}}><h3>Add Testimonial</h3><form onSubmit={add}><div className="field"><label>Your Name</label><input name="name" placeholder="Your name"/></div><div className="field"><label>Your Story</label><textarea name="story" placeholder="Share a sentence or two"/></div><div className="field"><label>Rating</label><div>{[1,2,3,4,5].map(v=><label key={v} style={{marginRight:8}}><input type="radio" name="rating" value={v} defaultChecked={v===5}/> {v}★</label>)}</div></div><button className="btn" type="submit">Submit</button></form></div></div>)}
