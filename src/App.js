import { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import { Fade } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [isIntro, setIsIntro] = useState(true);
  const [userName, setUserName] = useState(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setIsIntro(false);
      return JSON.parse(savedUserName);
    } else {
      return "";
    }
  });

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
  }, [userName]);

  return (
    <div className="App">
      <Fade in={isIntro} timeout={2000}>
        <div>
          <WelcomeScreen
            key="welcome"
            setUserName={setUserName}
            setIsIntro={setIsIntro}
          />
        </div>
      </Fade>
      <Fade in={!isIntro} timeout={2000}>
        <div>
          <HomePage key="home" userName={userName} setUserName={setUserName} />
        </div>
      </Fade>
    </div>
  );
}

export default App;
