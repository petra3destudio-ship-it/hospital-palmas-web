// Data source boundary: a future Supabase adapter must return this same array shape.
export async function loadDoctors() {
  const response = await fetch('./data/doctors.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`doctors.json: ${response.status}`);
  const doctors = await response.json();
  if (!Array.isArray(doctors)) throw new Error('Invalid directory format');
  return doctors;
}
