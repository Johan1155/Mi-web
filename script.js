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
      document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
    }
  });
});

// Animación de aparición para los bloques de comunidad
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