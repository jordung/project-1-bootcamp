import { Badge, Button, Table } from "react-bootstrap";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import moment from "moment";
import EditModal from "./EditModal";

function ShowToDo({ setToDoList, toDoList }) {
  //TODO: add to local storage
  //TODO: update CSS for table
  const todayDate = moment().format("YYYY-MM-DD");
  const [modalShow, setModalShow] = useState(false);
  const [editedToDo, setEditedToDo] = useState({
    id: "",
    item: "",
    dueDate: "",
  });

  const handleChange = (id) => {
    const newToDos = toDoList.map((item) => {
      if (item.id === id) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setToDoList(newToDos);
  };

  const handleDelete = (id) => {
    setToDoList(toDoList.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEditedToDo((prevState) => ({
      ...prevState,
      id: id,
    }));
    setModalShow(true);
    setToDoList(
      toDoList.map((toDo) => {
        if (toDo.id === editedToDo.id) {
          toDo.item = editedToDo.item;
          toDo.dueDate = editedToDo.dueDate;
        }
        return toDo;
      })
    );
  };

  return (
    <div className="w-75 wrapper">
      <Table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Item</th>
            <th scope="col">Due </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {toDoList
            .sort((a, b) => {
              if (a.complete && !b.complete) return 1;
              if (!a.complete && b.complete) return -1;
              return 0;
            })
            .sort((a, b) => {
              return (
                Date.parse(moment(a.dueDate).format("YYYY-MM-DD")) -
                Date.parse(moment(b.dueDate).format("YYYY-MM-DD"))
              );
            })
            .sort((a, b) => {
              if (a.complete && !b.complete) return 1;
              if (!a.complete && b.complete) return -1;
              return 0;
            })
            .map((item) => (
              <tr key={item.id}>
                <td className="checkbox-badge">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={item.complete}
                    onChange={() => handleChange(item.id)}
                  />
                  {item.complete === false &&
                  Date.parse(todayDate) >
                    Date.parse(moment(item.dueDate).format("YYYY-MM-DD")) ? (
                    <Badge pill bg="danger">
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
                  {moment(item.dueDate).format("DD/MM/YYYY")}
                </td>
                <td>
                  <Button variant="light" size="sm" className="px-1 p-0 m-0">
                    <ModeEditOutlineOutlinedIcon
                      className="delete-button"
                      onClick={() => handleEdit(item.id)}
                    />
                  </Button>
                  <Button variant="light" size="sm" className="px-1 p-0 m-0">
                    <DeleteOutlineOutlinedIcon
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                    />
                  </Button>
                  <EditModal
                    show={modalShow && editedToDo.id === item.id}
                    onHide={() => setModalShow(false)}
                    editedToDo={editedToDo}
                    setEditedToDo={setEditedToDo}
                    handleEdit={handleEdit}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowToDo;
