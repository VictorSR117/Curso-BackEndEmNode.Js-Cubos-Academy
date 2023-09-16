const { buscarEndereco } = require('utils-playground');
const fs = require('fs/promises');

const fullAdress = async (request, response) => {
    const zipCode = request.params.cep;

    //validação para saber se o CEP foi passado
    if (!zipCode) return response.status(400).json({ message: "O CEP é obrigatório." });

    try {
        // Carrega os endereços do arquivo enderecos.json, se existir.
        let adresses = [];

        try {
            const data = await fs.readFile('./src/enderecos.json');
            adresses = JSON.parse(data);
        }
        catch (error) {
            // Se o arquivo não existe ou está vazio, continua com a lista vazia.
            console.error(`erro: ${error}`);
        }

        // Verifica se o endereço já está na lista.
        const existingAddress = adresses.find(adress => {
            const zipCodeFormated = adress.cep.replace(/\D/g, '');
            return zipCodeFormated === zipCode;
        });

        //se o endereço existe ele será mostrado
        if (existingAddress) response.status(200).json(existingAddress);

        else {
            // Se o endereço não está na lista, busca na função buscarEndereco.
            const newAdress = await buscarEndereco(zipCode);

            if (newAdress) {
                // Adiciona o novo endereço à lista e escreve no arquivo.
                adresses.push(newAdress);
                await fs.writeFile('./src/enderecos.json', JSON.stringify(adresses));

                response.status(200).json(newAdress);
            }
            else response.status(404).json({ message: "CEP não encontrado." });
        }
    }
    catch (error) {
        response.status(500).json({ message: "Ocorreu um erro ao processar a requisição." });
    }
};

module.exports = { fullAdress };