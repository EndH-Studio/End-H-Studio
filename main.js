// ---- Main Section Page Switching (Tab Views) ----
const navLinks = document.querySelectorAll('.nav-link');
const tabPages = document.querySelectorAll('.tab-page');
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');

function switchPage(targetTabId) {
  // Hide all sections & show targeted section
  tabPages.forEach(page => {
    page.classList.toggle('active', page.id === targetTabId);
  });

  // Highlight active header nav link
  document.querySelectorAll('nav.main-nav .nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.tab === targetTabId);
  });

  // Scroll smoothly to top of the page tab view
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile navigation drawer if open
  mainNav.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

// Attach Event Listeners to Nav Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetTab = link.dataset.tab;
    if (targetTab) {
      switchPage(targetTab);
    }
  });
});

// Mobile Burger Toggle
burger.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

// ---- Portfolio Inner Tabs Switcher ----
const portfolioTabBtns = document.querySelectorAll('.p-tab-btn');
const portfolioTabContents = document.querySelectorAll('.p-tab-content');

portfolioTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetPtab = btn.dataset.ptab;

    portfolioTabBtns.forEach(b => b.classList.remove('active'));
    portfolioTabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const activeContent = document.getElementById(targetPtab);
    if(activeContent) {
      activeContent.classList.add('active');
    }
  });
});

// ---- Language switch (ID / EN) ----
const htmlRoot = document.getElementById('htmlRoot');
const langButtons = document.querySelectorAll('.lang-switch button');
let currentLang = 'id';

function applyLang(lang){
  currentLang = lang;
  htmlRoot.setAttribute('lang', lang);

  document.querySelectorAll('[data-en][data-id]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.id;
  });

  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ---- Contact Form -> WhatsApp ----
const orderForm = document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const location = document.getElementById('flocation').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmessage').value.trim();

    const text = currentLang === 'en'
      ? `Hello End'H Studio, I'd like to consult about a drawing service.
Name: ${name}
Phone: ${phone}
Project location: ${location}
Service: ${service}
Details: ${message || '-'}`
      : `Halo End'H Studio, saya mau konsultasi jasa gambar.
Nama: ${name}
No. HP: ${phone}
Lokasi proyek: ${location}
Layanan: ${service}
Kebutuhan: ${message || '-'}`;

    const waUrl = `https://wa.me/6282115253829?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  });
}