const express = require('express')
const router = require('../src/routes/rotas');
const app = express();

app.use(express.json());
app.use('/enderecos', router);

app.listen(3000);