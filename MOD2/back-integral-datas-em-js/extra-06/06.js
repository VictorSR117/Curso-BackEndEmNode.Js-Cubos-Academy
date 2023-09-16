const checkAuthorizationPromotion = (dateHomePromotion, dateRequestCustomer) => {
    // Verifica se a data de solicitação do cliente é posterior à data de início da promoção
    if (dateRequestCustomer >= dateHomePromotion) {
        // Calcula a diferença em milissegundos entre as duas datas
        const differenceInMilliseconds = dateRequestCustomer - dateHomePromotion;

        // Converte a diferença para horas
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

        // Verifica se a diferença em horas é menor ou igual a 24
        if (differenceInHours <= 24) return true; // O cliente está autorizado a usufruir da promoção
    }
    return false; // A promoção não está autorizada
}

// Exemplo de uso da função
const dateHomePromotion = new Date(2023, 8, 15, 12); // Data de início da promoção
const dateRequestCustomer = new Date(2023, 8, 16, 12); // Data em que o cliente solicitou a promoção

const authorized = checkAuthorizationPromotion(dateHomePromotion, dateRequestCustomer);
authorized ? console.log("O cliente está autorizado a usufruir da promoção.") : console.log("A promoção não está autorizada.");