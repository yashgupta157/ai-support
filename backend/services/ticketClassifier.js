import { askFireworks } from "./fireworksService.js";

function tryParseJSON(text) {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const candidate = text.substring(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch (err) {
    return null;
  }
}

function normalizeConfidence(v) {
  if (v === undefined || v === null) return null;
  if (typeof v === "number") return Math.max(0, Math.min(1, v));
  if (typeof v === "string") {
    const trimmed = v.trim();
    if (trimmed.endsWith("%")) {
      const num = parseFloat(trimmed.replace("%", ""));
      if (!isNaN(num)) return Math.max(0, Math.min(1, num / 100));
    }
    const num = parseFloat(trimmed);
    if (!isNaN(num)) return Math.max(0, Math.min(1, num));
  }
  return null;
}

export async function classifyTicket(ticket) {
  const prompt = `You are an assistant that MUST output a single JSON object (no surrounding text).\nReturn exactly this JSON schema:\n{ "category": "<short category>", "priority": "<low|medium|high|critical>", "tags": ["tag1","tag2"], "confidence": <number between 0 and 1>, "note": "optional short note if unsure" }\n\nExamples:\n{ "category": "Networking", "priority": "high", "tags": ["vpn","connectivity"], "confidence": 0.92 }\n\nNow classify the following ticket. If you are unsure, set confidence to 0.0 and include an explanatory note.\n\nTicket JSON:\n${JSON.stringify(ticket, null, 2)}\n\nReturn valid JSON only.`;

  const reply = await askFireworks(prompt);
  const parsed = tryParseJSON(reply);

  if (!parsed) {
    return { raw: reply, category: null, priority: null, tags: [], confidence: 0, note: "unparsed_response" };
  }

  const category = typeof parsed.category === "string" ? parsed.category : null;
  const priority = ["low", "medium", "high", "critical"].includes(parsed.priority) ? parsed.priority : null;
  const tags = Array.isArray(parsed.tags) ? parsed.tags.map(String) : [];
  const confidence = normalizeConfidence(parsed.confidence) ?? 0;
  const note = typeof parsed.note === "string" ? parsed.note : parsed.note ? String(parsed.note) : null;

  return { category, priority, tags, confidence, note, raw: parsed };
}
