const palavras = ["arroz", "feijão", "carne", "cerveja", "macarrão"];
let produtosProibidos = ["cerveja", "vodka"];

let validation = palavras.some(produto => produtosProibidos.includes(produto));

validation ? console.log("Revise sua lista, João. Possui bebida com venda proibida!") : console.log("Tudo certo, vamos às compras!");