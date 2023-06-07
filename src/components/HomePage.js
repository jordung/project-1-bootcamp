import { useState, useEffect } from "react";
import CreateToDo from "./CreateToDo";
import ShowToDo from "./ShowToDo";
import moment from "moment";

function HomePage({ userName }) {
  const [toDoList, setToDoList] = useState([]);
  const [time, setTime] = useState(moment().format("DD/MM/YYYY, h:mm:ss a"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("DD/MM/YYYY, h:mm:ss a"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <div className="intro">
        <h5>Let's get down to business, </h5>
        <h2>
          <em>{userName}</em>
        </h2>
      </div>
      <p>{time}</p>
      <CreateToDo setToDoList={setToDoList} toDoList={toDoList} />
      <ShowToDo setToDoList={setToDoList} toDoList={toDoList} />
    </div>
  );
}

export default HomePage;
