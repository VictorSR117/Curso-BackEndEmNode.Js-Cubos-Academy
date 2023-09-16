//valor do produto comprado.
const valorDoProduto = 100000;

//quantidade de parcelas
const quantidadeDoParcelamento = 10;

//valor pago
const valorPago = 300;

let valorTotalAPagar = valorDoProduto * quantidadeDoParcelamento;

let valorRestante = valorTotalAPagar - valorPago;

let parcelasFaltantes = quantidadeDoParcelamento - Math.ceil(valorPago / valorDoProduto);

console.log(`Restam ${parcelasFaltantes} parcelas de R$${(valorDoProduto / 100).toFixed(2)}`);