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

})();
