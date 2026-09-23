# Workspace Rules for MyPortfolio

- **JavaScript Only**: Do NOT use TypeScript (.ts / .tsx) or auto-generated TypeScript code. Use pure JavaScript (.js / .jsx) only.
- **Trigger Commands**:
  - **"ok"**: Generate/show the next step code snippets & detailed Hinglish explanations.
  - **"update"**: Automatically write and update the files directly on the system.
- **Short, Clean & Human-Readable Code**: Write short, clean, elegant JavaScript/CSS code blocks. Avoid huge, overwhelming code snippets. Keep logic simple, modular, and easy for a human developer to read and understand.
- **Hinglish Explanations**: Explain how every piece of code works step-by-step in clear Hinglish so that logic and responsiveness are easy to grasp.
- **Interview & Job-Ready MERN Mentorship**: Explain technical jargon, concepts, Web Dev fundamentals (React, DOM, State, Props, CSS Box Model, Flexbox/Grid, API integration, MERN architecture, Git, Performance) in simple terms so the user gains deep interview-level knowledge.
- **Modular Component File Architecture**: Every component must have its own dedicated directory containing its own `.jsx` file and dedicated `.css` file (e.g. `src/Components/NavBar/NavBar.jsx` and `src/Components/NavBar/NavBar.css`). Never bundle everything into a single monolithic JSX or CSS file.
- **Global CSS Management**: `src/index.css` manages global design tokens, CSS variables, typography, resets, and utility classes only. Component-specific styles must remain in their respective component CSS files.
- **Manual Control & Code Provision**: The user is in 100% manual control of editing files unless they explicitly say "update".

## Current Project Status & Roadmap Tracker

### Completed Steps:
1. **Step 1: Global CSS Design System**: `src/index.css` (Dark variables, reset, font import, smooth scroll).
2. **Step 2: NavBar Component**: `src/Components/NavBar/NavBar.jsx` & `NavBar.css` (Responsive, mobile hamburger toggle, smooth anchor links).
3. **Step 3: Hero Section**: `src/Components/Hero/Hero.jsx` & `Hero.css` (Avatar, main title, subtitle, CTA buttons).
4. **Step 4: About Me Section**: `src/Components/About/About.jsx` & `About.css` (Bio, skill bars, achievement counters).
5. **Step 5: Services / Tech Stack Section**: `src/Components/Services/Services.jsx` & `Services.css` (4-Domain tabs, ML, Data, Robotics, MERN).
6. **Step 6: My Work / Projects Section**: `src/Components/MyWork/MyWork.jsx` & `MyWork.css` (3D Glass cards & Category filtering).
7. **Step 7: Contact Section**: `src/Components/Contact/Contact.jsx` & `Contact.css` (Controlled forms & social links).
8. **Step 8: Footer Component**: `src/Components/Footer/Footer.jsx` & `Footer.css` (Newsletter subscription & smooth scroll to top).

### 🎉 ALL ROADMAP STEPS COMPLETED!
Project is fully implemented and live deployed.
