/**
 * Gaurav Prabhu K - Portfolio Website JavaScript
 * Zero-dependency, performant ES6 vanilla script.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFilters();
  initCopyButtons();
  initResumeModal();
  initScrollSpy();
});

/* -------------------------------------------------------------------------
   Navbar & Mobile Menu
   ------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Add background blur/solid on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
      const isExpanded = document.body.classList.contains('mobile-nav-active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile nav on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('mobile-nav-active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* -------------------------------------------------------------------------
   Project Filter Tabs
   ------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------
   Copy to Clipboard with Toast Notification
   ------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-message');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Email';

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`${label} copied to clipboard!`);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`${label} copied to clipboard!`);
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* -------------------------------------------------------------------------
   Resume Modal & Print Handler
   ------------------------------------------------------------------------- */
function initResumeModal() {
  const openButtons = document.querySelectorAll('[data-modal-open="resume-modal"]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const modal = document.getElementById('resume-modal');
  const printBtn = document.getElementById('modal-print-btn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------------------
   Scroll Spy for Active Navigation Link
   ------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}
