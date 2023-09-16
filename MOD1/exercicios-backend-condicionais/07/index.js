const aposentada = false;
const portadoraDeDoenca = false;
const totalDeRendimentos = 3000000; //emCentavos
const tetoRendimentos = 2855970;

if (portadoraDeDoenca || aposentada) console.log("ISENTA");
else if (totalDeRendimentos < tetoRendimentos) console.log("VAZA LADRÃO! JA TA DIFICIL SEM VOCE");
else console.log("PEGA LADRÃO");