const carros = require('../data/carros')

const listCar = (request, response) => response.json(carros);

const addCar = (request, response) => {
    const { modelo, marca, ano, placa } = request.body;
    const newCar = { id: carros.length + 1, modelo, marca, ano, placa }

    //validando se o marca e o modelo estão na requisição
    if (!modelo) return response.status(400).json({ mensagem: "O modelo é obrigatório!" });
    if (!marca) return response.status(400).json({ mensagem: "O marca é obrigatório!" });

    //validação numérica para o numero da placa
    if (typeof placa !== 'number') return response.status(400).json({ mensagem: 'O valor do parâmetro da placa é inválido.' });

    //validação para os textos da requisição
    const textValidation = typeof modelo !== 'string' || typeof marca !== 'string' || typeof ano !== 'string';
    if (textValidation) return response.status(400).json({ mensagem: 'Campos de texto inválidos.' });

    //validando se o livro ja existe
    let car = carros.find(currentCar => currentCar.modelo === modelo);
    if (car) response.json({ mensagem: "O carro já existe!" });

    else {
        carros.push(newCar);
        response.status(201).send();
    }
}

const changeCar = (request, response) => {
    const { modelo, marca, ano, placa } = request.body;
    const id = parseInt(request.params.id);

    if (!modelo) return response.status(400).json({ mensagem: "O modelo é obrigatório!" });
    if (!marca) return response.status(400).json({ mensagem: "O marca é obrigatório!" });

    const index = carros.findIndex(currentCar => currentCar.id === id);

    if (index !== -1) {
        // Se encontrarmos um carro com o ID, substitua-o pelos novos valores
        carros[index] = { id, modelo, marca, ano, placa };
        response.status(200).json({ mensagem: "Carro modificado." });
    }
    else
        // Se não encontrarmos um carro com o ID, retorne uma mensagem de erro     
        response.status(404).json({ mensagem: "Não existe carro a ser substituído para o ID informado." });
}

const updateCar = (request, response) => {
    const { modelo, marca, ano, placa } = request.body;
    const id = parseInt(request.params.id);

    const index = carros.findIndex(currentBook => currentBook.id === id);
    if (index !== -1) {
        // Se encontrarmos um carro com o ID, atualize as propriedades conforme necessário
        if (modelo !== undefined) carros[index].modelo = modelo;
        if (marca !== undefined) carros[index].marca = marca;
        if (ano !== undefined) carros[index].ano = ano;
        if (placa !== undefined) carros[index].placa = placa;

        response.status(200).json({ mensagem: "Carro atualizado." });
    }
    else
        // Se não encontrarmos um carro com o ID, retorne uma mensagem de erro
        response.status(404).json({ mensagem: "Não existe carro a ser alterado para o ID informado." });
}


const deleteCar = (request, response) => {
    const id = parseInt(request.params.id);

    let car = carros.findIndex(currentCar => currentCar.id === id);
    if (car !== -1) {
        carros.splice(car, 1);
        response.json({ mensagem: "Carro removido." });
    }
    else response.json({ mensagem: "Não existe carro a ser removido para o ID informado." });
}

module.exports = {
    listCar,
    addCar,
    changeCar,
    updateCar,
    deleteCar
}