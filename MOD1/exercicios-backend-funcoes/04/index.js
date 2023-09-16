const contaBancaria = {
    nome: "Maria",
    saldo: 0,
    historicos: [],
    depositar: valor => {
        valorInt = parseInt(valor);
        contaBancaria.saldo += valorInt;
        contaBancaria.historicos.push({ tipo: "Depósito", valor });
        return console.log(`Deposito de R$${valor / 100} realizado para o cliente: ${contaBancaria.nome}.`);
    },
    sacar: valor => {
        valorInt = parseInt(valor);
        if (valor > contaBancaria.saldo) return console.log(`Saldo insuficiente para o saque de: ${contaBancaria.nome}.`);
        else
            contaBancaria.saldo -= valorInt;
            contaBancaria.historicos.push({ tipo: "Saque", valor });
            return console.log(`Saque de R$${valor / 100} realizado para o cliente: ${contaBancaria.nome}.`);
    },
    extrato: () => {
        console.log(`Extrato de ${contaBancaria.nome} - Saldo: R$${contaBancaria.saldo / 100}`);
        console.log("Histórico:");
        contaBancaria.historicos.forEach(e => console.log(`${e.tipo} de ${e.valor / 100}`));

        //retorno da função em si
        historys = []
        contaBancaria.historicos.forEach(e => historys.push(`${e.tipo} de ${e.valor / 100}`))
        return {
            extract: `Extrato de ${contaBancaria.nome} - Saldo: R$${contaBancaria.saldo / 100}`,
            history: "Histórico:",
            historys
        }
    }
}
contaBancaria.depositar(10000);
contaBancaria.sacar(50000);
contaBancaria.sacar(5000);
console.log(contaBancaria.extrato());