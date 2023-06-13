import { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import HomePage from "./components/HomePage";
import { Fade } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// useRef is like a special labeller in React that helps us remember elements/values so that we can easily find and work with them later
// useEffect is to do something whenever a specific event/change happens (based on dependency array)

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

  const [toDoList, setToDoList] = useState(() => {
    const savedToDoList = localStorage.getItem(userName);
    if (savedToDoList) {
      return JSON.parse(savedToDoList);
    } else {
      return [];
    }
  });

  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    const initialUserArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) !== "userName") {
        initialUserArr.push(localStorage.key(i));
      }
    }
    initialUserArr.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
    setUserArr(initialUserArr);
  }, [userName]);
  // dependency array is only for state

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(userName));
  }, [userName]);

  const addUser = () => {
    setUserName("");
    setToDoList([]);
    setIsIntro(true);
  };

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
          <HomePage
            key="home"
            userName={userName}
            setUserName={setUserName}
            addUser={addUser}
            userArr={userArr}
            setUserArr={setUserArr}
            toDoList={toDoList}
            setToDoList={setToDoList}
            setIsIntro={setIsIntro}
          />
        </div>
      </Fade>
    </div>
  );
}

export default App;
