"use client";
import { useEffect,useState } from "react";
const pad=(n:number)=>String(n).padStart(2,"0");
export function ModeGallery(){const[now,setNow]=useState<Date|null>(null);useEffect(()=>{setNow(new Date());const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id)},[]);const h=pad(now?.getHours()??22),m=pad(now?.getMinutes()??48),s=pad(now?.getSeconds()??0);return <div className="modeGallery">
 <Mode name="Flip" note="La firma de Flip Noir" className="modeFlip"><div className="miniFlip"><Card v={h}/><Card v={m}/></div></Mode>
 <Mode name="Digital" note="Directo, grueso y redondeado" className="modeDigital"><div className="digitalTime">{h}:{m}<small>:{s}</small></div><DateLine/></Mode>
 <Mode name="Analog" note="Sobrio y atemporal" className="modeAnalog"><Analog h={Number(h)} m={Number(m)} s={Number(s)}/></Mode>
 <Mode name="Hybrid" note="Dos lecturas, una composición" className="modeHybrid"><div className="hybrid"><Analog h={Number(h)} m={Number(m)} s={Number(s)}/><div><div className="hybridTime">{h}:{m}</div><DateLine/></div></div></Mode>
 <Mode name="Minimal Dark" note="Contraste preciso" className="modeDark"><div className="cleanTime">{h}:{m}</div><DateLine/></Mode>
 <Mode name="Minimal Light" note="Calma a plena luz" className="modeLight"><div className="cleanTime">{h}:{m}</div><DateLine/></Mode>
 <Mode name="Aurora" note="Color ambiental en movimiento" className="modeAurora"><div className="cleanTime">{h}:{m}</div><DateLine/></Mode>
 <Mode name="OLED" note="Negro puro. Solo lo esencial." className="modeOled"><div className="oledTime">{h}:{m}</div><DateLine/></Mode>
 </div>}
function Mode({name,note,className,children}:{name:string;note:string;className:string;children:React.ReactNode}){return <section className={`modeScreen ${className}`}><div className="modeLabel"><span>{name}</span><p>{note}</p></div><div className="modeContent">{children}</div></section>}
function Card({v}:{v:string}){return <div className="miniCard"><b>{v}</b><i/></div>}
function DateLine(){return <p className="dateLine">Martes, 15 de julio</p>}
function Analog({h,m,s}:{h:number;m:number;s:number}){return <div className="analogFace">{Array.from({length:12},(_,i)=><i key={i} style={{transform:`rotate(${i*30}deg)`}}/>)}<span className="hand hour" style={{transform:`rotate(${h*30+m/2}deg)`}}/><span className="hand minute" style={{transform:`rotate(${m*6}deg)`}}/><span className="hand second" style={{transform:`rotate(${s*6}deg)`}}/><b/></div>}
