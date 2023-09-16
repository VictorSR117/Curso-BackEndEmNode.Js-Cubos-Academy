function solucao(min, max, valores) {
    console.log(valores.filter(element => element >= min && element <= max));
}

solucao(2, 10, [0, 5, 6, 10, 11])