import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { hydrateSiteData } from './modules/site-data.js';
import { initDoctors } from './modules/doctors.js';

initNavigation();
initReveal();
hydrateSiteData();
initDoctors();
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
