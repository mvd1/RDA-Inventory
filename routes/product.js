const express = require('express'); 
const database = require('../database'); 
const router = express.Router(); 

// @route   GET /product/:id
// @desc    Show all products for a warehouse
// @access  Public
router.get('/:id', (req, res) => {
    const id = req.params.id; 
    try {
        const sql = `SELECT * FROM products WHERE WarehouseID = ${id}`; 
        database.query(sql, (error, results, fields) => {
            if (error) throw error; 
            if (results === undefined) {
                res.status(404).send({ msg: 'No record found' }); 
            }
            else {
                console.log(results); 
                res.status(200).send({ results }); 
            }
        });    
    } catch (err) {
        res.status(500).send('Server Error'); 
        console.error(err.message); 
    }
}); 

// @route   POST /product
// @desc    Add a product
// @access  Public
router.post('/', (req, res) => {
    
    const { id, name, type, unitPrice, quantity, warehouseID } = req.body; 

    if(id && name && type && unitPrice && quantity && warehouseID) {
        try {
            const sql = `INSERT INTO products VALUES(${id}, '${name}', '${type}', ${unitPrice}, ${quantity}, curdate(), ${warehouseID})`;
            database.query(sql, (error, results, fields) => {
                if (error) throw error; 
            }); 
            res.status(201).send({ msg: 'New product created' }); 

        } catch (err) {
            res.status(500).send('Server Error'); 
            console.error(err.message); 
        }
    } else {
        res.status(404).send({ msg: 'Please provide all required entries for the database' }); 
    }
}); 

// @route   PATCH /product/:id
// @desc    Edit a product
// @access  Public
router.patch('/:id', (req, res) => {
    const { name, type, unitPrice, quantity } = req.body; 
    const id = req.params.id; 
    if (name && type && unitPrice && quantity) {
        try {
            const sql = `UPDATE products SET Name = '${name}', Type = '${type}', UnitPrice = ${unitPrice}, Quantity = ${quantity} WHERE ID = ${id}`; 
            database.query(sql, (error, results, fields) => {
                if (error) throw error; 
                if (results.affectedRows > 0) {
                    res.status(204).end(); 
                } else {
                    res.status(404).send({ msg: 'Warehouse ID not found' }); 
                }
            }); 
        } catch (err) {
            res.status(500).send('Server Error'); 
            console.error(err.message); 
        }

    } else {
        res.status(404).send({ msg: 'Please provide all required entries for the database' }); 
    }
}); 

// @route   DELETE /product/:id
// @desc    Delete a product
// @access  Public
router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id; 
        const sql = `DELETE FROM products WHERE ID = '${id}'`;
        database.query(sql, (error, results, fields) => {
            if (error) throw error; 
            if (results.affectedRows > 0) {
                res.status(204).end(); 
            } else {
                res.status(404).send({ msg: 'No record found' });
            }
        }); 
    } catch (err) {
        res.status(500).send('Server Error'); 
        console.error(err.message); 
    }
}); 

module.exports = router; 