// Aquí podrás poner funciones para botones, formularios, etc.
console.log("FuturoUSA cargado correctamente.");

// Toggle menú móvil
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Manejar envío de formulario (solo muestra mensaje, sin backend)
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Aquí podrías validar o enviar con fetch a un backend
  // Por ahora solo mostramos mensaje de éxito

  formMessage.textContent = "¡Gracias por contactarnos! Responderemos pronto.";
  form.reset();
});
