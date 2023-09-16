const nomes = ['Juninho', 'Vidal', 'Guido', 'Dani', 'Ruli', 'Diego'];
const tamanhoDoGrupo = 4;

separetNamesInGroups = (nomes, tamanhoDoGrupo) => {
    let numGrupos = Math.ceil(nomes.length / tamanhoDoGrupo);

    for (let index = 0; index < numGrupos; index++) {
        let startIndex = index * tamanhoDoGrupo;
        let endIndex = startIndex + tamanhoDoGrupo;
        let grupo = nomes.slice(startIndex, endIndex);

        console.log(`Grupo ${index + 1}: ${grupo.join(', ')}.`);
    }
}

separetNamesInGroups(nomes, tamanhoDoGrupo);