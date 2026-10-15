// ----- Carrusel de la parte superior -----
const slides = document.querySelectorAll(".slide");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
let actual = 0;

function mostrarSlide(numero) {
    slides[actual].classList.remove("activo");

    if (numero < 0) {
        numero = slides.length - 1;
    }
    if (numero >= slides.length) {
        numero = 0;
    }

    actual = numero;
    slides[actual].classList.add("activo");
}

botonSiguiente.addEventListener("click", function () {
    mostrarSlide(actual + 1);
});

botonAnterior.addEventListener("click", function () {
    mostrarSlide(actual - 1);
});

setInterval(function () {
    mostrarSlide(actual + 1);
}, 4000);


// ----- Formulario de nueva entrada -----
const formulario = document.getElementById("formEntrada");
const listaEntradas = document.getElementById("entradas");
const mensajeOk = document.getElementById("mensajeOk");
const contador = document.getElementById("contador");
let totalEntradas = 3;

function mostrarError(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
    document.getElementById(campo).classList.add("invalido");
}

function limpiarErrores() {
    document.querySelectorAll(".error").forEach(function (e) {
        e.textContent = "";
    });
    document.querySelectorAll(".invalido").forEach(function (e) {
        e.classList.remove("invalido");
    });
    mensajeOk.style.display = "none";
}

function validar(datos) {
    let valido = true;

    if (datos.titulo.length < 5) {
        mostrarError("titulo", "El título debe tener al menos 5 letras.");
        valido = false;
    }
    if (datos.categoria === "") {
        mostrarError("categoria", "Seleccione una categoría.");
        valido = false;
    }
    if (datos.mensaje.length < 20) {
        mostrarError("mensaje", "El mensaje debe tener 20 letras o más.");
        valido = false;
    }
    return valido;
}

function crearTarjeta(datos) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta nueva";
    tarjeta.innerHTML = "<span class='etiqueta'></span>" +
        "<h3></h3><small></small><p></p>";

    tarjeta.querySelector(".etiqueta").textContent = datos.categoria;
    tarjeta.querySelector("h3").textContent = datos.titulo;
    const hoy = new Date().toLocaleDateString("es-PE");
    tarjeta.querySelector("small").textContent = hoy;
    tarjeta.querySelector("p").textContent = datos.mensaje;
    return tarjeta;
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    const datos = {
        titulo: document.getElementById("titulo").value.trim(),
        categoria: document.getElementById("categoria").value,
        mensaje: document.getElementById("mensaje").value.trim()
    };

    if (!validar(datos)) {
        return;
    }

    listaEntradas.prepend(crearTarjeta(datos));
    totalEntradas = totalEntradas + 1;
    contador.textContent = "(" + totalEntradas + ")";
    mensajeOk.style.display = "block";
    formulario.reset();
});
