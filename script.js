/* ================================================= */
/* ELEMENTOS */
/* ================================================= */

const envelope =
  document.getElementById("envelope");

const envelopeScreen =
  document.getElementById("screenEnvelope");

const invitation =
  document.getElementById("invitation");


/* ================================================= */
/* INICIO */
/* ================================================= */

window.addEventListener("load", () => {

  // Animación de entrada del sobre
  setTimeout(() => {

    envelope.classList.add("enter");

  }, 400);

});


/* ================================================= */
/* ABRIR SOBRE */
/* ================================================= */

envelope.addEventListener("click", () => {

  // Evitar que se pueda abrir dos veces
  if (envelope.classList.contains("open")) {
    return;
  }


  // Abrir tapa
  envelope.classList.add("open");


  // Reproducir música de fondo
  playMusic();


  /*
    Esperamos a que termine
    la animación del sobre.
  */

  setTimeout(() => {

    // Ocultar sobre
    envelopeScreen.classList.add("opened");


    // Mostrar invitación
    invitation.classList.add("visible");


    // Activar scroll
    document.body.style.overflowY = "auto";


    // Asegurar que comenzamos arriba
    window.scrollTo(0, 0);


  }, 1000);

});


/* ================================================= */
/* CUENTA REGRESIVA */
/* ================================================= */

const weddingDate =
  new Date(
    "2026-11-22T00:00:00-05:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();


  const difference =
    weddingDate - now;


  // Si ya llegó el día
  if (difference <= 0) {

    document.getElementById("days").textContent =
      "00";

    document.getElementById("hours").textContent =
      "00";

    document.getElementById("minutes").textContent =
      "00";

    document.getElementById("seconds").textContent =
      "00";

    return;
  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (difference /
      (1000 * 60 * 60)) % 24
    );


  const minutes =
    Math.floor(
      (difference /
      (1000 * 60)) % 60
    );


  const seconds =
    Math.floor(
      (difference / 1000) % 60
    );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


/* Ejecutar inmediatamente */

updateCountdown();


/* Actualizar cada segundo */

setInterval(
  updateCountdown,
  1000
);

/* ================================================= */
/* ANIMACIÓN - NOS CASAMOS */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const introImage =
    document.querySelector(".invitation-intro-image");


  if (!introImage) {
    return;
  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            introImage.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.20
      }
    );


  observer.observe(introImage);

});

/* ================================================= */
/* ANIMACIÓN - ELEMENTOS .reveal */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

});

/* ================================================= */
/* VERSÍCULO - MÁQUINA DE ESCRIBIR + LUCIÉRNAGAS */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.getElementById("verseSection");
  if (!section) return;

  const verseText = document.getElementById("verseText");
  const verseRef = document.getElementById("verseRef");
  const verseDivider = document.getElementById("verseDivider");
  const verseDesc = document.getElementById("verseDesc");
  const particles = document.getElementById("verseParticles");


  /* ---------- LUCIÉRNAGAS ---------- */

  for (let i = 0; i < 26; i++) {
    const f = document.createElement("span");
    f.className = "firefly";
    f.style.setProperty("--x", Math.random() * 100 + "%");
    f.style.setProperty("--s", (2 + Math.random() * 4) + "px");
    f.style.setProperty("--d", (9 + Math.random() * 10) + "s");
    f.style.setProperty("--delay", (-Math.random() * 15) + "s");
    f.style.setProperty("--sway", (Math.random() * 80 - 40) + "px");
    particles.appendChild(f);
  }


  /* ---------- PREPARAR TEXTO ---------- */

  function prepare(el) {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", text);
    el.textContent = "";

    return [...text].map((ch) => {
      const span = document.createElement("span");
      span.className = "char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = ch;
      el.appendChild(span);
      return span;
    });
  }

  const verseChars = prepare(verseText);
  const descChars = prepare(verseDesc);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function type(chars, speed) {
    let prev = null;

    for (const c of chars) {
      if (prev) prev.classList.remove("caret");
      c.classList.add("on", "caret");
      prev = c;

      // pausa un poco más en comas y puntos
      const ch = c.textContent;
      await wait(ch === "," || ch === "." ? speed * 6 : speed);
    }

    await wait(900);
    if (prev) prev.classList.remove("caret");
  }


  /* ---------- SECUENCIA ---------- */

  async function play() {
    await wait(500);

    await type(verseChars, Number(verseText.dataset.speed));

    verseRef.classList.add("show");
    await wait(900);

    verseDivider.classList.add("show");
    await wait(700);

    await type(descChars, Number(verseDesc.dataset.speed));
  }


  /* ---------- INICIAR AL ENTRAR EN PANTALLA ---------- */

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        play();
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(section);

});

/* ================================================= */
/* ACORDEÓN DE MOMENTOS */
/* ================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const section = document.getElementById("momentsSection");
  const acc = document.getElementById("accordion");
  if (!section || !acc) return;

  const items = [...acc.querySelectorAll(".acc-item")];

  const INTERVAL = 3800;      // ms entre foto y foto
  const RESUME_AFTER = 8000;  // ms para retomar tras un toque

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  acc.style.setProperty("--interval", INTERVAL + "ms");

  let current = 0;
  let timer = null;
  let resumeTimer = null;
  let inView = false;
  let userPaused = false;


  function setActive(index) {
    current = index;

    items.forEach((item, i) => {
      const on = i === index;
      item.classList.toggle("active", on);
      item.setAttribute("aria-expanded", on);
    });
  }

  // reinicia la animación de la barra de progreso
  function restartBar() {
    acc.classList.remove("playing");
    void acc.offsetWidth;
    acc.classList.add("playing");
  }

  function play() {
    if (reduceMotion) return;

    clearInterval(timer);
    restartBar();

    timer = setInterval(() => {
      setActive((current + 1) % items.length);
      restartBar();
    }, INTERVAL);
  }

  function pause() {
    clearInterval(timer);
    acc.classList.remove("playing");
  }

  function choose(index) {
    userPaused = true;
    pause();
    setActive(index);

    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      userPaused = false;
      if (inView) play();
    }, RESUME_AFTER);
  }


  items.forEach((item, i) => {

    item.addEventListener("click", () => choose(i));

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        choose(i);
      }
    });

  });


  // solo se mueve mientras la sección está en pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;

      if (inView && !userPaused) {
        play();
      } else if (!inView) {
        pause();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(section);

});

/* ================================================= */
/* MÚSICA DE FONDO */
/* ================================================= */

const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

function playMusic() {

  if (!bgMusic) return;

  bgMusic.volume = 0.6; // ajusta el volumen 0–1 a tu gusto

  bgMusic.play().catch(() => {
    // si el navegador bloquea el autoplay, no pasa nada:
    // el botón de mute queda visible para que el usuario le dé play manualmente
  });

  if (muteBtn) {
    muteBtn.classList.add("visible");
  }

}

if (muteBtn) {

  muteBtn.addEventListener("click", () => {

    if (bgMusic.muted) {
      bgMusic.muted = false;
      muteBtn.classList.remove("muted");
    } else {
      bgMusic.muted = true;
      muteBtn.classList.add("muted");
    }

  });

}