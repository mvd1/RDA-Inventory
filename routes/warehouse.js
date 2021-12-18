// Warehouse route: includes requests for GET, POST, PATCH, DELETE.
const express = require('express');
const database = require('../database');
const router = express.Router();

// @route   GET /warehouse
// @desc    Show all warehouses
// @access  Public
router.get('/', (req, res) => {
  try {
    const sql = 'SELECT * FROM warehouse';
    database.query(sql, (error, results, fields) => {
      if (error) throw error;
      if (results === undefined) {
        res.status(404).send({ msg: 'No record found' });
      } else {
        //console.log(results);
        res.status(200).send({ results });
      }
    });
  } catch (err) {
    res.status(500).send('Server Error');
    console.error(err.message);
  }
});

// @route   GET /warehouse/:id
// @desc    Get a warehouse based on its id
// @access  Public
router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM warehouse WHERE ID = '${id}'`;
    database.query(sql, (error, results, fields) => {
      if (error) throw error;
      if (results === undefined) {
        res.status(404).send({ msg: 'No record found' });
      } else {
        res.status(200).send({ results });
      }
    });
  } catch (err) {
    res.status(500).send('Server Error');
    console.error(err.message);
  }
});

// @route   POST /warehouse
// @desc    Add a warehouse
// @access  Public
router.post('/', (req, res) => {
  const { id, name, city, state, zipcode } = req.body;

  if (id && name && city && state && zipcode) {
    try {
      const sql = `INSERT INTO warehouse VALUES(${id}, '${name}', '${city}', '${state}', ${zipcode})`;
      database.query(sql, (error, results, fields) => {
        if (error) throw error;
      });
      res.status(201).send({ msg: 'New warehouse created' });
    } catch (err) {
      res.status(500).send('Server Error');
      console.error(err.message);
    }
  } else {
    res
      .status(404)
      .send({ msg: 'Please provide all required entries for the database' });
  }
});

// @route   PATCH /warehouse/:id
// @desc    Edit a warehouse
// @access  Public
router.patch('/:id', (req, res) => {
  const { name, city, state, zipcode } = req.body;
  const id = req.params.id;
  if (name && city && state && zipcode) {
    try {
      const sql = `UPDATE warehouse SET Name = '${name}', City = '${city}', State = '${state}', ZipCode = ${zipcode} WHERE ID = '${id}'`;
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
    res
      .status(404)
      .send({ msg: 'Please provide all required entries for the database' });
  }
});

// @route   DELETE /warehouse/:id
// @desc    Delete a warehouse
// @access  Public
router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const productSql = `DELETE FROM products WHERE WarehouseID = '${id}'`;
    const warehouseSql = `DELETE FROM warehouse WHERE ID = '${id}'`;
    database.query(productSql, (error, results, fields) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).send({ msg: 'No record found' });
      }
    });

    database.query(warehouseSql, (error, results, fields) => {
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
