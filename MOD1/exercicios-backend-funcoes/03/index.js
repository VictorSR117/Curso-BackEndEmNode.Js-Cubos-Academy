const carrinho = {
    nomeDoCliente: "Guido Bernal",
    produtos: [
        {
            id: 1,
            nome: "Camisa",
            qtd: 3,
            precoUnit: 3000,
        },
        {
            id: 2,
            nome: "Bermuda",
            qtd: 2,
            precoUnit: 5000,
        },
    ],
    imprimirResumo: () => {
        const totalItens = this.calcularTotalDeItens();
        const totalPay = this.calcularTotalAPagar();
        console.log(`Cliente: ${this.nomeDoCliente}`);
        console.log(`Total de itens: ${totalItens} itens`);
        console.log(`Total a pagar: R$ ${(totalPay / 100).toFixed(2)}`);
    },
    addProduto: (produto) => {
        const produtoExistente = this.produtos.find((item) => item.id === produto.id);
        produtoExistente ? produtoExistente.qtd += produto.qtd : this.produtos.push(produto);
    },
    imprimirDetalhes: () => {
        console.log(`Cliente: ${this.nomeDoCliente}`);
        this.produtos.forEach((produto, index) => console.log(`Item ${index + 1} - ${produto.nome} - ${produto.qtd} und - R$ ${(produto.qtd * produto.precoUnit / 100).toFixed(2)}`));

        const totalItens = this.calcularTotalDeItens();
        const totalPay = this.calcularTotalAPagar();

        console.log(`Total de itens: ${totalItens} itens`);
        console.log(`Total a pagar: R$ ${(totalPay / 100).toFixed(2)}`);
    },
    calcularTotalDeItens: () => {
        let totalItens = 0;
        this.produtos.forEach(produto => totalItens += produto.qtd);
        return totalItens;
    },
    calcularTotalAPagar: () => {
        let totalPay = 0;
        this.produtos.forEach(produto => totalPay += produto.qtd * produto.precoUnit);
        return totalPay;
    },
    calcularDesconto: () => {
        const totalItens = this.calcularTotalDeItens();
        const totalPay = this.calcularTotalAPagar();

        let descontoItens = 0;
        if (totalItens > 4) {
            const menorPreco = Math.min(...this.produtos.map((produto) => produto.precoUnit));
            descontoItens = menorPreco;
        }

        let descontoValor = 0;
        if (totalPay > 10000) descontoValor = totalPay * 0.1;

        return Math.max(descontoItens, descontoValor);
    },
};

// Teste dos métodos
carrinho.imprimirResumo();

const novaBermuda = {
    id: 2,
    nome: "Bermuda",
    qtd: 3,
    precoUnit: 5000,
};

carrinho.addProduto(novaBermuda);
carrinho.imprimirResumo();

const novoTenis = {
    id: 3,
    nome: "Tenis",
    qtd: 1,
    precoUnit: 10000,
};

carrinho.addProduto(novoTenis);
carrinho.imprimirResumo();

carrinho.imprimirDetalhes();

const desconto = carrinho.calcularDesconto();
console.log(`Desconto: R$ ${(desconto / 100).toFixed(2)}`);
