/* ============================================================
   Contractor Enquiry Audit — Supabase PostgREST helper
   ------------------------------------------------------------
   SERVER ONLY. Uses the service-role key via native fetch so the
   project keeps its zero-npm-dependency deployment. All audit
   tables are RLS "deny all"; this service role is the only path
   in, and it only ever runs inside serverless functions.
   ============================================================ */

const url = () => {
  const u = process.env.SUPABASE_URL;
  if (!u) { const e = new Error('SUPABASE_URL is not configured'); e.code = 'config'; throw e; }
  return u.replace(/\/$/, '');
};
const key = () => {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!k) { const e = new Error('SUPABASE_SERVICE_ROLE_KEY is not configured'); e.code = 'config'; throw e; }
  return k;
};

async function rest(path, { method = 'GET', body, headers = {}, prefer } = {}) {
  const res = await fetch(`${url()}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key(),
      authorization: `Bearer ${key()}`,
      'content-type': 'application/json',
      ...(prefer ? { prefer } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  if (!res.ok) {
    const e = new Error(`Supabase error ${res.status}: ${typeof data === 'object' ? JSON.stringify(data).slice(0, 300) : String(data).slice(0, 300)}`);
    e.code = 'db_error';
    e.status = res.status;
    throw e;
  }
  return data;
}

/** Insert one row, returning it. */
export function insert(table, row) {
  return rest(table, { method: 'POST', body: row, prefer: 'return=representation' })
    .then((rows) => (Array.isArray(rows) ? rows[0] : rows));
}

/** Insert many rows (no return). */
export function insertMany(table, rows) {
  if (!rows.length) return Promise.resolve([]);
  return rest(table, { method: 'POST', body: rows, prefer: 'return=minimal' });
}

/** Select with a raw PostgREST query string, e.g. select('audit_leads', 'id=eq.X&select=*'). */
export function select(table, query) {
  return rest(`${table}?${query}`);
}

export function selectOne(table, query) {
  return select(table, query).then((rows) => (Array.isArray(rows) && rows.length ? rows[0] : null));
}

/** Update rows matching filter, returning them. */
export function update(table, filter, patch) {
  return rest(`${table}?${filter}`, { method: 'PATCH', body: patch, prefer: 'return=representation' });
}

/** Verify a Supabase Auth user JWT; returns the user object or null. */
export async function verifyUserJwt(jwt) {
  if (!jwt) return null;
  try {
    const res = await fetch(`${url()}/auth/v1/user`, {
      headers: { apikey: key(), authorization: `Bearer ${jwt}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
