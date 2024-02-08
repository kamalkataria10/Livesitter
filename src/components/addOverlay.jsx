import React, { useState } from 'react';
import { Button, Dropdown, Modal, Form } from 'react-bootstrap';

const AddOverlay = ({ handleAddOverlay }) => {
    const [show, setShow] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [formData, setFormData] = useState({
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 100,
            height: 100,
        },
        content: '',
    });

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedType(null);
    };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        handleAddOverlay(formData);
        setFormData({
            position: {
                x: 0,
                y: 0,
            },
            size: {
                width: 100,
                height: 100,
            },
            content: '',
        });

        handleClose();
    };

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="overlay-dropdown">
                    Add Overlay
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleTypeSelect('text')}>Add Text</Dropdown.Item>
                    <Dropdown.Item disabled>Add Logo</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add {selectedType === 'text' ? 'Text' : 'Logo'} Overlay</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="positionX">
                            <Form.Label>Position X</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.position.x}
                                onChange={(e) => handleInputChange('position', { x: parseInt(e.target.value), y: formData.position.y })}
                            />
                        </Form.Group>

                        <Form.Group controlId="positionY">
                            <Form.Label>Position Y</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.position.y}
                                onChange={(e) => handleInputChange('position', { x: formData.position.x, y: parseInt(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="sizeWidth">
                            <Form.Label>Size Width</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.size.width}
                                onChange={(e) => handleInputChange('size', { width: parseInt(e.target.value), height: formData.size.height })}
                            />
                        </Form.Group>

                        <Form.Group controlId="sizeHeight">
                            <Form.Label>Size Height</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.size.height}
                                onChange={(e) => handleInputChange('size', { width: formData.size.width, height: parseInt(e.target.value) })}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.content}
                                onChange={(e) => handleInputChange('content', e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" className='mt-2' onClick={handleSubmit}>
                            Add {selectedType === 'text' ? 'Text' : 'Logo'} Overlay
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddOverlay;
