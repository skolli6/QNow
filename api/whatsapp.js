/**
 * api/whatsapp.js
 * Vercel Serverless Function — proxies WhatsApp Cloud API calls server-side.
 *
 * WHY THIS EXISTS:
 * Browsers block direct calls to graph.facebook.com (CORS policy).
 * This function runs on Vercel's server, so no CORS issue.
 * It also keeps your WhatsApp token secret (not exposed in browser).
 *
 * Vercel free plan: 100,000 function calls/month — plenty for MVP.
 *
 * Endpoint: POST /api/whatsapp
 * Body: { to: "919876543210", message: "Hello!" }
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { to, message } = req.body

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing to or message' })
  }

  // These are read from Vercel environment variables (server-side only, never exposed)
  const token   = process.env.WHATSAPP_TOKEN      // no VITE_ prefix — server only
  const phoneId = process.env.WHATSAPP_PHONE_ID   // no VITE_ prefix — server only

  if (!token || !phoneId) {
    console.error('WhatsApp env vars not set')
    return res.status(500).json({ error: 'WhatsApp not configured' })
  }

  // Normalise phone number — remove spaces, +, leading zeros
  const phone = to.replace(/[\s+]/g, '').replace(/^0+/, '')

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'text',
          text: { body: message },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('WhatsApp API error:', data)
      return res.status(response.status).json({ error: data })
    }

    return res.status(200).json({ success: true, messageId: data.messages?.[0]?.id })
  } catch (err) {
    console.error('WhatsApp proxy error:', err)
    return res.status(500).json({ error: err.message })
  }
}
