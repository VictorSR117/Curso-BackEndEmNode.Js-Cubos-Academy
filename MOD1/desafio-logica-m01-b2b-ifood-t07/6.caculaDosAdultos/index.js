function solucao(lista) {
    let biggerOfAge = lista.filter(age => age >= 18);

    if (biggerOfAge.length > 0) {
        let ageMoreTeen = Math.min(...biggerOfAge);
        console.log(ageMoreTeen);
    } 
    else console.log("CRESCA E APARECA");
}