// Screenshot the live LeadaLine pages with real JS execution + scroll-through.
import puppeteer from 'puppeteer-core';

const CH = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = '/home/user/LeadaLine/leadaline-reels/site-shots';
const BASE = 'http://localhost:8901/live';

const jobs = [
  {page: 'index',               mobile: true,  desktop: true},
  {page: 'the-leadaline-offer', mobile: true,  desktop: false},
  {page: 'book-a-demo',         mobile: true,  desktop: false},
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shoot = async (browser, page, mobile) => {
  const p = await browser.newPage();
  const w = mobile ? 390 : 1440;
  await p.setViewport({width: w, height: mobile ? 844 : 900, deviceScaleFactor: 2});
  await p.goto(`${BASE}/${page}.html`, {waitUntil: 'networkidle2', timeout: 45000}).catch(() => {});
  // wait until the (possibly JS-written) document has real content
  await p
    .waitForFunction(
      () => (document.body?.innerText || '').length > 400 && document.documentElement.scrollHeight > 2000,
      {timeout: 30000}
    )
    .catch(() => {});
  await sleep(3000);
  // scroll through to trigger reveal-on-scroll, then back to top
  const height = await p.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0));
  for (let y = 0; y < height; y += 500) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(90);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await sleep(900);
  const suffix = mobile ? 'mobile' : 'desktop';
  await p.screenshot({path: `${OUT}/${page}-${suffix}.png`, fullPage: true});
  console.log(`${page}-${suffix} h=${height}`);
  await p.close();
};

const browser = await puppeteer.launch({
  executablePath: CH,
  headless: 'shell' === 'never' ? false : true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-color-profile=srgb'],
});
for (const j of jobs) {
  if (j.mobile) await shoot(browser, j.page, true);
  if (j.desktop) await shoot(browser, j.page, false);
}
await browser.close();
console.log('DONE');
