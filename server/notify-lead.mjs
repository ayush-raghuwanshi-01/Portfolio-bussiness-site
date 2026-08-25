/**
 * Delivers a new enquiry to Gmail (SMTP or Web3Forms) and WhatsApp.
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
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms),
    ),
  ]);

async function sendViaGmail(lead, env, text) {
  const user = env.GMAIL_USER || env.LEAD_EMAIL || LEAD_EMAIL;
  const pass = String(env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");
  if (!pass) return false;

  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
    await withTimeout(
      12000,
      transporter.sendMail({
        from: `"Zenvio Labs" <${user}>`,
        to: user,
        replyTo: lead.email || user,
        subject: `Zenvio Labs enquiry — ${lead.name || "website"}`,
        text,
      }),
    );
    return true;
  } catch (error) {
    console.error("[notify-lead] Gmail SMTP failed:", error?.message || error);
    return false;
  }
}

async function sendViaWeb3Forms(lead, env, text) {
  const key = env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!key) return false;
  try {
    const res = await withTimeout(
      10000,
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: key,
          subject: `Zenvio Labs enquiry — ${lead.name}`,
          from_name: "Zenvio Labs website",
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          city: lead.city || lead.company,
          service: lead.service,
          message: text,
        }),
      }),
    );
    if (!res || !res.ok) return false;
    const body = await res.json().catch(() => ({}));
    return Boolean(body.success);
  } catch (error) {
    console.error("[notify-lead] Web3Forms failed:", error?.message || error);
    return false;
  }
}

async function sendViaWhatsApp(env, text) {
  const phone = String(env.WHATSAPP_PHONE || WHATSAPP_PHONE).replace(/\D/g, "");

  if (env.CALLMEBOT_APIKEY) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(env.CALLMEBOT_APIKEY)}`;
      const res = await withTimeout(8000, fetch(url));
      if (res && res.ok) return true;
    } catch (error) {
      console.error("[notify-lead] CallMeBot failed:", error?.message || error);
    }
  }

  return false;
}

async function sendViaGoogleSheet(lead, env) {
  const url = env.GOOGLE_SHEETS_WEBHOOK || env.VITE_GOOGLE_SHEETS_WEBHOOK;
  if (!url) return false;
  try {
    const res = await withTimeout(
      10000,
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(lead),
      }),
    );
    return Boolean(res && (res.ok || res.status === 200 || res.status === 302));
  } catch (error) {
    console.error(
      "[notify-lead] Google Sheet failed:",
      error?.message || error,
    );
    return false;
  }
}

export async function notifyLead(lead, env = process.env) {
  const text = formatLeadMessage(lead);
  const sheet = await sendViaGoogleSheet(lead, env);
  const gmail = await sendViaGmail(lead, env, text);
  const web3 = gmail ? false : await sendViaWeb3Forms(lead, env, text);
  const whatsapp = await sendViaWhatsApp(env, text);
  const results = {
    email: sheet || gmail || web3,
    sheet,
    gmail,
    web3,
    whatsapp,
  };
  console.info("[notify-lead]", results);
  return results;
}
