import { loadDoctors } from './doctors-data.js';

const textElement = (tag, text, className) => {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
};
const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
const allowedPhoto = (value) => {
  if (!hasText(value)) return false;
  if (/^\.\/assets\/img\/[\w/.-]+\.(webp|png|jpe?g)$/i.test(value) && !value.includes('..')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch { return false; }
};

function doctorCard(doctor) {
  const card = document.createElement('article');
  card.className = 'doctor-card';
  const portrait = document.createElement('div');
  portrait.className = 'doctor-portrait';
  portrait.setAttribute('aria-hidden', 'true');
  const placeholder = document.createElement('img');
  placeholder.className = 'doctor-placeholder';
  placeholder.src = './assets/img/icons/specialists.svg';
  placeholder.alt = '';
  placeholder.width = 128;
  placeholder.height = 128;
  placeholder.loading = 'lazy';
  portrait.append(placeholder);
  if (allowedPhoto(doctor.photo)) {
    const photo = document.createElement('img');
    photo.className = 'doctor-photo';
    photo.alt = '';
    photo.loading = 'lazy';
    photo.decoding = 'async';
    photo.referrerPolicy = 'no-referrer';
    photo.width = 600;
    photo.height = 480;
    photo.addEventListener('error', () => photo.remove(), { once: true });
    photo.src = doctor.photo;
    portrait.append(photo);
  }
  const details = document.createElement('div');
  details.className = 'doctor-details';
  details.append(textElement('p', doctor.specialty, 'eyebrow'));
  details.append(textElement('h3', doctor.name));
  if (doctor.photoIllustrative === true) {
    details.append(textElement('p', 'Fotografía ilustrativa', 'doctor-license'));
  }
  details.append(textElement('p', `Cédula profesional: ${doctor.license}`, 'doctor-license'));
  if (hasText(doctor.specialtyLicense)) {
    details.append(textElement('p', `Cédula de especialidad: ${doctor.specialtyLicense}`, 'doctor-license'));
  }
  const phone = typeof doctor.assistantWhatsapp === 'string' ? doctor.assistantWhatsapp.replace(/[\s()+-]/g, '') : '';
  if (/^[1-9]\d{7,14}$/.test(phone)) {
    const link = textElement('a', 'Solicitar cita por WhatsApp', 'button button--primary');
    const message = `Hola, quisiera solicitar una cita con ${doctor.name} en Hospital Palmas.`;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Solicitar cita con ${doctor.name} por WhatsApp de su asistente`);
    details.append(textElement('p', hasText(doctor.assistantName) ? `Asistente: ${doctor.assistantName}` : 'Contacto con su asistente', 'doctor-assistant'));
    details.append(link);
  } else {
    details.append(textElement('a', 'Consultar disponibilidad', 'button button--outline'));
    details.lastElementChild.href = '#contacto';
  }
  card.append(portrait, details);
  return card;
}

export async function initDoctors() {
  const list = document.querySelector('[data-doctor-list]');
  const status = document.querySelector('[data-directory-status]');
  if (!list || !status) return;
  try {
    const doctors = await loadDoctors();
    const published = doctors.filter((doctor) => doctor && doctor.published === true &&
      hasText(doctor.name) && hasText(doctor.specialty) && hasText(doctor.license));
    list.replaceChildren(...published.map(doctorCard));
    status.hidden = published.length > 0;
  } catch (error) {
    status.hidden = false;
    status.querySelector('.eyebrow').textContent = 'Contacto';
    status.querySelector('h3').textContent = 'Consulte por nuestros médicos.';
    status.querySelector('[data-directory-message]').textContent = 'No pudimos cargar el directorio en este momento. Comuníquese con el hospital para recibir orientación.';
    console.info('No se pudo cargar el directorio médico.', error);
  }
}
