import React, { useState } from 'react';
import { Button, Dropdown, Modal, Form } from 'react-bootstrap';

const UpdateOverlayModel = ({ overlay, handleUpdateOverlay, onClose }) => {
    const [show, setShow] = useState(true);
    const [overlayData, setOverlayData] = useState({ ...overlay });

    const handleInputChange = (field, value) => {
      setOverlayData((prevData) => ({
          ...prevData,
          [field]: value,
      }));
  };

    const handleSave = () => {
        handleUpdateOverlay(overlayData);
        onClose();
    };

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Overlay</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="positionX">
                        <Form.Label>Position X</Form.Label>
                        <Form.Control
                            type="number"
                            name="position.x"
                            value={overlayData.position.x}
                            onChange={(e) => handleInputChange('position', { x: parseInt(e.target.value), y: overlayData.position.y })}
                        />
                    </Form.Group>

                    <Form.Group controlId="positionY">
                        <Form.Label>Position Y</Form.Label>
                        <Form.Control
                            type="number"
                            name="position.y"
                            value={overlayData.position.y}
                            onChange={(e) => handleInputChange('position', { x: overlayData.position.x, y: parseInt(e.target.value) })}
                        />
                    </Form.Group>

                    <Form.Group controlId="sizeWidth">
                        <Form.Label>Size Width</Form.Label>
                        <Form.Control
                            type="number"
                            name="size.width"
                            value={overlayData.size.width}
                            onChange={(e) => handleInputChange('size', { width: parseInt(e.target.value), height: overlayData.size.height })}
                        />
                    </Form.Group>

                    <Form.Group controlId="sizeHeight">
                        <Form.Label>Size Height</Form.Label>
                        <Form.Control
                            type="number"
                            name="size.height"
                            value={overlayData.size.height}
                            onChange={(e) => handleInputChange('size', { width: overlayData.size.width, height: parseInt(e.target.value) })}
                        />
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="text"
                            name="content"
                            value={overlayData.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" className='mt-2' onClick={handleSave}>
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateOverlayModel;
