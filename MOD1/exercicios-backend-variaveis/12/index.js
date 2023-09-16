let amount = 90000;
let initialCapital = 60000;
let numberMonths = 24;

let M = amount / initialCapital;
let C = 1 / numberMonths;

let rate = M ** C - 1;
let ratePercentage = rate * 100;

console.log(`O seu financiamento de ${initialCapital} reais teve uma taxa de juros de ${ratePercentage.toFixed(3)}%, pois após ${numberMonths} meses você teve que pagar ${amount} reais.`);
