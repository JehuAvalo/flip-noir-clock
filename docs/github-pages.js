(() => {
  const pad = (value) => String(value).padStart(2, "0");
  const switcher = document.querySelector(".modeSwitcher");
  const content = switcher?.querySelector(".modeContent");
  const label = switcher?.querySelector(".activeModeLabel span");
  const note = switcher?.querySelector(".activeModeLabel p");
  const tabs = [...(switcher?.querySelectorAll(".modeTabs button") ?? [])];

  if (!switcher || !content || !label || !note || tabs.length === 0) return;

  const details = {
    Flip: ["modeFlip", "La firma de Flip Noir"],
    Digital: ["modeDigital", "Directo, grueso y redondeado"],
    Analog: ["modeAnalog", "Sobrio y atemporal"],
    Hybrid: ["modeHybrid", "Dos lecturas, una composición"],
    "Minimal Dark": ["modeDark", "Contraste preciso"],
    "Minimal Light": ["modeLight", "Calma a plena luz"],
    Aurora: ["modeAurora", "Color ambiental en movimiento"],
    OLED: ["modeOled", "Negro puro. Solo lo esencial."],
  };

  let selected = "Flip";

  function time() {
    const now = new Date();
    return { h: pad(now.getHours()), m: pad(now.getMinutes()), s: pad(now.getSeconds()), now };
  }

  function dateLine() {
    return `<p class="dateLine">${new Intl.DateTimeFormat("es-PE", {
      weekday: "long", day: "numeric", month: "long"
    }).format(new Date())}</p>`;
  }

  function analog({ h, m, s }) {
    const marks = Array.from({ length: 12 }, (_, index) =>
      `<i style="transform:rotate(${index * 30}deg)"></i>`).join("");
    return `<div class="analogFace">${marks}
      <span class="hand hour" style="transform:rotate(${Number(h) * 30 + Number(m) / 2}deg)"></span>
      <span class="hand minute" style="transform:rotate(${Number(m) * 6}deg)"></span>
      <span class="hand second" style="transform:rotate(${Number(s) * 6}deg)"></span><b></b></div>`;
  }

  function render() {
    if (!content) return;
    const current = time();
    const digital = `<div class="digitalTime"><span>${current.h}:${current.m}</span><small>:${current.s}</small></div>${dateLine()}`;
    const templates = {
      Flip: `<div class="staticFlipWrap"><div class="miniFlip"><div class="miniCard staticFlipCard"><b>${current.h}</b><i></i></div><div class="miniCard staticFlipCard"><b>${current.m}</b><i></i></div></div><p class="flipExplanation">En la aplicación, cada tarjeta está dividida por una bisagra central. Al cambiar la hora, la mitad superior cae y revela suavemente el nuevo número.</p></div>`,
      Digital: digital,
      Analog: analog(current),
      Hybrid: `<div class="hybrid">${analog(current)}<div><div class="hybridTime">${current.h}:${current.m}</div>${dateLine()}</div></div>`,
      "Minimal Dark": `<div class="cleanTime">${current.h}:${current.m}</div>${dateLine()}`,
      "Minimal Light": `<div class="cleanTime">${current.h}:${current.m}</div>${dateLine()}`,
      Aurora: `<div class="cleanTime">${current.h}:${current.m}</div>${dateLine()}`,
      OLED: `<div class="oledTime">${current.h}:${current.m}</div>${dateLine()}`,
    };
    content.innerHTML = templates[selected];
  }

  function select(mode) {
    selected = mode;
    const [theme, description] = details[mode];
    switcher.className = `modeSwitcher ${theme}`;
    label.textContent = mode;
    note.textContent = description;
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.textContent.trim() === mode)));
    content.classList.remove("modeChanging");
    void content.offsetWidth;
    content.classList.add("modeChanging");
    render();
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab.textContent.trim())));

  let previousMinute = "";
  function updateClocks() {
    const current = time();
    const heroCards = document.querySelectorAll(".clockStage .flipCard");
    const minuteKey = `${current.h}:${current.m}`;
    if (heroCards.length === 2 && minuteKey !== previousMinute) {
      heroCards[0].querySelector("span").textContent = current.h;
      heroCards[1].querySelector("span").textContent = current.m;
      heroCards.forEach((card) => {
        const leaf = card.querySelector(".flipLeaf");
        leaf.style.animation = "none";
        void leaf.offsetWidth;
        leaf.style.animation = "pageFlip 1.15s cubic-bezier(.45,0,.2,1)";
      });
      previousMinute = minuteKey;
    }
    if (selected !== "Flip" || minuteKey !== previousMinute) render();
    if (["Digital", "Analog", "Hybrid"].includes(selected)) render();
  }

  select("Flip");
  updateClocks();
  window.setInterval(updateClocks, 1000);
})();
