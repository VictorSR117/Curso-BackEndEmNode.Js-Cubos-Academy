function processData(input) {
    let words = input.split("\n")
    let correctPassword = words[0];
    let passwordTyped = words[1]
    let count = 0;
    let letters = correctPassword.split("");
    let numberOfLetters = letters.length;
    letters.forEach(element => passwordTyped.includes(element) ? count++ : count += 0)
    count === numberOfLetters ? console.log("SIM") : console.log("NAO");
} 

processData(`cubos
cuggbyos`)