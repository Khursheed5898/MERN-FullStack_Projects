import React, { useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import MyWork from "./Components/MyWork/MyWork";
import DataLab from "./Components/DataLab/DataLab";
import Vision from "./Components/Vision/Vision";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import AvidModal from "./Components/AvidModal/AvidModal";

const App = () => {
  const [isAvidOpen, setIsAvidOpen] = useState(false);

  return (
    <div className="app-main">
      <NavBar onOpenJarvis={() => setIsAvidOpen(true)} />
      <Hero onOpenJarvis={() => setIsAvidOpen(true)} />
      <About />
      <Services />
      <MyWork />
      <DataLab />
      <Vision />
      <Contact />
      <Footer />

      {/* AVID AI Assistant Glass Modal */}
      <AvidModal
        isOpen={isAvidOpen}
        onClose={() => setIsAvidOpen(false)}
      />
    </div>
  );
};

export default App;
