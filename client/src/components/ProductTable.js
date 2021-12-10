import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:5000/product'; 

const ProductTable = () => {

    const { id } = useParams(); 

    const [productData, setProductData] = useState(null); 
    console.log(productData); 
    
    useEffect(() => {
		axios
			.get(`${url}/${id}`, {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				},
			})
			.then((response) => {
				setProductData(response.data);
			});
	}, [id]);

    if (!productData) return null; 

    return (
        <div>
            <Table bordered className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Total Price</th>
						<th style={{ textAlign: "start" }}>
							<Button
								variant="success"
								className="tableCellButtons"
								onClick={() => {
									// showModal();
									// addModeModal();
								}}
							>Add New Product</Button>
						</th>
					</tr>
				</thead>
                <tbody className="product-table">
                    {
                        productData.results.map((product, index) => (
                            <tr key={index}>
                                <td>{product.Name}</td>
                                <td>{product.Type}</td>
                                <td>{product.UnitPrice}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.Date}</td>
                                <td>{product.UnitPrice * product.Quantity}</td>
                                <td>
                                    <div style={{ width: "600px", display: "flex" }}>
                                        <Button
                                            variant="primary"
                                            className="tableCellButtons"
                                            onClick={() => {
                                                // showModal();
                                                // editModeModal();
                                                // setOneWarehouse(warehouse);
                                            }}
                                        >Edit</Button>
                                        <Button variant="danger" className="tableCellButtons" onClick={() => {
                                            axios
                                                .delete(`${url}/${product.ID}`, {
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
                                        }}>Remove</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductTable; 
