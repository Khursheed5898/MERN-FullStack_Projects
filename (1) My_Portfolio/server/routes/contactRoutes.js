import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact form message and save to MongoDB
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject: subject || "Portfolio Inquiry",
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message saved to MongoDB Database! 🚀",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Server error processing request." });
  }
});

// @route   GET /api/contact
// @desc    Fetch all saved contact inquiries
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
