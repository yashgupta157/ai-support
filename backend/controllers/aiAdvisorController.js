import { askFireworks } from "../services/fireworksService.js";

function tryParseJSON(text) {
  if (!text) return null;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(text.substring(start, end + 1));
  } catch {
    return null;
  }
}

export const analyzeSystem = async (req, res) => {
  try {
    console.log("========== AI SYSTEM ANALYSIS ==========");

    const metrics = req.body || {};

    console.log("Received Metrics:");
    console.log(JSON.stringify(metrics, null, 2));

    const prompt = `
You are an expert AI system advisor.

Analyze the following system metrics and return ONLY valid JSON.

Required JSON format:

{
  "summary": "string",
  "healthScore": 95,
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "commands": [
    "PowerShell Command 1",
    "PowerShell Command 2"
  ]
}

Metrics:

${JSON.stringify(metrics, null, 2)}
`;

    console.log("Calling Fireworks...");

    const reply = await askFireworks(prompt);

    console.log("Fireworks Reply:");
    console.log(reply);

    const parsed = tryParseJSON(reply);

    if (!parsed) {
      console.log("Could not parse JSON.");
      return res.status(200).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: reply,
      });
    }

    return res.json({
      success: true,
      summary: parsed.summary || "",
      healthScore: parsed.healthScore || 0,
      recommendations: parsed.recommendations || [],
      commands: parsed.commands || [],
    });

  } catch (err) {
    console.error("========== AI ADVISOR ERROR ==========");

    console.error(err);

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error(
        JSON.stringify(err.response.data, null, 2)
      );
    }

    return res.status(500).json({
      success: false,
      message: err.message,
      details: err.response?.data || null,
    });
  }
};