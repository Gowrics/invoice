import React from "react";
import { Modal, Button } from "react-bootstrap";

function CustomModal({
  show,
  onClose,
  title,
  message,
  onConfirm,
  confirmText,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    alert("Confirmed!");
    setShowModal(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Alert"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {onConfirm && (
          <Button variant="primary" onClick={onConfirm}>
            {confirmText || "Confirm"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;
