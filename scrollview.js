/* ============================================================
   VEEDORAA — Scroll Animations + 3D Effects
   scrollview.js
   ============================================================ */

/* ── 1. SCROLL PROGRESS BAR ────────────────────────────────── */
const bar = document.createElement('div');
bar.style.cssText = `
  position:fixed;top:0;left:0;height:3px;width:0%;
  background:linear-gradient(90deg,#6c35de,#a78bfa,#c084fc);
  z-index:99999;pointer-events:none;
  transition:width 0.08s linear;
`;
document.body.prepend(bar);
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + '%';
}, { passive: true });

/* ── 2. INJECT CSS ─────────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = `

/* ═══════════════════════════════════════════
   TIMELINE — line goes BEHIND the circles
═══════════════════════════════════════════ */

.timeline {
  position: relative !important;
}

.tl-line {
  position: absolute !important;
  top: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 2px !important;
  height: 100% !important;
  background: rgba(108,53,222,0.15) !important;
  z-index: 0 !important;
}

.tl-fill {
  position: absolute !important;
  top: 0 !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 2px !important;
  height: 0 !important;
  background: linear-gradient(180deg,#6c35de,#a78bfa,#c084fc) !important;
  border-radius: 2px !important;
  box-shadow: 0 0 12px rgba(108,53,222,0.5) !important;
  z-index: 1 !important;
  will-change: height;
}

.step {
  position: relative !important;
  z-index: 2 !important;
}

.step-num {
  position: relative !important;
  z-index: 3 !important;
}

.step-circle {
  position: relative !important;
  z-index: 4 !important;
}

/* ── 3D Flip base ── */
.vd-flip {
  opacity: 0;
  transform: perspective(800px) rotateX(55deg) translateY(60px) scale(0.92);
  transform-origin: top center;
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.vd-flip.vd-in {
  opacity: 1;
  transform: perspective(800px) rotateX(0deg) translateY(0px) scale(1);
}

/* Stagger delays */
.vd-flip.d1 { transition-delay: 0.05s; }
.vd-flip.d2 { transition-delay: 0.13s; }
.vd-flip.d3 { transition-delay: 0.21s; }
.vd-flip.d4 { transition-delay: 0.29s; }
.vd-flip.d5 { transition-delay: 0.37s; }

/* Left flip */
.vd-flip-left {
  opacity: 0;
  transform: perspective(800px) rotateY(40deg) translateX(-60px);
  transform-origin: right center;
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.vd-flip-left.vd-in {
  opacity: 1;
  transform: perspective(800px) rotateY(0deg) translateX(0px);
}

/* Right flip */
.vd-flip-right {
  opacity: 0;
  transform: perspective(800px) rotateY(-40deg) translateX(60px);
  transform-origin: left center;
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.vd-flip-right.vd-in {
  opacity: 1;
  transform: perspective(800px) rotateY(0deg) translateX(0px);
}

/* Stagger for step content vs visual */
.step-content.vd-flip-left,
.step-content.vd-flip-right { transition-delay: 0s; }
.step-visual.vd-flip-left,
.step-visual.vd-flip-right  { transition-delay: 0.18s; }

/* Hero word flip */
.hw {
  display: inline-block;
  opacity: 0;
  transform: perspective(400px) rotateX(60deg) translateY(16px);
  animation: wordFlipIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes wordFlipIn {
  to { opacity:1; transform:perspective(400px) rotateX(0deg) translateY(0); }
}

/* Nav scrolled */
#mainNav.nav-scrolled {
  backdrop-filter: blur(20px) !important;
  background: rgba(8,6,24,0.88) !important;
  box-shadow: 0 2px 40px rgba(0,0,0,0.5);
}

/* Step circle active */
.step-circle.sc-active {
  background: linear-gradient(135deg,#6c35de,#a78bfa) !important;
  color: #fff !important;
  box-shadow: 0 0 0 6px rgba(108,53,222,0.2), 0 0 28px rgba(108,53,222,0.5);
  transform: scale(1.14);
  transition: all 0.5s cubic-bezier(0.22,1,0.36,1) !important;
}

/* 3D hover transitions */
.pr-card, .adv-card {
  transition: transform 0.3s ease;
  will-change: transform;
}

/* Popular glow pulse */
.pr-card.popular {
  animation: popularPulse 3s ease-in-out infinite;
}
@keyframes popularPulse {
  0%,100% { box-shadow: 0 0 20px rgba(108,53,222,0.2); }
  50%      { box-shadow: 0 0 50px rgba(108,53,222,0.5), 0 0 80px rgba(167,139,250,0.2); }
}

/* WhatsApp bounce */
.whatsapp-premium-float {
  animation: waBounce 2.8s ease-in-out infinite;
}
@keyframes waBounce {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* BG glow drift */
.bg-glow-r { animation: glowR 9s ease-in-out infinite alternate; }
.bg-glow-l { animation: glowL 11s ease-in-out infinite alternate; }
@keyframes glowR {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(-40px,25px) scale(1.1); }
}
@keyframes glowL {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(25px,-35px) scale(1.07); }
}

/* Float tags */
.float-tag { transition: transform 0.2s ease; will-change: transform; }

/* Stat hover */
.bs-stat { transition: transform 0.3s ease; }
.bs-stat:hover { transform: translateY(-6px) scale(1.03); }

/* Hero video parallax */
#videoOuter {
  will-change: transform;
  transition: transform 0.12s linear;
}

/* Mobile — side rotations become top flip only */
@media (max-width: 768px) {
  .vd-flip-left {
    transform: perspective(800px) rotateX(40deg) translateY(50px) !important;
    transform-origin: top center !important;
  }
  .vd-flip-right {
    transform: perspective(800px) rotateX(40deg) translateY(50px) !important;
    transform-origin: top center !important;
  }
  .vd-flip-left.vd-in,
  .vd-flip-right.vd-in {
    transform: none !important;
  }
}

/* Mobile timeline line stays left */
@media (max-width: 900px) {
  .tl-line, .tl-fill {
    left: 27px !important;
    transform: none !important;
  }
}

`;
document.head.appendChild(style);

/* ── 3. HERO WORD FLIP ─────────────────────────────────────── */
function heroWordFlip() {
  const h = document.querySelector('.hero-h');
  if (!h) return;
  ['dim','bright'].forEach(cls => {
    const span = h.querySelector('.' + cls);
    if (!span) return;
    const words = span.innerText.trim().split(' ');
    span.innerHTML = words.map((w, i) =>
      `<span class="hw" style="animation-delay:${0.15 + i * 0.09}s">${w}&nbsp;</span>`
    ).join('');
  });
}
heroWordFlip();

/* ── 4. INTERSECTION OBSERVER — 3D FLIP ───────────────────── */
const flipObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vd-in');
      flipObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

/* Top-flip elements */
[
  '.ss-card', '.pr-card', '.sp-card', '.video-card',
  '.bs-stat', '.faq-item', '.guarantee',
  '.pf-header', '.section-header', '.adv-badge',
  '.adv-title', '.adv-sub', '.bk-title', '.bk-sub',
  '.trust-row', '.bk-card-wrap', '.hero-content', '.hero-video-outer',
  '.adv-grid', '.slider-wrap', '.tabs-wrapper'
].forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('vd-flip', `d${(i % 5) + 1}`);
    flipObserver.observe(el);
  });
});

/* Side-flip for process steps — left/right 3D animation */
document.querySelectorAll('.step').forEach((step, i) => {
  const content = step.querySelector('.step-content');
  const visual  = step.querySelector('.step-visual');
  const isOdd   = i % 2 === 0; /* odd steps: content left, visual right */

  if (content) {
    content.classList.add(isOdd ? 'vd-flip-left' : 'vd-flip-right');
    flipObserver.observe(content);
  }
  if (visual) {
    visual.classList.add(isOdd ? 'vd-flip-right' : 'vd-flip-left');
    flipObserver.observe(visual);
  }
});

/* ── 5. NAV SHRINK ─────────────────────────────────────────── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── 6. TIMELINE FILL — FIXED ──────────────────────────────── */
/*
   FIX: old code used section height - window.innerHeight which
   breaks when section is shorter than viewport.
   New code: measure how far viewport center has scrolled past
   timeline top — set height in px (not %) so it always reaches bottom.
*/
function updateTimeline() {
  const fill     = document.getElementById('tlFill');
  const timeline = document.querySelector('.timeline');
  if (!fill || !timeline) return;

  const r      = timeline.getBoundingClientRect();
  const totalH = timeline.offsetHeight;

  /* distance viewport center has passed the timeline top */
  const scrolled = Math.max(0, (window.innerHeight * 0.5) - r.top);
  const px       = Math.min(totalH, scrolled);

  fill.style.height = px + 'px';
}
window.addEventListener('scroll', updateTimeline, { passive: true });
updateTimeline();

/* ── 7. STEP CIRCLES ACTIVATE ──────────────────────────────── */
const circleObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('sc-active');
  });
}, { threshold: 0.6 });
document.querySelectorAll('.step-circle').forEach(c => circleObs.observe(c));

/* ── 8. STAT COUNTER ───────────────────────────────────────── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const start  = performance.now();
  const dur    = 1600;
  const tick   = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-counter').forEach(el => cntObs.observe(el));

/* ── 9. HERO VIDEO SCROLL PARALLAX ────────────────────────── */
const vo = document.getElementById('videoOuter');

function videoParallax() {
  if (!vo) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroH   = hero.offsetHeight;
  const scrollY = window.scrollY;
  if (scrollY > heroH) return;
  const progress   = scrollY / heroH;
  const translateY = progress * 45;
  const rotateX    = progress * -6;
  const scale      = 1 - progress * 0.04;
  vo.style.transform = `perspective(900px) translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
}

if (vo) {
  vo.addEventListener('mousemove', e => {
    const r = vo.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    vo.style.transform = `perspective(900px) rotateY(${x*14}deg) rotateX(${-y*10}deg) scale(1.03)`;
  });
  vo.addEventListener('mouseleave', () => { videoParallax(); });
}
window.addEventListener('scroll', videoParallax, { passive: true });
videoParallax();

/* ── 10. 3D TILT — PRICING CARDS ──────────────────────────── */
document.querySelectorAll('.pr-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x*12}deg) rotateX(${-y*10}deg) translateY(-8px) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── 11. 3D TILT — ADV CARDS ───────────────────────────────── */
document.querySelectorAll('.adv-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*8}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── 12. FLOAT TAGS PARALLAX ───────────────────────────────── */
window.addEventListener('mousemove', e => {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  document.querySelectorAll('.float-tag').forEach((tag, i) => {
    const d = 6 + i * 5;
    tag.style.transform = `translate(${dx*d}px,${dy*d}px)`;
  });
}, { passive: true });