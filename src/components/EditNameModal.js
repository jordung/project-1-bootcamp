import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Form } from "react-bootstrap";

function EditNameModal({
  show,
  onHide,
  editedUserName,
  setEditedUserName,
  handleNameChange,
  userName,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleNameChange(editedUserName);
    onHide();
  };

  const handleChange = (event) => {
    setEditedUserName(event.target.value);
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEscapeKeyDown={onHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Edit Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-field" controlId="item">
            <FloatingLabel
              onChange={handleChange}
              name="item"
              label="Update Name"
            >
              <Form.Control
                className="form-field"
                required
                type="text"
                defaultValue={userName}
                autoFocus
              />
            </FloatingLabel>
          </Form.Group>
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

export default EditNameModal;
