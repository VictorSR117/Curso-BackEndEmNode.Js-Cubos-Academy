const numeros = [8, 11, 4, 1];

let maiorDiferenca = numeros.reduce((maior, numero, index) => {
    return numeros.slice(index + 1).reduce((diferencaMaxima, outroNumero) => {
        let diferenca = Math.abs(numero - outroNumero);
        return diferenca > diferencaMaxima ? diferenca : diferencaMaxima;
    }, maior);
}, 0);

console.log(maiorDiferenca);
