//tipo de pagamento (dinheiro, credito, debito, cheque).
const tipoDePagamento = "credito";

//valor da mercadoria (centavos)
const valorDoProduto = 13000;

switch (tipoDePagamento) {
    case "credito":
        console.log(`Valor a ser pago: R$${valorDoProduto * 0.95}`);
        break;
    case "cheque":
        console.log(`Valor a ser pago: R$${valorDoProduto * 0.97}`);
        break;
    case "debito ou dinheiro":
        console.log(`Valor a ser pago: R$${valorDoProduto * 0.90}`);
        break;
    default:
        console.log("erro");
        break;
}