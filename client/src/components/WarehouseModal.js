import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';  
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';

const WarehouseModal = ({ show, close }) => {

    const [name, setName] = useState(''); 
    const [city, setCity] = useState(''); 
    const [usState, setUsState] = useState(''); 
    const [zipCode, setZipCode] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        const warehouse = { name, city, usState, zipCode };
        console.log(warehouse); 
    };

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title>Add New Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter City" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" value={usState} onChange={(event) => setUsState(event.target.value)} maxLength="2" placeholder="Enter State Abbreviation" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicZipCode">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control type="text" value={zipCode} onChange={(event) => setZipCode(event.target.value)} placeholder="Enter Zip Code" />
                    </Form.Group>
                    <Button variant="primary" className="modal-button" type="submit">
                    Submit
                    </Button>
                    <Button variant="secondary" className="modal-button"  onClick={()=> close()}>
                    Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default WarehouseModal; 