import { useState } from "react";
import CreateToDo from "./CreateToDo";
import ShowToDo from "./ShowToDo";

function HomePage({ userName }) {
  const [toDo, setToDo] = useState([]);

  return (
    <div className="homepage">
      <div className="intro">
        <h5>Let's get down to business, </h5>
        <h2>
          <em>{userName}</em>
        </h2>
      </div>
      <CreateToDo setToDo={setToDo} toDo={toDo} />
      <ShowToDo setToDo={setToDo} toDo={toDo} />
    </div>
  );
}

export default HomePage;
