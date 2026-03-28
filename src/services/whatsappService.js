/**
 * whatsappService.js
 * Meta WhatsApp Cloud API — used for NOTIFICATIONS ONLY.
 *
 * WhatsApp is NOT used for login or authentication in QNow.
 * Login = mobile number + 4-digit PIN (default: last 4 digits of mobile).
 *
 * WhatsApp sends automatic alerts at these events:
 *   1. Token issued (queue joined confirmation)
 *   2. 3 people ahead alert
 *   3. 15-minute before-turn alert
 *   4. Your-turn-now alert
 *   5. Slot extended confirmation
 *
 * FREE setup:
 *  1. Go to https://developers.facebook.com → Create App → Business
 *  2. Add WhatsApp product → API Setup page
 *  3. Copy ACCESS_TOKEN and PHONE_NUMBER_ID into .env
 *  4. For testing: add up to 5 recipient numbers for free (no business verification needed)
 *  5. For production: verify business → 1000 free conversations/month, then ~₹0.60/conversation
 */

const WA_TOKEN    = import.meta.env.VITE_WHATSAPP_TOKEN
const WA_PHONE_ID = import.meta.env.VITE_WHATSAPP_PHONE_ID
const WA_API_URL  = `https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`

// ─── CORE SEND ───────────────────────────────────────────────
async function sendWhatsApp(to, text) {
  if (!WA_TOKEN || !WA_PHONE_ID) {
    console.warn('WhatsApp not configured — skipping send')
    return false
  }
  // Normalise phone: strip spaces, ensure country code
  const phone = to.replace(/\s+/g, '').replace(/^\+/, '')

  try {
    const res = await fetch(WA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: text },
      }),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error('WhatsApp API error:', json)
      return false
    }
    return true
  } catch (err) {
    console.error('WhatsApp send failed:', err)
    return false
  }
}

// ─── MESSAGE TEMPLATES ────────────────────────────────────────

export async function sendTokenConfirmation({ name, mobile, tokenNumber, vendorName, position, waitMins }) {
  const msg =
    `👋 Hello ${name}!\n\n` +
    `✅ You've joined the queue at *${vendorName}*.\n\n` +
    `🎫 Token: *T-${tokenNumber}*\n` +
    `📍 Position: *#${position}*\n` +
    `⏱ Est. wait: *~${waitMins} min*\n\n` +
    `Track your token anytime at: ${import.meta.env.VITE_APP_URL}\n\n` +
    `_QNow – Queue smarter, wait less_`
  return sendWhatsApp(mobile, msg)
}

export async function sendNearlyThereAlert({ name, mobile, tokenNumber, vendorName, ahead }) {
  const msg =
    `⚡ *Almost your turn, ${name}!*\n\n` +
    `Only *${ahead} people* ahead of you at *${vendorName}*.\n` +
    `Token: *T-${tokenNumber}*\n\n` +
    `Please make your way to the counter soon.\n\n` +
    `_QNow_`
  return sendWhatsApp(mobile, msg)
}

export async function send15MinAlert({ name, mobile, tokenNumber, vendorName }) {
  const msg =
    `⏰ *15-minute alert, ${name}!*\n\n` +
    `Your turn at *${vendorName}* is coming up in approximately *15 minutes*.\n` +
    `Token: *T-${tokenNumber}*\n\n` +
    `If you can't make it, visit the app to extend your slot:\n${import.meta.env.VITE_APP_URL}\n\n` +
    `_QNow_`
  return sendWhatsApp(mobile, msg)
}

export async function sendYourTurnNow({ name, mobile, tokenNumber, vendorName }) {
  const msg =
    `🔔 *It's your turn now, ${name}!*\n\n` +
    `Token *T-${tokenNumber}* is now being called at *${vendorName}*.\n\n` +
    `Please proceed to the counter immediately.\n\n` +
    `_QNow_`
  return sendWhatsApp(mobile, msg)
}

export async function sendSlotExtended({ name, mobile, tokenNumber, newPosition }) {
  const msg =
    `✅ *Slot extended, ${name}!*\n\n` +
    `Token *T-${tokenNumber}* has been moved to position *#${newPosition}*.\n\n` +
    `_QNow_`
  return sendWhatsApp(mobile, msg)
}
