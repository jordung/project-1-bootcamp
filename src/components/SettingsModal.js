import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Form } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

function SettingsModal({
  show,
  onHide,
  editedUserName,
  setEditedUserName,
  handleNameChange,
  userName,
  changeUser,
  setChangeUser,
  selectedUser,
  setSelectedUser,
  handleUserChange,
  addUser,
  deleteUser,
  userArr,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!changeUser) {
      handleNameChange(editedUserName);
    } else {
      handleUserChange(selectedUser);
    }
    onHide();
  };

  const handleChange = (event) => {
    setEditedUserName(event.target.value);
  };

  const handleChangeUser = () => {
    setChangeUser((changeUser) => !changeUser);
  };

  const handleUserSelection = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  const handleAddNewUser = () => {
    addUser();
    setChangeUser(false);
    onHide();
  };

  const handleDeleteUser = () => {
    deleteUser();
    setChangeUser(false);
    onHide();
  };

  const handleClose = () => {
    onHide();
    setChangeUser(false);
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEscapeKeyDown={onHide}
    >
      <Modal.Header className="settings-modal">
        <Modal.Title id="contained-modal-title-vcenter">Settings</Modal.Title>
        <div>
          <Button
            className="modal-button"
            variant="outline-secondary"
            onClick={handleChangeUser}
          >
            {!changeUser ? "Change User" : "Edit Name"}
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {!changeUser ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-field" controlId="item">
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
                />
              </FloatingLabel>
            </Form.Group>
            <Button className="settings-button" variant="dark" type="submit">
              Confirm
            </Button>
            <Button
              className="settings-button"
              variant="outline-secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <h6 style={{ color: "black" }}>Select User: </h6>
            <ListGroup className="form-field">
              {userArr.map((user) => (
                <ListGroup.Item
                  action
                  key={user}
                  className={
                    userName === user ? "form-field active-user" : "form-field"
                  }
                  onClick={() => handleUserSelection(user)}
                >
                  {user}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              className="settings-button"
              variant="success"
              onClick={handleAddNewUser}
            >
              Add New User
            </Button>
            <Button
              className="settings-button"
              variant="danger"
              onClick={handleDeleteUser}
            >
              Delete User: <em>{userName}</em>
            </Button>
            <Button
              className="settings-button"
              variant="outline-secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
