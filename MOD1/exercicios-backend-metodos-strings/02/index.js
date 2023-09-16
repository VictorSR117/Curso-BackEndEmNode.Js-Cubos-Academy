const cpf = "12345678900";
const cnpj = "12345678900";

cpf.trim().length != 11 ? console.log("CPF Inválido") : console.log(cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9));
cnpj.trim().length != 14 ? console.log("CNPJ Inválido") : console.log(cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' + cnpj.slice(5, 8) + '/' + cnpj.slice(8, 12) + '-' + cnpj.slice(12));