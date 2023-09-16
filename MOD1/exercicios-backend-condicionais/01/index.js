const jogada1 = "pedra";
const jogada2 = "tesoura";

if (jogada1 === jogada2) console.log("Empate");

else if (
    (jogada1 === "pedra" && jogada2 === "tesoura") ||
    (jogada1 === "tesoura" && jogada2 === "papel") ||
    (jogada1 === "papel" && jogada2 === "pedra")
) console.log("Jogador 1 venceu com " + jogada1);

else console.log("Jogador 2 venceu com " + jogada2);