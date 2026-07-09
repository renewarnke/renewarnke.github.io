(function () {
  'use strict';

  // --- Mobile navigation toggle ---
  var header = document.querySelector('[data-nav]');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
  }

  // --- Elevate header + reveal scroll-to-top on scroll ---
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    document.body.classList.toggle('show-to-top', y > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Contact form: Nextcloud Forms iframe (auto-resize + submit feedback) ---
  var iframe = document.querySelector('[data-contact-iframe]');
  var wrapper = document.querySelector('[data-contact-form]');
  if (iframe && wrapper) {
    var origin = iframe.src.replace(/\/embed\/.*/, '');

    window.addEventListener('message', function (event) {
      if (event.origin !== origin) return;

      if (event.data && event.data.type === 'resize-iframe' && event.data.payload) {
        iframe.width = event.data.payload.width;
        iframe.height = event.data.payload.height;
        return;
      }

      if (event.data && event.data.type === 'form-saved') {
        iframe.style.display = 'none';
        var status = document.createElement('p');
        status.className = 'form__status is-success';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.textContent = 'Danke! Ihre Nachricht ist angekommen.';
        wrapper.appendChild(status);
      }
    }, false);
  }
})();
