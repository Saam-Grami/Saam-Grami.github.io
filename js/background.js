
/* ============================================================
   background.js — the drifting constellation behind the hero,
   plus the portrait placeholder check. Pure decoration: you can
   delete this file and its <script> tag and the site still works.
   ============================================================ */

// Nodes drift slowly; a line is drawn between any two that come within
// LINK_DIST of each other, fading as they separate. Tunables are all here.
(function constellation(){
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const MAX_HEIGHT = 2600;   // how far down the page the field extends
  const LINK_DIST  = 155;    // px — how close two nodes must be to connect
  const DENSITY    = 9000;   // px² per node; larger = sparser
  const MAX_NODES  = 240;
  const SPEED      = 0.16;   // px per frame
  const NODE_COLOR = '#8D9DAD';
  const LINE_COLOR = '138, 154, 170';  // rgb for rgba() below
  const ACCENT     = '#0EA5A4';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let nodes = [], w = 0, h = 0, raf = null, running = false;

  function build(){
    const host = document.getElementById('home-view');
    w = host.clientWidth;
    h = Math.min(host.scrollHeight, MAX_HEIGHT);
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.height = h + 'px';
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(Math.round((w * h) / DENSITY), MAX_NODES);
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() < 0.12 ? 2.4 : 1.5,
      accent: i % 11 === 0
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < nodes.length; i++){
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++){
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.55;
        ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    nodes.forEach(n => {
      ctx.fillStyle = n.accent ? ACCENT : NODE_COLOR;
      ctx.globalAlpha = n.accent ? 0.65 : 0.85;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function step(){
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
    draw();
    raf = requestAnimationFrame(step);
  }

  function start(){ if (!running && !reduced){ running = true; raf = requestAnimationFrame(step); } }
  function stop(){ running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  // Don't burn frames when the field is scrolled out of view or the tab is hidden
  window.addEventListener('scroll', () => {
    if (window.scrollY < MAX_HEIGHT) start(); else stop();
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : (window.scrollY < MAX_HEIGHT && start());
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); draw(); }, 150);
  });

  window.bgFieldRefresh = () => { build(); draw(); };

  build();
  draw();
  start();
})();

// Hide the portrait placeholder text once the real portrait.jpg loads
(function checkPortrait(){
  const el = document.querySelector('.portrait');
  if (!el) return;
  const img = new Image();
  img.onload = () => el.classList.add('loaded');
  img.src = 'portrait.jpg';
})();