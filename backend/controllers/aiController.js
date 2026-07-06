import { askFireworks } from "../services/fireworksService.js";
import Chat from "../models/Chat.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required",
      });
    }

    const reply = await askFireworks(message);

    // Save User Message
    await Chat.create({
      conversation: conversationId,
      user: req.user._id,
      role: "user",
      content: message,
    });

    // Save AI Reply
    await Chat.create({
      conversation: conversationId,
      user: req.user._id,
      role: "assistant",
      content: reply,
    });

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};