import { analyzeSecurity } from "../services/securityAnalyzer.js";
import { securityScan } from "../services/securityService.js";

export async function analyze(req, res) {
  try {
    const { log } = req.body;

    const result = await analyzeSecurity(log);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Security analysis failed.",
    });
  }
}
export async function runSecurityScan(req, res) {
  try {

    const result = await securityScan();

    res.json({
      success: true,
      result,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}