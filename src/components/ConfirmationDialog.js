import { Modal } from "react-bootstrap";

function ConfirmationDialog(props) {
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Confirm {props.label}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={props.onConfirm}>
          Confirm
        </button>
        <button className="btn btn-outline-secondary" onClick={props.onCancel}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;
