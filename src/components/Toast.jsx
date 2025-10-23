import React, { useEffect, useState } from 'react'
let pushToast
export function toast(msg){ pushToast && pushToast(msg) }
export default function Toast(){
  const [msg, setMsg] = useState('')
  useEffect(()=>{ pushToast = (m)=>{ setMsg(m); setTimeout(()=>setMsg(''), 1800) } }, [])
  return msg ? <div className="toast show">{msg}</div> : null
}
