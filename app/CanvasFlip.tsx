"use client";
import {useEffect,useRef} from "react";

export function CanvasFlip({hour,minute}:{hour:string;minute:string}){
 const canvas=useRef<HTMLCanvasElement>(null),previous=useRef([hour,minute]),frame=useRef(0);
 useEffect(()=>{const el=canvas.current;if(!el)return;const ctx=el.getContext("2d");if(!ctx)return;
  const values=[hour,minute],old=previous.current,start=performance.now();cancelAnimationFrame(frame.current);
  const paint=(p:number)=>{const dpr=Math.min(devicePixelRatio||1,2),w=el.clientWidth,h=el.clientHeight;el.width=w*dpr;el.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
   const gap=Math.max(12,w*.025),cw=(w-gap)/2,ch=Math.min(h,cw*1.16),y=(h-ch)/2,fs=Math.min(cw*.66,ch*.62);
   const text=(v:string,x:number)=>{ctx.fillStyle="#f3f3f3";ctx.font=`750 ${fs}px Arial, sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(v,x+cw/2,y+ch*.51)};
   values.forEach((v,i)=>{const x=i*(cw+gap),mid=y+ch/2;ctx.save();ctx.beginPath();ctx.roundRect(x,y,cw,ch,Math.max(16,cw*.06));ctx.clip();ctx.fillStyle="#121212";ctx.fillRect(x,y,cw,ch);
    ctx.save();ctx.beginPath();ctx.rect(x,y,cw,ch/2);ctx.clip();text(v,x);ctx.restore();ctx.save();ctx.beginPath();ctx.rect(x,mid,cw,ch/2);ctx.clip();text(old[i],x);ctx.restore();
    if(p<.5){const sy=1-p*2;ctx.save();ctx.beginPath();ctx.rect(x,y,cw,ch/2);ctx.clip();ctx.translate(0,mid);ctx.scale(1,sy);ctx.translate(0,-mid);ctx.fillStyle="#101010";ctx.fillRect(x,y,cw,ch/2);text(old[i],x);ctx.restore()}else{const sy=(p-.5)*2;ctx.save();ctx.beginPath();ctx.rect(x,mid,cw,ch/2);ctx.clip();ctx.translate(0,mid);ctx.scale(1,sy);ctx.translate(0,-mid);ctx.fillStyle="#101010";ctx.fillRect(x,mid,cw,ch/2);text(v,x);ctx.restore()}
    ctx.fillStyle="#000";ctx.fillRect(x,mid-2,cw,4);ctx.fillStyle="#343434";ctx.fillRect(x,mid+2,cw,1);ctx.restore()})};
  const tick=(t:number)=>{const p=Math.min(1,(t-start)/1400);paint(p);if(p<1)frame.current=requestAnimationFrame(tick);else previous.current=values};frame.current=requestAnimationFrame(tick);
  const ro=new ResizeObserver(()=>paint(1));ro.observe(el);return()=>{ro.disconnect();cancelAnimationFrame(frame.current)}
 },[hour,minute]);
 return <canvas ref={canvas} className="canvasFlip" aria-label={`${hour}:${minute}`}/>;
}
