import type { Metadata } from "next";
import { FlipDemo } from "./FlipDemo";

export const metadata: Metadata = {
  title: "Flip Noir — Protector de pantalla minimalista para Windows",
  description: "Un reloj minimalista para tu protector de pantalla. Diseñado para Windows 10 y 11.",
};

const download = "/downloads/FlipNoir-1.0.0-win-x64.zip";

export default function Home() {
  return <main>
    <nav className="nav shell"><a className="brand" href="#top" aria-label="Flip Noir, inicio"><span className="brandMark">FN</span><span>Flip Noir</span></a><div className="navLinks"><a href="#features">Funciones</a><a href="#design">Diseño</a><a className="navDownload" href={download} download>Descargar</a></div></nav>

    <section className="hero shell" id="top">
      <p className="eyebrow">Protector de pantalla para Windows</p>
      <h1>El tiempo,<br/>sin ruido.</h1>
      <p className="heroCopy">Flip Noir convierte cualquier pantalla en una presencia serena. Relojes minimalistas, movimiento preciso y cero distracciones.</p>
      <div className="actions"><a className="button primary" href={download} download>Descargar para Windows</a><a className="button secondary" href="#design">Ver en acción</a></div>
      <p className="requirements">Versión 1.0.0&nbsp;&nbsp;·&nbsp;&nbsp;Windows 10 y 11&nbsp;&nbsp;·&nbsp;&nbsp;64 bits</p>
    </section>

    <section className="showcase shell" id="design" aria-label="Vista del reloj Flip Noir"><FlipDemo/><p className="showcaseNote">La hora cambia como una hoja mecánica. Suave, legible y completamente negra.</p></section>

    <section className="statement shell"><p>Diseñado para desaparecer del camino.</p><h2>Solo miras.<br/>Y sabes la hora.</h2></section>

    <section className="features shell" id="features">
      <div className="sectionHead"><p className="eyebrow">Todo lo esencial</p><h2>Mucho más que<br/>un reloj bonito.</h2></div>
      <div className="featureGrid">
        <article><span>01</span><h3>Flip mecánico</h3><p>Tarjetas divididas en dos mitades con una transición de bisagra precisa al cambiar la hora.</p></article>
        <article><span>02</span><h3>Hecho para tu pantalla</h3><p>Se adapta a monitores ultrawide, resoluciones distintas, escalado de Windows y configuraciones multimonitor.</p></article>
        <article><span>03</span><h3>Tu ambiente</h3><p>Modos digital, analógico e híbrido. Calendario, música, portada del álbum y fotografía opcional.</p></article>
        <article><span>04</span><h3>Inteligente y discreto</h3><p>Se activa por inactividad y respeta juegos, videos y presentaciones a pantalla completa.</p></article>
      </div>
    </section>

    <section className="modes shell"><p className="eyebrow">Una presencia. Varias expresiones.</p><div className="modeList"><div><b>Flip</b><span>El icono de Flip Noir.</span></div><div><b>Digital</b><span>Tipografías limpias y redondeadas.</span></div><div><b>Analog</b><span>Una esfera sobria y atemporal.</span></div><div><b>OLED</b><span>Negro puro. Consumo mínimo.</span></div></div></section>

    <section className="downloadSection shell"><p className="eyebrow">Disponible ahora</p><h2>Haz que el reposo<br/>se vea mejor.</h2><a className="button primary large" href={download} download>Descargar Flip Noir</a><p>Descarga autocontenida. No requiere instalar .NET.</p></section>

    <footer className="footer shell"><div className="brand"><span className="brandMark">FN</span><span>Flip Noir</span></div><p>Diseñado por JehúDev.</p><p>© 2026 Flip Noir</p></footer>
  </main>;
}
