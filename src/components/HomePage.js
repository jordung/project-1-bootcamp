import { useState } from "react";
import CreateToDo from "./CreateToDo";
import { Badge, Button } from "react-bootstrap";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import moment from "moment";

function HomePage({ userName }) {
  const [toDo, setToDo] = useState([]);

  const todayDate = moment().format("DD/MM/YYYY");

  const handleChange = (id) => {
    const newToDos = toDo.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setToDo(newToDos);
  };

  const handleDelete = (id) => {
    setToDo(toDo.filter((item) => item.id !== id));
  };

  return (
    <div className="homepage">
      <div className="intro">
        <h5>Let's get down to business, </h5>
        <h2>
          <em>{userName}</em>
        </h2>
      </div>
      <CreateToDo setToDo={setToDo} toDo={toDo} />
      <div className="w-75 wrapper">
        <table className="table table-light">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Item</th>
              <th scope="col">Due Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {toDo
              .sort((a, b) => {
                if (a.complete && !b.complete) return 1;
                if (!a.complete && b.complete) return -1;
                return 0;
              })
              .sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
              })
              .sort((a, b) => {
                if (a.complete && !b.complete) return 1;
                if (!a.complete && b.complete) return -1;
                return 0;
              })
              .map((item) => (
                <tr key={item.id}>
                  <td class="checkbox-badge">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={item.complete}
                      onChange={() => handleChange(item.id)}
                    />
                    {item.complete === false &&
                    Date.parse(todayDate) > Date.parse(item.dueDate) ? (
                      <Badge pill bg="danger" className="overdue-badge">
                        !
                      </Badge>
                    ) : null}
                  </td>
                  <td
                    className={
                      item.complete ? "text-decoration-line-through" : null
                    }
                  >
                    {item.item}
                  </td>
                  <td
                    className={
                      item.complete ? "text-decoration-line-through" : null
                    }
                  >
                    {item.dueDate}
                  </td>
                  <td>
                    <Button variant="light" size="sm" className="px-1 p-0 m-0">
                      <DeleteOutlineOutlinedIcon
                        className="delete-button"
                        onClick={() => handleDelete(item.id)}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
