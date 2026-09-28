let currentPage = 1;
const totalPages = PAGES_DATA.length;

/* ================== РЕНДЕР СТРАНИЦ ================== */
function renderPages() {
  const container = document.getElementById('pages');
  const dotsEl = document.getElementById('dots');

  PAGES_DATA.forEach((p, i) => {
    const n = i + 1;
    const sec = document.createElement('section');
    sec.className = 'page' + (n === 1 ? ' active' : '');
    sec.id = 'page' + n;

    if (p.final) {
      sec.innerHTML = `
        <div class="final-title">${p.title}</div>
        <div class="final-text">${p.text}</div>
        <div style="margin-top:34px"><button class="btn-next" onclick="finalBurst()">Нажми меня 💥</button></div>
        <div style="margin-top:18px"><button class="btn-next prev" onclick="goTo(${n-1},event)">← Назад</button></div>
      `;
    } else {
      const photo = p.photo ? `<img class="avatar" src="${p.photo}" alt="Вера">` : '';
      const prevBtn = n > 1 ? `<button class="btn-next prev" onclick="goTo(${n-1},event)">← Назад</button>` : '';
      const nextBtn = n < totalPages
        ? `<button class="btn-next" onclick="goTo(${n+1},event)">Дальше →</button>`
        : `<button class="btn-next" onclick="goTo(1,event)">В начало 🔄</button>`;
      sec.innerHTML = `
        <div class="card">
          ${photo}
          <div class="title">${p.title}</div>
          <div class="subtitle">${p.subtitle}</div>
          <div class="heart-big">${p.heart}</div>
          <div class="text">${p.text}</div>
          <div class="roses">${p.roses}</div>
          <div class="signature">${p.sign}</div>
          <div class="btn-row">${prevBtn}${nextBtn}</div>
        </div>
      `;
    }
    container.appendChild(sec);

    const d = document.createElement('div');
    d.className = 'dot' + (n === 1 ? ' active' : '');
    d.onclick = () => goTo(n);
    dotsEl.appendChild(d);
  });
}

function goTo(n, e) {
  if (e) e.preventDefault();
  if (n < 1 || n > totalPages) return;
  document.getElementById('page' + currentPage).classList.remove('active');
  document.getElementById('page' + n).classList.add('active');
  currentPage = n;
  updateDots();
  window.scrollTo({top: 0, behavior: 'smooth'});
  if (PAGES_DATA[n-1].final) finalBurst();
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i + 1 === currentPage);
  });
}

/* ================== ЭФФЕКТЫ ================== */
const fxLayer = document.getElementById('fxLayer');
const hearts = ['❤️','💖','💗','💓','💕','🌸','💘','💝','🌷','🌹','💞','💛','💙'];
const phrases = [
  'Вера, ты чудо 💖','Люблю тебя ❤️','Ты самая лучшая 🌸',
  'Моё сердце — твоё 💕','Ты моё счастье ✨','Самая красивая 🌹',
  'Ты мой рассвет 🌅','Обожаю тебя 💋','Ты — моя вселенная ✨',
  'С тобой я дома 🏡','Ты — моя мечта 💫','Моё солнце ☀️',
  'Моя луна 🌙','Навсегда 💞'
];

function spawnHeart(x, y, big) {
  const h = document.createElement('div');
  h.className = 'fx-heart';
  h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  h.style.left = x + 'px';
  h.style.top = y + 'px';
  if (big) h.style.fontSize = (34 + Math.random() * 22) + 'px';
  h.style.setProperty('--dx', ((Math.random() - 0.5) * 520) + 'px');
  h.style.setProperty('--dy', (-220 - Math.random() * 420) + 'px');
  fxLayer.appendChild(h);
  setTimeout(() => h.remove(), 2400);
}

function spawnText(x, y, t) {
  const e = document.createElement('div');
  e.className = 'fx-text';
  e.textContent = t;
  e.style.left = x + 'px';
  e.style.top = y + 'px';
  e.style.setProperty('--dx', ((Math.random() - 0.5) * 420) + 'px');
  e.style.setProperty('--dy', (-160 - Math.random() * 300) + 'px');
  fxLayer.appendChild(e);
  setTimeout(() => e.remove(), 2600);
}

function spawnFirework(x, y) {
  const colors = ['#ff4d8d','#ffb3d1','#fff','#ffd700','#ff69b4','#ff85b3'];
  for (let i = 0; i < 25; i++) {
    const f = document.createElement('div');
    f.className = 'firework';
    f.style.left = x + 'px';
    f.style.top = y + 'px';
    f.style.background = colors[Math.floor(Math.random() * colors.length)];
    const ang = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 200;
    f.style.setProperty('--dx', (Math.cos(ang) * dist) + 'px');
    f.style.setProperty('--dy', (Math.sin(ang) * dist) + 'px');
    fxLayer.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }
}

