function solucao(precos) {
    if (precos.length > 100) console.log("carrinho explodiu");
    else {
        if (precos.length >= 3) {
            let minProduct = Math.min(...precos);
            let totalWithDiscount = precos.reduce((accumulator, currentValue) => accumulator + currentValue, -minProduct * 0.5);
            console.log(totalWithDiscount);
        } 
        else {
            let total = precos.reduce((accumulator, currentValue) => accumulator + currentValue);
            console.log(total);
        }
    }
}

solucao([100, 100, 100])