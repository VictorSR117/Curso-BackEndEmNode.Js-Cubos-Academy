const express = require('express');
const router = require('./routes/rotas');
const app = express();

app.use(express.json());
app.use('/livros', router)

app.listen(3000);