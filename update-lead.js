import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      client_id,
      lead_id,
      name,
      phone,
      email,
      preferred_date,
      preferred_time,
      service_type,
      notes
    } = req.body;

    if (!client_id) {
      return res.status(400).json({ error: 'client_id is required' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        client_id,
        lead_id: lead_id || null,
        name: name || null,
        phone: phone || null,
        email: email || null,
        preferred_date: preferred_date || null,
        preferred_time: preferred_time || null,
        service_type: service_type || null,
        notes: notes || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, booking: data });
  } catch (err) {
    console.error('request-booking error:', err);
    return res.status(500).json({ error: err.message });
  }
}
