/**
 * whatsappService.js
 *
 * Calls /api/whatsapp (our Vercel serverless proxy) instead of Meta's API directly.
 * This avoids CORS and keeps the WhatsApp token secure on the server.
 *
 * WhatsApp is used for NOTIFICATIONS ONLY — not for login or authentication.
 *
 * Notifications sent:
 *   1. Token confirmation (immediately after joining queue)
 *   2. 3-people-ahead alert
 *   3. 15-minute warning
 *   4. Your-turn-now alert
 *   5. Slot extended confirmation
 */

async function sendWhatsApp(to, message) {
  if (!to) return false

  try {
    const res = await fetch('/api/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      console.warn('WhatsApp send failed:', err)
      return false
    }

    return true
  } catch (err) {
    console.warn('WhatsApp fetch error:', err)
    return false
  }
}

// ─── MESSAGE TEMPLATES ────────────────────────────────────────

export async function sendTokenConfirmation({ name, mobile, tokenNumber, vendorName, position, waitMins }) {
  const message =
    `👋 Hello ${name}!\n\n` +
    `✅ You've joined the queue at *${vendorName}*.\n\n` +
    `🎫 Your Token: *T-${tokenNumber}*\n` +
    `📍 Position: *#${position}*\n` +
    `⏱ Est. wait: *~${waitMins} min*\n\n` +
    `Track your position anytime:\n${window.location.origin}/check\n\n` +
    `_QNow – Queue smarter, wait less_`

  return sendWhatsApp(mobile, message)
}

export async function sendNearlyThereAlert({ name, mobile, tokenNumber, vendorName, ahead }) {
  const message =
    `⚡ *Almost your turn, ${name}!*\n\n` +
    `Only *${ahead} ${ahead === 1 ? 'person' : 'people'}* ahead of you at *${vendorName}*.\n` +
    `Your token: *T-${tokenNumber}*\n\n` +
    `Please start making your way now.\n\n` +
    `_QNow_`

  return sendWhatsApp(mobile, message)
}

export async function send15MinAlert({ name, mobile, tokenNumber, vendorName }) {
  const message =
    `⏰ *15-minute alert, ${name}!*\n\n` +
    `Your turn at *${vendorName}* is about *15 minutes away*.\n` +
    `Token: *T-${tokenNumber}*\n\n` +
    `Head over now. Can't make it?\n` +
    `Extend your slot: ${window.location.origin}/check\n\n` +
    `_QNow_`

  return sendWhatsApp(mobile, message)
}

export async function sendYourTurnNow({ name, mobile, tokenNumber, vendorName }) {
  const message =
    `🔔 *It's your turn NOW, ${name}!*\n\n` +
    `Token *T-${tokenNumber}* is being called at *${vendorName}*.\n\n` +
    `Please go to the counter immediately.\n\n` +
    `_QNow_`

  return sendWhatsApp(mobile, message)
}

export async function sendSlotExtended({ name, mobile, tokenNumber, vendorName, newPosition }) {
  const message =
    `✅ *Slot extended, ${name}!*\n\n` +
    `Your token *T-${tokenNumber}* at *${vendorName}* has been moved to position *#${newPosition}*.\n\n` +
    `We'll notify you when your new turn approaches.\n\n` +
    `_QNow_`

  return sendWhatsApp(mobile, message)
}
