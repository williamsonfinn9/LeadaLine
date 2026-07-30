/* ============================================================
   Contractor Enquiry Audit — SSRF-safe URL validation
   ------------------------------------------------------------
   SERVER ONLY (uses node:dns / node:net). Every outbound fetch
   to a prospect-supplied URL must pass assertPublicUrl() first,
   and again after every redirect hop.
   ============================================================ */

import { lookup } from 'node:dns/promises';
import net from 'node:net';

const BLOCKED_HOSTNAMES = new Set([
  'localhost', 'localhost.localdomain', 'metadata.google.internal',
  'metadata', 'instance-data',
]);

const BLOCKED_TLDS = ['.local', '.internal', '.localhost', '.home', '.lan', '.corp'];

/** True if an IPv4/IPv6 address is private, loopback, link-local or reserved. */
export function isPrivateAddress(addr) {
  if (net.isIPv4(addr)) {
    const parts = addr.split('.').map(Number);
    const [a, b] = parts;
    if (a === 0 || a === 10 || a === 127) return true;             // this-net, private, loopback
    if (a === 100 && b >= 64 && b <= 127) return true;             // CGNAT
    if (a === 169 && b === 254) return true;                       // link-local / cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;              // private
    if (a === 192 && b === 168) return true;                       // private
    if (a === 192 && b === 0 && parts[2] === 0) return true;       // IETF
    if (a === 198 && (b === 18 || b === 19)) return true;          // benchmarking
    if (a >= 224) return true;                                     // multicast + reserved
    return false;
  }
  if (net.isIPv6(addr)) {
    const lower = addr.toLowerCase();
    if (lower === '::' || lower === '::1') return true;            // unspecified, loopback
    if (lower.startsWith('fe80') || lower.startsWith('fe9') ||
        lower.startsWith('fea') || lower.startsWith('feb')) return true; // link-local
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true;   // unique local
    if (lower.startsWith('::ffff:')) {
      // IPv4-mapped — check the embedded IPv4
      const v4 = lower.split(':').pop();
      if (net.isIPv4(v4)) return isPrivateAddress(v4);
      return true;
    }
    return false;
  }
  return true; // not a recognised IP — treat as unsafe if used as one
}

/**
 * Validate that a URL is safe to fetch server-side.
 * Throws Error with .code = 'unsafe_url' when it is not.
 * Returns { url: URL, addresses: string[] }.
 */
export async function assertPublicUrl(rawUrl) {
  const fail = (msg) => {
    const e = new Error(msg);
    e.code = 'unsafe_url';
    throw e;
  };

  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    fail('Invalid URL');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') fail('Only http(s) URLs are allowed');
  if (url.username || url.password) fail('Credentials in URL are not allowed');
  if (url.port && url.port !== '80' && url.port !== '443') fail('Non-standard ports are not allowed');

  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (BLOCKED_HOSTNAMES.has(host)) fail('Blocked hostname');
  if (BLOCKED_TLDS.some((t) => host.endsWith(t))) fail('Blocked internal TLD');

  // Literal IP hosts (incl. bracketed IPv6)
  const bare = host.replace(/^\[|\]$/g, '');
  if (net.isIP(bare)) {
    if (isPrivateAddress(bare)) fail('IP address is not publicly routable');
    return { url, addresses: [bare] };
  }
  if (!host.includes('.')) fail('Hostname must be a public domain');

  // Resolve DNS and check every address (prevents DNS rebinding at
  // the resolution level; hop-by-hop re-checks handle redirects).
  let records;
  try {
    records = await lookup(bare, { all: true, verbatim: true });
  } catch {
    const e = new Error('Domain could not be resolved');
    e.code = 'dns_failure';
    throw e;
  }
  if (!records.length) fail('Domain has no addresses');
  for (const r of records) {
    if (isPrivateAddress(r.address)) fail('Domain resolves to a private address');
  }
  return { url, addresses: records.map((r) => r.address) };
}
