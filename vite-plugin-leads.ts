import fs from "node:fs";
import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  source?: string;
  website?: string;
  created_at: string;
};

const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};

const loadLeads = (): Lead[] => {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLead = (lead: Lead) => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const leads = loadLeads();
  leads.unshift(lead);
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const handle = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "GET") {
    send(res, 200, { ok: true, service: "zenwebstudio-leads", count: loadLeads().length });
    return;
  }

  if (req.method !== "POST") {
    send(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const raw = await readBody(req);
    const data = JSON.parse(raw || "{}") as Partial<Lead>;

    if (data.website) {
      send(res, 200, { ok: true });
      return;
    }

    if (!data.name || String(data.name).trim().length < 2) {
      send(res, 400, { ok: false, error: "Name is required" });
      return;
    }
    if (!data.email || !isEmail(String(data.email))) {
      send(res, 400, { ok: false, error: "A valid email is required" });
      return;
    }

    const lead: Lead = {
      id: crypto.randomUUID(),
      name: String(data.name).trim().slice(0, 80),
      email: String(data.email).trim().slice(0, 160),
      phone: data.phone ? String(data.phone).slice(0, 24) : undefined,
      company: data.company ? String(data.company).slice(0, 100) : undefined,
      service: data.service ? String(data.service).slice(0, 80) : undefined,
      budget: data.budget ? String(data.budget).slice(0, 80) : undefined,
      message: data.message ? String(data.message).slice(0, 2000) : undefined,
      preferred_date: data.preferred_date ? String(data.preferred_date).slice(0, 40) : undefined,
      preferred_time: data.preferred_time ? String(data.preferred_time).slice(0, 40) : undefined,
      source: data.source ? String(data.source).slice(0, 40) : "website",
      created_at: new Date().toISOString(),
    };

    saveLead(lead);
    send(res, 201, { ok: true, id: lead.id });
  } catch (error) {
    console.error("[leads-api]", error);
    send(res, 500, { ok: false, error: "Could not save lead" });
  }
};

const attach = (server: ViteDevServer | PreviewServer) => {
  server.middlewares.use((req, res, next) => {
    const url = req.url?.split("?")[0];
    if (url !== "/api/leads") return next();
    void handle(req, res);
  });
};

export function leadsApi(): Plugin {
  return {
    name: "zenwebstudio-leads-api",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}
