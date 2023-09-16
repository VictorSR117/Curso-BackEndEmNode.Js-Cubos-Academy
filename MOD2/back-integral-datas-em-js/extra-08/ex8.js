const format = require('date-fns/format');
let date = new Date(2023, 8, 5);

console.log(format(date, "dd 'de' MMMM 'de' yyyy"));
console.log(format(date, "dd/M/yyyy"));
console.log(format(new Date(2002, 8, 8), "dd MMM"));
console.log(format(new Date(2002, 8, 8), "dd MMM yyyy"));
console.log(format(date, "dd 'de' MMM 'de' yyyy"));
console.log(format(new Date(2002, 8, 8), "dd/MMM"));