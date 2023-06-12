import { useState, useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ShowToDo from "./ShowToDo";
import moment from "moment";
import SettingsModal from "./SettingsModal";
import { Button } from "react-bootstrap";

function HomePage({
  userName,
  setUserName,
  addUser,
  userArr,
  toDoList,
  setToDoList,
  setIsIntro,
}) {
  const [time, setTime] = useState(moment().format("DD/MM/YYYY, h:mm:ss a"));
  const [settingsModalShow, setSettingsModalShow] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [changeUser, setChangeUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    if (userName !== "") {
      localStorage.setItem(userName, JSON.stringify(toDoList));
    }
  }, [userName, toDoList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("DD/MM/YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const savedToDoList = localStorage.getItem(selectedUser);
      if (savedToDoList) {
        setToDoList(JSON.parse(savedToDoList));
      }
    }
  }, [selectedUser, setToDoList]);

  const handleNameChange = () => {
    if (userArr.includes(editedUserName)) {
      alert("This username exists! Please choose another name.");
    } else {
      localStorage.removeItem(userName);
      setSettingsModalShow(true);
      setUserName(editedUserName);
    }
  };

  const handleUserChange = () => {
    setChangeUser(false);
    setUserName(selectedUser);
    setToDoList(JSON.parse(localStorage.getItem(selectedUser)));
  };

  const deleteUser = () => {
    //FIXME: cannot delete first user?
    localStorage.removeItem(userName);
    setUserName(userArr[0]);
    setToDoList(JSON.parse(localStorage.getItem(userArr[0])));
  };

  return (
    <div className="homepage">
      <div className="intro">
        <h5>Let's get down to business, </h5>
        <h2>
          <em>{userName}</em>
        </h2>
        <SettingsModal
          show={settingsModalShow}
          onHide={() => setSettingsModalShow(false)}
          editedUserName={editedUserName}
          setEditedUserName={setEditedUserName}
          handleNameChange={handleNameChange}
          userName={userName}
          changeUser={changeUser}
          setChangeUser={setChangeUser}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleUserChange={handleUserChange}
          addUser={addUser}
          deleteUser={deleteUser}
          userArr={userArr}
        />
      </div>
      <p>{time}</p>
      <CreateToDo setToDoList={setToDoList} toDoList={toDoList} />
      <ShowToDo setToDoList={setToDoList} toDoList={toDoList} />
      <Button
        className="setting"
        variant="secondary"
        onClick={() => setSettingsModalShow(true)}
      >
        Settings
      </Button>
    </div>
  );
}

export default HomePage;
