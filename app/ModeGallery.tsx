"use client";
import { useEffect,useRef,useState } from "react";
const pad=(n:number)=>String(n).padStart(2,"0");
const modes=["Flip","Digital","Analog","Hybrid","Minimal Dark","Minimal Light","Aurora","OLED"] as const;
type ModeName=typeof modes[number];
const notes:Record<ModeName,string>={Flip:"",Digital:"Directo, grueso y redondeado",Analog:"Sobrio y atemporal",Hybrid:"Dos lecturas, una composición","Minimal Dark":"Contraste preciso","Minimal Light":"Calma a plena luz",Aurora:"Color ambiental en movimiento",OLED:"Negro puro. Solo lo esencial."};
const classes:Record<ModeName,string>={Flip:"modeFlip",Digital:"modeDigital",Analog:"modeAnalog",Hybrid:"modeHybrid","Minimal Dark":"modeDark","Minimal Light":"modeLight",Aurora:"modeAurora",OLED:"modeOled"};

export function ModeGallery(){
 const[now,setNow]=useState<Date|null>(null);const[selected,setSelected]=useState<ModeName>("Flip");
 useEffect(()=>{setNow(new Date());const id=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(id)},[]);
 const h=pad(now?.getHours()??22),m=pad(now?.getMinutes()??48),s=pad(now?.getSeconds()??0);
 return <section className={`modeSwitcher ${classes[selected]}`} aria-label="Explorar modos de Flip Noir">
  <div className="modeTabs" role="tablist" aria-label="Modos de reloj">{modes.map(mode=><button key={mode} role="tab" aria-selected={selected===mode} onClick={()=>setSelected(mode)}>{mode}</button>)}</div>
  <div className="activeMode"><div className="activeModeLabel"><span>{selected}</span><p>{notes[selected]}</p></div><div className="modeContent">{renderMode(selected,h,m,s)}</div></div>
 </section>
}
function renderMode(mode:ModeName,h:string,m:string,s:string){switch(mode){
 case"Flip":return <div className="staticFlipWrap"><div className="miniFlip"><StaticCard v="12"/><StaticCard v="17"/></div><p className="flipExplanation">En la aplicación, cada tarjeta está dividida por una bisagra central. Al cambiar la hora, la mitad superior cae y revela suavemente el nuevo número.</p></div>;
 case"Digital":return <><div className="digitalTime"><span>{h}:{m}</span><small>:{s}</small></div><DateLine/></>;
 case"Analog":return <Analog h={+h} m={+m} s={+s}/>;
 case"Hybrid":return <div className="hybrid"><Analog h={+h} m={+m} s={+s}/><div><div className="hybridTime">{h}:{m}</div><DateLine/></div></div>;
 case"Minimal Light":case"Minimal Dark":case"Aurora":return <><div className="cleanTime">{h}:{m}</div><DateLine/></>;
 default:return <><div className="oledTime">{h}:{m}</div><DateLine/></>;
 }}
function Card({v}:{v:string}){
 const previous=useRef(v);const old=previous.current;
 useEffect(()=>{previous.current=v},[v]);
 return <div className="miniCard liveFlipCard">
  <b className="flipValue flipValueNext">{v}</b>
  <span className="flipHalf flipTopStatic"><b>{v}</b></span>
  <span className="flipHalf flipBottomStatic"><b>{old}</b></span>
  <span className="flipHalf flipTopLeaf" key={`top-${v}`}><b>{old}</b></span>
  <span className="flipHalf flipBottomLeaf" key={`bottom-${v}`}><b>{v}</b></span>
  <i className="flipAxis"/>
 </div>
}
function StaticCard({v}:{v:string}){return <div className="miniCard staticFlipCard"><b>{v}</b><i/></div>}
function DateLine(){return <p className="dateLine">Martes, 15 de julio</p>}
function Analog({h,m,s}:{h:number;m:number;s:number}){return <div className="analogFace">{Array.from({length:12},(_,i)=><i key={i} style={{transform:`rotate(${i*30}deg)`}}/>)}<span className="hand hour" style={{transform:`rotate(${h*30+m/2}deg)`}}/><span className="hand minute" style={{transform:`rotate(${m*6}deg)`}}/><span className="hand second" style={{transform:`rotate(${s*6}deg)`}}/><b/></div>}
