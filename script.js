const datosEspecialidades = [
    {
        titulo: "Urgencias y Rescate",
        texto: "Atención crítica inmediata 24/7. Nuestro equipo está altamente capacitado en maniobras de reanimación cardiopulmonar (RCP) y protocolos de seguridad, incluyendo el manejo avanzado de extintores para controlar emergencias y proteger la vida en cualquier escenario.",
        img: "https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=800"
    },
    {
        titulo: "Cardiología",
        texto: "Monitoreo, prevención y cirugía cardiovascular con la más alta tecnología. Realizamos estudios avanzados y procedimientos mínimamente invasivos para cuidar el motor de tu cuerpo con precisión.",
        img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
    },
    {
        titulo: "Pediatría",
        texto: "Un entorno mágico y seguro diseñado especialmente para la recuperación y el bienestar de los más pequeños. Atención compasiva y especializada desde el nacimiento hasta la adolescencia.",
        img: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800"
    },
    {
        titulo: "Neurología",
        texto: "Especialistas en el sistema nervioso central y periférico. Brindamos diagnósticos precisos mediante neuroimagen avanzada para tratamientos efectivos de trastornos neurológicos.",
        img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800"
    },
    {
        titulo: "Traumatología",
        texto: "Rehabilitación y cirugía ortopédica integral. Nuestro objetivo es que recuperes tu movilidad y calidad de vida al máximo a través de terapias personalizadas e intervenciones seguras.",
        img: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=800"
    },
    {
        titulo: "Oftalmología",
        texto: "Protegemos tu visión con evaluaciones oftalmológicas detalladas, diagnósticos precisos y cirugías láser de última generación para una recuperación visual rápida y efectiva.",
        img: "https://images.unsplash.com/photo-1579684453401-8c08cb83a455?w=800"
    }
];

let anguloActual = 0; 

function cambiarEspecialidad(indice, elementoClickeado, anguloDestino) {
    const items = document.querySelectorAll('.item-borde');
    items.forEach(item => item.classList.remove('activo'));
    elementoClickeado.classList.add('activo');

    let targetGiro = -anguloDestino; 
    let diff = (targetGiro - anguloActual) % 360;

    if (diff > 180) diff -= 360;
    else if (diff <= -180) diff += 360;

    anguloActual += diff;

    const anillo = document.getElementById('anillo-iconos');
    if(anillo) { anillo.style.setProperty('--giro', anguloActual + 'deg'); }

    const circulo = document.getElementById('circulo-imagen');
    if(circulo) { circulo.style.backgroundImage = `url('${datosEspecialidades[indice].img}')`; }

    const panelInfo = document.getElementById('info-panel');
    const titulo = document.getElementById('info-titulo');
    const texto = document.getElementById('info-texto');

    if (panelInfo && titulo && texto) {
        panelInfo.style.animation = 'none';
        panelInfo.offsetHeight; 
        
        titulo.innerText = datosEspecialidades[indice].titulo;
        texto.innerText = datosEspecialidades[indice].texto;
        
        panelInfo.style.animation = 'entrarTexto 0.6s ease-out';
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) { input.type = input.type === "password" ? "text" : "password"; }
}