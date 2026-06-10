// ============================================================
// TALLER 1 — ROL 4, Punto 1
// Seleccionar btn-opcion1 y bar1 con getElementById
// almacenados en constantes claramente nombradas
// ============================================================

// TALLER 1 — ROL 5, Punto 1
// Seleccionar btn-opcion3 y bar3 con getElementById
// (aquí también se seleccionan los 3 botones en una sola sección)

// TALLER 2 — ROL 3, Punto 1
// Seleccionar #mensaje y #btn-reiniciar con getElementById
const btnOpcion1 = document.getElementById("btn-opcion1");
const btnOpcion2 = document.getElementById("btn-opcion2");
const btnOpcion3 = document.getElementById("btn-opcion3");

const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

// TALLER 1 — ROL 5, Punto 5
// Seleccionar span-pct1, span-pct2, span-pct3 para mostrar el porcentaje en texto
const spanPct1 = document.getElementById("span-pct1");
const spanPct2 = document.getElementById("span-pct2");
const spanPct3 = document.getElementById("span-pct3");

// TALLER 2 — ROL 3, Punto 1
// Seleccionar #mensaje y #btn-reiniciar con getElementById
const mensaje = document.getElementById("mensaje");
const btnReiniciar = document.getElementById("btn-reiniciar");

// TALLER 1 — ROL 5, Punto 2
// Seleccionar los 3 botones de voto usando querySelectorAll(".btn-voto")
// almacenados en la constante "botones" para recorrerlos con forEach
const botones = document.querySelectorAll(".btn-voto");

// ============================================================
// TALLER 1 — ROL 5, Punto 3
// Función bloquearVotacion(): recorre "botones" con forEach
// y asigna .disabled = true a cada uno para impedir más clics
// ============================================================
function bloquearVotacion() {
  botones.forEach(function (btn) {
    btn.disabled = true;
  });
}

// ============================================================
// Función auxiliar: anima el número del porcentaje con ease-out
// usando requestAnimationFrame para una transición fluida
// ============================================================
function animarNumero(spanElement, valorFinal) {
  const duracion = 800;
  const inicio = performance.now();

  function paso(tiempoActual) {
    const transcurrido = tiempoActual - inicio;
    const progreso = Math.min(transcurrido / duracion, 1);
    const eased = 1 - Math.pow(1 - progreso, 3);
    const valorActual = Math.round(eased * valorFinal);

    // TALLER 1 — ROL 5, Punto 5 / TALLER 2 — ROL 3, Punto 6
    // Actualizar span-pctN.textContent con el porcentaje + "%" en cada frame
    spanElement.textContent = valorActual + "%";

    if (progreso < 1) {
      requestAnimationFrame(paso);
    }
  }

  requestAnimationFrame(paso);
}

// ============================================================
// TALLER 2 — ROL 3, Punto 2
// Refactorizar los 3 listeners para que llamen a una función
// central registrarVoto(numeroBarra, porcentaje)
//
// TALLER 2 — ROL 3, Punto 3
// Dentro de registrarVoto() inyectar "✅ Voto registrado exitosamente"
// en el .textContent del mensaje
//
// TALLER 2 — ROL 3, Punto 4
// Cambiar mensaje.style.color = "green" y quitar clase "oculto"
//
// TALLER 2 — ROL 3, Punto 5
// Mostrar el botón de reinicio: btnReiniciar.classList.remove("oculto")
//
// TALLER 2 — ROL 3, Punto 6
// Actualizar span-pctN.textContent = porcentaje + "%" desde aquí
// ============================================================
function registrarVoto(numeroBarra, porcentaje) {
  // TALLER 1 — ROL 4, Punto 5 / ROL 5, Punto 1
  // console.log indica qué opción fue votada y a qué hora
  console.log(
    "Opción votada:",
    numeroBarra,
    "— Hora:",
    new Date().toLocaleTimeString()
  );

  // Mapas internos de barras y spans por número de opción
  const barras = { 1: bar1, 2: bar2, 3: bar3 };
  const spans = { 1: spanPct1, 2: spanPct2, 3: spanPct3 };
  const opciones = {
    1: document.getElementById("opc1"),
    2: document.getElementById("opc2"),
    3: document.getElementById("opc3"),
  };

  // TALLER 1 — ROL 4, Punto 2 / Punto 4 / ROL 5, Punto 1
  // Establecer bar.style.width al porcentaje correspondiente
  // (esto activa la transition CSS definida en .barra-relleno)
  barras[numeroBarra].style.width = porcentaje + "%";
  animarNumero(spans[numeroBarra], porcentaje);

  // TALLER 1 — ROL 5, Punto 4
  // Llamar a bloquearVotacion() DESPUÉS de actualizar la barra
  // para que ningún segundo clic tenga efecto
  bloquearVotacion();

  // Añadir clases visuales: ganadora a la votada, perdedora a las demás
  for (let i = 1; i <= 3; i++) {
    if (i === numeroBarra) {
      opciones[i].classList.add("ganadora");
    } else {
      opciones[i].classList.add("perdedora");
    }
  }

  // TALLER 2 — ROL 3, Punto 3
  // Inyectar texto de confirmación en el .textContent del mensaje
  mensaje.textContent = "✅ Voto registrado exitosamente";

  // TALLER 2 — ROL 3, Punto 4
  // Cambiar color del mensaje dinámicamente a "green"
  mensaje.style.color = "green";

  // TALLER 2 — ROL 3, Punto 4
  // Mostrar mensaje quitando la clase "oculto"
  mensaje.classList.remove("oculto");

  // TALLER 2 — ROL 3, Punto 5
  // Mostrar botón de reinicio quitando la clase "oculto"
  btnReiniciar.classList.remove("oculto");
}

