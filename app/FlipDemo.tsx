"use client";
import { useEffect, useState } from "react";

export function FlipDemo(){
 const [now,setNow]=useState<Date|null>(null);
 useEffect(()=>{setNow(new Date());const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id)},[]);
 const hour=now?String(now.getHours()).padStart(2,"0"):"12";const minute=now?String(now.getMinutes()).padStart(2,"0"):"17";
 return <div className="clockStage"><div className="clock" aria-label={`${hour}:${minute}`}><FlipCard value={hour}/><FlipCard value={minute}/></div></div>
}
function FlipCard({value}:{value:string}){return <div className="flipCard" key={value}><span>{value}</span><i className="hinge"/><i className="flipLeaf"/></div>}
