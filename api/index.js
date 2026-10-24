// CNIPMS server-side proxy configuration. No Vercel Environment Variables required.
// Paste your deployed Google Apps Script Web App URL ending in /exec below.
// Keep the GitHub repository PRIVATE because this file contains the shared API token.
const CNIPMS_GAS_URL = 'https://script.google.com/macros/s/AKfycbzaX_eLrvc6bE080qrh4C7O0Xe1yMntGPiltBg11GOkSCeeH0DmoJd2dFeWYavH_B8t/exec';
const CNIPMS_API_TOKEN = 'z2Knr0lpSKqgxzijuzZn2zcfiBjCfMfqwMwCxu9QkU1ENXHy';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!CNIPMS_GAS_URL || CNIPMS_GAS_URL === 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE') {
    return res.status(500).json({ ok: false, error: 'Set CNIPMS_GAS_URL near the top of api/index.js to your Apps Script Web App URL ending in /exec.' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const response = await fetch(CNIPMS_GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token: CNIPMS_API_TOKEN, action: body.action, payload: body.payload || {} }),
      redirect: 'follow'
    });
    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch { throw new Error('Google Apps Script returned a non-JSON response. Check that the Web App is deployed and accessible.'); }
    return res.status(response.ok ? 200 : response.status).json(data);
  } catch (error) {
    return res.status(502).json({ ok: false, error: error?.message || 'Could not reach Google Apps Script.' });
  }
}