// ============================================================
// TALLER 1 — ROL 4, Punto 2 y Punto 4
// addEventListener("click") a btn-opcion1: establece bar1.style.width = "70%"
//
// TALLER 1 — ROL 4, Punto 3 y Punto 4
// addEventListener("click") a btn-opcion2: establece bar2.style.width = "20%"
//
// TALLER 1 — ROL 5, Punto 1
// addEventListener("click") a btn-opcion3: establece bar3.style.width = "10%"
//
// TALLER 2 — ROL 3, Punto 2
// Los 3 listeners llaman a la función central registrarVoto()
// ============================================================

btnOpcion1.addEventListener("click", function () {
  registrarVoto(1, 70);
});

btnOpcion2.addEventListener("click", function () {
  registrarVoto(2, 20);
});

btnOpcion3.addEventListener("click", function () {
  registrarVoto(3, 10);
});

// ============================================================
// TALLER 2 — ROL 5, Punto 1
// addEventListener("click") para el botón de reinicio
//
// TALLER 2 — ROL 5, Punto 2
// Función reiniciarEncuesta() que restaura bar1, bar2, bar3 a "0%"
//
// TALLER 2 — ROL 5, Punto 3
// Habilitar botones: recorrer "botones" con forEach, .disabled = false
//
// TALLER 2 — ROL 5, Punto 4
// Ocultar mensaje y botón de reinicio añadiendo clase "oculto"
//
// TALLER 2 — ROL 5, Punto 5
// Restaurar span-pctN a "0%" con .textContent
//
// TALLER 2 — ROL 5, Punto 6
// Flujo completo: votar → ver resultados → reiniciar → votar de nuevo
// ============================================================
function reiniciarEncuesta() {
  // TALLER 2 — ROL 5, Punto 2
  // Restaurar el width de las 3 barras a "0%"
  bar1.style.width = "0%";
  bar2.style.width = "0%";
  bar3.style.width = "0%";

  // TALLER 2 — ROL 5, Punto 5
  // Restaurar los span de porcentaje a "0%" con .textContent
  spanPct1.textContent = "0%";
  spanPct2.textContent = "0%";
  spanPct3.textContent = "0%";

  // TALLER 2 — ROL 5, Punto 3
  // Habilitar todos los botones de voto con forEach + .disabled = false
  botones.forEach(function (btn) {
    btn.disabled = false;
  });

  // Quitar clases de estado visual de las opciones
  document.getElementById("opc1").classList.remove("ganadora", "perdedora");
  document.getElementById("opc2").classList.remove("ganadora", "perdedora");
  document.getElementById("opc3").classList.remove("ganadora", "perdedora");

  // TALLER 2 — ROL 5, Punto 4
  // Ocultar mensaje y botón de reinicio añadiendo la clase "oculto"
  mensaje.classList.add("oculto");
  btnReiniciar.classList.add("oculto");

  console.log("Encuesta reiniciada —", new Date().toLocaleTimeString());
}

// TALLER 2 — ROL 5, Punto 1
// addEventListener("click") para el botón de reinicio
btnReiniciar.addEventListener("click", reiniciarEncuesta);
