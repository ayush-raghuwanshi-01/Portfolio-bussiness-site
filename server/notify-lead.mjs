/**
 * Sends a new enquiry to email (FormSubmit) and WhatsApp (CallMeBot / Cloud API / webhook).
 * Used by the Vite leads plugin (dev) and by /api/leads (Vercel production).
 */

export const LEAD_EMAIL = "zenwebstudio.in@gmail.com";
export const WHATSAPP_PHONE = "919584559972";

export function formatLeadMessage(lead) {
  const lines = [
    "New enquiry — Zenvio Labs",
    "",
    `Name: ${lead.name || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Email: ${lead.email || "—"}`,
    `City: ${lead.city || lead.company || "—"}`,
    `Need: ${lead.service || "—"}`,
  ];
  if (lead.message) lines.push(`Details: ${lead.message}`);
  lines.push(`Source: ${lead.source || "website"}`);
  return lines.join("\n");
}

const withTimeout = (ms, promise) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);

export async function notifyLead(lead, env = process.env) {
  const email = env.LEAD_EMAIL || LEAD_EMAIL;
  const phone = String(env.WHATSAPP_PHONE || WHATSAPP_PHONE).replace(/\D/g, "");
  const text = formatLeadMessage(lead);
  const results = { email: false, whatsapp: false };

  try {
    const res = await withTimeout(
      8000,
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          city: lead.city || lead.company,
          service: lead.service,
          _subject: `Zenvio Labs enquiry — ${lead.name}`,
          _template: "table",
          _replyto: lead.email,
          message: text,
        }),
      }),
    );
    results.email = Boolean(res && res.ok);
  } catch {
    results.email = false;
  }

  const callme = env.CALLMEBOT_APIKEY;
  if (callme) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(callme)}`;
      const res = await withTimeout(8000, fetch(url));
      results.whatsapp = Boolean(res && res.ok);
    } catch {
      results.whatsapp = false;
    }
  }

  const token = env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = env.WHATSAPP_PHONE_NUMBER_ID;
  if (token && phoneId && !results.whatsapp) {
    try {
      const res = await withTimeout(
        8000,
        fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: { body: text },
          }),
        }),
      );
      results.whatsapp = Boolean(res && res.ok);
    } catch {
      results.whatsapp = false;
    }
  }

  if (env.LEAD_WEBHOOK_URL && !results.whatsapp) {
    try {
      const res = await withTimeout(
        8000,
        fetch(env.LEAD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...lead, text }),
        }),
      );
      results.whatsapp = Boolean(res && res.ok);
    } catch {
      results.whatsapp = false;
    }
  }

  return results;
}
