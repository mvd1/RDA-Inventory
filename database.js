// Connect to MySQL database
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.code);
      return;
    }
   
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection; 
