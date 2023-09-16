function solucao(lista) {
    let sum = (lista.reduce((acumulador, atual) => acumulador + atual) / lista.length);
    console.log(sum);
}

solucao([2, 3])