import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { hydrateSiteData } from './modules/site-data.js';
import { initDoctors } from './modules/doctors.js';

initNavigation();
initReveal();
hydrateSiteData();
initDoctors();
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Load the interactive map only as it approaches the viewport.
const map = document.querySelector('[data-map-src]');
if (map) {
  const loadMap = () => { map.src = map.dataset.mapSrc; };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loadMap();
      observer.disconnect();
    }, { rootMargin: '200px' });
    observer.observe(map);
  } else {
    loadMap();
  }
}
