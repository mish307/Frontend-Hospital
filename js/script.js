const datosEspecialidades = [
    { titulo: "Urgencias y Rescate", texto: "Atención crítica inmediata 24/7. Nuestro equipo está altamente capacitado en maniobras de reanimación cardiopulmonar (RCP) y protocolos de seguridad, incluyendo el manejo avanzado de extintores.", img: "https://images.unsplash.com/photo-1587559070757-f72a388edbba?auto=format&fit=crop&w=1200&q=80" },
    { titulo: "Cardiología", texto: "Monitoreo, prevención y cirugía cardiovascular con la más alta tecnología. Realizamos estudios avanzados y procedimientos mínimamente invasivos para cuidar el motor de tu cuerpo con precisión.", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80" },
    { titulo: "Pediatría", texto: "Un entorno mágico y seguro diseñado especialmente para la recuperación y el bienestar de los más pequeños. Atención compasiva y especializada desde el nacimiento hasta la adolescencia.", img: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80" },
    { titulo: "Neurología", texto: "Especialistas en el sistema nervioso central y periférico. Brindamos diagnósticos precisos mediante neuroimagen avanzada para tratamientos efectivos de trastornos neurológicos.", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80" },
    { titulo: "Traumatología", texto: "Rehabilitación y cirugía ortopédica integral. Nuestro objetivo es que recuperes tu movilidad y calidad de vida al máximo a través de terapias personalizadas e intervenciones seguras.", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80" },
    { titulo: "Oftalmología", texto: "Protegemos tu visión con evaluaciones oftalmológicas detalladas, diagnósticos precisos y cirugías láser de última generación para una recuperación visual rápida y efectiva.", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80" }
];

let indiceActual = 0;
let intervaloRotacion;
let timeoutPausa;
const TIEMPO_ROTACION = 4000; 
const TIEMPO_PAUSA_CLICK = 10000; 

const tabs = document.querySelectorAll('.tab-item');
const indicador = document.getElementById('indicador');

// 1. Mover la píldora azul
function moverIndicador(elementoActivo) {
    if (elementoActivo && indicador) {
        // Lee el ancho y la posición del elemento que tocaste
        indicador.style.width = elementoActivo.offsetWidth + 'px';
        indicador.style.left = elementoActivo.offsetLeft + 'px';
    }
}

// 2. Actualizar Visuales (Textos, Imagen, Clases)
function actualizarVisual(indice, elementoHover = null) {
    const elementoActivo = elementoHover || tabs[indice];

    tabs.forEach(tab => tab.classList.remove('activo'));
    elementoActivo.classList.add('activo');

    // Desliza la píldora
    moverIndicador(elementoActivo);

    // Cambiar Imagen
    const pod = document.getElementById('pod-imagen');
    if(pod) pod.style.backgroundImage = `url('${datosEspecialidades[indice].img}')`;

    // Animación del Texto
    const panelInfo = document.getElementById('info-panel');
    const titulo = document.getElementById('info-titulo');
    const texto = document.getElementById('info-texto');

    if (panelInfo && titulo && texto) {
        panelInfo.classList.remove('visible'); 
        
        setTimeout(() => {
            titulo.innerText = datosEspecialidades[indice].titulo;
            texto.innerText = datosEspecialidades[indice].texto;
            panelInfo.classList.add('visible'); 
        }, 150); // Delay sutil para que el efecto "aparecer de la nada" sea notorio
    }
    indiceActual = indice;
}

// 3. Sistema de Auto-Reproducción
function iniciarAutoPlay() {
    clearInterval(intervaloRotacion);
    intervaloRotacion = setInterval(() => {
        let siguienteIndice = (indiceActual + 1) % datosEspecialidades.length;
        actualizarVisual(siguienteIndice);
    }, TIEMPO_ROTACION);
}

function detenerAutoPlay() { clearInterval(intervaloRotacion); }

// 4. Asignar Eventos a las Pestañas
tabs.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        detenerAutoPlay();
        clearTimeout(timeoutPausa);
        actualizarVisual(index, item);
    });

    item.addEventListener('mouseleave', () => {
        iniciarAutoPlay();
    });

    item.addEventListener('click', () => {
        detenerAutoPlay();
        actualizarVisual(index, item);
        clearTimeout(timeoutPausa);
        timeoutPausa = setTimeout(() => { iniciarAutoPlay(); }, TIEMPO_PAUSA_CLICK);
    });
});

// Acomodar el indicador inicial al cargar la página y redimensionar
window.addEventListener('load', () => {
    if(tabs.length > 0) {
        moverIndicador(tabs[0]);
        document.getElementById('info-panel').classList.add('visible');
        iniciarAutoPlay();
    }
});

window.addEventListener('resize', () => {
    if(tabs.length > 0) {
        moverIndicador(tabs[indiceActual]);
    }
});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) { input.type = input.type === "password" ? "text" : "password"; }
}
/* =========================================
   ANIMACIÓN DE CONTADORES DE ESTADÍSTICAS
   ========================================= */
const counters = document.querySelectorAll('.counter');
const speed = 200; // Velocidad de la animación

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (target > 100 ? '+' : '');
            }
        };
        updateCount();
    });
};

// Observador para iniciar la animación solo cuando se ve en pantalla
const observerOptions = { root: null, threshold: 0.1 };
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.seccion-stats');
if(statsSection) {
    statsObserver.observe(statsSection);
}

/* ==========================================================
   LÓGICA DEL PANEL DE AGENDAMIENTO (WIZARD)
   ========================================================== */

// Función para avanzar o retroceder entre los pasos
function cambiarPaso(pasoActual, pasoDestino) {
    // Ocultar paso actual
    const stepActual = document.getElementById('paso-' + pasoActual);
    if (stepActual) stepActual.classList.remove('activo');

    // Mostrar nuevo paso
    const stepDestino = document.getElementById('paso-' + pasoDestino);
    if (stepDestino) stepDestino.classList.add('activo');

    // Actualizar los círculos de la barra de progreso
    document.querySelectorAll('.progress-bar .step').forEach((indicador, index) => {
        if (index < pasoDestino) {
            indicador.classList.add('activo');
        } else {
            indicador.classList.remove('activo');
        }
    });
}

// Función para seleccionar tarjetas (Especialidad, Doctor u Hora)
function seleccionarOpcion(elemento, grupo) {
    // Buscar todos los elementos del mismo grupo (para desmarcarlos)
    const hermanos = elemento.parentElement.querySelectorAll('.card-opcion, .hora-slot');
    hermanos.forEach(hermano => hermano.classList.remove('seleccionado'));
    
    // Marcar el que recibió el clic
    elemento.classList.add('seleccionado');
}