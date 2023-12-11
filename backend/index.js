const connectToMongo=require('./db');
const express = require('express');
connectToMongo();

var app = express()
const port = 5000


app.use( express.json());
// app.use('/api/auth',require('./routes/auth'));
app.use('/api/auth',require('./routes/auth'));
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
