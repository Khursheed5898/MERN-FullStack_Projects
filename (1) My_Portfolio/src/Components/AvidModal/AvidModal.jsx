import React, { useState, useEffect, useRef } from "react";
import "./AvidModal.css";

// Knowledge base for AVID AI Assistant (Public Professional Info)
const knowledgeBase = {
  about:
    "Khursheed is a B.Tech CS(Ai) Engineer and Multi-Disciplinary Full-Stack Developer specializing in MERN Stack, Machine Learning, Data Analytics, and Embedded Robotics. He builds high-performance 3D web applications and scalable backends.",
  domains:
    "Khursheed operates across 4 core engineering domains:\n1. 🤖 Machine Learning & AI (PyTorch, TensorFlow, OpenCV)\n2. 📊 Data Analytics & BI (SQL, Pandas, PowerBI)\n3. 🔌 Embedded Systems & Robotics (C/C++, ESP32, Arduino, IoT)\n4. 💻 Full-Stack Web Dev (MERN, React, Node, 3D Glass UI)",
  vision:
    "His 2025–2030 Master Blueprint spans 4 Pillars:\n• 🧬 Life & Mentorship (Teaching & Content Creation)\n• 🔬 Science & Exploration (Physics & Applied Math)\n• 🤖 Engineering & Quantum AI (Robotics & Quantum Era 2030)\n• 💻 Tech & Production (Scalable MERN Platforms)",
  contact:
    "You can reach out to Khursheed via the Contact Form on this site, or connect directly through LinkedIn, GitHub, Twitter/X, and Instagram!",
  health:
    "🟢 AVID Diagnostics Report:\n• Server Status: Operational (100% Uptime)\n• Latency: 12ms\n• Page Health: 0 Errors Detected\n• Visitor Activity: Monitored & Telemetry Active\n• WhatsApp / Phone Alert System: Demo Active 📲"
};

const AvidModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "avid",
      text: "Greetings! I am AVID, Khursheed's AI Portfolio Assistant. How may I assist you today? Feel free to ask about his background, technical domains, or 2030 vision.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [notificationToast, setNotificationToast] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Handle Quick Chip click
  const handleQuickQuestion = (questionKey, label) => {
    sendMessage(label, knowledgeBase[questionKey]);
  };

  // Process and send message
  const sendMessage = (userText, predefinedResponse = null) => {
    if (!userText.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    const newMessages = [
      ...messages,
      { sender: "user", text: userText, time: timestamp }
    ];
    setMessages(newMessages);
    setInputMsg("");
    setIsTyping(true);

    // Trigger simulated WhatsApp / Phone notification alert
    triggerNotificationAlert(userText);

    // Generate AVID response
    setTimeout(() => {
      let replyText = predefinedResponse;

      if (!replyText) {
        const lower = userText.toLowerCase();
        if (lower.includes("domain") || lower.includes("skill") || lower.includes("tech")) {
          replyText = knowledgeBase.domains;
        } else if (lower.includes("vision") || lower.includes("future") || lower.includes("2030")) {
          replyText = knowledgeBase.vision;
        } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("reach")) {
          replyText = knowledgeBase.contact;
        } else if (lower.includes("status") || lower.includes("health") || lower.includes("problem") || lower.includes("error")) {
          replyText = knowledgeBase.health;
        } else {
          replyText = knowledgeBase.about;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "avid",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  // Simulate WhatsApp / Phone notification push
  const triggerNotificationAlert = (query) => {
    setNotificationToast(`📲 Simulated Push Notification Sent to Khursheed's Phone & WhatsApp!`);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  return (
    <div className="avid-overlay" onClick={onClose}>
      <div className="avid-modal" onClick={(e) => e.stopPropagation()}>
        {/* Holographic Header */}
        <div className="avid-header">
          <div className="avid-brand">
            <div className="avid-avatar-orb">🤖</div>
            <div className="avid-status-info">
              <h3>AVID AI Assistant <span className="avid-version">v1.0</span></h3>
              <p className="avid-live-status">
                <span className="status-dot green"></span> System Health: 100% Operational | 0 Errors
              </p>
            </div>
          </div>
          <button className="avid-close-btn" onClick={onClose} aria-label="Close AVID">
            ✕
          </button>
        </div>

        {/* Telemetry Alert Banner */}
        <div className="avid-telemetry-bar">
          <span>⚡ Live Telemetry: Monitoring site traffic, errors & instant recruiter queries.</span>
        </div>

        {/* Chat Messages Body */}
        <div className="avid-chat-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.sender === "avid" ? "avid-bubble" : "user-bubble"}`}
            >
              <div className="bubble-content">
                <p>{msg.text}</p>
                <span className="bubble-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble avid-bubble typing-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Notification Toast Alert */}
        {notificationToast && (
          <div className="notification-toast">
            <span>{notificationToast}</span>
          </div>
        )}

        {/* Quick Question Chips */}
        <div className="avid-quick-chips">
          <button onClick={() => handleQuickQuestion("about", "Who is Khursheed?")}>
            👤 Who is Khursheed?
          </button>
          <button onClick={() => handleQuickQuestion("domains", "What are his 4 Tech Domains?")}>
            🛠️ 4 Technical Domains
          </button>
          <button onClick={() => handleQuickQuestion("vision", "Tell me about his 2030 Vision.")}>
            🔮 2030 Vision Blueprint
          </button>
          <button onClick={() => handleQuickQuestion("health", "Check Site Diagnostics & Errors")}>
            ⚡ System Health Check
          </button>
        </div>

        {/* Input Bar */}
        <form
          className="avid-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputMsg);
          }}
        >
          <input
            type="text"
            placeholder="Ask Avid anything about Khursheed..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <button type="submit" className="avid-send-btn">
            Send ⚡
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvidModal;
