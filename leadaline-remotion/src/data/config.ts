/**
 * LeadaLine demo — data-driven content.
 * Change these values to re-skin the whole video for a different industry,
 * customer, service, location, value or review. Every scene reads from here.
 */

export type Message = {from: 'customer' | 'ai'; text: string; time?: string};

export type DemoData = {
  brand: {
    name: string;
    tagline: string;
    kicker: string;
    website: string;
  };
  hook: {
    headline: string; // use * to wrap the gradient part, e.g. "on the *tools*"
    sub: string;
  };
  /** the qualifying iMessage conversation shown on the phone */
  conversation: Message[];
  lead: {
    customerName: string;
    initials: string;
    industry: string;
    service: string;
    product: string;
    location: string;
    area: string;
    callback: string;
    quality: string; // e.g. "High"
    estimatedValue: string; // e.g. "£800 – £1,400"
  };
  booking: {
    slot: string; // e.g. "Thu 4:30pm"
    label: string;
  };
  review: {
    stars: number;
    text: string;
    author: string;
    source: string;
  };
  metrics: {
    leadsPerWeek: number;
    qualified: number;
    booked: number;
    answeredPct: number;
    hoursSaved: number;
  };
  /** pipeline column names, in order */
  pipeline: string[];
  cta: {
    headline: string; // * wraps gradient
    button: string;
    note: string;
  };
};

export const demoData: DemoData = {
  brand: {
    name: 'LeadaLine',
    tagline: 'AI Systems. Real Results.',
    kicker: 'Your AI Office Team',
    website: 'LeadaLine.com',
  },
  hook: {
    headline: 'Stop missing jobs\nwhile you’re *on the tools.*',
    sub: 'Every enquiry answered, qualified and booked — automatically.',
  },
  conversation: [
    {from: 'customer', text: 'Hi, do you install EV chargers? Looking at a Zappi.', time: '14:31'},
    {from: 'ai', text: 'Hi! Yes — we fit 7kW Zappi units. Is it for your home?', time: '14:31'},
    {from: 'customer', text: 'Yeah, driveway at home in Eltham, SE9.', time: '14:32'},
    {from: 'ai', text: 'Perfect. Is the board nearby, and when suits a callback?', time: '14:32'},
    {from: 'customer', text: 'Board’s in the garage, close by. After 5pm’s best.', time: '14:32'},
    {from: 'ai', text: 'Brilliant — I’ve got everything to prep your quote 👍', time: '14:32'},
  ],
  lead: {
    customerName: 'Jamie R.',
    initials: 'JR',
    industry: 'EV charger installation',
    service: 'EV Charger Install · 7kW Zappi',
    product: '7kW Zappi',
    location: 'Eltham · SE9',
    area: 'Eltham · SE9 · driveway',
    callback: 'After 5pm',
    quality: 'High',
    estimatedValue: '£800 – £1,400',
  },
  booking: {
    slot: 'Thu 4:30pm',
    label: 'Survey booked',
  },
  review: {
    stars: 5,
    text: '“Quick, tidy, professional install of the Zappi.”',
    author: 'Jamie R.',
    source: 'New Google review · earned automatically',
  },
  metrics: {
    leadsPerWeek: 38,
    qualified: 24,
    booked: 12,
    answeredPct: 92,
    hoursSaved: 11,
  },
  pipeline: ['New Lead', 'Qualified', 'Booked', 'Followed Up'],
  cta: {
    headline: 'Your AI Office Team,\n*built around your business.*',
    button: 'Book a 15-minute demo',
    note: '2 founding spots left',
  },
};
