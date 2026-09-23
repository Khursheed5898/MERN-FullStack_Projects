import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { API_BASE_URL } from "../../config/api";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setSubscribed(true);
      } else {
        setSubscribed(true);
      }
    } catch (err) {
      setSubscribed(true);
    }

    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* Top Row: Brand & Newsletter */}
      <div className="footer-top">
        {/* Left Column: Brand & Bio */}
        <div className="footer-brand">
          <h2>
            Khursheed Alam<span className="logo-dot">.</span>
          </h2>
          <p>
            B.Tech CS(Ai) Engineer & Multi-Disciplinary Developer operating
            across Machine Learning, Data Analytics, Robotics, and Full-Stack
            Web Development.
          </p>
        </div>

        {/* Right Column: Newsletter Subscription & Links */}
        <div className="footer-right-column">
          <div className="footer-subscribe">
            <form onSubmit={handleSubscribe} className="subscribe-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="subscribe-btn">
                {subscribed ? "Subscribed! ✨" : "Subscribe"}
              </button>
            </form>
          </div>

          <div className="footer-links">
            <AnchorLink href="#home" className="footer-link">
              Term of Services
            </AnchorLink>
            <AnchorLink href="#home" className="footer-link">
              Privacy Policy
            </AnchorLink>
            <AnchorLink href="#contact" className="footer-link">
              Connect With Me
            </AnchorLink>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Bottom Row: Copyright */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Khursheed Alam All rights reserved.
          <span className="copyright-sub">Built with React & 3D Glass UI.</span>
        </p>

        {/* Scroll To Top Floating Button */}
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
