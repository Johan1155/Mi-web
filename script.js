// Menú responsive
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Scroll suave para los enlaces del menú
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      navLinks.classList.remove('open');
    }
  });
});

// Animación aparición comunidad
document.querySelectorAll('.comunidad-feed blockquote').forEach((el, i) => {
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.opacity = 0.93;
    el.style.transition = 'opacity 1s';
  }, 600 + i * 600);
});

// Formulario de contacto con mensaje de éxito
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const mensaje = document.getElementById('form-mensaje');
  mensaje.textContent = '¡Gracias por contactarnos! Te responderemos pronto.';
  mensaje.style.color = '#ef4444';
  this.reset();
  setTimeout(() => {
    mensaje.textContent = '';
  }, 4000);
});

/* --- Búsqueda inteligente en frontend --- */

// Crear un input para búsqueda, lo puedes poner en HTML (por ejemplo en sección comunidad o header)
const searchContainer = document.createElement('div');
searchContainer.style.margin = '20px auto';
searchContainer.style.textAlign = 'center';
searchContainer.innerHTML = `
  <input type="text" id="searchInput" placeholder="Busca palabras clave..." style="width: 80%; max-width: 400px; padding: 10px; font-size: 1rem; border-radius: 8px; border: 1.5px solid #ef4444; background: #101014; color: #fff;" />
  <p id="searchResult" style="color: #ef4444; margin-top: 10px;"></p>
`;
document.querySelector('main').prepend(searchContainer);

// Buscar dentro de testimonios (puedes adaptar para otros bloques)
const testimonios = Array.from(document.querySelectorAll('.testimonial-card p'));

const input = document.getElementById('searchInput');
const result = document.getElementById('searchResult');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase().trim();
  let matches = 0;

  testimonios.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query) && query !== '') {
      card.parentElement.style.display = 'block'; // mostrar testimonio que coincide
      matches++;
    } else {
      card.parentElement.style.display = 'none'; // ocultar otros
    }
  });

  if (query === '') {
    testimonios.forEach(card => {
      card.parentElement.style.display = 'block'; // mostrar todos si el input está vacío
    });
    result.textContent = '';
  } else {
    result.textContent = `${matches} resultado(s) para "${query}"`;
  }
});
