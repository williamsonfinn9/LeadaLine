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
      name,
      phone,
      email,
      source,
      message,
      service_interest,
      metadata
    } = req.body;

    if (!client_id) {
      return res.status(400).json({ error: 'client_id is required' });
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        client_id,
        name: name || null,
        phone: phone || null,
        email: email || null,
        source: source || 'website',
        message: message || null,
        service_interest: service_interest || null,
        metadata: metadata || {},
        status: 'new',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, lead: data });
  } catch (err) {
    console.error('ingest-lead error:', err);
    return res.status(500).json({ error: err.message });
  }
}
