import { Button, Table } from "react-bootstrap";
import { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import moment from "moment";
import EditModal from "./EditModal";
import ErrorIcon from "@mui/icons-material/Error";

function ShowToDo({ setToDoList, toDoList }) {
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

  const handleEdit = (item) => {
    setEditedToDo((prevState) => ({
      ...prevState,
      id: item.id,
      item: item.item,
      dueDate: item.dueDate,
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
            <th className="table-checkbox" scope="col"></th>
            <th className="table-content" scope="col">
              Item
            </th>
            <th className="table-content" scope="col">
              Due{" "}
            </th>
            <th className="table-buttons" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {toDoList ? (
            toDoList
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
                  <td className="checkbox-badge table-checkbox">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={item.complete}
                      onChange={() => handleChange(item.id)}
                    />
                    {item.complete === false &&
                    Date.parse(todayDate) >
                      Date.parse(moment(item.dueDate).format("YYYY-MM-DD")) ? (
                      // <Badge pill bg="danger">
                      //   !
                      // </Badge>
                      <ErrorIcon style={{ color: "red", fontSize: "1.5em" }} />
                    ) : null}
                  </td>
                  <td
                    className={
                      item.complete
                        ? "text-decoration-line-through table-content"
                        : "table-content"
                    }
                  >
                    {item.item}
                  </td>
                  <td
                    className={
                      item.complete
                        ? "text-decoration-line-through table-content"
                        : "table-content"
                    }
                  >
                    {moment(item.dueDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="table-buttons">
                    <Button variant="light" size="sm" className="px-1 p-0 m-0">
                      <ModeEditOutlineOutlinedIcon
                        className="delete-button"
                        onClick={() => handleEdit(item)}
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
              ))
          ) : (
            <></>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ShowToDo;
