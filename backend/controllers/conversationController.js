import Conversation from "../models/Conversation.js";
import Chat from "../models/Chat.js";


// Create a new conversation
export const createConversation = async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await Conversation.create({
      user: req.user._id,
      title: title || "Untitled",
    });

    res.status(201).json({
      success: true,
      conversation,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all conversations of logged-in user
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      user: req.user._id,
    }).sort({
      updatedAt: -1,
    });

    res.json({
      success: true,
      conversations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Rename a conversation
export const renameConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const conversation = await Conversation.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    res.json({
      success: true,
      conversation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      });
    }

    // Delete all chat messages in this conversation
    await Chat.deleteMany({
      conversation: req.params.id,
    });

    res.json({
      success: true,
      message: "Conversation deleted successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getConversationMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Chat.find({
      conversation: id,
      user: req.user._id,
    }).sort({
      createdAt: 1,
    });

    res.json({
      success: true,
      messages,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
