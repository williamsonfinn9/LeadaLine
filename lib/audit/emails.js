/* ============================================================
   Contractor Enquiry Audit — email templates
   ------------------------------------------------------------
   Pure ESM (testable). Four templates:
     1 report_ready   — transactional (privacy consent covers it:
                        the prospect requested this exact report)
     2 useful_followup— marketing (requires marketing consent)
     3 workflow_preview — marketing
     4 final_reminder — marketing
   All marketing templates include the unsubscribe link.
   ============================================================ */

const wrap = (title, bodyHtml, footerHtml) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#F3F7FF;font-family:Arial,Helvetica,sans-serif;color:#07142F;">
<div style="max-width:560px;margin:0 auto;padding:32px 20px;">
  <div style="font-size:22px;font-weight:bold;margin-bottom:20px;">Leada<span style="color:#2563EB;">Line</span></div>
  <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;">
    <h1 style="font-size:19px;margin:0 0 14px;">${title}</h1>
    ${bodyHtml}
  </div>
  <div style="font-size:12px;color:#64748B;margin-top:18px;line-height:1.5;">
    LeadaLine — AI Office Teams for UK service businesses.<br>
    ${footerHtml || ''}
  </div>
</div>
</body></html>`;

const button = (href, label) =>
  `<p style="margin:22px 0;"><a href="${href}" style="background:#2563EB;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block;">${label}</a></p>`;

const p = (t) => `<p style="font-size:14px;line-height:1.6;margin:0 0 14px;">${t}</p>`;

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * @param {object} ctx — { businessName, firstName, score, label, mainGap,
 *                          reportUrl, bookingUrl, unsubscribeUrl }
 */
export function emailTemplates(ctx) {
  const b = esc(ctx.businessName);
  const f = esc(ctx.firstName);
  const gap = ctx.mainGap ? esc(ctx.mainGap) : null;
  const unsub = ctx.unsubscribeUrl
    ? `You can <a href="${ctx.unsubscribeUrl}" style="color:#64748B;">unsubscribe from follow-up emails</a> at any time.`
    : '';

  return {
    report_ready: {
      kind: 'transactional',
      subject: `Your ${ctx.businessName} enquiry audit is ready`,
      html: wrap(
        `Your enquiry audit is ready, ${f}`,
        [
          p(`Thanks for running the Contractor Enquiry Audit for <strong>${b}</strong>.`),
          p(`Your overall score is <strong>${esc(ctx.score)}/100 — ${esc(ctx.label)}</strong>.`),
          gap ? p(`The largest opportunity we identified: <strong>${gap}</strong>.`) : '',
          button(ctx.reportUrl, 'View my full report'),
          p(`If you'd like us to walk you through it and show the recommended setup built for your business, you can book a personalised demo from the report.`),
        ].join(''),
        'This email delivers the report you requested.',
      ),
    },

    useful_followup: {
      kind: 'marketing',
      subject: `One practical fix from your ${ctx.businessName} audit`,
      html: wrap(
        `One thing worth fixing first`,
        [
          gap
            ? p(`From your audit, the highest-impact fix for <strong>${b}</strong> looks like: <strong>${gap}</strong>.`)
            : p(`From your audit, the fastest win for <strong>${b}</strong> is usually making sure every enquiry gets an immediate acknowledgement.`),
          p(`Picture a customer with an urgent job at 7pm. If they don't hear back quickly, they simply call the next business on the list. An instant acknowledgement — even out of hours — usually keeps that job in your pipeline.`),
          button(ctx.reportUrl, 'Revisit my report'),
        ].join(''),
        unsub,
      ),
    },

    workflow_preview: {
      kind: 'marketing',
      subject: `How enquiries could flow for ${ctx.businessName}`,
      html: wrap(
        `The workflow we'd install for ${b}`,
        [
          p(`Your report includes a recommended enquiry workflow: every call or enquiry answered immediately, qualified, summarised to you, and followed up automatically if the customer goes quiet.`),
          p(`On a demo call we build this around <strong>${b}</strong> specifically — your services, your area, your diary — rather than giving you a generic presentation.`),
          button(ctx.bookingUrl, 'Choose a demo time'),
          p(`Or take another look at your report first:`),
          p(`<a href="${ctx.reportUrl}" style="color:#2563EB;">${ctx.reportUrl}</a>`),
        ].join(''),
        unsub,
      ),
    },

    final_reminder: {
      kind: 'marketing',
      subject: `Your ${ctx.businessName} audit report is still available`,
      html: wrap(
        `Your report is still here when you need it`,
        [
          p(`Just a reminder that your enquiry audit for <strong>${b}</strong> is still available.`),
          gap ? p(`Main finding: <strong>${gap}</strong>.`) : '',
          button(ctx.reportUrl, 'View my report'),
          p(`If it's useful, book a demo whenever suits — there's no deadline on this.`),
        ].join(''),
        unsub,
      ),
    },
  };
}
