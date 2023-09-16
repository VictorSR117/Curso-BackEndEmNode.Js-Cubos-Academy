const palavras = ["livro", "caneta", "sol", "carro", "orelha"];

let validation = palavras.some(element => element.length > 5);

validation ? console.log("existe palavra inválida") : console.log("array validado");