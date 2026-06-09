// SELECCIÓN DE ELEMENTOS
const btnOpcion1 = document.getElementById("btn-opcion1");
const btnOpcion2 = document.getElementById("btn-opcion2");
const btnOpcion3 = document.getElementById("btn-opcion3");

const bar1 = document.getElementById("bar1"); //guarda la barra de proceso de la opcion1
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

const spanPct1 = document.getElementById("span-pct1"); //guarda donde se guarda el porcentaje de la opcion 1
const spanPct2 = document.getElementById("span-pct2");
const spanPct3 = document.getElementById("span-pct3");

const mensaje = document.getElementById("mensaje");
const btnReiniciar = document.getElementById("btn-reiniciar");

// se agrupan los botones
const botones = document.querySelectorAll(".btn-voto");

//  Bloquea todos los botones
//  desactiva cada uno de los botones

function bloquearVotacion() {
  botones.forEach(function (btn) {
    btn.disabled = true;
  });
}

// Anima número del porcentaje
// Cuenta desde 0 hasta el valor final con requestAnimationFrame

function animarNumero(spanElement, valorFinal) {
  const duracion = 800; // ms, igual que la transición CSS de la barra
  const inicio = performance.now();

  function paso(tiempoActual) {
    const transcurrido = tiempoActual - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    //  ease-out para que desacelere al final
    const eased = 1 - Math.pow(1 - progreso, 3);
    const valorActual = Math.round(eased * valorFinal);
    spanElement.textContent = valorActual + "%";

    if (progreso < 1) {
      requestAnimationFrame(paso);
    }
  }

  requestAnimationFrame(paso);
}

// Registrar voto
function registrarVoto(opcionElegida) {
  console.log(
    "Opción votada:",
    opcionElegida,
    "— Hora:",
    new Date().toLocaleTimeString(),
  );

  if (opcionElegida === 1) {
    bar1.style.width = "70%";
    animarNumero(spanPct1, 70);
  }

  if (opcionElegida === 2) {
    bar2.style.width = "20%";
    animarNumero(spanPct2, 20);
  }

  if (opcionElegida === 3) {
    bar3.style.width = "10%";
    animarNumero(spanPct3, 10);
  }

  bloquearVotacion();

  const opcion1 = document.getElementById("opc1");
  const opcion2 = document.getElementById("opc2");
  const opcion3 = document.getElementById("opc3");

  const todasOpciones = [opcion1, opcion2, opcion3];

  todasOpciones.forEach(function (opcion, index) {
    if (index + 1 === opcionElegida) {
      opcion.classList.add("ganadora");
    } else {
      opcion.classList.add("perdedora");
    }
  });

  mensaje.classList.remove("oculto");
  btnReiniciar.classList.remove("oculto");
}

// Eventos de voto

btnOpcion1.addEventListener("click", function () {
  registrarVoto(1);
});

btnOpcion2.addEventListener("click", function () {
  registrarVoto(2);
});

btnOpcion3.addEventListener("click", function () {
  registrarVoto(3);
});

//  Reiniciar
// Restaura al estado original de la encuesta

btnReiniciar.addEventListener("click", function () {
  // Restablecer barras a 0
  bar1.style.width = "0%";
  bar2.style.width = "0%";
  bar3.style.width = "0%";

  // Restablecer porcentajes a 0%
  spanPct1.textContent = "0%";
  spanPct2.textContent = "0%";
  spanPct3.textContent = "0%";

  // habilitar todos los botones
  botones.forEach(function (btn) {
    btn.disabled = false;
  });

  // Quitar clases de estado visual
  const btnOpcion1 = document.getElementById("btn-opcion1");
  const btnOpcion2 = document.getElementById("btn-opcion2");
  const btnOpcion3 = document.getElementById("btn-opcion3");

  opcion1.classList.remove("ganadora", "perdedora");
  opcion2.classList.remove("ganadora", "perdedora");
  opcion3.classList.remove("ganadora", "perdedora");

  // Ocultar mensaje y botón de reinicio
  mensaje.classList.add("oculto");
  btnReiniciar.classList.add("oculto");

  console.log("Encuesta reiniciada —", new Date().toLocaleTimeString());
});
