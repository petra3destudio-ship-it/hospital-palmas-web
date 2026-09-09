export function initNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    toggle.querySelector('.sr-only').textContent = 'Abrir menú';
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.querySelector('.sr-only').textContent = open ? 'Abrir menú' : 'Cerrar menú';
    nav.classList.toggle('is-open', !open);
    document.body.classList.toggle('nav-open', !open);
  });

  window.matchMedia('(max-width: 980px)').addEventListener('change', close);
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}
