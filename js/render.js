/* ============================================================
   render.js — turns the lists in data.js into HTML.
   Change this only when you want a section to LOOK different,
   not when you want to add content.
   ============================================================ */

// Empty spec fields render as an em dash rather than a blank gap.
const val = v => (v && String(v).trim()) ? v : '—';

const statusLabel = { live: "Completed", progress: "In progress", archived: "Archived" };

const gridEl     = document.getElementById('project-grid');
const homeView   = document.getElementById('home-view');
const detailView = document.getElementById('detail-view');

/* ---------- TIMELINE (EXPERIENCE / EDUCATION) ---------- */

// Optional photo under the dates in an experience or education row.
// Renders as a real <img> so a file that isn't there yet falls back to a
// dashed box naming the filename it wants — no guessing what to save it as.
function timelinePhoto(x){
  if (!x.image) return '';
  const alt = x.caption || `${x.role}${x.org ? ' — ' + x.org : ''}`;
  return `<img class="tl-photo" src="${x.image}" alt="${alt}" onerror="tlPhotoMissing(this)">`
    + (x.caption ? `<div class="tl-photo-cap">${x.caption}</div>` : '');
}

// Shows the expected filename in place of a photo that hasn't been added yet.
function tlPhotoMissing(el){
  const name = (el.getAttribute('src') || '').split('/').pop();
  const box = document.createElement('div');
  box.className = 'tl-photo tl-photo-ph';
  box.textContent = name;
  el.replaceWith(box);
}

