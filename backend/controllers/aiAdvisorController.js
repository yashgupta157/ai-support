import { askFireworks } from "../services/fireworksService.js";

function tryParseJSON(text) {
  if (!text) return null;

  // Attempt to find first JSON object in the reply
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

export const analyzeSystem = async (req, res) => {
  try {
    const metrics = req.body || {};

    const prompt = `You are an expert AI system advisor. Given the following JSON system metrics, analyze overall health and provide actionable recommendations and suggested PowerShell commands.

Return ONLY a single JSON object and nothing else in the response, with the following keys exactly: \n- \"summary\": a short summary string\n- \"healthScore\": integer 0-100\n- \"recommendations\": array of short recommendation strings\n- \"commands\": array of strings (PowerShell commands)

Here are the metrics:\n${JSON.stringify(metrics, null, 2)}\n
Respond with valid JSON only.`;

    const reply = await askFireworks(prompt);

    const parsed = tryParseJSON(reply);

    // Basic validation & coercion
    if (parsed && typeof parsed === "object") {
      const { summary, healthScore, recommendations, commands } = parsed;

      const validSummary = typeof summary === "string" ? summary : null;
      const validHealth = Number.isFinite(healthScore)
        ? Math.max(0, Math.min(100, Math.round(healthScore)))
        : null;
      const validRecs = Array.isArray(recommendations)
        ? recommendations.map((r) => String(r))
        : null;
      const validCmds = Array.isArray(commands)
        ? commands.map((c) => String(c))
        : null;

      if (validSummary && validHealth !== null && validRecs && validCmds) {
        return res.json({
          summary: validSummary,
          healthScore: validHealth,
          recommendations: validRecs,
          commands: validCmds,
        });
      }
    }

    // If we couldn't parse/validate JSON, return the raw reply for debugging
    return res.json({ raw: reply });

  } catch (err) {
    console.error("AI Advisor Error:", err);
    res.status(500).json({ error: err.message });
  }
};
