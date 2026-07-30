# Lowry Lighting Solutions — prospect demo video

25 seconds, 1920x1080, UK female voiceover with music and sound design.
Built from live captures of the CRM at lowry-crm.vercel.app, in Lowry's own
brand colours (indigo #1E2875, blue #3E63DD, purple #8F3FF0).

## Beats

| Time | On screen | Voiceover |
|------|-----------|-----------|
| 0.0s | Lowry logo. "The work stops at five. The admin does not." | The work stops at five. The admin does not. |
| 4.7s | Director's View, slow push in | So this is your whole business, live, in one view. |
| 9.8s | Jobs and Visits | Every job and visit, already scheduled. |
| 14.2s | WhatsApp Activity | Engineers message from site, and it writes itself in. |
| 18.7s | "We answer the phone. We do the admin. You get your evenings back." | We answer the phone. We do the admin. |
| 21.5s | £2,000 / £1,000 cards, Book a call, LeadaLine logo | Two thousand to set up. One thousand a month. |

## Covering message to send with it

Short version, for WhatsApp or the body of an email.

> Hi Dan,
>
> Rather than talk you through it, we built it. This is a two minute look at
> your operations portal running on your own jobs, sites and engineers.
>
> Everything in the video already exists. Quotes chased, visits booked, and
> engineers updating the CRM from site by WhatsApp without anyone typing it up
> afterwards.
>
> Two thousand to set up, one thousand a month, and we run it for you.
>
> Worth fifteen minutes to walk through it properly?

Change "two minute" to "twenty five second" if you send the video on its own.

## Notes before you send

- The figures in the CRM captures are the sample data already in the demo
  build. The system labels itself as a demonstration with fictional data, so
  the video never claims those are Lowry's real numbers.
- No invented statistics anywhere. The time saving is carried by the admin
  being handled, not by a made up figure.
- The price appears because it was set for this prospect. It is a private
  quote, not published pricing, so keep it off the website and social.
- The director is addressed as "you" throughout. If you want his name in the
  opening, say the word and it takes two minutes to re-render.

## Rebuild

Composition `LowryDemo` in `../leadaline-remotion/src/reels/LowryDemo.tsx`.
Captures refresh via `../leadaline-remotion/shoot_lowry.mjs`.
Audio via `scratchpad/lowry_audio.py`.
