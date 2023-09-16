//renda mensal do aluno, em centavos.
const rendaMensalEmCentavos = 300000;

// Tempo decorrido de contrato. Se for maior que 60 meses, o aluno não deve mais nada.
const mesesDecorridos = 12;

// Soma das parcelas já pagas pelo aluno nos meses anteriores (em centavos). Se for igual a 18 mil reais, o aluno não deve pagar mais nada, pois já quitou a dívida.
const totalJaPagoPeloAluno = 1000000;

const valorTotalCurso = 1800000;

const valorParcela = Math.ceil(rendaMensalEmCentavos * 0.18);

if (mesesDecorridos >= 60 || totalJaPagoPeloAluno >= valorTotalCurso) {
    console.log("O valor da parcela desse mês é R$ 0 reais.");
    console.log("Você não precisa pagar mais nada, pois já quitou a dívida ou o contrato ultrapassou 60 meses.");
} else {
    console.log(`O valor da parcela desse mês é R$ ${(valorParcela / 100).toFixed(2)} reais.`);
}