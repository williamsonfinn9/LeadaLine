# Voiceover Scripts — 3 New Pain-Point Reels

Voice: UK female (Piper `en_GB-cori-high`, neural TTS, run locally — no API).
Music ducks to ~38% under each line; every line is timed to its scene.

## Reel 1 — The Missed Call
| At | Line |
|----|------|
| 0.5s | You're up a ladder. And the phone's ringing. |
| 5.6s | Most callers won't leave a voicemail. |
| 10.2s | They just ring the next electrician on Google. |
| 14.9s | LeadaLine answers in one ring. Every call, web form and WhatsApp. Day and night. |
| 21.9s | It captures the job, and sends the lead straight to your pocket. |
| 26.7s | Never miss another call. LeadaLine dot com. |

## Reel 2 — The Quiet Quote
| At | Line |
|----|------|
| 0.6s | You quoted fourteen hundred pounds on Tuesday. |
| 5.5s | Then, nothing. And most firms only chase once. |
| 11.4s | So LeadaLine chases it for you. Politely. Persistently. In your tone. Until you get an answer. |
| 19.4s | That's fourteen hundred pounds you nearly lost. |
| 26.2s | Stop losing quoted work. LeadaLine dot com. |

## Reel 3 — 9:47pm
| At | Line |
|----|------|
| 0.6s | Quarter to ten at night. Your office closed hours ago. |
| 5.8s | Most firms will reply tomorrow. Some never do. |
| 11.4s | Your AI answers in seconds. It qualifies the job, reassures the customer, and books the morning slot. |
| 19.8s | So you wake up to booked work. |
| 26.2s | Every enquiry. Day and night. LeadaLine dot com. |

## Rebuild
`scratchpad/reel_vo.py` — synthesizes each segment with Piper, fits it to its beat
window (auto tempo up to 1.18× if a take overflows; none needed), normalizes,
places it on the 31s timeline, ducks the music bed under speech, mixes with SFX
and encodes AAC. Remux with the rendered video via ffmpeg `-map 0:v -map 1:a`.
