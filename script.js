// ===========================
// SELECCIÓN DE ELEMENTOS
// ROL 3: usando getElementById
// ===========================

const btnOpcion1 = document.getElementById("btn-opcion1");
const btnOpcion2 = document.getElementById("btn-opcion2");
const btnOpcion3 = document.getElementById("btn-opcion3");

const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

// ROL 3: span-pctN donde se muestra el porcentaje
const spanPct1 = document.getElementById("span-pct1");
const spanPct2 = document.getElementById("span-pct2");
const spanPct3 = document.getElementById("span-pct3");

// ROL 3: seleccionar #mensaje y #btn-reiniciar con getElementById
const mensaje = document.getElementById("mensaje");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Agrupación de todos los botones de voto
const botones = document.querySelectorAll(".btn-voto");

// ===========================
// ROL 3: función central registrarVoto(numeroBarra, porcentaje)
// Los 3 listeners llaman a esta función central
// ===========================

// Bloquea todos los botones de voto
function bloquearVotacion() {
  botones.forEach(function (btn) {
    btn.disabled = true;
  });
}

// Anima número del porcentaje con ease-out usando requestAnimationFrame
function animarNumero(spanElement, valorFinal) {
  const duracion = 800;
  const inicio = performance.now();

  function paso(tiempoActual) {
    const transcurrido = tiempoActual - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    const eased = 1 - Math.pow(1 - progreso, 3);
    const valorActual = Math.round(eased * valorFinal);

    // ROL 3 + ROL 5: span-pctN.textContent = porcentaje + "%"
    spanElement.textContent = valorActual + "%";

    if (progreso < 1) {
      requestAnimationFrame(paso);
    }
  }

  requestAnimationFrame(paso);
}

// ===========================
// ROL 3: función central registrarVoto(numeroBarra, porcentaje)
// recibe el número de barra y el porcentaje para cada opción
// ===========================
function registrarVoto(numeroBarra, porcentaje) {
  console.log(
    "Opción votada:",
    numeroBarra,
    "— Hora:",
    new Date().toLocaleTimeString()
  );

  // Mapas de barras y spans por número
  const barras = { 1: bar1, 2: bar2, 3: bar3 };
  const spans = { 1: spanPct1, 2: spanPct2, 3: spanPct3 };
  const opciones = {
    1: document.getElementById("opc1"),
    2: document.getElementById("opc2"),
    3: document.getElementById("opc3"),
  };

  // Animar la barra seleccionada
  barras[numeroBarra].style.width = porcentaje + "%";
  animarNumero(spans[numeroBarra], porcentaje);

  // Bloquear votación después del voto
  bloquearVotacion();

  // Añadir clases visuales a las opciones
  for (let i = 1; i <= 3; i++) {
    if (i === numeroBarra) {
      opciones[i].classList.add("ganadora");
    } else {
      opciones[i].classList.add("perdedora");
    }
  }

  // ROL 3: inyectar ✅ texto en el .textContent del mensaje
  mensaje.textContent = "✅ Voto registrado exitosamente";

  // ROL 3: cambiar color del mensaje dinámicamente a "green"
  mensaje.style.color = "green";

  // ROL 3: mostrar mensaje quitando clase "oculto"
  mensaje.classList.remove("oculto");

  // ROL 3: mostrar botón de reinicio quitando clase "oculto"
  btnReiniciar.classList.remove("oculto");
}

// ===========================
// ROL 3: 3 listeners que llaman a la función central registrarVoto()
// Cada uno pasa su número de barra y porcentaje correspondiente
// ===========================

btnOpcion1.addEventListener("click", function () {
  registrarVoto(1, 70);
});

btnOpcion2.addEventListener("click", function () {
  registrarVoto(2, 20);
});

btnOpcion3.addEventListener("click", function () {
  registrarVoto(3, 10);
});

// ===========================
// ROL 5: función reiniciarEncuesta() con addEventListener("click")
// Restaura el estado original de la encuesta
// ===========================

function reiniciarEncuesta() {
  // ROL 5: restaurar width de bar1, bar2, bar3 a "0%"
  bar1.style.width = "0%";
  bar2.style.width = "0%";
  bar3.style.width = "0%";

  // ROL 5: restaurar los span de porcentaje a "0%" con .textContent
  spanPct1.textContent = "0%";
  spanPct2.textContent = "0%";
  spanPct3.textContent = "0%";

  // ROL 5: habilitar todos los botones de voto con forEach + .disabled = false
  botones.forEach(function (btn) {
    btn.disabled = false;
  });

  // Quitar clases de estado visual
  document.getElementById("opc1").classList.remove("ganadora", "perdedora");
  document.getElementById("opc2").classList.remove("ganadora", "perdedora");
  document.getElementById("opc3").classList.remove("ganadora", "perdedora");

  // ROL 5: ocultar mensaje y botón de reinicio añadiendo clase "oculto"
  mensaje.classList.add("oculto");
  btnReiniciar.classList.add("oculto");

  console.log("Encuesta reiniciada —", new Date().toLocaleTimeString());
}

// ROL 5: addEventListener("click") para el botón de reinicio
btnReiniciar.addEventListener("click", reiniciarEncuesta);
