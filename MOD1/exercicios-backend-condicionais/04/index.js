const ladoA = 3;
const ladoB = 3;
if (ladoA === ladoB) {
    switch (ladoA) {
        case 0:
            console.log("Bucha/Dobre de Branca")
            break;
        case 1:
            console.log("Bucha/Dobre de Ás/Piu")
            break;
        case 2:
            console.log("Bucha/Dobre de Duque")
            break;
        case 3:
            console.log("Bucha/Dobre de Terno")
            break;
        case 4:
            console.log("Bucha/Dobre de Quadra")
            break;
        case 5:
            console.log("Bucha/Dobre de Quina")
            break;
        case 6:
            console.log("Bucha/Dobre de Sena")
            break;
        default:
            console.log("Esse lado nem existe!");
            break;
    }
}
else console.log("NÃO");