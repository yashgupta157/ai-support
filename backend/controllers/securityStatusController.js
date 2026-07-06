import { getSecurityStatus } from "../services/securityMonitor.js";

export async function getSecurityStatusController(req, res) {
  try {
    const status = await getSecurityStatus();
    res.json(status);
  } catch (err) {
    console.error("Security Status Error:", err);
    res.status(500).json({ error: err.message });
  }
}
