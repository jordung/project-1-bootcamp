import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useRef, useState } from "react";
import moment from "moment";

function CreateToDo({ setToDo, toDo }) {
  const [itemName, setItemName] = useState("");
  const [itemDueDate, setItemDueDate] = useState("");
  const [counter, setCounter] = useState(0);

  const todayDate = moment().format("YYYY-MM-DD");

  const formRef = useRef(null);

  const handleReset = () => {
    formRef.current.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setToDo([
      ...toDo,
      {
        id: counter,
        item: itemName,
        dueDate: itemDueDate,
        complete: false,
      },
    ]);
    handleReset();
    setItemName("");
    setItemDueDate("");
    setCounter((counter) => counter + 1);
  };

  const handleItemChange = (event) => {
    setItemName(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setItemDueDate(moment(event.target.value).format("DD/MM/YYYY"));
  };

  return (
    <Form onSubmit={handleSubmit} className="w-75" ref={formRef}>
      <Form.Group className="mb-3" controlId="item">
        <FloatingLabel
          className="mb-2"
          value={itemName}
          onChange={handleItemChange}
          name="item"
          label="What do you want to do today?"
        >
          <Form.Control required type="text" />
        </FloatingLabel>
      </Form.Group>
      <FloatingLabel
        className="mb-2"
        value={itemDueDate}
        onChange={handleDueDateChange}
        name="dueDate"
        label="Due date"
      >
        <Form.Control
          required
          className="mb-2"
          type="date"
          placeholder="Due Date"
          // min={todayDate}
          max="9999-12-31"
        />
      </FloatingLabel>
      <Button className="mb-2 w-100" variant="outline-light" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default CreateToDo;
