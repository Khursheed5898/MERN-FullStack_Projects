import React, { useState } from "react";
import "./Services.css";

// 4 Major Engineering & Tech Domains Data
const domainsData = [
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    icon: "🤖",
    tagline: "Intelligent Algorithms, Neural Networks & Computer Vision",
    skills: ["Python", "PyTorch / TensorFlow", "Scikit-Learn", "Computer Vision", "NLP", "Neural Networks"],
    services: [
      {
        no: "01",
        title: "Predictive ML Modeling",
        desc: "Developing and training supervised/unsupervised ML algorithms for data classification, regression, and pattern recognition."
      },
      {
        no: "02",
        title: "Computer Vision & Image Processing",
        desc: "Building object detection, feature extraction, and image classification pipelines using OpenCV & PyTorch."
      },
      {
        no: "03",
        title: "AI Microservice Deployment",
        desc: "Integrating ML models into production web applications via Flask/FastAPI REST microservices."
      }
    ]
  },
  {
    id: "data-analytics",
    title: "Data Analytics & BI",
    icon: "📊",
    tagline: "Data-Driven Insights, Statistical Modeling & Dashboards",
    skills: ["SQL", "Python (Pandas/NumPy)", "PowerBI / Tableau", "EDA", "Data Visualization", "Statistics"],
    services: [
      {
        no: "01",
        title: "Exploratory Data Analysis (EDA)",
        desc: "Cleaning, transforming, and extracting deep statistical insights from complex multi-dimensional datasets."
      },
      {
        no: "02",
        title: "SQL & Database Querying",
        desc: "Writing complex SQL queries, aggregations, window functions, and database schema optimizations."
      },
      {
        no: "03",
        title: "Interactive BI Dashboards",
        desc: "Designing dynamic visual dashboards in PowerBI/Tableau and custom web dashboards for business intelligence."
      }
    ]
  },
  {
    id: "robotics",
    title: "Embedded Systems & Robotics",
    icon: "🔌",
    tagline: "Hardware-Software Integration & Robotic Control",
    skills: ["C / C++", "ESP32 / Arduino", "Raspberry Pi", "Sensors & Actuators", "Circuit Design", "IoT Protocols"],
    services: [
      {
        no: "01",
        title: "Microcontroller Firmware",
        desc: "Writing low-level firmware in C/C++ for ESP32, Arduino, and ARM microcontrollers with real-time response."
      },
      {
        no: "02",
        title: "Robotic Hardware Integration",
        desc: "Interfacing motor drivers, ultrasonic sensors, IMUs, and actuators for autonomous robotic control."
      },
      {
        no: "03",
        title: "IoT Telemetry & Web Control",
        desc: "Connecting embedded hardware devices to cloud web servers using MQTT and WebSockets for real-time remote control."
      }
    ]
  },
  {
    id: "web-dev",
    title: "Full-Stack Web Dev (MERN)",
    icon: "💻",
    tagline: "High-Performance 3D Web Apps & Scalable Systems",
    skills: ["React.js", "Node.js", "Express", "MongoDB", "3D Glass UI", "REST APIs", "Tailwind/CSS"],
    services: [
      {
        no: "01",
        title: "Frontend Architecture & 3D UI",
        desc: "Building high-performance, 3D glassmorphic user interfaces with React, smooth keyframe animations, and clean state logic."
      },
      {
        no: "02",
        title: "Backend & RESTful Microservices",
        desc: "Engineering scalable Node.js & Express servers with JWT auth, middleware security, and database modeling."
      },
      {
        no: "03",
        title: "Full-Stack MERN Applications",
        desc: "End-to-end production web applications engineered for high speed, zero latency, and responsive cross-browser compatibility."
      }
    ]
  }
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("ml-ai");

  const currentDomain = domainsData.find((domain) => domain.id === activeTab);

  // 3D Tilt & Mouse Tracking Handler
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
    <section id="services" className="services">
      {/* 3D Header Badge & Title */}
      <div className="services-title">
        <span className="services-badge">MULTIVERSE MATRIX</span>
        <h1>My Core Domains</h1>
        <p className="services-subtitle">
          Specialized expertise across 4 engineering & technology disciplines
        </p>
      </div>

      {/* 4-Domain Interactive Switcher Tabs */}
      <div className="domain-tabs">
        {domainsData.map((domain) => (
          <button
            key={domain.id}
            className={`domain-tab-btn ${activeTab === domain.id ? `active tab-${domain.id}` : ""}`}
            onClick={() => setActiveTab(domain.id)}
          >
            <span className="tab-icon">{domain.icon}</span>
            <span className="tab-text">{domain.title}</span>
          </button>
        ))}
      </div>

      {/* Domain Header Tagline & Skills Pill Bar */}
      <div className={`domain-banner banner-${activeTab}`}>
        <h2>{currentDomain.icon} {currentDomain.tagline}</h2>
        <div className="skills-pill-bar">
          {currentDomain.skills.map((skill, i) => (
            <span key={i} className={`skill-pill pill-${activeTab}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Glass Cards Grid for Selected Domain */}
      <div className="services-container">
        {currentDomain.services.map((service, index) => (
          <div
            key={index}
            className={`services-card card-${activeTab}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient Spotlight Layer */}
            <div className="card-spotlight"></div>

            {/* Card Content Layer */}
            <div className="card-content">
              <span className="card-no">{service.no}</span>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-desc">{service.desc}</p>
              <div className="card-cta">
                <span>Explore Capability</span>
                <div className="cta-icon">→</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
