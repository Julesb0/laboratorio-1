/*  Developer 3 - feature/interactividad-js */
// menu responsivo
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const abierto = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', abierto);
});

// cerrar menu al hacer click en un link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// header cambia al hacer scroll
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// scroll suave para los enlaces del nav
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (!destino) return;
    e.preventDefault();
    destino.scrollIntoView({ behavior: 'smooth' });
  });
});

// validacion del formulario
const form = document.getElementById('contactForm');

function mostrarError(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + '-error');
  if (input) input.classList.add('error');
  if (error) error.textContent = mensaje;
}

function limpiarError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + '-error');
  if (input) input.classList.remove('error');
  if (error) error.textContent = '';
}

function validarFormulario() {
  let valido = true;

  const nombre = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const destino = document.getElementById('destination').value;
  const fecha = document.getElementById('travelDate').value;
  const terminos = document.getElementById('terms').checked;

  limpiarError('fullName');
  limpiarError('email');
  limpiarError('destination');
  limpiarError('travelDate');
  limpiarError('terms');

  if (nombre.length < 3) {
    mostrarError('fullName', 'Ingresa tu nombre completo');
    valido = false;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    mostrarError('email', 'Ingresa un correo válido');
    valido = false;
  }

  if (!destino) {
    mostrarError('destination', 'Selecciona un destino');
    valido = false;
  }

  if (!fecha) {
    mostrarError('travelDate', 'Selecciona una fecha');
    valido = false;
  }

  if (!terminos) {
    mostrarError('terms', 'Debes aceptar los términos');
    valido = false;
  }

  return valido;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const exito = document.getElementById('formSuccess');
      const boton = document.getElementById('submitBtn');
      exito.removeAttribute('hidden');
      boton.disabled = true;
      boton.textContent = 'Enviado ✓';
      form.reset();
    }
  });
}

// boton CTA del hero
const heroCta = document.getElementById('heroCta');
if (heroCta) {
  heroCta.addEventListener('click', (e) => {
    e.preventDefault();
    const contacto = document.getElementById('contacto');
    if (contacto) {
      contacto.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// animaciones al hacer scroll
const elementosAnimados = document.querySelectorAll('.experience-card, .benefit-card, .destination-card, .testimonial-card');

elementosAnimados.forEach(el => {
  el.classList.add('fade-in-scroll');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

elementosAnimados.forEach(el => observer.observe(el));

// contador animado de estadisticas
function animarContador(elemento, objetivo, duracion) {
  let inicio = 0;
  const paso = Math.ceil(objetivo / (duracion / 16));

  const intervalo = setInterval(() => {
    inicio += paso;
    if (inicio >= objetivo) {
      elemento.textContent = objetivo.toLocaleString();
      clearInterval(intervalo);
    } else {
      elemento.textContent = inicio.toLocaleString();
    }
  }, 16);
}

const statsSection = document.querySelector('.trust-stats');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(stat => {
          const objetivo = parseInt(stat.getAttribute('data-target'));
          animarContador(stat, objetivo, 1500);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}