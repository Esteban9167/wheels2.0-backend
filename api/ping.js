/* eslint-env node */
import { db } from '../lib/firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ts = Date.now();
  await db.collection('pings').doc(String(ts)).set({ ts });

  const snap = await db.collection('pings').orderBy('ts', 'desc').limit(1).get();
  const last = snap.docs[0]?.data() ?? null;

  return res.status(200).json({ ok: true, last });
}
