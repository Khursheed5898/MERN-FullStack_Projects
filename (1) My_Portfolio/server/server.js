import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/projects", projectRoutes);

// Root Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 MyPortfolio MERN Backend API is Live & Running!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
