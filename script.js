

  /* ── NAV scroll ── */
  window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ── Mobile menu ── */
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('ham');
    const isOpen = menu.classList.contains('open');
    menu.classList.toggle('open');
    ham.classList.toggle('open');
    // animate in
    if (!isOpen) {
      menu.style.transform = 'translateY(-10px)';
      menu.style.opacity = '0';
      requestAnimationFrame(() => {
        menu.style.transition = 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease';
        menu.style.transform = 'translateY(0)';
        menu.style.opacity = '1';
      });
    }
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('ham').classList.remove('open');
    });
  });

  /* ── Parallax on scroll ── */
  const videoOuter = document.getElementById('videoOuter');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const shift = scrollY * 0.12;
        videoOuter.style.transform = `translateY(${shift}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ── Video controls ── */
  const vid = document.getElementById('heroVid');
  const vFill = document.getElementById('vFill');
  const vTime = document.getElementById('vTime');
  const vIco = document.getElementById('vIco');

  function togglePlay() {
    vid.paused ? vid.play() : vid.pause();
  }

  vid.addEventListener('play', () => {
    vIco.style.cssText = 'width:8px;height:10px;border-left:3px solid #fff;border-right:3px solid #fff;margin:0 1px;border-radius:1px;box-sizing:border-box;';
  });
  vid.addEventListener('pause', () => {
    vIco.style.cssText = 'width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:10px solid #fff;margin-left:2px;';
  });

  vid.addEventListener('timeupdate', () => {
    if (vid.duration) {
      vFill.style.width = (vid.currentTime / vid.duration * 100) + '%';
      const m = Math.floor(vid.currentTime / 60);
      const s = String(Math.floor(vid.currentTime % 60)).padStart(2, '0');
      vTime.textContent = m + ':' + s;
    }
  });

  function seekTo(e) {
    const bar = document.getElementById('vBar');
    vid.currentTime = (e.offsetX / bar.offsetWidth) * vid.duration;
  }

  function toggleMute() { vid.muted = !vid.muted; }
  function goFullscreen() { vid.requestFullscreen && vid.requestFullscreen(); }



      //  BRANDING STATS SECTION  logic start

  
  // Counter animation
  const counters = document.querySelectorAll('.stat-counter');
  let started = false;

  function startCounters() {
    if (started) return;
    started = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, duration / steps);
    });
  }

  // Scroll color change
  const stats = document.querySelectorAll('.bs-stat');
  const heading = document.querySelector('.bs-h');
  const tags = document.querySelectorAll('.float-tag');
  const section = document.querySelector('.branding-stats-wrapper');

  function onScroll() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    // section in view check
    const rect = section.getBoundingClientRect();
    const inView = rect.top < winH * 0.8 && rect.bottom > 0;

    if (inView) {
      startCounters();

      // heading gradient
      heading.classList.add('lit');

      // tags glow
      tags.forEach(tag => tag.classList.add('glowing'));

      // stats — stagger activation based on scroll progress
      const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height)));

      stats.forEach((stat, i) => {
        const threshold = (i + 1) / (stats.length + 1);
        if (progress >= threshold) {
          stat.classList.add('active');
        } else {
          stat.classList.remove('active');
        }
      });

    } else {
      heading.classList.remove('lit');
      tags.forEach(tag => tag.classList.remove('glowing'));
      stats.forEach(stat => stat.classList.remove('active'));
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

      //  BRANDING STATS SECTION  logic end





// review video logic

(function () {
  var vid     = document.getElementById('spVideo');
  var wrap    = document.getElementById('spVideoWrap');
  var playBtn = document.getElementById('spPlayBtn');

  wrap.addEventListener('click', function () {
    if (vid.paused) {
      vid.muted = false;
      vid.play();
    } else {
      vid.pause();
    }
  });
  vid.addEventListener('play',  function () { playBtn.classList.add('hidden'); });
  vid.addEventListener('pause', function () { playBtn.classList.remove('hidden'); });

  // infinite scroll
  var track = document.getElementById('spTrack');
  var pos = 0;
  function autoScroll() {
    pos -= 0.5;
    if (Math.abs(pos) >= track.scrollHeight / 2) pos = 0;
    track.style.transform = 'translateY(' + pos + 'px)';
    requestAnimationFrame(autoScroll);
  }
  autoScroll();
})();


// portfolio logic

  // scroll animations
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.pf-header, .tabs, .video-grid').forEach(el => obs.observe(el));

  // tab filter
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.video-card');
  const grid = document.getElementById('videoGrid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;

      grid.style.opacity = '0';
      grid.style.transform = 'translateY(10px)';
      grid.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

      setTimeout(() => {
        // pause all videos & reset overlays
        document.querySelectorAll('.video-card video').forEach(v => { v.pause(); v.currentTime = 0; });
        document.querySelectorAll('.thumb-overlay').forEach(o => o.classList.remove('hidden'));
        cards.forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 200);
    });
  });

  // play video on thumbnail click
  function playVideo(overlay) {
    const card = overlay.closest('.video-card');
    const video = card.querySelector('video');
    overlay.classList.add('hidden');
    video.play();
  }

  // time line logic

  // ── Timeline fill on scroll ──

(function(){
  var tlFill  = document.getElementById('tlFill');
  var timeline = document.querySelector('.timeline');
  var steps   = document.querySelectorAll('.step');
  var circles = ['c1','c2','c3','c4','c5'].map(function(id){ return document.getElementById(id); });
  var isMobile = false;

  /* ── detect mobile ── */
  function checkMobile(){
    isMobile = window.innerWidth <= 900;
    /* on mobile add class so CSS opacity transition works */
    steps.forEach(function(step){
      step.querySelectorAll('.step-content,.step-visual').forEach(function(el){
        if(isMobile){ el.classList.add('mobile-fade'); }
        else{ el.classList.remove('mobile-fade'); }
      });
    });
  }

  /* ── scroll fill — px based, reaches full bottom ── */
 function updateFill(){
  var rect     = timeline.getBoundingClientRect();
  var totalH   = timeline.offsetHeight;
  var scrolled = Math.max(0, (window.innerHeight * 0.79) - rect.top);
  var px       = Math.min(totalH, scrolled);
  tlFill.style.height = px + 'px';
}

  /* ── step animations ── */
  function checkSteps(){
    steps.forEach(function(step, i){
      var rect    = step.getBoundingClientRect();
      var visible = rect.top < window.innerHeight * 0.80 && rect.bottom > 0;
      step.querySelectorAll('.step-content,.step-visual').forEach(function(el){
        el.classList.toggle('visible', visible);
      });
      if(circles[i]) circles[i].classList.toggle('active', visible);
    });
  }

  /* ── rAF-throttled scroll ── */
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(!ticking){
      requestAnimationFrame(function(){
        updateFill();
        checkSteps();
        ticking = false;
      });
      ticking = true;
    }
  }, {passive:true});

  window.addEventListener('resize', function(){
    checkMobile();
    updateFill();
    checkSteps();
  });

  /* init */
  checkMobile();
  updateFill();
  checkSteps();

  /* ── Thumbnail slider ── */
  var cur = 0;
  var total = 2;

  window.goTo = function(n){
    document.getElementById('s'+cur).classList.remove('active');
    ['d0','d1'].forEach(function(id,i){ document.getElementById(id).classList.toggle('active', i===n%total); });
    ['d0b','d1b'].forEach(function(id,i){ document.getElementById(id).classList.toggle('active', i===n%total); });
    cur = (n + total) % total;
    document.getElementById('s'+cur).classList.add('active');
  };
  window.nextSlide = function(){ goTo(cur+1); };
  window.prevSlide = function(){ goTo(cur-1); };
  setInterval(window.nextSlide, 3200);
})();

  // time line logic end

  

  // fAQ Lgoic


(function(){
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function(item){
    var body  = item.querySelector('.faq-body');
    var inner = item.querySelector('.faq-body-inner');
    body.style.height = '0px';

    item.querySelector('.faq-q').addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      // close all
      items.forEach(function(it){
        it.classList.remove('is-open');
        it.querySelector('.faq-body').style.height = '0px';
      });
      // open clicked if was closed
      if(!isOpen){
        item.classList.add('is-open');
        body.style.height = inner.offsetHeight + 'px';
      }
    });
  });
})();



// service cards
 

(function () {
  var track    = document.getElementById('ss-Track');
  var viewport = document.getElementById('ss-Viewport');
  var dotsEl   = document.getElementById('ss-Dots');
  var prevBtn  = document.getElementById('ss-prevBtn');
  var nextBtn  = document.getElementById('ss-nextBtn');

  if (!track || !viewport || !dotsEl || !prevBtn || !nextBtn) return;

  var cards = track.querySelectorAll('.ss-card');
  var total = cards.length;
  var cur   = 0;
  var GAP   = 16;

  /* ── Card width set karo viewport width se directly ── */
  function setCardWidths() {
    var vw = viewport.getBoundingClientRect().width;
    var vis = getVisible(vw);
    var cardW = (vw - GAP * (vis - 1)) / vis;
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.width = cardW + 'px';
    }
  }

  function getVisible(vw) {
    if (vw < 600)  return 1;
    if (vw < 900)  return 2;
    return 3;
  }

  function getMaxIdx() {
    var vw = viewport.getBoundingClientRect().width;
    return Math.max(0, total - getVisible(vw));
  }

  function getCardWidth() {
    if (!cards[0]) return 0;
    return cards[0].getBoundingClientRect().width + GAP;
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    var max = getMaxIdx();
    for (var i = 0; i <= max; i++) {
      (function (idx) {
        var d = document.createElement('span');
        d.className = 'ss-dot' + (idx === cur ? ' active' : '');
        d.onclick = function () { goTo(idx); };
        dotsEl.appendChild(d);
      })(i);
    }
  }

  function updateUI() {
    var dots = dotsEl.querySelectorAll('.ss-dot');
    dots.forEach(function (d, i) {
      d.className = 'ss-dot' + (i === cur ? ' active' : '');
    });
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur >= getMaxIdx();
  }

  function goTo(idx) {
    cur = Math.max(0, Math.min(getMaxIdx(), idx));
    var offset = cur * getCardWidth();
    track.style.transform = 'translateX(-' + offset + 'px)';
    updateUI();
  }

  window.ssSlide = function (dir) { goTo(cur + dir); };

  function init() {
    setCardWidths();
    buildDots();
    goTo(0);
  }

  requestAnimationFrame(function () {
    init();
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      cur = Math.min(cur, getMaxIdx());
      init();
    }, 80);
  });

  var tx = 0;
  track.addEventListener('touchstart', function (e) {
    tx = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) window.ssSlide(d > 0 ? 1 : -1);
  });
})();