// Toggle menú para móviles
const toggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Scroll animado (solo decorativo)
const links = document.querySelectorAll(".nav-links a");

for (const link of links) {
  link.addEventListener("click", smoothScroll);
}

function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href").slice(1);
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Mensaje al enviar formulario
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
  form.reset();
});
