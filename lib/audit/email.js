/* ============================================================
   Contractor Enquiry Audit — email provider abstraction
   ------------------------------------------------------------
   SERVER ONLY. Default provider: Resend (EMAIL_PROVIDER_API_KEY
   + EMAIL_FROM_ADDRESS). When unconfigured, sends become logged
   no-ops so the audit journey never breaks. Never commit keys.
   ============================================================ */

export function emailConfigured() {
  return !!(process.env.EMAIL_PROVIDER_API_KEY && process.env.EMAIL_FROM_ADDRESS);
}

/**
 * Send an email. Returns { sent, provider, error? }. Never throws.
 */
export async function sendEmail({ to, subject, html }) {
  if (!emailConfigured()) {
    console.log(`[email:noop] to=${to} subject="${subject}" (no provider configured)`);
    return { sent: false, provider: 'none' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${process.env.EMAIL_PROVIDER_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM_ADDRESS,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[email:error] ${res.status} ${body.slice(0, 200)}`);
      return { sent: false, provider: 'resend', error: `HTTP ${res.status}` };
    }
    return { sent: true, provider: 'resend' };
  } catch (err) {
    console.error('[email:error]', err.message);
    return { sent: false, provider: 'resend', error: err.message };
  }
}
