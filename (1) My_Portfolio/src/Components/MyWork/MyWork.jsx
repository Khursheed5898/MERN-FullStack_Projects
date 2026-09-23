import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import "./MyWork.css";

// 🎯 Helper function to map API/DB categories to active Filter Tabs
const normalizeCategory = (cat) => {
  if (!cat) return "Web Dev (MERN)";
  const lower = cat.toLowerCase();
  if (
    lower.includes("machine") ||
    lower.includes("ml") ||
    lower.includes("ai")
  ) {
    return "Machine Learning";
  }
  if (
    lower.includes("data") ||
    lower.includes("analytics") ||
    lower.includes("science")
  ) {
    return "Data Analytics";
  }
  if (
    lower.includes("embedded") ||
    lower.includes("robotics") ||
    lower.includes("ros")
  ) {
    return "Embedded & Robotics";
  }
  return "Web Dev (MERN)";
};

// 🎯 Practical Machine Learning, Data Analytics & Full-Stack Projects Data
const initialProjectsData = [
  {
    w_no: 1,
    w_name: "Customer Churn Risk Predictor & EDA",
    w_category: "Machine Learning",
    w_desc:
      "Exploratory Data Analysis (EDA) & classification ML pipeline predicting customer retention risk using Scikit-Learn models, feature scaling, and correlation heatmaps.",
    w_tech: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "Seaborn",
      "Matplotlib",
    ],
    w_img: "📊",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 2,
    w_name: "Real Estate Value & Price Estimator",
    w_category: "Machine Learning",
    w_desc:
      "Supervised ML regression algorithm predicting property market prices based on square footage, location features, and historical dataset analytics.",
    w_tech: [
      "Python",
      "Scikit-Learn",
      "Pandas",
      "Linear Regression",
      "Matplotlib",
    ],
    w_img: "🏡",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 3,
    w_name: "Customer Behavioral Segmentation & RFM Analytics",
    w_category: "Data Analytics",
    w_desc:
      "Core Data Analytics pipeline featuring SQL data wrangling, RFM cohort analysis, and unsupervised K-Means ML clustering to identify high-value vs churn-risk customers.",
    w_tech: [
      "Python",
      "SQL",
      "Pandas",
      "Seaborn",
      "Scikit-Learn (K-Means)",
      "Plotly",
    ],
    w_img: "📊",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 4,
    w_name: "Financial Data Analytics & Predictive Stock Trends",
    w_category: "Data Analytics",
    w_desc:
      "Interactive financial analytics dashboard performing exploratory data analysis, moving average trendlines, and XGBoost ML regression for market volatility prediction.",
    w_tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Streamlit",
      "Matplotlib",
    ],
    w_img: "📈",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 5,
    w_name: "DiBot.Ai — Transparent AI Debate Partner",
    w_category: "Web Dev (MERN)",
    w_desc:
      "Full-stack AI education platform featuring transparent AI reasoning, structured debate rounds, Gemini API integration, and real-time Socket.io metrics.",
    w_tech: [
      "React 19",
      "Node.js",
      "Express",
      "Google Gemini API",
      "Socket.io",
      "MongoDB",
    ],
    w_img: "🗣️",
    live_link: "https://dibotai.duckdns.org/",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 6,
    w_name: "Full-Stack MERN Portfolio & Avid (AI Co-Pilot)",
    w_category: "Web Dev (MERN)",
    w_desc:
      "Production 3D glassmorphic MERN portfolio with dynamic domain filtering, Express REST APIs, MongoDB contact engine, and integrated AVID AI Recruiter Modal.",
    w_tech: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Groq API",
      "Vercel",
    ],
    w_img: "💻",
    live_link: "https://khursheed4k.vercel.app/",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 7,
    w_name: "E-Commerce CyberStore Platform",
    w_category: "Web Dev (MERN)",
    w_desc:
      "Full-stack MERN e-commerce platform with Stripe payment gateway integration, JWT authentication, Redux toolkit state, and admin management dashboard.",
    w_tech: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
    w_img: "🛒",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 8,
    w_name: "Laser-Based Vertical Height Measuring Robot",
    w_category: "Embedded & Robotics",
    w_desc:
      "Non-contact hardware measurement robot prototype capable of calculating object vertical height using laser sensing and control logic programmed in Java.",
    w_tech: [
      "Arduino IDE",
      "Java",
      "Mechatronics",
      "Hardware Laser Sensors",
      "Robotics",
    ],
    w_img: "🤖",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
  {
    w_no: 9,
    w_name: "Deep Vision Autonomous Mapping Rover",
    w_category: "Embedded & Robotics",
    w_desc:
      "Computer-vision powered obstacle detection & spatial mapping using ROS2, YOLOv8 object detection, and LiDAR sensor integration.",
    w_tech: ["ROS2", "YOLOv8", "Python", "C++", "OpenCV", "LiDAR"],
    w_img: "🛰️",
    live_link: "https://github.com/dashboard",
    github_link: "https://github.com/dashboard",
  },
];

