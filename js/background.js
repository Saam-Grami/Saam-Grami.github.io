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

  const MAX_HEIGHT = 100000; // effectively uncapped — field now runs the full page
  const LINK_DIST  = 155;    // px — how close two nodes must be to connect
  const DENSITY    = 5000;   // px² per node; larger = sparser (lower = denser overall)
  const MAX_NODES  = 650;    // raised again for the higher density
  const SPEED      = 0.16;   // px per frame
  const NODE_COLOR  = '#0EA5A4';        // site accent teal/green
  const LINE_COLOR  = '14, 165, 164';   // rgb of --accent, for rgba() below
  const ACCENT      = '#6EEAE6';        // brighter teal for occasional highlight nodes
  const MUTED_COLOR = '#8D9DAD';        // original grayish-blue, mixed back in

  const TOP_BAND       = 1500; // px — roughly hero + linkbar + projects
  const TOP_BAND_EXTRA = 240;  // extra nodes packed into that band on top of the base field

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
      kind: i % 11 === 0 ? 'accent' : (i % 3 === 0 ? 'muted' : 'node')
    }));

    // Extra nodes concentrated in the top band so the hero/projects area
    // reads noticeably denser than the rest of the page.
    const bandH = Math.min(TOP_BAND, h);
    const extra = Array.from({ length: TOP_BAND_EXTRA }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * bandH,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() < 0.12 ? 2.4 : 1.5,
      kind: i % 9 === 0 ? 'accent' : (i % 3 === 0 ? 'muted' : 'node'),
      yMax: bandH   // keeps this node confined to the dense top band
    }));
    nodes = nodes.concat(extra);
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
      ctx.fillStyle = n.kind === 'accent' ? ACCENT : n.kind === 'muted' ? MUTED_COLOR : NODE_COLOR;
      ctx.globalAlpha = n.kind === 'accent' ? 0.65 : 0.85;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function step(){
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      const bottom = n.yMax || h;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > bottom) n.vy *= -1;
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