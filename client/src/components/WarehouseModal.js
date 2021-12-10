import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const { v4: uuidv4 } = require('uuid');
const url = "http://localhost:5000/warehouse";

const WarehouseModal = ({ show, close, editMode, warehouseInfo }) => {
	const [name, setName] = useState(editMode ? `${warehouseInfo.Name}` : '');
	const [city, setCity] = useState(editMode ? `${warehouseInfo.City}` : '');
	const [usState, setUsState] = useState(editMode ? `${warehouseInfo.State}` : '');
	const [zipCode, setZipCode] = useState(editMode ? `${warehouseInfo.ZipCode}` : '');
	console.log(warehouseInfo); 
	

	// Both of these depend on whether the user clicks the "Add New Warehouse" or the "Edit" Button
	const modalTitle = editMode === false ? "Add New Warehouse" : "Edit Warehouse";

	const handleSubmit = (event) => {
		event.preventDefault();
		const warehouse = { name, city, usState, zipCode }; 
		console.log(warehouse);

		if(!editMode) {
			axios({
				method: "post",
				url: url,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				data: {
					id: `'${uuidv4()}'`, 
					name: name,
					city: city,
					state: usState,
					zipcode: zipCode
				},
			});
		}
		else {
			axios({
				method: "patch", 
				url: `${url}/${warehouseInfo.ID}`,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
				data: {
					name: warehouseInfo.Name,
					city: warehouseInfo.City,
					state: warehouseInfo.State,
					zipcode: warehouseInfo.ZipCode
				},
			});
		}
		window.location.reload();
	};

	const resetModalEntries = () => {
		setName("");
		setCity("");
		setUsState("");
		setZipCode("");
	};

	//const displayName = editMode === false ? name : `${warehouseInfo.Name}`;
	// const displayCity = editMode === false ? city : `${warehouseInfo.City}`;
	// const displayUsState =
	// 	editMode === false ? usState : `${warehouseInfo.State}`;
	// const displayZipCode =
	// 	editMode === false ? zipCode : `${warehouseInfo.ZipCode}`;

	return (
		<Modal show={show} onHide={close}>
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
							placeholder="Enter Name"
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCity">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							value={city}
							onChange={(event) => setCity(event.target.value)}
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
							onChange={(event) => setZipCode(event.target.value)}
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
