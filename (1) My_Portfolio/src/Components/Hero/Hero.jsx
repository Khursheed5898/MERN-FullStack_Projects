import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./Hero.css";
import profileImg from "../../assets/K180.png";

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Ambient Glowing Orbs */}
      <div className="hero-orb orb-1"></div>
      <div className="hero-orb orb-2"></div>

      <div className="hero-wrapper">
        {/* Left Column: Avatar Logo + Role Badge Underneath */}
        <div className="hero-left">
          {/* 3D Floating Avatar / Profile Photo */}
          <div className="hero-img-container">
            <div className="hero-avatar-glow"></div>
            <div className="hero-avatar">
              <img
                src={profileImg}
                alt="Khursheed Alam"
                className="hero-profile-img"
              />
            </div>
          </div>

          {/* Floating Live Status Badge Underneath Logo */}
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>
              Open for Roles : Machine Learning |<br />
              <span style={{ whiteSpace: "nowrap" }}>Data Analytics</span> |
              Robotics | Web Dev
            </span>
          </div>
        </div>

        {/* Right Column: Title, Subtitle & Action Buttons */}
        <div className="hero-right">
          {/* Hero Headline (Structured in 3 Clean Lines) */}
          <h1 className="hero-title">
            <span className="hero-title-line">
              Engineering <span className="hero-gradient-text">AI Systems</span>,
            </span>
            <span className="hero-title-line hero-highlight">
              MERN Web Dev,
            </span>
            <span className="hero-title-line">
              Quantum Computing & AI.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Hi, I'm <strong style={{ color: "#fff " }}> Khursheed Alam</strong>{" "}
            — B.Tech CS(Ai) Engineer & Multi-Disciplinary Developer. Building Machine
            Learning Models, Data Analytics Pipelines, Embedded Robotics
            Systems, and production MERN Web Applications.
          </p>

          {/* CTA Action Group */}
          <div className="hero-action">
            <AnchorLink
              className="hero-btn secondary-btn"
              offset={50}
              href="#contact"
            >
              Connect With Me 🚀
            </AnchorLink>
            <AnchorLink
              className="hero-btn primary-btn"
              offset={50}
              href="#services"
            >
              Explore Technical Domains 👇
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
