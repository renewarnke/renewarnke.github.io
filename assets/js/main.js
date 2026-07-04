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

  // --- Contact form: AJAX submit to Formspree (progressive enhancement) ---
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var setStatus = function (msg, type) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form__status' + (type ? ' is-' + type : '');
    };

    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) return; // let native validation handle it
      e.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      setStatus('Wird gesendet …', 'pending');

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus('Danke! Ihre Nachricht ist angekommen.', 'success');
          } else {
            setStatus('Da ging etwas schief. Bitte schreiben Sie mir direkt per E-Mail.', 'error');
          }
        })
        .catch(function () {
          setStatus('Netzwerkfehler. Bitte versuchen Sie es später erneut.', 'error');
        })
        .finally(function () {
          if (button) button.disabled = false;
        });
    });
  }
})();
