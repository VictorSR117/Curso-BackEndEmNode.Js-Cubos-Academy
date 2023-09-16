const format = require('date-fns/format')

const isOpen = (timeTheCustomerArrived) => {
    const openingHours = new Date(timeTheCustomerArrived);
    openingHours.setUTCHours(8, 0, 0, 0); // 8h00 UTC

    const closingTime = new Date(timeTheCustomerArrived);
    closingTime.setUTCHours(18, 0, 0, 0); // 18h00 UTC

    var hourOfChekin = format(timeTheCustomerArrived, 'k');
    let dayOfWeek = format(timeTheCustomerArrived, 'iiii');
    switch (dayOfWeek) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
            break;

        case "Saturday":
        case "Sunday":
            return false;
        default:
            return "Erro, dia inválido";
    }

    // Verifiqua se a hora da chegada do cliente está entre o horário de abertura e fechamento
    console.log(hourOfChekin);
    return hourOfChekin >= openingHours && hourOfChekin <= closingTime;
}

console.log(isOpen(new Date(2021, 3, 26, 7, 59)));