import React from "react";
import "./Vision.css";

const visionPillars = [
  {
    id: 1,
    icon: "🧬",
    title: "Life & Mentorship",
    timeline: "2025 - Ongoing",
    pillarClass: "pillar-life",
    tagline: "Mindset, Teaching & Content Creation Ecosystem",
    desc: "Structuring a clear knowledge path on Instagram, YouTube, and digital platforms to mentor aspiring developers, share life philosophy, and build a learning community.",
    tags: ["Teaching", "YouTube Path", "Instagram Growth", "Mindset"]
  },
  {
    id: 2,
    icon: "🔬",
    title: "Science & Exploration",
    timeline: "Core Foundation",
    pillarClass: "pillar-science",
    tagline: "Physics, Mathematics & Fundamental Research",
    desc: "Exploring the foundational laws of nature, mathematical modeling, and physics to fuel deep-tech problem solving and innovative engineering.",
    tags: ["Physics", "Applied Math", "Research", "First Principles"]
  },
  {
    id: 3,
    icon: "🤖",
    title: "Engineering & Quantum AI",
    timeline: "Target Vision 2030",
    pillarClass: "pillar-engineering",
    tagline: "AI Systems, Robotics & Quantum Computing Era",
    desc: "Expanding B.Tech CS(Ai) engineering into physical robotics, autonomous hardware systems, and future Quantum AI architectures over the next decade.",
    tags: ["B.Tech CS(Ai)", "Robotics", "Quantum AI", "Autonomous Tech"]
  },
  {
    id: 4,
    icon: "💻",
    title: "Technology & Production",
    timeline: "Industry Ready",
    pillarClass: "pillar-tech",
    tagline: "Full-Stack MERN Architectures & Scalable Apps",
    desc: "Engineering production-grade web platforms, high-performance backends, 3D interactive user interfaces, and robust cloud infrastructure.",
    tags: ["MERN Stack", "3D UI/UX", "Scalable APIs", "Cloud & Web"]
  }
];

const Vision = () => {
  // 3D Card Mouse Tilt Physics
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
    <section id="vision" className="vision">
      {/* Title Header */}
      <div className="vision-title">
        <span className="vision-badge">MASTER BLUEPRINT</span>
        <h1>My Vision (2025 - 2030)</h1>
        <p className="vision-subtitle">
          The 4 Pillars driving my evolution across Life, Science, Engineering & Tech
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="vision-container">
        {visionPillars.map((pillar) => (
          <div
            key={pillar.id}
            className={`vision-card ${pillar.pillarClass}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Spotlight Layer */}
            <div className="card-spotlight"></div>

            {/* Content Layer */}
            <div className="vision-card-content">
              <div className="vision-card-header">
                <span className="vision-icon">{pillar.icon}</span>
                <span className="vision-timeline">{pillar.timeline}</span>
              </div>

              <h2 className="vision-card-title">{pillar.title}</h2>
              <h4 className="vision-card-tagline">{pillar.tagline}</h4>
              <p className="vision-card-desc">{pillar.desc}</p>

              {/* Tags */}
              <div className="vision-tags">
                {pillar.tags.map((tag, i) => (
                  <span key={i} className="vision-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vision;
