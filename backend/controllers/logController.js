import Log from "../models/Log.js";
import { askFireworks } from "../services/fireworksService.js";

export const uploadLog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const text = req.file.buffer.toString("utf8");

    const prompt = `
You are an expert IT Support Engineer.

Analyze the following log.

Return your response in this exact format:

Severity: High/Medium/Low/Critical
Category: <Category Name>
Problem:
<Summary of the issue>

Solution:
<List of recommended fixes>

Log:
${text}
`;

    const analysis = await askFireworks(prompt);

    // ==========================
    // Extract Severity
    // ==========================

    let severity = "Unknown";

    const severityMatch =
      analysis.match(/\|\s*\*\*Severity\*\*\s*\|\s*([^|]+)\|/i) ||
      analysis.match(/Severity:\s*(.+)/i);

    if (severityMatch) {
      severity = severityMatch[1].trim();
    }

    // ==========================
    // Extract Category
    // ==========================

    let category = "General";

    const categoryMatch =
      analysis.match(/\|\s*\*\*Category\*\*\s*\|\s*([^|]+)\|/i) ||
      analysis.match(/Category:\s*(.+)/i);

    if (categoryMatch) {
      category = categoryMatch[1].trim();
    }

    // ==========================
    // Debug
    // ==========================

    // console.log("========== AI ANALYSIS ==========");
    // console.log(analysis);
    // console.log("=================================");
    // console.log("Severity:", severity);
    // console.log("Category:", category);

    // ==========================
    // Save to MongoDB
    // ==========================

    const log = await Log.create({
      user: req.user._id,
      filename: req.file.originalname,
      originalText: text,
      analysis,
      severity,
      category,
    });

    res.json({
      success: true,
      log,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};