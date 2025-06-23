// Toggle menú móvil
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Manejar envío de formulario contacto (simulado)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMessage.textContent = "¡Gracias por contactarnos! Responderemos pronto.";
  contactForm.reset();
});

// Manejar envío de comentarios (simulado)
const commentForm = document.getElementById('comment-form');

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const textarea = commentForm.querySelector('textarea');
  if (!textarea.value.trim()) return;

  const commentsDiv = document.querySelector('.comments');
  const newComment = document.createElement('article');
  newComment.classList.add('comment');
  newComment.innerHTML = `<p><strong>Usuario:</strong> ${textarea.value.trim()}</p>`;
  commentsDiv.appendChild(newComment);

  textarea.value = '';
});

// Simular búsqueda de becas (solo visual)
const becasForm = document.getElementById('becas-form');
const becasResults = document.querySelector('.becas-results');

becasForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Función de búsqueda de becas aún no disponible.');
});

// Simular formulario de pagos (solo visual)
const pagosForm = document.getElementById('pagos-form');

pagosForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Función de pagos no implementada. Esto es solo visual.');
});
