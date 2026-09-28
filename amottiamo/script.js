const messages = [
  "Te amo por ser tú, sin tener que cambiar para gustarme.",
  "Te amo por la forma tan bonita en la que haces que mis días sean mejores.",
  "Te amo por tu manera de pensar, por tu corazón y por todo lo que llevas dentro.",
  "Admiro muchísimo la persona que eres y todo lo que eres capaz de lograr.",
  "Nunca olvides que puedes con mucho más de lo que a veces crees.",
  "Cuando algo se ponga difícil, recuerda todo lo que ya has logrado superar.",
  "No tienes que ser perfecta para que yo te ame. Te amo por ser completamente tú.",
  "Amo tu forma de hacerme sonreír incluso cuando no estoy teniendo mi mejor día.",
  "Amo tus detalles, tus ocurrencias, tus palabras y hasta esas pequeñas cosas que quizá tú no notas.",
  "Quiero que nunca dudes de lo valiosa que eres. Mereces sentirte orgullosa de ti misma.",
  "Si alguna vez sientes que no puedes más, recuerda que no tienes que enfrentar todo sola.",
  "Voy a estar a tu lado para apoyarte, escucharte y celebrar cada uno de tus logros.",
  "Te amo por tu mente, tu corazón, tu forma de ser y por la persona que sigues construyendo cada día.",
  "Quiero verte cumplir tus sueños y estar ahí para decirte: ‘sabía que podías hacerlo’.",
  "De todas las estrellas que existen, mi favorita siempre vas a ser tú. Y si algún día olvidas lo increíble que eres, vuelve a este pequeño universo y recuerda que alguien te ama muchísimo y cree en ti."
];

// Posiciones aproximadas (porcentajes) pensadas para móvil
const positions = [
  { top: 16, left: 14 },
  { top: 20, left: 70 },
  { top: 30, left: 26 },
  { top: 26, left: 54 },
  { top: 40, left: 10 },
  { top: 46, left: 78 },
  { top: 53, left: 33 },
  { top: 50, left: 60 },
  { top: 62, left: 16 },
  { top: 66, left: 72 },
  { top: 73, left: 40 },
  { top: 36, left: 86 },
  { top: 78, left: 22 },
  { top: 80, left: 58 },
  { top: 47, left: 47 }  // Estrella especial (centro)
];

// === CONFIGURA AQUÍ LA FECHA DE INICIO DE LA RELACIÓN ===
// Formato: Año, Mes (0-11, donde 0 es Enero y 10 es Noviembre), Día
const startDate = new Date(2025, 10, 25); 

const starsContainer = document.getElementById('starsContainer');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const modalStar = document.getElementById('modalStar');
const closeBtn = document.getElementById('closeBtn');
const bgStars = document.getElementById('bgStars');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const counterEl = document.getElementById('counter');

let isPlaying = false;

// Crear estrellas de fondo decorativas
function createBackgroundStars() {
  for (let i = 0; i < 90; i++) {
    const star = document.createElement('div');
    star.classList.add('bg-star');
    star.style.top = Math.random() * 100 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.opacity = 0.15 + Math.random() * 0.5;
    const size = 1 + Math.random() * 2;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    bgStars.appendChild(star);
  }
}

// Crear las 15 estrellas interactivas
function createStars() {
  messages.forEach((msg, index) => {
    const star = document.createElement('div');
    star.classList.add('star');
    star.textContent = index === 14 ? '🌟' : '⭐';

    if (index === 14) {
      star.classList.add('special');
    }

    const pos = positions[index];
    star.style.top = pos.top + '%';
    star.style.left = pos.left + '%';

    // Delay de animación
    star.style.animationDelay = `${index * 0.11}s, ${index * 0.3}s`;

    // Duración flotación variada
    const floatDuration = 5 + (index % 5) * 0.7;
    star.style.setProperty('--float-duration', floatDuration + 's');

    // Activar clase para animación
    setTimeout(() => {
      star.classList.add('appear');
    }, 100);

    // Evento al hacer click o tocar la estrella
    star.addEventListener('click', () => {
      openModal(msg, index === 14);
    });

    starsContainer.appendChild(star);
  });
}

// Abrir modal
function openModal(text, isSpecial) {
  modalText.textContent = text;
  modalStar.textContent = isSpecial ? '🌟' : '⭐';
  modal.classList.add('active');
}

// Cerrar modal
function closeModal() {
  modal.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Control de Música
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.classList.remove('playing');
  } else {
    bgMusic.play();
    musicBtn.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

// Actualizar Contador de Tiempo
function updateCounter() {
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const months = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  if (months >= 1) {
    counterEl.textContent = `${months} mes${months > 1 ? 'es' : ''} y ${remainingDays} día${remainingDays !== 1 ? 's' : ''} juntos… 💜`;
  } else {
    counterEl.textContent = `${diffDays} día${diffDays !== 1 ? 's' : ''} juntos… 💜`;
  }
}

// Inicializar todo cuando carga la página
window.addEventListener('DOMContentLoaded', () => {
  createBackgroundStars();
  createStars();
  updateCounter();
});