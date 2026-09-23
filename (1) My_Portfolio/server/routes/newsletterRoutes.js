import express from "express";
import Newsletter from "../models/Newsletter.js";

const router = express.Router();

// @route   POST /api/newsletter
// @desc    Subscribe an email to newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email is already subscribed! ✨" });
    }

    const newSub = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Subscribed to Newsletter in Database! 📩",
      data: newSub,
    });
  } catch (error) {
    console.error("Error subscribing newsletter:", error);
    res.status(500).json({ success: false, message: "Server error handling subscription." });
  }
});

export default router;
