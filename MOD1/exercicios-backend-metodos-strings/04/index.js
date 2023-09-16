let identificador = "123";
let nome = "José silva costa";
let email = "      jose@email.com  ";

while (identificador.length < 6) identificador = "0" + identificador;

const palavrasNome = nome.split(' ');
nome = palavrasNome.map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()).join(' ');

email = email.trim();

console.log(identificador);
console.log(nome);
console.log(email);
