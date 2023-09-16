const caractere = "E";

if ("0123456789".includes(caractere)) console.log("Número");
else if (caractere === "a" || caractere === "e" || caractere === "i" || caractere === "o" || caractere === "u") console.log("Vogal minúscula");
else if (caractere === "A" || caractere === "E" || caractere === "I" || caractere === "O" || caractere === "U") console.log("Vogal maiúscula");
else console.log("Consoante");