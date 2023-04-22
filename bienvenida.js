const container = document.querySelector(".container");
const nombre = document.querySelector(".nombre");
let nombres = [];
let prevNombresJSON = "";

async function getGuests() {
  try {
    const response = await fetch("http://localhost:6969/api/guests");
    const data = await response.json();
    const dataJSON = JSON.stringify(data);

    if (prevNombresJSON !== dataJSON) {
      prevNombresJSON = dataJSON;
      nombres = data;
      cambiarNombre();
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

function cambiarNombre() {
  const currentIndex = Math.floor(Math.random() * nombres.length);
  nombre.textContent = nombres[currentIndex];
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
          complete: cambiarNombre,
        });
      }, 3000);
    },
  });
}

function actualizarNombres() {
  fetch("http://localhost:6969/api/guests")
    .then((response) => response.json())
    .then((data) => {
      nombres = data;
    })
    .catch((error) => console.error(error));
}

setInterval(actualizarNombres, 1000);

actualizarNombres();
cambiarNombre();

anime({
  targets: ".bubble",
  translateY: () => [anime.random(-500, 500), anime.random(-500, 500)],
  translateX: () => [anime.random(-500, 500), anime.random(-500, 500)],
  loop: true,
  direction: "alternate",
  easing: "easeInOutQuad",
  duration: () => anime.random(6000, 10000),
});
