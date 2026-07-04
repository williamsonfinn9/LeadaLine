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
    const { lead_id, client_id, ...updates } = req.body;

    if (!lead_id || !client_id) {
      return res.status(400).json({ error: 'lead_id and client_id are required' });
    }

    const allowedFields = [
      'status', 'name', 'phone', 'email', 'message',
      'service_interest', 'notes', 'metadata', 'assigned_to',
      'follow_up_date', 'outcome'
    ];

    const safeUpdates = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) safeUpdates[key] = updates[key];
    }

    safeUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('leads')
      .update(safeUpdates)
      .eq('id', lead_id)
      .eq('client_id', client_id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, lead: data });
  } catch (err) {
    console.error('update-lead error:', err);
    return res.status(500).json({ error: err.message });
  }
}
