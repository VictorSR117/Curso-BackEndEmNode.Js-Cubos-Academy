// function solucao(min, km) {
//     let rateMinInitial = 50;
//     let rateMInKM = 70;
//     let kmAditional;
//     let minAditional;
//     let sum;
    
//     sum = (km * rateMInKM) + (min * rateMinInitial);

//     if (km > 10) {
//         kmAditional = km - 10;
//         sum = (10 * rateMInKM) + kmAditional * 50
//     }
//     if (min > 20) {
//         minAditional = min - 20;
//         sum = (20 * rateMInKM) + minAditional * 30
//     }
//     console.log(sum);
// }


function solucao(min, km) {
    let pricePerMinute = 50;
    let priceperKmBefor10 = 70;
    let pricePerKmAfter10 = 50;
    let pricePerMinBefor20 = 50;
    let pricePerMinAfter20 = 30;

    let priceMinutes = min * pricePerMinute;
    let priceKm = km <= 10 ? km * priceperKmBefor10 : 10 * priceperKmBefor10 + (km - 10) * pricePerKmAfter10;

    if (min > 20) {
        let extraMinutes = min - 20;
        priceMinutes -= extraMinutes * (pricePerMinBefor20 - pricePerMinAfter20);
    }
    let totalValue = priceMinutes + priceKm;

    console.log(Math.floor(totalValue));
}
solucao(25, 11.5)