import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductModal from './ProductModal';

const url = 'http://localhost:5000/product';

const ProductTable = () => {
	const { id } = useParams();

	const [oneProduct, setOneProduct] = useState(null);
	const [productData, setProductData] = useState(null);
	console.log(productData);

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

	const [productWarehouseID, setProductWarehouseID] = useState('');

	useEffect(() => {
		console.log(id);
		setProductWarehouseID(id);
		axios
			.get(`${url}/${id}`, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
			})
			.then((response) => {
				setProductData(response.data);
			});

		console.log(productData);
	}, [id]);

	if (!productData) return null;

	return (
		<div>
			<ProductModal
				show={modalIsOpen}
				close={hideModal}
				editMode={editModeOn}
				productInfo={oneProduct}
				productWarehouseID={productWarehouseID}
			/>
			<Table bordered className="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Unit Price</th>
						<th>Quantity</th>
						<th>Date</th>
						<th>Total Price</th>
						<th style={{ textAlign: 'start' }}>
							<Button
								variant="success"
								className="tableCellButtons"
								onClick={() => {
									showModal();
									addModeModal();
								}}
							>
								Add New Product
							</Button>
						</th>
					</tr>
				</thead>
				<tbody className="product-table">
					{productData.results.map((product, index) => (
						<tr key={index}>
							<td>{product.Name}</td>
							<td>{product.Type}</td>
							<td>{product.UnitPrice}</td>
							<td>{product.Quantity}</td>
							<td>{product.Date}</td>
							<td>{product.UnitPrice * product.Quantity}</td>
							<td>
								<div style={{ width: '600px', display: 'flex' }}>
									<Button
										variant="primary"
										className="tableCellButtons"
										onClick={() => {
											showModal();
											editModeModal();
											setOneProduct(product);
										}}
									>
										Edit
									</Button>
									<Button
										variant="danger"
										className="tableCellButtons"
										onClick={() => {
											axios
												.delete(`${url}/${product.ID}`, {
													headers: {
														'Access-Control-Allow-Origin': '*',
														'Access-Control-Allow-Credentials': true,
													},
												})
												// .then(() => {
												// 	handleDelete(warehouse.ID);
												//})
												.catch((error) => console.error(error));
											// const newWarehouseData = warehouseData.results.filter(data => data.ID !== warehouse.ID);
											window.location.reload();
										}}
									>
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

export default ProductTable;
