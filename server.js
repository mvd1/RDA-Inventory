const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 
const database = require('./database'); 

const PORT = process.env.PORT || 3000;

// JSON Body Parser
app.use(express.json());

// Route(s)

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});