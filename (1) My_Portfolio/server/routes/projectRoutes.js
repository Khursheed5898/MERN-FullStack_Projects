import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

const initialProjects = [
  {
    title: "Customer Churn Risk Predictor & EDA",
    category: "Machine Learning",
    desc: "Exploratory Data Analysis (EDA) & classification ML pipeline predicting customer retention risk using Scikit-Learn models, feature scaling, and correlation heatmaps.",
    tech: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    badge: "📊",
    live: "#",
    github: "https://github.com/khursheed5898/customer-churn-ml",
  },
  {
    title: "Real Estate Value & Price Estimator",
    category: "Machine Learning",
    desc: "Supervised ML regression algorithm predicting property market prices based on square footage, location features, and historical dataset analytics.",
    tech: ["Python", "Scikit-Learn", "Pandas", "Linear Regression", "Matplotlib"],
    badge: "🏡",
    live: "#",
    github: "https://github.com/khursheed5898/house-price-estimator",
  },
  {
    title: "Customer Behavioral Segmentation & RFM Analytics",
    category: "Data Analytics",
    desc: "Core Data Analytics pipeline featuring SQL data wrangling, RFM cohort analysis, and unsupervised K-Means ML clustering to identify high-value vs churn-risk customers.",
    tech: ["Python", "SQL", "Pandas", "Seaborn", "Scikit-Learn (K-Means)", "Plotly"],
    badge: "📊",
    live: "#",
    github: "https://github.com/khursheed5898/customer-segmentation-analytics",
  },
  {
    title: "Financial Data Analytics & Predictive Stock Trends",
    category: "Data Analytics",
    desc: "Interactive financial analytics dashboard performing exploratory data analysis, moving average trendlines, and XGBoost ML regression for market volatility prediction.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Streamlit", "Matplotlib"],
    badge: "📈",
    live: "#",
    github: "https://github.com/khursheed5898/financial-trend-analytics",
  },
  {
    title: "DiBot.Ai — Transparent AI Debate Partner",
    category: "Web Dev (MERN)",
    desc: "Full-stack AI education platform featuring transparent AI reasoning, structured debate rounds, Gemini API integration, and real-time Socket.io metrics.",
    tech: ["React 19", "Node.js", "Express", "Google Gemini API", "Socket.io", "MongoDB"],
    badge: "🗣️",
    live: "https://dibot-ai.render.com",
    github: "https://github.com/khursheed5898/dibot-ai",
  },
  {
    title: "Full-Stack MERN Portfolio & Avid (AI Co-Pilot)",
    category: "Web Dev (MERN)",
    desc: "Production 3D glassmorphic MERN portfolio with dynamic domain filtering, Express REST APIs, MongoDB contact engine, and integrated AVID AI Recruiter Modal.",
    tech: ["React.js", "Node.js", "Express", "MongoDB Atlas", "Groq API", "Vercel"],
    badge: "💻",
    live: "https://khursheed-portfolio.vercel.app",
    github: "https://github.com/khursheed5898/MyPortfolio",
  },
  {
    title: "E-Commerce CyberStore Platform",
    category: "Web Dev (MERN)",
    desc: "Full-stack MERN e-commerce platform with Stripe payment gateway integration, JWT authentication, Redux toolkit state, and admin management dashboard.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
    badge: "🛒",
    live: "#",
    github: "https://github.com/khursheed5898/cyberstore-mern",
  },
  {
    title: "Laser-Based Vertical Height Measuring Robot",
    category: "Embedded & Robotics",
    desc: "Non-contact hardware measurement robot prototype capable of calculating object vertical height using laser sensing and control logic programmed in Java.",
    tech: ["Arduino IDE", "Java", "Mechatronics", "Hardware Laser Sensors", "Robotics"],
    badge: "🤖",
    live: "#",
    github: "https://github.com/khursheed5898/laser-height-robot",
  },
  {
    title: "Deep Vision Autonomous Mapping Rover",
    category: "Embedded & Robotics",
    desc: "Computer-vision powered obstacle detection & spatial mapping using ROS2, YOLOv8 object detection, and LiDAR sensor integration.",
    tech: ["ROS2", "YOLOv8", "Python", "C++", "OpenCV", "LiDAR"],
    badge: "🛰️",
    live: "#",
    github: "https://github.com/khursheed5898/autonomous-mapping-rover",
  },
];

// @route   GET /api/projects
// @desc    Get all portfolio projects (or fallback array if DB empty)
router.get("/", async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    if (!projects || projects.length === 0) {
      projects = initialProjects;
    }
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(200).json({ success: true, count: initialProjects.length, data: initialProjects });
  }
});

// @route   POST /api/projects/seed
// @desc    Seed initial projects into MongoDB
router.post("/seed", async (req, res) => {
  try {
    await Project.deleteMany({});
    const created = await Project.insertMany(initialProjects);
    res.status(201).json({ success: true, message: "Database seeded with projects!", data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
