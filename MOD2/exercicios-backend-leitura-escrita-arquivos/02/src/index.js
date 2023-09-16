const express = require('express');
const router = require('./routes/rotas.js');
const app = express();

app.use(express.json());
app.use('/pokemon', router)

app.listen(3000);