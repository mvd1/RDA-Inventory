import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const url = 'http://localhost:5000/product';

const ProductModal = ({
  show,
  close,
  editMode,
  productInfo,
  productWarehouseID,
}) => {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [quantity, setQuantity] = useState('');

  // Both of these depend on whether the user clicks the "Add New Product" or the "Edit" Button
  const modalTitle = editMode === false ? 'Add New Product' : 'Edit Product';

  const handleSubmit = (event) => {
    event.preventDefault();
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
          name: productName,
          type: productType,
          unitPrice: unitPrice,
          quantity: quantity,
          warehouseID: productWarehouseID,
        },
      });
    } else {
      axios({
        method: 'patch',
        url: `${url}/${productID}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        data: {
          name: productName,
          type: productType,
          unitPrice: unitPrice,
          quantity: quantity,
          warehouseID: productWarehouseID,
        },
      });
    }
    window.location.reload();
  };

  return (
    <Modal
      show={show}
      onHide={close}
      onEnter={() => {
        if (editMode) {
          setProductID(productInfo.ID);
          setProductName(productInfo.Name);
          setProductType(productInfo.Type);
          setUnitPrice(productInfo.UnitPrice);
          setQuantity(productInfo.Quantity);
        } else {
          setProductName('');
          setProductType('');
          setUnitPrice('');
          setQuantity('');
        }
      }}
      onExit={() => {
        setProductID('');
        setProductName('');
        setProductType('');
        setUnitPrice('');
        setQuantity('');
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
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              maxLength="45"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={productType}
              onChange={(event) => setProductType(event.target.value)}
              maxLength="45"
              placeholder="Enter Type"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUnitPrice">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="text"
              value={unitPrice}
              onChange={(event) => {
                const onlyFloatsAllowed = /^[0-9]*(\.[0-9]{0,2})?$/;
                if (
                  event.target.value === '' ||
                  (onlyFloatsAllowed.test(event.target.value) &&
                    event.target.value <= 9999.99)
                ) {
                  setUnitPrice(event.target.value);
                }
              }}
              maxLength="7"
              placeholder="Enter Unit Price ($0.00)"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              value={quantity}
              onChange={(event) => {
                const onlyIntegersAllowed = /^[0-9\b]+$/;
                if (
                  event.target.value === '' ||
                  onlyIntegersAllowed.test(event.target.value)
                ) {
                  setQuantity(event.target.value);
                }
              }}
              maxLength="9"
              placeholder="Enter Quantity"
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
            }}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