function renderTimeline(list, elId){
  const el = document.getElementById(elId);
  el.innerHTML = list.map(x => `
    <div class="tl-item">
      <div class="tl-when">${x.when}${timelinePhoto(x)}</div>
      <div>
        <h3 class="tl-role">${x.role}</h3>
        <div class="tl-org">${x.org}</div>
        ${x.points && x.points.length ? `<ul class="tl-points">${x.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
        ${x.tags && x.tags.length ? `<div class="tl-tags">${x.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
      </div>
    </div>
  `).join('');
}

/* ---------- COURSEWORK ---------- */

// Left column media: video wins, then a still image, then the placeholder.
// muted + playsinline are required or mobile browsers refuse to autoplay.
function courseMedia(c){
  const cap = c.caption ? `<div class="cw-media-cap">${c.caption}</div>` : '';
  if (c.video){
    const ext  = (c.video.split('.').pop() || 'mp4').toLowerCase();
    const type = ext === 'webm' ? 'video/webm' : ext === 'ogv' ? 'video/ogg' : 'video/mp4';
    return `<video class="cw-media" autoplay loop muted playsinline preload="metadata"${c.image ? ` poster="${c.image}"` : ''}>
      <source src="${c.video}" type="${type}">
    </video>${cap}`;
  }
  if (c.image) return `<div class="cw-media" style="background-image:url('${c.image}')"></div>${cap}`;
  return `<div class="cw-media cw-media-ph">PHOTO PLACEHOLDER</div>${cap}`;
}

// A stable URL fragment from the title, so #course-robot-synthesis is
// shareable and survives reordering the array.
function courseSlug(title){
  return String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function renderCoursework(){
  const section = document.getElementById('coursework');
  if (!coursework.length){ section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  document.getElementById('coursework-list').innerHTML = coursework.map(c => {
    const body = `
      <div>
        ${courseMedia(c)}
        ${c.when ? `<div class="cw-when">${c.when}</div>` : ''}
      </div>
      <div>
        <h3 class="tl-role">${c.title}</h3>
        ${c.org ? `<div class="tl-org">${c.org}</div>` : ''}
        ${c.points && c.points.length ? `<ul class="tl-points">${c.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
        ${c.tags && c.tags.length ? `<div class="tl-tags">${c.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
        ${c.doc ? `<div class="cw-doc">Read the report →</div>` : c.demo ? `<div class="cw-doc">Watch the video →</div>` : ''}
      </div>`;
    // A class with a document or a demo video gets its own page.
    return (c.doc || c.demo)
      ? `<a class="cw-item" href="#course-${courseSlug(c.title)}">${body}</a>`
      : `<div class="cw-item">${body}</div>`;
  }).join('');
}

// Coursework document page. Same layout language as a project page, with the
// PDF rendered inline instead of a media gallery.
function renderCourseDetail(slug){
  const c = coursework.find(x => courseSlug(x.title) === slug);
  if (!c || (!c.doc && !c.demo)){ goHome(); return; }

  // Doc wins if a class somehow has both — same rule as the coursework list link text.
  const media = c.doc
    ? `<a class="detail-repo" href="${encodeURI(c.doc)}" target="_blank" rel="noopener" download>↓ Download PDF</a>
       <div class="resume-doc" style="margin-top:0;">
         <div class="pdf-pages" id="course-pdf-pages"></div>
         <div class="pdf-status" id="course-pdf-status">Loading document…</div>
       </div>`
    : `<video class="thumb-media" controls preload="metadata"${c.image ? ` poster="${c.image}"` : ''} onerror="galMissing(this)">
         <source src="${encodeURI(c.demo)}">
       </video>`;

  document.title = `${c.title} — Saam Haghighat-Grami`;
  detailView.innerHTML = `
    <a class="back-link" href="#coursework" onclick="navTo(event,'coursework')">← Back to coursework</a>
    <div class="detail-id">COURSEWORK</div>
    <div class="detail-head"><h1 class="detail-title">${c.title}</h1></div>
    ${c.org ? `<div class="detail-sub">${c.org}</div>` : ''}
    ${c.when ? `<div class="detail-meta">${c.when}</div>` : ''}
    ${c.points && c.points.length
      ? `<div class="detail-body"><ul class="tl-points">${c.points.map(p => `<li>${p}</li>`).join('')}</ul></div>` : ''}
    ${c.tags && c.tags.length
      ? `<div class="tl-tags" style="margin-bottom:28px;">${c.tags.map(t => `<span>${t}</span>`).join('')}</div>` : ''}
    ${media}
  `;

  homeView.classList.add('hidden');
  detailView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (c.doc){
    coursePdfFile = c.doc;
    renderPdfInto(c.doc, document.getElementById('course-pdf-pages'), document.getElementById('course-pdf-status'));
  } else {
    coursePdfFile = null;
  }
}

/* ---------- SKILLS / PUBLICATIONS / BLOG ---------- */

function renderSkills(){
  document.getElementById('skills-grid').innerHTML = skills.map(s => `
    <div class="skill-col">
      <div class="skills-title">${s.group}</div>
      <div class="tag-row" style="margin-bottom:0;">${s.items.map(i => `<span class="tag">${i}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderPublications(){
  const section = document.getElementById('publications');
  if (!publications.length) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');

  // Newest first, then number them 1..n from the top
  const sorted = publications.slice().sort((a, b) => String(b.year).localeCompare(String(a.year)));

  document.getElementById('pub-list').innerHTML = sorted.map((p, i) => {
    const authors = MY_NAME && p.authors.includes(MY_NAME)
      ? p.authors.split(MY_NAME).join(`<span class="me">${MY_NAME}</span>`)
      : p.authors;
    const links = (p.links || []).filter(l => l.url && l.url !== '#');
    return `
      <div class="pub-item">
        <div class="pub-num">[${i + 1}]</div>
        <div>
          <h3 class="pub-title">${p.title}${p.kind ? `<span class="pub-kind">${p.kind}</span>` : ''}</h3>
          <p class="pub-authors">${authors}</p>
          <div class="pub-venue">${p.venue}${p.year ? ` · ${val(p.year)}` : ''}</div>
          ${links.length ? `<div class="pub-links">${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderBlog(){
  const section = document.getElementById('blog');
  const navItem = document.getElementById('nav-blog');
  if (!SHOW_BLOG || !posts.length) {
    section.classList.add('hidden');
    navItem.classList.add('hidden');
    return;
  }
  section.classList.remove('hidden');
  navItem.classList.remove('hidden');
  document.getElementById('post-list').innerHTML = posts.map(p => `
    <a class="post" href="${p.url}">
      <div class="post-date">${p.date}</div>
      <div>
        <h3 class="post-title">${p.title}</h3>
        <p class="post-excerpt">${p.excerpt}</p>
      </div>
    </a>
  `).join('');
}

// Numbers the visible sections in order, so hiding the blog doesn't leave a gap.
function numberSections(){
  const nums = homeView.querySelectorAll('.section:not(.hidden) .section-num');
  nums.forEach((el, i) => {
    el.textContent = String(i + 1).padStart(2, '0') + ' / ' + (el.dataset.label || '');
  });
}

/* ---------- PROJECT MEDIA ---------- */

// Which extensions count as video. Everything else is treated as a still.
const VIDEO_EXT = ['mp4', 'webm', 'ogv', 'm4v', 'mov'];

// Turns a project's `media` list into {src, type, poster} objects. Entries can
// be a plain string or {src, poster}. Falls back to the old image/video fields
// so a project that hasn't been converted yet still displays.
function mediaItems(p){
  const out = [];
  const add = m => {
    const src = typeof m === 'string' ? m : (m && m.src);
    if (!src) return;
    const ext = (src.split('.').pop() || '').toLowerCase();
    out.push({
      src,
      type: VIDEO_EXT.includes(ext) ? 'video' : 'image',
      poster: (typeof m === 'object' && m.poster) || '',
      caption: (typeof m === 'object' && m.caption) || ''
    });
  };
  (p.media || []).forEach(add);
  if (!out.length){ add(p.video); add(p.image); }
  return out;
}

// Card thumbnail: the cover image. If none is set, the first still in `media`
// stands in, and failing that the striped placeholder shows.
function cardThumb(p){
  const src = p.cover || p.image || (mediaItems(p).find(m => m.type === 'image') || {}).src;
  return src
    ? `<div class="thumb has-media" style="background-image:url('${src}')"></div>`
    : `<div class="thumb">PHOTO PLACEHOLDER<br>replace with project image</div>`;
}

// Repo link on a card. The card itself is already an <a>, so this is a span
// that opens the URL in JS and stops the click from also opening the project.
function repoChip(p){
  return p.repo
    ? `<span class="repo-chip" role="link" tabindex="0"
            onclick="openRepo(event, '${p.repo}')"
            onkeydown="if(event.key==='Enter'){openRepo(event, '${p.repo}')}">⌥ View source ↗</span>`
    : '';
}

function openRepo(e, url){
  e.preventDefault();
  e.stopPropagation();
  window.open(url, '_blank', 'noopener');
}

/* ---------- PROJECT GALLERY ---------- */
// One item on the stage at a time. Arrows, thumbnails, and the ← → keys all
// call galShow. Only the current item is in the DOM, so a video that scrolls
// out of view isn't left running in the background.
let gal = { items: [], i: 0 };

function galHTML(items){
  if (!items.length){
    return `<div class="thumb thumb-lg">PHOTO / VIDEO PLACEHOLDER<br>replace with real project media</div>`;
  }
  const multi = items.length > 1;
  const thumbs = items.map((m, i) => {
    const bg = m.type === 'image' ? m.src : m.poster;   // a clip needs a poster to show a preview
    return `<button class="gal-thumb${m.type === 'video' ? ' is-video' : ''}" type="button"
              aria-label="Show item ${i + 1} of ${items.length}" onclick="galShow(${i})"
              ${bg ? `style="background-image:url('${bg}')"` : ''}></button>`;
  }).join('');

  return `
    <div class="gallery">
      <div class="gal-stage">
        <div class="gal-frame" id="gal-frame"></div>
        ${multi ? `
          <button class="gal-arrow prev" type="button" aria-label="Previous" onclick="galStep(-1)">‹</button>
          <button class="gal-arrow next" type="button" aria-label="Next" onclick="galStep(1)">›</button>
          <div class="gal-count" id="gal-count"></div>` : ''}
      </div>
      ${multi ? `<div class="gal-thumbs">${thumbs}</div>` : ''}
      <div class="gal-caption" id="gal-caption"></div>
    </div>`;
}

function galShow(i){
  const items = gal.items;
  const frame = document.getElementById('gal-frame');
  if (!items.length || !frame) return;
  gal.i = (i + items.length) % items.length;   // wraps around at both ends
  const m = items[gal.i];

  // muted + playsinline are required or mobile browsers refuse to autoplay
  frame.innerHTML = m.type === 'video'
    ? `<video src="${m.src}" autoplay loop muted playsinline controls preload="metadata"${m.poster ? ` poster="${m.poster}"` : ''} onerror="galMissing(this)"></video>`
    : `<img src="${m.src}" alt="" onerror="galMissing(this)">`;

  const count = document.getElementById('gal-count');
  if (count) count.textContent = `${gal.i + 1} / ${items.length}`;
  document.querySelectorAll('.gal-thumb').forEach((t, n) => t.classList.toggle('active', n === gal.i));

  const caption = document.getElementById('gal-caption');
  if (caption){
    const text = m.caption || (items.length > 1 ? 'Click the arrows, the thumbnails, or use ← →' : '');
    caption.textContent = text;
    caption.classList.toggle('hidden', !text);
  }
}

function galStep(d){ galShow(gal.i + d); }

// Called when a file in the media list fails to load. Names the exact path it
// tried, which is almost always a typo, a missing extension, or a case
// mismatch (Photo.JPG vs photo.jpg — this matters once the site is hosted).
function galMissing(el){
  const src = el.getAttribute('src') || '';
  const box = document.createElement('div');
  box.className = 'gal-missing';
  box.innerHTML = `Couldn't load <code>${src}</code><br>Check the filename, the extension, and the letter case.`;
  el.replaceWith(box);
  console.warn('Gallery file not found:', src);
}

// Arrow keys, but only while a project page is open and there's more than one item
document.addEventListener('keydown', e => {
  if (detailView.classList.contains('hidden') || gal.items.length < 2) return;
  if (e.key === 'ArrowLeft')  galStep(-1);
  if (e.key === 'ArrowRight') galStep(1);
});

/* ---------- PROJECT GRID AND PROJECT PAGE ---------- */

function renderGrid(){
  gridEl.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `#project-${encodeURIComponent(p.id)}`;
    card.innerHTML = `
      <div class="card-top">
        <span class="card-id">${p.id}</span>
        <span class="status status-${p.status}">${statusLabel[p.status]}</span>
      </div>
      ${cardThumb(p)}
      <h3>${p.title}<span class="arrow">→</span></h3>
      ${p.subtitle ? `<div class="card-sub">${p.subtitle}</div>` : ''}
      <p>${p.blurb}</p>
      ${repoChip(p)}
      <dl class="spec-grid">
        <div><dt>STACK</dt><dd>${val(p.stack)}</dd></div>
        <div><dt>SENSORS</dt><dd>${val(p.sensors)}</dd></div>
        <div><dt>PLATFORM</dt><dd>${val(p.platform)}</dd></div>
        <div><dt>YEAR</dt><dd>${val(p.year)}</dd></div>
      </dl>
    `;
    gridEl.appendChild(card);
  });
  // Only present if the hero is showing a live count; the bare prompt doesn't.
  const countEl = document.getElementById('proj-count');
  if (countEl) countEl.textContent = projects.length;
}

function renderDetail(id){
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) { goHome(); return; }
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const bodyText = (p.details || p.blurb).split('\n\n').map(para => `<p>${para}</p>`).join('');

  document.title = `${p.title} — Saam Haghighat-Grami`;

  detailView.innerHTML = `
    <a class="back-link" href="#" onclick="goHome(event)">← Back to all projects</a>
    <div class="detail-nav">
      <a href="#project-${encodeURIComponent(prev.id)}">← ${prev.title}</a>
      <a href="#project-${encodeURIComponent(next.id)}">${next.title} →</a>
    </div>
    <div class="detail-id">${p.id}</div>
    <div class="detail-head">
      <h1 class="detail-title">${p.title}</h1>
      <span class="status status-${p.status}">${statusLabel[p.status]}</span>
    </div>
    ${p.subtitle ? `<div class="detail-sub">${p.subtitle}</div>` : ''}
    <div class="detail-meta">${val(p.year)} · ${val(p.platform)}</div>
    ${galHTML(mediaItems(p))}
    <div class="detail-body">${bodyText}</div>
    ${p.repo ? `<a class="detail-repo" href="${p.repo}" target="_blank" rel="noopener">⌥ View source on GitHub ↗</a>` : ''}
    <dl class="detail-spec-grid">
      <div><dt>Stack</dt><dd>${val(p.stack)}</dd></div>
      <div><dt>Sensors</dt><dd>${val(p.sensors)}</dd></div>
      <div><dt>Platform</dt><dd>${val(p.platform)}</dd></div>
      <div><dt>Power</dt><dd>${val(p.power)}</dd></div>
      <div><dt>Year</dt><dd>${val(p.year)}</dd></div>
      <div><dt>Status</dt><dd>${statusLabel[p.status]}</dd></div>
    </dl>
  `;

  homeView.classList.add('hidden');
  detailView.classList.remove('hidden');
  gal.items = mediaItems(p);
  galShow(0);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}
