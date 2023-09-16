const numeros = [3, 24, 1, 8, 11, 7, 15];

var max = numeros.reduce((acr, currentValue) => {
    return Math.max(acr, currentValue);
}, -Infinity);

console.log(max);