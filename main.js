/* ============================================================
   main.js — navigation, hash routing, and the startup sequence.
   This is what actually boots the site.
   ============================================================ */

const headerEl   = document.getElementById('site-header');
const navToggle  = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('navlinks');

/* ---------- NAV BEHAVIOR ---------- */

function closeMenu(){
  navLinksEl.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

navToggle.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Click outside or press Escape closes the mobile menu
document.addEventListener('click', (e) => {
  if (!navLinksEl.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Nav click: leave a project page if needed, then scroll with the sticky
// header height accounted for so headings don't hide behind it.
function navTo(e, id){
  if (e && e.preventDefault) e.preventDefault();
  closeMenu();
  goHome();
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerEl.offsetHeight - 12;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, 0);
}

// Shadow on the header once you've scrolled off the top
window.addEventListener('scroll', () => {
  headerEl.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Highlight whichever section you're currently looking at
function initScrollSpy(){
  const links = Array.from(navLinksEl.querySelectorAll('a'));
  const map = new Map();
  links.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map.set(sec, a);
  });
  if (!map.size || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        map.get(entry.target).classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  map.forEach((a, sec) => obs.observe(sec));
}

/* ---------- ROUTING ---------- */

function goHome(e){
  if (e && e.preventDefault) e.preventDefault();
  document.title = 'Saam Haghighat-Grami — Robotics Portfolio';
  detailView.innerHTML = '';        // tears down any playing video
  gal = { items: [], i: 0 };
  coursePdfFile = null;
  detailView.classList.add('hidden');
  homeView.classList.remove('hidden');
  if (location.hash.startsWith('#project-') || location.hash.startsWith('#course-')) {
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }
}

function scrollToId(id){
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 0);
}

function route(){
  const hash = decodeURIComponent(location.hash);
  const project = hash.match(/^#project-(.+)$/);
  const course  = hash.match(/^#course-(.+)$/);
  if (project)      renderDetail(project[1]);
  else if (course)  renderCourseDetail(course[1]);
  else              goHome();
}

window.addEventListener('hashchange', route);

/* ---------- STARTUP ---------- */

renderGrid();
renderTimeline(experience, 'experience-list');
renderTimeline(education, 'education-list');
renderCoursework();
renderSkills();
renderDocs();
renderPublications();
renderBlog();
numberSections();
initScrollSpy();
route();

document.getElementById('year').textContent = new Date().getFullYear();
