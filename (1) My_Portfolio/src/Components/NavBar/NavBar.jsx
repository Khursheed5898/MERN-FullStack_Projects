import React, { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./NavBar.css";

// Metallic & Chrome Stardust Palette (Edge-to-Edge Header Distribution)
const miniStarsData = [
  // Left Corner & Margin Mini Stars
  { left: "2%", top: "25%", size: 7, delay: "0.5s", duration: "4.2s", color: "#94a3b8" },  // Steel
  { left: "5%", top: "65%", size: 9, delay: "1.8s", duration: "5.5s", color: "#cbd5e1" },  // Silver
  { left: "9%", top: "30%", size: 8, delay: "3.2s", duration: "4.8s", color: "#ffffff" },  // Pure White

  // Mid-Left, Center & Right Stars
  { left: "16%", top: "70%", size: 7, delay: "1.2s", duration: "5s", color: "#64748b" },   // Dark Silver
  { left: "24%", top: "25%", size: 9, delay: "0.2s", duration: "4s", color: "#e2e8f0" },   // Silver
  { left: "34%", top: "65%", size: 10, delay: "2.4s", duration: "4.5s", color: "#94a3b8" },  // Steel
  { left: "44%", top: "30%", size: 7, delay: "0.8s", duration: "6s", color: "#cbd5e1" },   // Platinum
  { left: "54%", top: "72%", size: 9, delay: "3.5s", duration: "5.2s", color: "#f8fafc" },  // Chrome White
  { left: "66%", top: "28%", size: 10, delay: "1.9s", duration: "4.6s", color: "#94a3b8" },  // Steel
  { left: "76%", top: "68%", size: 8, delay: "0.3s", duration: "5.8s", color: "#cbd5e1" },   // Silver
  { left: "86%", top: "22%", size: 10, delay: "2.7s", duration: "4.3s", color: "#ffffff" },  // Pure White
  { left: "96%", top: "65%", size: 7, delay: "2.8s", duration: "4.2s", color: "#e2e8f0" },   // Silver
];

const NavBar = ({ onOpenJarvis }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dynamic Scroll Light Glow for Mini-Stars
  useEffect(() => {
    const handleScroll = () => {
      const scrollRatio = Math.min(1, window.scrollY / 400);
      document.documentElement.style.setProperty("--header-scroll-glow", `${scrollRatio * 6}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      {/* Random Fixed Position Mini Star Shapes Overlay */}
      <div className="nav-stars-overlay">
        {miniStarsData.map((star, i) => (
          <svg
            key={i}
            className="mini-star-shape"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
              color: star.color,
            }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2Z" />
          </svg>
        ))}
      </div>

      {/* 3D Glowing Brand Logo */}
      <div className="nav-logo">
        <AnchorLink href="#home" className="logo-link">
          <h2>
            Khursheed Alam
            <span className="logo-star-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8Z" />
              </svg>
            </span>
          </h2>
        </AnchorLink>
      </div>

      {/* Hamburger Icon */}
      <div
        className={`nav-mob-toggle ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Glassmorphic Nav Menu */}
      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <AnchorLink
            className="anchor-link"
            href="#home"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#about"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#services"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#projects"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#datalab"
            onClick={() => setIsMenuOpen(false)}
          >
            Data Lab
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#vision"
            onClick={() => setIsMenuOpen(false)}
          >
            Vision
          </AnchorLink>
        </li>
        <li>
          <AnchorLink
            className="anchor-link"
            offset={50}
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </AnchorLink>
        </li>
      </ul>

      {/* CTA Connect Button */}
      <div className="nav-connect">
        <button className="anchor-link-btn" onClick={onOpenJarvis}>
          Let's Talk ✨
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
