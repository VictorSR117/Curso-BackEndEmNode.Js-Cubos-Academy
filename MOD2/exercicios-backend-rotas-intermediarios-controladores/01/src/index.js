let express = require('express');

let app = express();

app.get('/somar', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    res.send((num1 + num2).toString());
});

app.get('/subtrair', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    res.send((num1 - num2).toString());
});

app.get('/multiplicar', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    res.send((num1 * num2).toString());
});

app.get('/dividir', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    num2 !== 0 ? res.send((num1 / num2).toString()) : res.send('Erro: Divisão por zero.');
});

app.listen(3000);