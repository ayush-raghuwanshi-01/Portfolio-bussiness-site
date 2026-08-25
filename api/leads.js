import { notifyLead } from "../server/notify-lead.mjs";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true, service: "zenwebstudio-leads" }));
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
    return;
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    if (data.website) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    if (!data.name || String(data.name).trim().length < 2) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Name is required" }));
      return;
    }
    if (!data.email || !isEmail(data.email)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "A valid email is required" }));
      return;
    }
    if (!data.phone || String(data.phone).replace(/[^\d+]/g, "").length < 7) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "A valid contact number is required" }));
      return;
    }

    const lead = {
      name: String(data.name).trim().slice(0, 80),
      email: String(data.email).trim().slice(0, 160),
      phone: data.phone ? String(data.phone).slice(0, 24) : undefined,
      city: data.city ? String(data.city).slice(0, 80) : data.company ? String(data.company).slice(0, 80) : undefined,
      company: data.city ? String(data.city).slice(0, 80) : data.company ? String(data.company).slice(0, 80) : undefined,
      service: data.service ? String(data.service).slice(0, 80) : undefined,
      message: data.message ? String(data.message).slice(0, 2000) : undefined,
      source: data.source ? String(data.source).slice(0, 40) : "website",
    };

    const notified = await notifyLead(lead, process.env);
    const delivered = notified.email || notified.whatsapp;

    res.statusCode = delivered ? 201 : 502;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: delivered,
        notified,
        error: delivered ? undefined : "Could not deliver the enquiry. WhatsApp or email us directly.",
      }),
    );
  } catch (error) {
    console.error("[leads-api]", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Could not send enquiry" }));
  }
}
