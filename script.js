/* =============================================
   Santi — Portfolio · script.js
   ============================================= */

// ===== TERMINAL HERO: TYPING =====
const termLines = [
  'Hola, soy Santiago Fuentes.',
  'Programo desde Valencia.',
  '4º Ing. Informática · UPV · Especialidad Software',
  'Actualmente en prácticas en Visual Limes →',
  '  Java + Spring Boot + Vaadin sobre código real',
  '',
  'Escribo código, cometo errores y los arreglo.',
  'A veces en ese orden.',
];

function typeTerminal() {
  const el = document.getElementById('termTyped');
  if (!el) return;
  let i = 0;

  function addLine() {
    if (i >= termLines.length) return;
    const p = document.createElement('p');
    p.style.opacity = '0';
    p.style.transition = 'opacity 0.35s ease';
    p.textContent = termLines[i] || ' ';
    el.appendChild(p);
    setTimeout(() => { p.style.opacity = '1'; }, 30);
    i++;
    setTimeout(addLine, 140);
  }

  setTimeout(addLine, 900);
}

window.addEventListener('load', typeTerminal);


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
  });
});


// ===== FADE IN ON SCROLL =====
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));


// ===== DRAGGABLE WINDOWS =====
let zCounter = 10;
function getNextZ() { return ++zCounter; }

function makeDraggable(winId, barId) {
  const win = document.getElementById(winId);
  const bar = document.getElementById(barId);
  if (!win || !bar) return;

  let dragging = false;
  let ox = 0, oy = 0;

  bar.addEventListener('mousedown', e => {
    dragging = true;
    if (win.style.position !== 'absolute') {
      const rect = win.getBoundingClientRect();
      win.style.position = 'absolute';
      win.style.left  = rect.left + 'px';
      win.style.top   = (rect.top + window.scrollY) + 'px';
      win.style.width = rect.width + 'px';
      win.style.margin = '0';
      document.body.appendChild(win);
    }
    win.style.zIndex = getNextZ();
    ox = e.clientX - parseInt(win.style.left);
    oy = e.clientY - parseInt(win.style.top) + window.scrollY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    win.style.left = (e.clientX - ox) + 'px';
    win.style.top  = (e.clientY - oy + window.scrollY) + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });

  win.addEventListener('mousedown', () => {
    win.style.zIndex = getNextZ();
  });
}

// Las ventanas de proyectos son draggables
makeDraggable('winP1', 'dragP1');
makeDraggable('winP2', 'dragP2');
makeDraggable('winP3', 'dragP3');
makeDraggable('winP4', 'dragP4');


// ===== EASTER EGG: GATO (Miau Flips) =====
let catFlips    = 0;
let catRotation = 0;

const catEgg     = document.getElementById('catEgg');
const catImg     = document.getElementById('catImg');
const catCounter = document.getElementById('catCounter');
const catNum     = document.getElementById('catNum');

if (catEgg) {
  catEgg.addEventListener('click', () => {
    catFlips++;
    catRotation += 360;

    catImg.style.transition = 'transform 0.5s ease';
    catImg.style.transform  = 'rotate(' + catRotation + 'deg)';

    catCounter.classList.remove('hidden');
    const col = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    catNum.textContent  = catFlips;
    catNum.style.color  = col;

    if (catFlips === 10) {
      catImg.style.boxShadow = '0 0 20px #00ff00';
      console.log('%c Megu aprueba tu visita. 10/10.', 'color:#00ff00;font-family:monospace;font-size:14px');
    }
  });
}


// ===== KONAMI CODE -> MATRIX RAIN =====
const KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let ki = 0;

document.addEventListener('keydown', e => {
  ki = (e.keyCode === KONAMI[ki]) ? ki + 1 : 0;
  if (ki === KONAMI.length) { ki = 0; startMatrix(); }
});

function startMatrix() {
  const overlay = document.getElementById('matrixOverlay');
  const canvas  = document.getElementById('matrixCanvas');
  const closeBtn = document.getElementById('closeMatrix');
  if (!overlay || !canvas) return;

  overlay.classList.remove('hidden');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx  = canvas.getContext('2d');
  const size = 14;
  const cols = Math.floor(canvas.width / size);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  let raf;

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    ctx.font = size + 'px monospace';
    drops.forEach((y, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * size, y * size);
      if (y * size > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    raf = requestAnimationFrame(draw);
  }

  draw();

  closeBtn.onclick = () => {
    cancelAnimationFrame(raf);
    overlay.classList.add('hidden');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
