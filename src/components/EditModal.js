import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Form } from "react-bootstrap";
import moment from "moment";

function EditModal({ show, onHide, editedToDo, setEditedToDo, handleEdit }) {
  const todayDate = moment().format("YYYY-MM-DD");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit(editedToDo.id);
    onHide();
  };

  const handleItemChange = (event) => {
    setEditedToDo((prevState) => ({
      ...prevState,
      item: event.target.value,
    }));
  };

  const handleDueDateChange = (event) => {
    setEditedToDo((prevState) => ({
      ...prevState,
      dueDate: event.target.value,
    }));
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-field" controlId="item">
            <FloatingLabel
              onChange={handleItemChange}
              value={editedToDo.item}
              name="item"
              label="Updated Task"
            >
              <Form.Control className="form-field" required type="text" />
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel
            value={editedToDo.dueDate}
            name="dueDate"
            label="Updated Due date"
            onChange={handleDueDateChange}
            className="form-field"
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
          <div className="modal-button-list">
            <Button
              className="modal-button form-field"
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="modal-button form-field"
              variant="outline-danger"
              onClick={onHide}
            >
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