function burstFrom(cx, cy, c, t) {
  for (let i = 0; i < c; i++) {
    setTimeout(() => spawnHeart(
      cx + (Math.random() - 0.5) * 150,
      cy + (Math.random() - 0.5) * 60,
      i % 3 === 0
    ), i * 32);
  }
  for (let i = 0; i < t; i++) {
    setTimeout(() => spawnText(
      cx + (Math.random() - 0.5) * 220,
      cy + (Math.random() - 0.5) * 80,
      phrases[Math.floor(Math.random() * phrases.length)]
    ), i * 160);
  }
}

function topReact(t) {
  const cx = innerWidth / 2, cy = 60;
  burstFrom(cx, cy, 22, 4);
  spawnText(cx - 70, cy + 40, t);
}

function finalBurst() {
  const cx = innerWidth / 2, cy = innerHeight / 2;
  burstFrom(cx, cy, 70, 18);
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      spawnFirework(Math.random() * innerWidth, innerHeight * 0.4 + Math.random() * 400);
    }, i * 300);
  }
}

/* ================== ФОН: МЯГКИЕ ФИГУРЫ ================== */
function buildSoftBg() {
  const bg = document.getElementById('softBg');
  const shapes = ['❤️','🌸','💗','🌷','💖','🌹','💕','✨','💞','💛'];
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'soft-shape';
    s.textContent = shapes[i % shapes.length];
    s.style.left = (Math.random() * 90) + '%';
    s.style.top = (Math.random() * 90) + '%';
    s.style.fontSize = (80 + Math.random() * 120) + 'px';
    s.style.opacity = (0.05 + Math.random() * 0.10).toFixed(2);
    s.style.animationDelay = (Math.random() * 10) + 's';
    s.style.animationDuration = (10 + Math.random() * 8) + 's';
    bg.appendChild(s);
  }
}

/* ================== ЗВЁЗДЫ ================== */
function buildStars() {
  const layer = document.getElementById('starLayer');
  for (let i = 0; i < 180; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = 1 + Math.random() * 3;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (Math.random() * 100) + '%';
    s.style.animationDelay = (Math.random() * 4) + 's';
    s.style.animationDuration = (2 + Math.random() * 4) + 's';
    layer.appendChild(s);
  }
}

/* ================== ЛЕПЕСТКИ ================== */
function buildPetals() {
  const layer = document.getElementById('petalLayer');
  for (let i = 0; i < 120; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = Math.random() > 0.5 ? '🌸' : '🌷';
    p.style.left = (Math.random() * 100) + '%';
    p.style.fontSize = (12 + Math.random() * 18) + 'px';
    p.style.animationDuration = (9 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 18) + 's';
    layer.appendChild(p);
  }
}

/* ================== ЛУЧИ ================== */
function buildRays() {
  const layer = document.getElementById('rayLayer');
  for (let i = 0; i < 30; i++) {
    const r = document.createElement('div');
    r.className = 'ray';
    r.style.left = (Math.random() * 100) + '%';
    r.style.height = (80 + Math.random() * 200) + 'px';
    r.style.animationDuration = (4 + Math.random() * 6) + 's';
    r.style.animationDelay = (Math.random() * 8) + 's';
    layer.appendChild(r);
  }
}

/* ================== ВОЛНЫ ================== */
function buildWaves() {
  const layer = document.getElementById('waveLayer');
  for (let i = 0; i < 5; i++) {
    const w = document.createElement('div');
    w.className = 'wave';
    w.style.bottom = (i * 20) + 'px';
    w.style.opacity = (0.2 + i * 0.08).toFixed(2);
    w.style.animationDuration = (8 + i * 2) + 's';
    w.style.animationDelay = (i * 1.5) + 's';
    layer.appendChild(w);
  }
}

/* ================== ПАДАЮЩИЕ ЗВЁЗДЫ ================== */
function launchShootingStar() {
  const sf = document.getElementById('starLayer');
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.left = (Math.random() * 40) + '%';
  s.style.top = (Math.random() * 40) + '%';
  s.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
  sf.appendChild(s);
  setTimeout(() => s.remove(), 3200);
}
setInterval(launchShootingStar, 3500);

/* ================== КЛИК ================== */
document.body.addEventListener('click', function(e) {
  if (e.target.closest('button') || e.target.closest('.card')) return;
  spawnHeart(e.clientX, e.clientY, true);
  spawnFirework(e.clientX, e.clientY);
});

/* ================== СТАРТ ================== */
renderPages();
buildSoftBg();
buildStars();
buildPetals();
buildRays();
buildWaves();
updateDots();
