const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 

const PORT = process.env.PORT || 3000;

// JSON Body Parser
app.use(express.json());

// Route(s)
app.use('/warehouse', require('./routes/warehouse')); 
app.use('/product', require('./routes/product')); 

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});