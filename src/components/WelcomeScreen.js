import { useState } from "react";

function WelcomeScreen({ setUserName, setIsIntro }) {
  const [userInput, setUserInput] = useState("");
  const handleUserName = (e) => {
    setUserInput(e.target.value);
  };

  const submitUserName = (e) => {
    if (e.key === "Enter") {
      if (localStorage.getItem(userInput)) {
        alert("User already exists. Please choose another username.");
      } else {
        setUserName(userInput);
        setIsIntro(false);
        setUserInput("");
      }
    }
  };

  return (
    <div className="welcome-screen">
      <div className="container">
        <h1>Hello there,</h1>
        <input
          type="text"
          className="fs-1 input-name"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={handleUserName}
          onKeyDown={submitUserName}
          value={userInput}
          required
          autoFocus
        ></input>
      </div>
    </div>
  );
}

export default WelcomeScreen;
