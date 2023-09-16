const myMoney = 50;
const productPrice = 110;

percent = (productPrice - myMoney) * 100 / productPrice;

console.log(`desconto necessário: ${percent.toFixed(2)}%`);