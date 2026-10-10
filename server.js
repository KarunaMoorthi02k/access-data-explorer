require("dotenv").config();
const express = require("express");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
const port = Number(process.env.PORT || 3000);
app.use(express.json({ limit: "200kb" }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.post("/api/summarize", async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(400).json({ error: "ANTHROPIC_API_KEY is not configured in server/.env" });
  }
  const { headers, rows } = req.body || {};
  if (!Array.isArray(headers) || !Array.isArray(rows) || rows.length > 100) {
    return res.status(400).json({ error: "Provide headers and up to 100 rows." });
  }
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const table = [headers, ...rows].map(r => r.map(v => String(v ?? "")).join(" | ")).join("\n");
    const result = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      messages: [{
        role: "user",
        content: "Summarize this fictional or non-sensitive access-device CSV for a developer. Mention counts by device type and any obvious status values. Do not infer security vulnerabilities or access permissions. If the data appears sensitive, advise not to share it.\\n\\n" + table
      }]
    });
    const summary = result.content.filter(c => c.type === "text").map(c => c.text).join("\n");
    res.json({ summary });
  } catch (err) {
    console.error("Claude API request failed:", err.message);
    res.status(502).json({ error: "Claude API request failed. Check API key, model access, and billing." });
  }
});

app.listen(port, () => console.log(`Access Data Explorer running at http://localhost:${port}`));
