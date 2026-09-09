const setHref = (selector, href) => document.querySelectorAll(selector).forEach((el) => el.setAttribute('href', href));
const setText = (selector, text) => document.querySelectorAll(selector).forEach((el) => { el.textContent = text; });

export async function hydrateSiteData() {
  try {
    const response = await fetch('./data/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`site.json: ${response.status}`);
    const data = await response.json();

    const primary = data.contact?.phones?.[0];
    const secondary = data.contact?.phones?.[1];
    if (primary) {
      setHref('[data-phone-link]', `tel:${primary.e164}`);
      setText('[data-phone-display]', primary.display);
    }
    if (secondary) {
      setHref('[data-secondary-phone-link]', `tel:${secondary.e164}`);
      setText('[data-secondary-phone-display]', secondary.display);
    }
    if (data.contact?.whatsapp?.url) setHref('[data-whatsapp-link]', data.contact.whatsapp.url);
    if (data.location?.mapsUrl) setHref('[data-map-link]', data.location.mapsUrl);
    if (data.location?.display) setText('[data-address]', data.location.display);
  } catch (error) {
    console.info('Se conservaron los datos de respaldo incluidos en index.html.', error);
  }
}
