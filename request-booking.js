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
      customer_name,
      phone,
      email,
      review_platform,
      review_link
    } = req.body;

    if (!client_id) {
      return res.status(400).json({ error: 'client_id is required' });
    }

    const { data, error } = await supabase
      .from('review_requests')
      .insert([{
        client_id,
        lead_id: lead_id || null,
        customer_name: customer_name || null,
        phone: phone || null,
        email: email || null,
        review_platform: review_platform || 'google',
        review_link: review_link || null,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, review_request: data });
  } catch (err) {
    console.error('request-review error:', err);
    return res.status(500).json({ error: err.message });
  }
}
