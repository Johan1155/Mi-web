// Menú responsive
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}


// Scroll suave para los enlaces del menú
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            // Cierra el menú en móviles después de hacer clic en un enlace
            if (navLinks) {
                navLinks.classList.remove('open');
            }
        }
    });
});

// Animación aparición comunidad (si las citas se cargan dinámicamente, este código puede necesitar ajuste)
document.querySelectorAll('.comunidad-feed blockquote').forEach((el, i) => {
    // Añadir un pequeño retraso solo si el elemento es visible inicialmente
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 0.93;
                    entry.target.style.transition = 'opacity 1s';
                }, 600 + i * 600);
                observer.unobserve(entry.target); // Dejar de observar una vez que se anima
            }
        });
    }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible
    observer.observe(el);
});


// Formulario de contacto con mensaje de éxito (se mantiene para la interfaz)
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const mensaje = document.getElementById('form-mensaje');
    if (mensaje) {
        mensaje.textContent = '¡Gracias por contactarnos! Te responderemos pronto.';
        mensaje.style.color = '#ef4444'; // Color de éxito, puedes ajustarlo en CSS
        this.reset();
        setTimeout(() => {
            mensaje.textContent = '';
        }, 4000);
    }
    // NOTA: La lógica de envío real (a la base de datos, email, etc.) irá en el backend (index.js)
});


/* --- Búsqueda en el Navbar (Conexión al Backend) --- */

const btnBuscar = document.getElementById('btnBuscar');
const inputBusqueda = document.getElementById('busqueda');
const listaResultados = document.getElementById('lista-resultados'); // Ahora usamos directamente lista-resultados
const resultadosSection = document.getElementById('resultados'); // La sección completa de resultados

// Función principal para buscar
async function buscarContenido() {
    const query = inputBusqueda.value.trim();
    if (!query) {
        listaResultados.innerHTML = '<p>Por favor, escribe algo para buscar.</p>';
        resultadosSection.style.display = 'block'; // Mostrar la sección de resultados
        document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // Muestra un mensaje de carga
    listaResultados.innerHTML = '<p>Buscando...</p>';
    resultadosSection.style.display = 'block';
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });


    try {
        const res = await fetch(`http://localhost:3000/buscar?q=${encodeURIComponent(query)}`);
        if (!res.ok) { // Manejo de errores HTTP (ej. 404, 500)
            throw new Error(`Error HTTP: ${res.status}`);
        }
        const data = await res.json();

        listaResultados.innerHTML = ''; // Limpia resultados anteriores

        if (data.resultados && data.resultados.length === 0) {
            listaResultados.innerHTML = '<p>No se encontraron resultados.</p>';
        } else if (data.resultados) {
            data.resultados.forEach(item => {
                const li = document.createElement('li');
                li.className = 'card card-efecto'; // Reusa tus clases de tarjeta
                li.innerHTML = `<h3>${item}</h3><p>Información relacionada con: <strong>${query}</strong></p>`;
                listaResultados.appendChild(li);
            });
        } else {
            // Manejo si la respuesta JSON no tiene la propiedad 'resultados'
            listaResultados.innerHTML = '<p>Formato de respuesta inesperado del servidor.</p>';
        }

    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        listaResultados.innerHTML = `<p>Error al conectar con el servidor o al procesar la búsqueda: ${error.message}.</p>`;
    }
}

// Evento botón buscar
btnBuscar?.addEventListener('click', buscarContenido);

// Evento tecla Enter en input búsqueda
inputBusqueda?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // evita que se envíe formulario o recargue la página
        buscarContenido();
    }
});

// Código para el slider de testimonios (FALTA IMPLEMENTAR: ESTE ES SOLO UN ESQUELETO)
const testimonialTrack = document.getElementById('testimonialTrack');
const prevTestiBtn = document.getElementById('prevTesti');
const nextTestiBtn = document.getElementById('nextTesti');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonialTrack && prevTestiBtn && nextTestiBtn && testimonialDots) {
    let currentIndex = 0;
    const cards = testimonialTrack.children;
    const totalCards = cards.length;
    let cardWidth = cards[0] ? cards[0].offsetWidth : 0; // Se recalculará en resize

    function updateSlider() {
        if (!cards[0]) return; // Asegurarse de que hay tarjetas
        cardWidth = cards[0].offsetWidth; // Recalcular en cada actualización por si el tamaño cambió
        const offset = -currentIndex * cardWidth;
        testimonialTrack.style.transform = `translateX(${offset}px)`;

        // Actualizar puntos de navegación
        testimonialDots.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            testimonialDots.appendChild(dot);
        }
    }

    prevTestiBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalCards - 1;
        updateSlider();
    });

    nextTestiBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Inicializar y recalcular en resize
    window.addEventListener('resize', updateSlider);
    updateSlider(); // Llamada inicial para establecer el estado
}

// Para hacer que la sección de resultados esté oculta por defecto y solo se muestre con la búsqueda
if (resultadosSection) {
    // Si la lista de resultados está vacía al cargar, ocultar la sección
    if (listaResultados && listaResultados.children.length === 0) {
        resultadosSection.style.display = 'none';
    }
}