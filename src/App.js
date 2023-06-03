import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import { Fade } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [isIntro, setIsIntro] = useState(true);

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
          <HomePage key="home" userName={userName} />
        </div>
      </Fade>
    </div>
  );
}

export default App;
