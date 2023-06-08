import { useState, useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ShowToDo from "./ShowToDo";
import moment from "moment";
import EditNameModal from "./EditNameModal";

function HomePage({ userName, setUserName, handleRestart }) {
  const [toDoList, setToDoList] = useState(() => {
    const savedToDoList = localStorage.getItem("toDoList");
    if (savedToDoList) {
      return JSON.parse(savedToDoList);
    } else {
      return [];
    }
  });
  const [time, setTime] = useState(moment().format("DD/MM/YYYY, h:mm:ss a"));
  const [nameModalShow, setNameModalShow] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("DD/MM/YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNameChange = () => {
    setNameModalShow(true);
    setUserName(editedUserName);
  };

  return (
    <div className="homepage">
      <div className="intro">
        <h5>Let's get down to business, </h5>
        <h2 className="username" onClick={() => setNameModalShow(true)}>
          <em>{userName}</em>
        </h2>
        <EditNameModal
          show={nameModalShow}
          onHide={() => setNameModalShow(false)}
          editedUserName={editedUserName}
          setEditedUserName={setEditedUserName}
          handleNameChange={handleNameChange}
          userName={userName}
        />
      </div>
      <p>{time}</p>
      <CreateToDo setToDoList={setToDoList} toDoList={toDoList} />
      <ShowToDo setToDoList={setToDoList} toDoList={toDoList} />
    </div>
  );
}

export default HomePage;
