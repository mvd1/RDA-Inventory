import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
//import { removeItem } from "../actions/removeItem";
import WarehouseModal from "./WarehouseModal";
import axios from "axios";

const url = 'http://localhost:5000/warehouse';

const WarehouseTable = () => {

	const [warehouseData, setWarehouseData] = useState(null);
	const [modalIsOpen, setModalState] = useState(false);

	const showModal = () => {
		setModalState(true);
	}

	const hideModal = () => {
		setModalState(false);
	}

	useEffect(() => {
		axios.get(url, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			}
		})
			.then((response) => {
				setWarehouseData(response.data);
			});
	}, []);

	if (!warehouseData) return null;

	return (
		<div>
			<WarehouseModal show={modalIsOpen} close={hideModal} />
			<Table bordered className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>
							<div>Warehouse Location</div>
						</th>
						<th style={{ textAlign: "start" }}>
							<Button variant="success" className="tableCellButtons" onClick={() => showModal()}>Add New Warehouse</Button>
						</th>
					</tr>
				</thead>
				<tbody className="warehouseTable">
					{warehouseData.results.map((warehouse, index) =>
						<tr key={index}>
							<td className="warehouseFirstColumn">{warehouse.Name}</td>
							<td>{warehouse.City + ','} {warehouse.State} {warehouse.ZipCode}</td>
							<td>
								<div style={{ width: "600px", display: "flex" }}>
									<Button variant="success" className="tableCellButtons">
										View Products
									</Button>
									<Button variant="primary" className="tableCellButtons">
										Edit
									</Button>
									<Button variant="danger" className="tableCellButtons">
										Remove
									</Button>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default WarehouseTable;
