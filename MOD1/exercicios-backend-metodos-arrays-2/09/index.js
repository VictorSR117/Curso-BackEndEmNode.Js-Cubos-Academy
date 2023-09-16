//const numeros = [10, 987, -886, 0, 12, 199, -45, -67].map(num => num.toFixed(0)>0 ? res += num : false)
const numeros = [10, 987, -886, 0, 12, 199, -45, -67];
let positiveNumbers = [];

numeros.forEach(num => num.toFixed(0) > 0 ? positiveNumbers.push(num) : 0);

console.log(positiveNumbers);