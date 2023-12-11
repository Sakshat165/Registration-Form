const connectToMongo=require('./db');
const express = require('express');
connectToMongo();

var app = express()
const port = 5000

// app.use('/api/auth',require('./routes/auth'));
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
