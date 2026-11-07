// Groww Portfolio Understanding MVP - Lightweight Static & API Server
// Uses built-in Node.js modules (0 dependencies required)

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname);

// Load .env if present
try {
  const envPath = path.join(ROOT, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [k, ...v] = trimmed.split("=");
        if (k && v) process.env[k.trim()] = v.join("=").trim();
      }
    });
  }
} catch (e) { }

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain"
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health / Config Endpoint
  if (req.url === "/api/health" || req.url === "/api/llm/status") {
    const provider = require("./js/rag/llm-provider.js");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ONLINE",
      port: PORT,
      llmConfig: provider.getConfig(),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Static File Serving
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";

  const filePath = path.join(ROOT, reqPath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`  Groww Portfolio Understanding & Live LLM RAG Server Running`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Engines: Groq (Low-Token Engine) + Google Gemini (Deep Reasoning)`);
  console.log(`================================================================`);
});

