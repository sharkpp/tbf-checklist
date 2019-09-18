
"use struct";

import React, { useEffect, useState, useCallback } from 'react';

import { Modal, Button } from 'react-bootstrap';

// 製品表示用
function MessageBox({ title, message, onClose }) {
  const [show, setShow] = useState(!!message);

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  const handleClose = useCallback(() => { setShow(false); onClose && onClose(); }, [onClose]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            了解
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageBox;
