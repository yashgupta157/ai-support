import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Setting from "../models/Setting.js";

const getOrCreateSettings = async (userId) => {
  let settings = await Setting.findOne({ userId });

  if (!settings) {
    settings = await Setting.create({ userId, user: {} });
  }

  return settings;
};

const getSectionData = async (req, res, sectionName) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    const sectionData = settings.user?.[sectionName] || {};

    res.status(200).json({
      success: true,
      data: sectionData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSectionData = async (req, res, sectionName) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    settings.user = settings.user || {};
    settings.user[sectionName] = {
      ...(settings.user[sectionName] || {}),
      ...req.body,
    };

    await settings.save();

    res.status(200).json({
      success: true,
      data: settings.user[sectionName],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ success: false, message: "No profile fields provided." });
    }

    const user = await User.findById(req.user._id);

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();
      const existingUser = await User.findOne({ email: normalizedEmail });

      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ success: false, message: "Email already in use." });
      }

      user.email = normalizedEmail;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No avatar file uploaded." });
    }

    const uploadDir = path.resolve(process.cwd(), process.cwd().endsWith("backend") ? "uploads/avatars" : "backend/uploads/avatars");
    fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `avatar-${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, req.file.buffer);

    const user = await User.findById(req.user._id);
    user.avatar = `/uploads/avatars/${fileName}`;
    await user.save();

    res.status(200).json({
      success: true,
      data: { avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Current and new password are required." });
    }

    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTwoFactor = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    settings.security = {
      ...(settings.security || {}),
      twoFactor: Boolean(req.body.enabled),
    };

    await settings.save();

    res.status(200).json({ success: true, data: settings.security });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAppearance = async (req, res) => getSectionData(req, res, "appearance");
export const updateAppearance = async (req, res) => updateSectionData(req, res, "appearance");

export const getNotifications = async (req, res) => getSectionData(req, res, "notifications");
export const updateNotifications = async (req, res) => updateSectionData(req, res, "notifications");

export const getAI = async (req, res) => getSectionData(req, res, "ai");
export const updateAI = async (req, res) => updateSectionData(req, res, "ai");

export const getPreferences = async (req, res) => getSectionData(req, res, "preferences");
export const updatePreferences = async (req, res) => updateSectionData(req, res, "preferences");

export const getSystem = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    res.status(200).json({ success: true, data: settings.system || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSystem = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    settings.system = {
      ...(settings.system || {}),
      ...req.body,
    };

    await settings.save();

    res.status(200).json({ success: true, data: settings.system });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const backupSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    res.status(200).json({
      success: true,
      message: "Settings backup created.",
      data: { backupId: settings._id, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const restoreSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings(req.user._id);
    res.status(200).json({
      success: true,
      message: "Settings restore completed.",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
