let carro = {
    ligado: false,
    velocidade: 0,
    ligar: () => {
        if (this.ligado) console.log("Este carro já está ligado.");
        else
            this.ligado = true;
        console.log("Carro ligado. Velocidade: " + this.velocidade + ".");
    },
    desligar: () => {
        if (!this.ligado) console.log("Este carro já está desligado.");
        else
            this.ligado = false;
        this.velocidade = 0;
        console.log("Carro desligado. Velocidade: " + this.velocidade + ".");
    },
    acelerar: () => {
        if (!this.ligado) console.log("Não é possível acelerar um carro desligado.");
        else
            this.velocidade += 10;
        console.log("Carro ligado. Velocidade: " + this.velocidade + ".");
    },
    desacelerar: () => {
        if (!this.ligado)
            console.log("Não é possível desacelerar um carro desligado.");
        else
            this.velocidade -= 10;
        console.log("Carro ligado. Velocidade: " + this.velocidade + ".");
    }
};

carro.desligar();
carro.ligar();
carro.ligar();
carro.acelerar();
carro.acelerar();
carro.desacelerar();
carro.desligar();
carro.acelerar();
carro.desacelerar();