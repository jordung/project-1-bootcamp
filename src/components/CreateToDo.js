import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useRef, useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

function CreateToDo({ setToDoList, toDoList }) {
  const [toDo, setToDo] = useState({
    id: uuidv4(),
    item: "",
    dueDate: "",
    complete: false,
  });

  const todayDate = moment().format("YYYY-MM-DD");

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToDoList([...toDoList, toDo]);
    setToDo({
      id: uuidv4(),
      item: "",
      dueDate: "",
      complete: false,
    });
    handleReset();
    inputRef.current.focus();
  };

  const handleItemChange = (event) => {
    setToDo((prevState) => ({
      ...prevState,
      item: event.target.value,
    }));
  };

  const handleDueDateChange = (event) => {
    setToDo((prevState) => ({
      ...prevState,
      dueDate: event.target.value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} className="w-75" ref={formRef}>
      <Form.Group className="mb-3" controlId="item">
        <FloatingLabel
          className="mb-2 form-field"
          value={toDo.itemName}
          onChange={handleItemChange}
          name="item"
          label="What do you want to do today?"
        >
          <Form.Control
            className="form-field"
            required
            type="text"
            ref={inputRef}
          />
        </FloatingLabel>
      </Form.Group>
      <FloatingLabel
        className="mb-2 form-field"
        value={toDo.itemDueDate}
        onChange={handleDueDateChange}
        name="dueDate"
        label="Due date"
      >
        <Form.Control
          required
          className="mb-2 form-field"
          type="date"
          placeholder="Due Date"
          min={todayDate}
          max="9999-12-31"
        />
      </FloatingLabel>
      <Button
        className="mb-2 w-100 form-field"
        variant="outline-light"
        type="submit"
      >
        Add To Do
      </Button>
    </Form>
  );
}
export default CreateToDo;
