import { defineConfig, type Plugin, type ViteDevServer, type PreviewServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";

const dataFile = path.resolve(import.meta.dirname, "data/confirmaciones.json");

function ensureDataFile() {
  const dir = path.dirname(dataFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]\n", "utf-8");
}

function readList(): unknown[] {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    if (!raw.trim()) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function handleConfirmacionesRequest(req: IncomingMessage, res: ServerResponse) {
  ensureDataFile();

  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(readList()));
    return;
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const entry = JSON.parse(body);
        const list = readList();
        list.push(entry);
        fs.writeFileSync(dataFile, JSON.stringify(list, null, 2) + "\n", "utf-8");
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: false, error: "invalid body" }));
      }
    });
    return;
  }

  res.statusCode = 405;
  res.end("Method not allowed");
}

function rsvpApiPlugin(): Plugin {
  return {
    name: "rsvp-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/confirmaciones", handleConfirmacionesRequest);
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use("/api/confirmaciones", handleConfirmacionesRequest);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    rsvpApiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8444,
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    port: 8444,
  },
});
