const container = document.querySelector(".container");
const nombre = document.querySelector(".nombre");
const apellido = document.querySelector(".apellido");
const organizacion = document.querySelector(".organizacion");
let nombres = new Set();
let colaNombres = [];
let animacionEnProgreso = false;

async function actualizarNombres() {
  try {
    const response = await fetch("http://localhost:6969/api/guests");
    const data = await response.json();

    data.forEach((invitado) => {
      const nombreCompleto = `${invitado.nombre} ${invitado.apellido}`;
      if (!nombres.has(nombreCompleto)) {
        nombres.add(nombreCompleto);
        colaNombres.push(invitado);
      }
    });

    if (!animacionEnProgreso) {
      procesarNombres();
    }
  } catch (error) {
    console.error(error);
  }
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
function procesarNombres() {
  if (colaNombres.length > 0) {
    const invitadoActual = colaNombres.shift();
    animacionEnProgreso = true;
    mostrarNombre(invitadoActual);
  } else {
    animacionEnProgreso = false;
  }
}

function vaciarNombres() {
  nombres.clear();
}
function mostrarNombre(invitadoActual) {
  nombre.textContent = invitadoActual.nombre.toUpperCase();
  apellido.textContent = invitadoActual.apellido.toUpperCase();
  organizacion.textContent = invitadoActual.organizacion.toUpperCase();

  // Aquí puedes agregar las animaciones que desees para apellido y organizacion
  anime({
    targets: [nombre, apellido, organizacion],
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: "easeOutCubic",
    complete: function () {
      setTimeout(() => {
        anime({
          targets: [nombre, apellido, organizacion],
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
