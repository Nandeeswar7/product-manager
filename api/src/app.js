const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/products', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if(response.ok){
        const data = await response.json()
        res.json(data);
    } else{
        const {status, statusText} = response
        res.status(status).json(statusText)
    }
  } catch (error) {
    res.status(500).send('Failed to fetch products');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
