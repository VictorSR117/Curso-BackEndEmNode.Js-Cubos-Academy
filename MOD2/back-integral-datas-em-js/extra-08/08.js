// Formato: 05 de outubro de 2020
function formatoA(data) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return data.toLocaleDateString('pt-BR', options);
}

// Formato: 05/10/2020
function formatoB(data) {
    return data.toLocaleDateString('pt-BR');
}

// Formato: 5 out
function formatoC(data) {
    const options = { month: 'short' };
    return data.toLocaleDateString('pt-BR', options);
}

// Formato: 05 out 2020
function formatoD(data) {
    const options = { year: 'numeric', month: 'short' };
    return data.toLocaleDateString('pt-BR', options);
}

// Formato: 05 de out de 2020
function formatoE(data) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return data.toLocaleDateString('pt-BR', options).replace(".", "");
}

// Formato: 05/out
function formatoF(data) {
    const options = { day: '2-digit', month: '2-digit' };
    return data.toLocaleDateString('pt-BR', options).replace(/\//g, '/');
}

// Exemplo de uso:
const data = new Date("2020-10-05");

console.log(formatoA(data)); // Saída: 05 de outubro de 2020
console.log(formatoB(data)); // Saída: 05/10/2020
console.log(formatoC(data)); // Saída: 5 out
console.log(formatoD(data)); // Saída: 05 out 2020
console.log(formatoE(data)); // Saída: 05 de out de 2020
console.log(formatoF(data)); // Saída: 05-out