export async function onRequest(context) {
  const { request, env } = context;
  const db = env.DB;

  if (request.method === 'GET') {
    const rows = await db.prepare('SELECT key, value FROM app_state').all();
    const state = {
      users: [],
      workOrders: [],
      chartRange: { from: '', to: '' }
    };

    for (const row of rows.results || []) {
      try {
        state[row.key] = JSON.parse(row.value);
      } catch {
        state[row.key] = row.value;
      }
    }

    return Response.json(state);
  }

  if (request.method === 'POST') {
    const body = await request.json();
    const users = body.users ?? [];
    const workOrders = body.workOrders ?? [];
    const chartRange = body.chartRange ?? { from: '', to: '' };

    await db.batch([
      db.prepare(
        `INSERT INTO app_state(key, value)
         VALUES ('users', ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`
      ).bind(JSON.stringify(users)),
      db.prepare(
        `INSERT INTO app_state(key, value)
         VALUES ('workOrders', ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`
      ).bind(JSON.stringify(workOrders)),
      db.prepare(
        `INSERT INTO app_state(key, value)
         VALUES ('chartRange', ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`
      ).bind(JSON.stringify(chartRange))
    ]);

    return Response.json({ ok: true });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
