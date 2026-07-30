// High-res captures of the Lowry CRM demo for the prospect video.
import puppeteer from 'puppeteer-core';

const CH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = '/home/user/LeadaLine/leadaline-remotion/public/lowry';
const URL = 'http://localhost:8901/lowry.html';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// sidebar label -> output name
const VIEWS = [
  ['Overview', 'overview'],
  ['Jobs & Visits', 'jobs'],
  ['Calendar', 'calendar'],
  ['WhatsApp Activity', 'whatsapp'],
  ['Quotations', 'quotations'],
  ['Opportunities', 'opportunities'],
];

const browser = await puppeteer.launch({
  executablePath: CH,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-color-profile=srgb'],
});

const p = await browser.newPage();
await p.setViewport({width: 1600, height: 900, deviceScaleFactor: 2});
await p.goto(URL, {waitUntil: 'networkidle2', timeout: 60000});
await sleep(4000);

// step 1: choose the Director persona on the entry screen
const entered = await p.evaluate(() => {
  const els = Array.from(document.querySelectorAll('*'));
  const card = els.reverse().find((e) => {
    const t = (e.textContent || '').trim();
    return t.startsWith('Dan Maskell') && e.getBoundingClientRect().width > 150 && e.getBoundingClientRect().width < 500;
  });
  if (card) {
    card.click();
    return true;
  }
  return false;
});
console.log('entered as director:', entered);
await sleep(3500);

for (const [label, name] of VIEWS) {
  const clicked = await p.evaluate((lbl) => {
    // deepest element whose own text is exactly the nav label
    const els = Array.from(document.querySelectorAll('a,button,li,div,span'));
    const hits = els.filter((e) => {
      const t = (e.textContent || '').trim();
      const r = e.getBoundingClientRect();
      return t === lbl && r.width > 20 && r.width < 320 && r.height > 10 && r.height < 90;
    });
    const hit = hits[hits.length - 1];
    if (!hit) return false;
    hit.click();
    let n = hit.parentElement;
    for (let i = 0; i < 3 && n; i++, n = n.parentElement) n.click();
    return true;
  }, label);
  await sleep(2500);
  await p.screenshot({path: `${OUT}/${name}.png`});
  console.log(`${name}: clicked=${clicked}`);
}

await browser.close();
console.log('DONE');
