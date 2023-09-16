const numeros = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
console.log(numeros.sort((firstElement, secondElement) => firstElement - secondElement));

const numeros2 = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
console.log(numeros.sort((firstElement, secondElement) => secondElement - firstElement));

const numeros3 = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
console.log(numeros.sort());

const frutas = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
console.log(frutas.sort((firstElement, secondElement) => firstElement.localeCompare(secondElement)));

const frutas2 = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
console.log(frutas.sort((firstElement, secondElement) => secondElement.localeCompare(firstElement)));

const frutas3 = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
console.log(frutas3.sort((firstElement, secondElement) => firstElement.length - secondElement.length));