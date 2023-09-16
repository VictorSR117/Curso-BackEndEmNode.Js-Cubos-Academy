const express = require('express');

const app = express();

let minutes = 0;
let seconds = 0;
let intervalId = null;

formatTime = value => { return value < 10 ? `0${value}` : `${value}` }

startTimer = () => {
    intervalId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

pauseTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
}

app.get('/', (request, response) => {
    const formattedMinutes = formatTime(minutes);
    const formattedSeconds = formatTime(seconds);
    response.send(`Tempo atual do cronômetro: ${formattedMinutes} minutos e ${formattedSeconds} segundos`);
});

app.get('/iniciar', (request, response) => {
    if (intervalId === null) {
        startTimer();
        response.send('Cronômetro iniciado!');
    }
    else response.send('O cronômetro já está em execução.');
});

app.get('/pausar', (request, response) => {
    if (intervalId !== null) {
        pauseTimer();
        response.send('Cronômetro pausado!');
    }
    else response.send('O cronômetro já está pausado.');

});

app.get('/continuar', (request, response) => {
    if (intervalId === null) {
        startTimer();
        response.send('Cronômetro continuando!');
    }
    else response.send('O cronômetro já está em execução.');

});

app.get('/zerar', (request, response) => {
    minutes = 0;
    seconds = 0;
    intervalId === null ? response.send('Cronômetro zerado!') : response.send('O cronômetro foi zerado, mas continua em execução.');

});

app.listen(8000, () => { console.log('Servidor do cronômetro online está rodando na porta 8000') });
