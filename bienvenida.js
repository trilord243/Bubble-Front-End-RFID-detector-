const container = document.querySelector(".container");
const nombre = document.querySelector(".nombre");
let nombres = new Set();
let colaNombres = [];
let animacionEnProgreso = false;

async function actualizarNombres() {
  try {
    const response = await fetch("http://localhost:6969/api/guests");
    const data = await response.json();

    data.forEach((nombre) => {
      if (!nombres.has(nombre)) {
        nombres.add(nombre);
        colaNombres.push(nombre);
      }
    });

    if (!animacionEnProgreso) {
      procesarNombres();
    }
  } catch (error) {
    console.error(error);
  }
}

function procesarNombres() {
  if (colaNombres.length > 0) {
    const nombreActual = colaNombres.shift();
    animacionEnProgreso = true;
    mostrarNombre(nombreActual);
  } else {
    animacionEnProgreso = false;
  }
}

function mostrarNombre(nombreActual) {
  nombre.textContent = nombreActual;
  anime({
    targets: nombre,
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutCubic",
    complete: function () {
      setTimeout(() => {
        anime({
          targets: nombre,
          translateY: [0, -50],
          opacity: [1, 0],
          duration: 1000,
          easing: "easeInCubic",
          complete: procesarNombres,
        });
      }, 3000);
    },
  });
}

function vaciarNombres() {
  nombres.clear();
}

for (let i = 0; i < 50; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  container.appendChild(bubble);
}

const bubbles = document.querySelectorAll(".bubble");

bubbles.forEach((bubble, index) => {
  const size = Math.random() * 100 + 40;
  const delay = Math.random() * 5;
  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${xPos}vw`;
  bubble.style.top = `${yPos}vh`;
  bubble.style.animationDuration = `${2 + delay}s`;
  bubble.style.animationDelay = `${delay}s`;
});

setInterval(actualizarNombres, 1000);
setInterval(vaciarNombres, 7000);
actualizarNombres();

anime({
  targets: ".bubble",
  translateY: () => [anime.random(-500, 500), anime.random(-500, 500)],
  translateX: () => [anime.random(-500, 500), anime.random(-500, 500)],
  loop: true,
  direction: "alternate",
  easing: "easeInOutQuad",
  duration: () => anime.random(6000, 10000),
});
