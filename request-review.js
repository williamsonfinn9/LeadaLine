# LeadaLine — Vercel Deployment

## Structure
```
/api
  ingest-lead.js      — POST /api/ingest-lead
  request-booking.js  — POST /api/request-booking
  request-review.js   — POST /api/request-review
  update-lead.js      — POST /api/update-lead
  gmail-send.js       — POST /api/gmail-send
/site
  (paste your downloaded Netlify site files here)
vercel.json
package.json
```

## Deploy steps

1. Install Vercel CLI:
   npm install -g vercel

2. Login:
   vercel login

3. Deploy:
   vercel --prod

4. Set environment variables in Vercel dashboard:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY

5. Add leadaline.com domain in Vercel dashboard under Project > Domains

## Function URLs after deploy
All functions available at: https://leadaline.com/api/{function-name}
