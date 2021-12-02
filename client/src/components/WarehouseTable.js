import React from "react";
import Table from "react-bootstrap/Table";

import Button from "react-bootstrap/Button";

const WarehouseTable = () => {
	// Sample data, replace with database information
	const warehouses = [
		{ name: "Warehouse #1", location: "South Lyon, MI. 48178" },
		{ name: "Warehouse #2", location: "Garden City, MI 48135" },
		{ name: "Warehouse #3", location: "Detroit, MI 48201" },
	];

	const renderWarehouses = (warehouse, index) => {
		return (
			<tr key={index}>
				<td className="warehouseFirstColumn">{warehouse.name}</td>
				<td>{warehouse.location}</td>
				<td>
					<div style={{ width: "500px", display: "flex" }}>
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
		);
	};
	return (
		<Table bordered>
			<thead>
				<tr>
					<th>Name</th>
					<th>
						<div>Warehouse Location</div>
					</th>
					<th>
						<Button variant="success">Add New Warehouse</Button>
					</th>
				</tr>
			</thead>
			<tbody className="warehouseTable">
				{warehouses.map(renderWarehouses)}
			</tbody>
		</Table>
	);
};

export default WarehouseTable;
