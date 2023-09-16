function solucao(jogadores) {
    
    const contagem = { 0: 0, 1: 0};
    for (const jogador of jogadores) contagem[jogador.jogada]++;
    
    let sorteado = null;

    for (const jogador of jogadores) {
        if (contagem[jogador.jogada] === 1) {
            sorteado = jogador.nome;
            break;
        }
    }

    console.log(sorteado || "NINGUEM");
}

  

solucao([
    {
        "nome": "Herman",
        "jogada": 1
    },
    {
        "nome": "Rhodes",
        "jogada": 0
    },
    {
        "nome": "Beach",
        "jogada": 0
    },
    {
        "nome": "Laurel",
        "jogada": 0
    },
    {
        "nome": "Beatrice",
        "jogada": 0
    },
    {
        "nome": "Alison",
        "jogada": 0
    },
    {
        "nome": "Saundra",
        "jogada": 0
    },
    {
        "nome": "Klein",
        "jogada": 0
    }
]);