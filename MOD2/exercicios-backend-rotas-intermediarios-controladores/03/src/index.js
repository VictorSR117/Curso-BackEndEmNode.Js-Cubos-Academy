const express = require('express');
const routesForRequests = require('../src/roteador')
const app = express();

app.use(routesForRequests)
app.listen(8000);