import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";
import validateSettings from "../middleware/settingsValidation.js";
import {
  getProfile,
  updateProfile,
  updateAvatar,
  updatePassword,
  updateTwoFactor,
  getAppearance,
  updateAppearance,
  getNotifications,
  updateNotifications,
  getAI,
  updateAI,
  getPreferences,
  updatePreferences,
  getSystem,
  updateSystem,
  backupSettings,
  restoreSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", validateSettings, updateProfile);
router.put("/avatar", upload.single("avatar"), updateAvatar);

router.put("/password", validateSettings, updatePassword);
router.put("/2fa", validateSettings, updateTwoFactor);

router.get("/appearance", getAppearance);
router.put("/appearance", validateSettings, updateAppearance);

router.get("/notifications", getNotifications);
router.put("/notifications", validateSettings, updateNotifications);

router.get("/ai", getAI);
router.put("/ai", validateSettings, updateAI);

router.get("/preferences", getPreferences);
router.put("/preferences", validateSettings, updatePreferences);

router.get("/system", authorize("admin"), getSystem);
router.put("/system", authorize("admin"), validateSettings, updateSystem);
router.post("/backup", authorize("admin"), backupSettings);
router.post("/restore", authorize("admin"), restoreSettings);

export default router;
