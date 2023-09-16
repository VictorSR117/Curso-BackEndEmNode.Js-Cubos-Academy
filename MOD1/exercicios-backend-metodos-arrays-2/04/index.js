const numeros = [0, 122, 4, 6, 7, 8, 44];

numeros.every(number => number % 2 == 0) ? console.log("array válido") : console.log("array inválido");