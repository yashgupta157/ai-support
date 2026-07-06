const validateSettings = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    return next();
  }

  return res.status(400).json({ success: false, message: "Invalid request body." });
};

export default validateSettings;
