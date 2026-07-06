import { analyzeNetwork } from "../services/networkService.js";

export async function analyze(req, res) {
  try {
    let { type, target } = req.body;

    // Convert to lowercase
    type = type.toLowerCase();

    // console.log("Type:", type);
    // console.log("Target:", target);

    const result = await analyzeNetwork(type, target);

    res.json({
      success: true,
      result,
    });

  } catch (err) {
  console.error("===== NETWORK ERROR =====");
  console.error(err);
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message,
  });
}
  
}