import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={title:"Flip Noir",description:"Un reloj minimalista para tu protector de pantalla.",metadataBase:new URL("https://flip-noir-clock.jehuavalocancino.chatgpt.site"),openGraph:{title:"Flip Noir",description:"El tiempo, sin ruido.",images:["/og.png"]},twitter:{card:"summary_large_image",title:"Flip Noir",description:"El tiempo, sin ruido.",images:["/og.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>}
