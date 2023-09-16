const frutas = ["Manga", "UVA", "abacaxi", "banaNA", "MAçã"];
let fruitsLowed = [];
let fruitsInitialBigger = [];

for (const fruit of frutas) {
    fruitsLowed.push(fruit.toLowerCase())
}

for (const fruit of fruitsLowed) {
    fruitsInitialBigger.push(`${fruit[0].toUpperCase()}${fruit.substring(1)}`)
}

let newFruits = fruitsInitialBigger.map((fruit, index) => fruit = `${index} - ${fruit}`);

console.log(newFruits);