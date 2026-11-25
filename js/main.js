/**
 * Gaurav Prabhu K - Portfolio Website JavaScript
 * Enhanced for Bootstrap 4 integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNavAutoClose();
  initProjectFilters();
  initCopyButtons();
});

/* -------------------------------------------------------------------------
   Navbar Scroll Effect
   ------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.site-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* -------------------------------------------------------------------------
   Auto-close Bootstrap Navbar Collapse on Link Click (Mobile)
   ------------------------------------------------------------------------- */
function initMobileNavAutoClose() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('siteNavbar');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navbarCollapse && typeof $ !== 'undefined') {
        $(navbarCollapse).collapse('hide');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   Project Filter Tabs
   ------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');
      filterBtns.forEach(filterBtn => {
        filterBtn.setAttribute('aria-pressed', String(filterBtn === btn));
      });

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category') || '';
        item.hidden = filterCategory !== 'all' && !itemCategory.includes(filterCategory);
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
