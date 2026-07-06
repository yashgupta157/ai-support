import Command from "../models/Command.js";
import { generateCommand } from "../services/commandGenerator.js";

// Generate AI Command
export async function generate(req, res) {
  try {
    const { prompt } = req.body;

    const command = await generateCommand(prompt);

    res.json({
      success: true,
      command,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate command.",
    });
  }
}

// Save Command
export async function saveCommand(req, res) {
  try {
    const { title, command, language } = req.body;

    const savedCommand = await Command.create({
      user: req.user._id,
      title,
      command,
      language,
    });

    res.status(201).json({
      success: true,
      command: savedCommand,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to save command.",
    });
  }
}
export async function getCommands(req, res) {
  try {
    const commands = await Command.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      commands,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch commands.",
    });
  }
}
export async function deleteCommand(req, res) {
  try {
    await Command.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      success: true,
      message: "Command deleted.",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to delete command.",
    });
  }
}