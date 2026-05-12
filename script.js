/* =============================================
   Santi — Portfolio · script.js
   ============================================= */

// ===== TERMINAL HERO: TYPING =====
const termLines = [
  'Hola, soy Santiago Fuentes.',
  'Programo desde Valencia.',
  '4º Ing. Informática · UPV · Especialidad Software',
  'Actualmente Ingeniero de Software en Visual Limes →',
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

// ===== BOOT SEQUENCE & INIT =====
const bootLines = [
  '[ OK ] Cargando kernel...',
  '[ OK ] Montando sistema de archivos...',
  '[ OK ] Inicializando UI de Santiago...',
  'Access Granted.'
];

function runBootSequence() {
  const bootScreen = document.getElementById('bootScreen');
  const bootText = document.getElementById('bootText');
  if (!bootScreen || !bootText) {
    typeTerminal();
    return;
  }
  
  document.body.style.overflow = 'hidden';
  let i = 0;
  function showNext() {
    if (i >= bootLines.length) {
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        document.body.style.overflow = '';
        setTimeout(typeTerminal, 500);
      }, 600);
      return;
    }
    const p = document.createElement('p');
    p.textContent = bootLines[i];
    bootText.appendChild(p);
    i++;
    setTimeout(showNext, 150 + Math.random() * 200);
  }
  setTimeout(showNext, 200);
}

window.addEventListener('load', runBootSequence);

// ===== INTERACTIVE TERMINAL =====
const termInput = document.getElementById('termInput');
const cmdHistory = document.getElementById('cmdHistory');

if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let rawVal = termInput.value.trim();
      termInput.value = '';
      
      const newBlock = document.createElement('div');
      newBlock.className = 'term-block';
      let output = '';
      
      if (rawVal === '') {
        // do nothing
      } else {
        let val = rawVal;
        if (val.startsWith('/')) val = val.substring(1); // soporte para /help, /cd, etc.
        const parts = val.split(' ').filter(p => p);
        const cmd = parts[0] ? parts[0].toLowerCase() : '';
        const args = parts.slice(1);

        if (cmd === 'help') {
          output = 'Comandos disponibles: help, whoami, clear, date, sudo, ls, cd, cat, github, curl, theme';
        } else if (cmd === 'whoami') {
          output = 'invitado (no tienes suficientes permisos)';
        } else if (cmd === 'date') {
          output = new Date().toString();
        } else if (cmd === 'sudo') {
          output = 'sudo: permision denied (y si tuvieras permisos, ¿qué ibas a hacer?)';
        } else if (cmd === 'clear') {
          cmdHistory.innerHTML = '';
          return;
        } else if (cmd === 'ls') {
          output = 'sobre_mi.txt   skills.json   proyectos/   cursos.txt   contact.sh';
        } else if (cmd === 'github') {
          output = 'Abriendo GitHub...';
          window.open('https://github.com/San1190', '_blank');
        } else if (cmd === 'curl') {
          if (args[0] === 'cv') {
            output = 'Descargando curriculum vitae... (simulado, pero pronto real)';
          } else {
            output = 'curl: try \'curl --help\' or \'curl cv\'';
          }
        } else if (cmd === 'theme') {
          if (args[0] === 'hacker' || args.length === 0) {
            document.documentElement.style.setProperty('--green', '#00ff00');
            output = 'Tema cambiado a: hacker (por defecto)';
          } else if (args[0] === 'cyan') {
            document.documentElement.style.setProperty('--green', '#00d5ff');
            output = 'Tema cambiado a: cyan';
          } else {
            output = 'Temas disponibles: hacker, cyan';
          }
        } else if (cmd === 'cd') {
          if (args.length === 0 || args[0] === '~') {
            output = ''; // cd sin nada no hace nada visualmente
          } else {
            output = `bash: cd: ${args[0]}: No existe el directorio o no tienes permisos`;
          }
        } else if (cmd === 'cat') {
          if (args[0] === 'sobre_mi.txt') {
            output = termLines.join('<br>');
          } else if (args[0]) {
            output = `cat: ${args[0]}: No existe el archivo`;
          } else {
            output = 'cat: falta el operando de archivo';
          }
        } else {
          output = 'bash: comando no encontrado: ' + rawVal;
        }
      }
      
      let outHtml = '';
      if (output) {
        outHtml = `<div class="term-output"><p>${output}</p></div>`;
      }
      
      newBlock.innerHTML = `<p><span class="prompt">santiago@upv:~$</span> <span class="cmd">${rawVal}</span></p>${outHtml}`;
      cmdHistory.appendChild(newBlock);
    }
  });
}


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

// Las ventanas son draggables y sus botones funcionales
document.querySelectorAll('.window').forEach(win => {
  const bar = win.querySelector('.win-bar');
  if (win.id && bar && bar.id) {
    makeDraggable(win.id, bar.id);
  }
  
  // Lógica de botones rojo, amarillo, verde
  const dotR = win.querySelector('.dot-r');
  const dotY = win.querySelector('.dot-y');
  const dotG = win.querySelector('.dot-g');
  const body = win.querySelector('.win-body');
  
  if (dotR) {
    dotR.addEventListener('click', (e) => {
      e.stopPropagation();
      win.style.display = 'none'; // cerrar
    });
  }
  if (dotY && body) {
    dotY.addEventListener('click', (e) => {
      e.stopPropagation();
      body.style.display = body.style.display === 'none' ? 'block' : 'none'; // minimizar
    });
  }
  if (dotG) {
    let isMax = false;
    let oldStyles = '';
    dotG.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isMax) {
        oldStyles = win.style.cssText;
        win.style.position = 'fixed';
        win.style.top = '0';
        win.style.left = '0';
        win.style.width = '100vw';
        win.style.height = '100vh';
        win.style.zIndex = 9999;
        win.style.borderRadius = '0';
        if (body) body.style.height = 'calc(100vh - 40px)';
        if (body) body.style.overflowY = 'auto';
        isMax = true;
      } else {
        win.style.cssText = oldStyles;
        if (body) body.style.height = '';
        isMax = false;
      }
    });
  }
});


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

// ===== SCROLLSPY =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(sec => spyObserver.observe(sec));
