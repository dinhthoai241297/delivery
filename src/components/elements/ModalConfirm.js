import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ModalConfirm = ({ show, onHide, onExiting, title, message, onAgree }) => {
    return (
        <Modal show={show} onHide={onHide} onExiting={onExiting}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onAgree}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm
