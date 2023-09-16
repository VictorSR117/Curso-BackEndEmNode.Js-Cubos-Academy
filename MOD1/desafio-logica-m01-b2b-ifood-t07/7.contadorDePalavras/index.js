function solucao(texto) {
    texto.length > 5000 ? console.log("texto muito grande") : console.log(texto.trim().split(" ").length); //let words = texto.trim().split(" ")
}

solucao("asdasd asdasdqçwlke  adsadasdasd   ")