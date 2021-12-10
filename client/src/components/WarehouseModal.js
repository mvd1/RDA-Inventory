import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const url = 'http://localhost:5000/warehouse';

const WarehouseModal = ({ show, close, editMode, warehouseInfo }) => {
	const [id, setID] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [usState, setUsState] = useState('');
	const [zipCode, setZipCode] = useState('');

	// Both of these depend on whether the user clicks the "Add New Warehouse" or the "Edit" Button
	const modalTitle =
		editMode === false ? 'Add New Warehouse' : 'Edit Warehouse';

	const handleSubmit = (event) => {
		event.preventDefault();
		const warehouse = { name, city, usState, zipCode };
		console.log(warehouse);

		if (!editMode) {
			axios({
				method: 'post',
				url: url,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
				data: {
					id: `'${uuidv4()}'`,
					name: name,
					city: city,
					state: usState,
					zipcode: zipCode,
				},
			});
		} else {
			axios({
				method: 'patch',
				url: `${url}/${id}`,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
				data: {
					name: name,
					city: city,
					state: usState,
					zipcode: zipCode,
				},
			});
		}
		// window.location.reload();
	};

	const resetModalEntries = () => {
		setName('');
		setCity('');
		setUsState('');
		setZipCode('');
	};

	return (
		<Modal
			show={show}
			onHide={close}
			onEnter={() => {
				if (editMode) {
					setID(warehouseInfo.ID);
					setName(warehouseInfo.Name);
					setCity(warehouseInfo.City);
					setUsState(warehouseInfo.State);
					setZipCode(warehouseInfo.ZipCode);
				}
			}}
		>
			<Modal.Header>
				<Modal.Title>{modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={name}
							onChange={(event) => setName(event.target.value)}
							maxLength="45"
							placeholder="Enter Name"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCity">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							value={city}
							onChange={(event) => setCity(event.target.value)}
							maxLength="45"
							placeholder="Enter City"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicState">
						<Form.Label>State</Form.Label>
						<Form.Control
							type="text"
							value={usState}
							onChange={(event) => setUsState(event.target.value)}
							maxLength="2"
							placeholder="Enter State Abbreviation"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicZipCode">
						<Form.Label>Zip Code</Form.Label>
						<Form.Control
							type="text"
							value={zipCode}
							onChange={(event) => {
								const onlyIntegersAllowed = /^[0-9\b]+$/;
								if (
									event.target.value === '' ||
									onlyIntegersAllowed.test(event.target.value)
								) {
									setZipCode(event.target.value);
								}
							}}
							maxLength="5"
							placeholder="Enter Zip Code"
						/>
					</Form.Group>
					<Button variant="primary" className="modal-button" type="submit">
						Submit
					</Button>
					<Button
						variant="secondary"
						className="modal-button"
						onClick={() => {
							close();
							resetModalEntries();
						}}
					>
						Close
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default WarehouseModal;