const categories = [
  "All",
  "Machine Learning",
  "Data Analytics",
  "Web Dev (MERN)",
  "Embedded & Robotics",
];

const getCategoryClass = (category) => {
  switch (category) {
    case "Machine Learning":
      return "card-ml";
    case "Data Analytics":
      return "card-data";
    case "Embedded & Robotics":
      return "card-robotics";
    case "Web Dev (MERN)":
      return "card-web";
    default:
      return "";
  }
};

const MyWork = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [projectsList, setProjectsList] = useState(initialProjectsData);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data && resData.data.length > 0) {
          const formatted = resData.data.map((item, idx) => {
            const nameLower = (item.title || item.w_name || "").toLowerCase();
            let liveUrl = "https://github.com/dashboard";
            if (nameLower.includes("dibot")) {
              liveUrl = "https://dibotai.duckdns.org/";
            } else if (nameLower.includes("portfolio")) {
              liveUrl = "https://khursheed4k.vercel.app/";
            } else if (item.live || item.live_link) {
              const apiLive = item.live || item.live_link;
              if (apiLive !== "#" && apiLive.trim() !== "") {
                liveUrl = apiLive;
              }
            }

            return {
              w_no: item._id || idx + 1,
              w_name: item.title || item.w_name,
              w_category: normalizeCategory(item.category || item.w_category),
              w_desc: item.desc || item.w_desc,
              w_tech: item.tech || item.w_tech || [],
              w_img: item.badge || item.w_img || "🚀",
              live_link: liveUrl,
              github_link: "https://github.com/dashboard",
            };
          });

          const mergedNames = new Set(formatted.map((p) => p.w_name));
          const restStatic = initialProjectsData.filter(
            (p) => !mergedNames.has(p.w_name),
          );
          setProjectsList([...formatted, ...restStatic]);
        }
      })
      .catch(() => {
        setProjectsList(initialProjectsData);
      });
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? projectsList
      : projectsList.filter((p) => p.w_category === activeTab);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <section id="projects" className="mywork">
      <div className="mywork-title">
        <span className="mywork-badge">PORTFOLIO SHOWCASE</span>
        <h1>My Featured Projects</h1>
        <p className="mywork-subtitle">
          Practical applications engineered across Machine Learning, Data
          Analytics, MERN & Robotics
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mywork-filter">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`filter-btn ${activeTab === cat ? "active" : ""} ${getCategoryClass(cat)}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="mywork-container">
        {filteredProjects.map((project) => {
          const categoryClass = getCategoryClass(project.w_category);

          const nameLower = (project.w_name || "").toLowerCase();
          let liveUrl = "https://github.com/dashboard";

          if (nameLower.includes("dibot")) {
            liveUrl = "https://dibotai.duckdns.org/";
          } else if (nameLower.includes("portfolio")) {
            liveUrl = "https://khursheed4k.vercel.app/";
          } else if (
            project.live_link &&
            project.live_link.trim() !== "" &&
            project.live_link !== "#"
          ) {
            liveUrl = project.live_link;
          }

          const githubUrl = "https://github.com/dashboard";

          return (
            <div
              key={project.w_no}
              className={`work-card ${categoryClass}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="work-spotlight"></div>

              <div className="work-content">
                <div className="work-img-wrapper">
                  <span className="work-icon">{project.w_img}</span>
                  <span className="work-category">{project.w_category}</span>
                </div>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-name-link"
                >
                  <h2 className="work-name">{project.w_name} ↗</h2>
                </a>
                <p className="work-desc">{project.w_desc}</p>

                <div className="work-tech-stack">
                  {project.w_tech.map((tech, i) => (
                    <span key={i} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="work-links">
                  <a
                    href={liveUrl}
                    className="work-btn live-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {liveUrl.includes("github.com")
                      ? "View Project ↗"
                      : "Live Demo ↗"}
                  </a>
                  <a
                    href={githubUrl}
                    className="work-btn code-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Code 💻
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyWork;
