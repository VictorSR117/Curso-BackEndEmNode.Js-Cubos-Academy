function solucao(lista) {
    let soma = 0;
    
    lista.forEach(element => soma += element)
    
    console.log(soma)
}

solucao([1, 2, 3, 4])