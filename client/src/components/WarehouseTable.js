import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import WarehouseModal from "./WarehouseModal";
import axios from "axios";

const url = "http://localhost:5000/warehouse";

const WarehouseTable = () => {
	const [warehouseData, setWarehouseData] = useState(null);
	const [oneWarehouse, setOneWarehouse] = useState(null);
	const [modalIsOpen, setModalState] = useState(false);
	const [editModeOn, setModalToEdit] = useState(false);

	const showModal = () => {
		setModalState(true);
	};
	const hideModal = () => {
		setModalState(false);
	};

	const addModeModal = () => {
		setModalToEdit(false);
	};
	const editModeModal = () => {
		setModalToEdit(true);
	};

	useEffect(() => {
		axios
			.get(url, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
			})
			.then((response) => {
				setWarehouseData(response.data);
			});
	}, []);

	const handleDelete = (id) => {
		const newWarehouseData = warehouseData.results.filter(warehouse => warehouse.ID !== id); 
		setWarehouseData(newWarehouseData); 
	}

	if (!warehouseData) return null;

	return (
		<div>
			<WarehouseModal
				show={modalIsOpen}
				close={hideModal}
				editMode={editModeOn}
				warehouseInfo={oneWarehouse}
			/>
			<Table bordered className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>
							<div>Warehouse Location</div>
						</th>
						<th style={{ textAlign: "start" }}>
							<Button
								variant="success"
								className="tableCellButtons"
								onClick={() => {
									showModal();
									addModeModal();
								}}
							>
								Add New Warehouse
							</Button>
						</th>
					</tr>
				</thead>
				<tbody className="warehouse-table">
					{warehouseData.results.map((warehouse, index) => (
						<tr key={index}>
							<td className="warehouseFirstColumn">{warehouse.Name}</td>
							<td>
								{warehouse.City + ","} {warehouse.State} {warehouse.ZipCode}
							</td>
							<td>
								<div style={{ width: "600px", display: "flex" }}>
									<Link to={`/product/${warehouse.ID}`}>
										<Button variant="success" className="tableCellButtons">
											View Products
										</Button>
									</Link>
									<Button
										variant="primary"
										className="tableCellButtons"
										onClick={() => {
											showModal();
											editModeModal();
											setOneWarehouse(warehouse);
										}}
									>
										Edit
									</Button>
									<Button variant="danger" className="tableCellButtons" onClick={() => {
										axios
											.delete(`${url}/${warehouse.ID}`, {
												headers: {
													"Access-Control-Allow-Origin": "*",
													"Access-Control-Allow-Credentials": true,
												},
											})
											// .then(() => {
											// 	handleDelete(warehouse.ID); 
											//})
											.catch(error => console.error(error));	
										// const newWarehouseData = warehouseData.results.filter(data => data.ID !== warehouse.ID);
										window.location.reload();  
									}}>
										Remove
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default WarehouseTable;
