/**
 * main.js — mauLportofolio.dev 2.0
 * Author : Hafiizh Maulana
 * Handles: Navbar, Hamburger menu, Scroll animations,
 *           Active nav, Back-to-top, Placeholder buttons
 */

'use strict';

/* --------------------------------------------------
   DOM References
-------------------------------------------------- */
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileNav   = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks    = document.querySelectorAll('.navbar__link');
const mobileLinks = document.querySelectorAll('.mobile-nav__link');
const backToTop   = document.getElementById('backToTop');
const footerYear  = document.getElementById('footerYear');
const sections    = document.querySelectorAll('section[id]');
const animEls     = document.querySelectorAll('.animate-on-scroll');
const placeholderBtns = document.querySelectorAll('.project-card__btn[data-placeholder="true"]');

/* --------------------------------------------------
   Footer year (dynamic)
-------------------------------------------------- */
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* --------------------------------------------------
   1. Navbar — scroll state
-------------------------------------------------- */
let lastScroll = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;

  // Add "scrolled" class after 20px
  navbar.classList.toggle('scrolled', scrollY > 20);

  lastScroll = scrollY;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load


/* --------------------------------------------------
   2. Mobile hamburger navigation
-------------------------------------------------- */
function openMobileNav() {
  mobileNav.classList.add('open');
  mobileOverlay.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  mobileOverlay.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) closeMobileNav();
  else openMobileNav();
});

mobileOverlay.addEventListener('click', closeMobileNav);

// Close on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// Close mobile nav when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileNav);
});


/* --------------------------------------------------
   3. Smooth scrolling (all in-page anchor links)
-------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* --------------------------------------------------
   4. Active navbar link — Intersection Observer
-------------------------------------------------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  },
  {
    root: null,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-h')) || 72}px 0px -60% 0px`,
    threshold: 0,
  }
);

sections.forEach(sec => sectionObserver.observe(sec));

function setActiveLink(sectionId) {
  navLinks.forEach(link => {
    const linkSection = link.getAttribute('data-section');
    link.classList.toggle('active', linkSection === sectionId);
  });
}


/* --------------------------------------------------
   5. Scroll animations — Intersection Observer
-------------------------------------------------- */
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  }
);

animEls.forEach(el => animObserver.observe(el));


/* --------------------------------------------------
   6. Back to top button
-------------------------------------------------- */
function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* --------------------------------------------------
   7. Placeholder project buttons — visual feedback
-------------------------------------------------- */
placeholderBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // Create toast notification
    showToast('⏳ Link belum tersedia — akan diperbarui setelah project dipublikasikan.');
  });
});


/* --------------------------------------------------
   8. Toast notification helper
-------------------------------------------------- */
function showToast(message, type = 'info', duration = 3500) {
  // Remove existing toast
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  Object.assign(toast.style, {
    position:        'fixed',
    bottom:          '80px',
    left:            '50%',
    transform:       'translateX(-50%) translateY(12px)',
    background:      'var(--clr-surface)',
    border:          '1px solid var(--clr-border-light)',
    color:           'var(--clr-text)',
    padding:         '12px 24px',
    borderRadius:    'var(--radius-full)',
    fontSize:        '0.88rem',
    fontWeight:      '500',
    boxShadow:       '0 8px 32px rgba(0,0,0,0.5)',
    zIndex:          '9999',
    opacity:         '0',
    transition:      'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents:   'none',
    whiteSpace:      'nowrap',
    maxWidth:        'calc(100vw - 32px)',
    textAlign:       'center',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}

// Expose showToast globally for contact.js
window.showToast = showToast;


/* --------------------------------------------------
   9. Skill card tilt effect (subtle)
-------------------------------------------------- */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) *  4;

    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* --------------------------------------------------
   10. Project card — subtle glow on hover
-------------------------------------------------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 12px 48px rgba(6,182,212,0.08), 0 4px 24px rgba(0,0,0,0.5)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});


/* --------------------------------------------------
   11. Typing effect on hero title
-------------------------------------------------- */
function typewriterEffect() {
  const target = document.querySelector('.hero__title .text-cyan');
  if (!target) return;

  const text = target.textContent;
  target.textContent = '';
  target.style.borderRight = '2px solid var(--clr-cyan)';

  let i = 0;
  const speed = 70; // ms per character

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor blink after done
      setTimeout(() => {
        target.style.borderRight = 'none';
      }, 1200);
    }
  }

  // Start after a short delay
  setTimeout(type, 600);
}

// Only run if not prefers-reduced-motion
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('DOMContentLoaded', typewriterEffect);
}

