function WelcomeScreen({ setUserName, setIsIntro }) {
  function handleUserName(e) {
    if (e.key === "Enter") {
      setUserName(e.target.value);
      setIsIntro(false);
    }
  }

  return (
    <div className="welcome-screen">
      <div className="container">
        <h1>Hello there,</h1>
        <input
          type="text"
          className="fs-1 input-name"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onKeyDown={handleUserName}
          required
          autoFocus
        ></input>
      </div>
    </div>
  );
}

export default WelcomeScreen;
