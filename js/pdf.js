/* ============================================================
   pdf.js — the inline PDF viewer.
   Used by the résumé section and by any coursework page that has
   a "doc" set in data.js. You should not need to touch this.
   ============================================================ */

// Renders each page of a PDF onto a canvas and stacks them in normal page
// flow. Native scrolling, works on phones. If the file is missing or the
// renderer can't load, a link to the PDF is shown instead.
const PDFJS_URL    = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Which document each viewer is currently showing. render.js sets
// coursePdfFile when a coursework page opens; main.js clears it on the way out.
let pdfCurrentFile = null;
let coursePdfFile  = null;

let pdfLibPromise = null;
function loadPdfLib(){
  if (pdfLibPromise) return pdfLibPromise;
  pdfLibPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = PDFJS_URL;
    s.onload = () => {
      if (!window.pdfjsLib) return reject(new Error('pdf.js missing'));
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      resolve(window.pdfjsLib);
    };
    s.onerror = () => reject(new Error('pdf.js failed to load'));
    document.head.appendChild(s);
  });
  return pdfLibPromise;
}

// Checks whether the file is actually there before blaming the renderer.
// Returns 'ok', 'missing' (404 — wrong name or wrong folder), 'blocked'
// (opened from disk, or the server refused), or 'unknown'.
async function probeFile(url){
  if (location.protocol === 'file:') return 'blocked';
  try {
    const res = await fetch(encodeURI(url), { method: 'HEAD' });
    if (res.status === 404) return 'missing';
    return res.ok ? 'ok' : 'unknown';
  } catch (err) {
    return 'blocked';
  }
}

// Last resort when pdf.js can't run: hand the file to the browser's own PDF
// viewer. Desktop browsers handle this fine. iOS Safari shows only the first
// page, which is why the canvas renderer is the primary path.
function embedFallback(file){
  return `<object data="${encodeURI(file)}" type="application/pdf" width="100%" height="900">
      <p>Your browser can't display the PDF inline.
      <a href="${encodeURI(file)}" target="_blank" rel="noopener">Open it in a new tab →</a></p>
    </object>`;
}

// Takes the target elements as arguments so the same renderer serves the
// résumé, the CV, and any coursework document.
async function renderPdfInto(file, host, status){
  if (!host || !status) return;

  host.innerHTML = '';
  status.classList.remove('hidden');
  status.textContent = 'Loading document…';

  const link  = `<a href="${encodeURI(file)}" target="_blank" rel="noopener">Open the PDF directly →</a>`;
  const where = `<br><span style="opacity:.75">Looking for: <code>${file}</code></span>`;

  // 1. Is the file where we think it is?
  const state = await probeFile(file);
  if (state === 'missing'){
    status.innerHTML = `That PDF isn't at the path the page expects.${where}<br>`
      + `Check the spelling, the capitalisation, and that the path is relative to index.html.`;
    console.warn('PDF 404. Expected file:', file);
    return;
  }
  if (state === 'blocked' && location.protocol === 'file:'){
    // Browsers refuse to read local files over file:// for security reasons.
    status.innerHTML = `Browsers block reading local files, so the PDF can't render while you're opening this page straight from your disk.`
      + `<br>It works once the site is hosted. ${link}`;
    return;
  }

  // 2. Try the canvas renderer.
  let pdf;
  try {
    const lib = await loadPdfLib();
    pdf = await lib.getDocument(encodeURI(file)).promise;
  } catch (err) {
    // Usually the CDN being blocked by a network filter or an ad blocker.
    // The file itself is fine, so hand it to the browser's own viewer.
    console.warn('pdf.js unavailable, falling back to <object>:', err);
    status.classList.add('hidden');
    host.innerHTML = embedFallback(file);
    return;
  }

  // 3. Draw every page.
  try {
    const dpr   = Math.min(window.devicePixelRatio || 1, 2);
    const width = host.clientWidth || 900;

    for (let n = 1; n <= pdf.numPages; n++){
      const page     = await pdf.getPage(n);
      const base     = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });

      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(viewport.width);
      canvas.height = Math.round(viewport.height);
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', `Page ${n} of ${pdf.numPages}`);
      host.appendChild(canvas);

      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    }
    status.classList.add('hidden');
  } catch (err){
    console.warn('Page render failed, falling back to <object>:', err);
    status.classList.add('hidden');
    host.innerHTML = embedFallback(file);
  }
}

// The résumé section calls this one.
function renderPdf(file){
  document.getElementById('resume-doc').classList.remove('hidden');
  return renderPdfInto(file, document.getElementById('pdf-pages'), document.getElementById('pdf-status'));
}

// Re-render at the new width so pages stay sharp. Width only — phones fire a
// resize every time the address bar hides during a scroll, and re-rendering
// the whole PDF on each of those makes the section flicker.
let pdfResizeTimer, pdfLastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth === pdfLastWidth) return;
  pdfLastWidth = window.innerWidth;
  clearTimeout(pdfResizeTimer);
  pdfResizeTimer = setTimeout(() => {
    // Whichever viewer is on screen gets redrawn at the new width.
    const courseHost = document.getElementById('course-pdf-pages');
    if (coursePdfFile && courseHost){
      renderPdfInto(coursePdfFile, courseHost, document.getElementById('course-pdf-status'));
    } else if (pdfCurrentFile){
      renderPdf(pdfCurrentFile);
    }
  }, 300);
});

// Wires the download button and the Résumé / CV switch when SHOW_CV is on.
function renderDocs(){
  const download = document.getElementById('doc-download');
  const caption  = document.getElementById('doc-caption');
  const tabs     = document.getElementById('doc-tabs');
  const tabR     = document.getElementById('tab-resume');
  const tabC     = document.getElementById('tab-cv');

  function show(which){
    const file  = which === 'cv' ? CV_FILE : RESUME_FILE;
    const label = which === 'cv' ? 'CV' : 'Résumé';
    download.href = encodeURI(file);
    download.textContent = `↓ Download ${label.toLowerCase()} (PDF)`;
    caption.textContent  = `Saam Haghighat-Grami — ${label}`;
    if (tabR && tabC){
      tabR.classList.toggle('active', which !== 'cv');
      tabC.classList.toggle('active', which === 'cv');
    }
    pdfCurrentFile = file;
    renderPdf(file);
  }

  if (SHOW_CV){
    tabs.classList.remove('hidden');
    tabR.addEventListener('click', () => show('resume'));
    tabC.addEventListener('click', () => show('cv'));
  }
  show('resume');
}
