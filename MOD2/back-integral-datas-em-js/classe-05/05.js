const format = require('date-fns/format')

const isOpen = (timeTheCustomerArrived) => {
    const openingHours = new Date(timeTheCustomerArrived);
    openingHours.setUTCHours(8, 0, 0, 0); // 8h00 UTC

    const closingTime = new Date(timeTheCustomerArrived);
    closingTime.setUTCHours(18, 0, 0, 0); // 18h00 UTC

    const closingTimeSaturday = new Date(timeTheCustomerArrived);
    closingTime.setUTCHours(12, 0, 0, 0); // 18h00 UTC

    //var hourOfChekin = format(timeTheCustomerArrived, 'k');
    let dayOfWeek = format(timeTheCustomerArrived, 'iiii');
    switch (dayOfWeek) {
        case "Monday":
        case "Tuesday":
        case "Wednesday":
        case "Thursday":
        case "Friday":
            // Verifiqua se a hora da chegada do cliente está entre o horário de abertura e fechamento
            return timeTheCustomerArrived >= openingHours && timeTheCustomerArrived <= closingTime;

        case "Saturday":
            return timeTheCustomerArrived >= openingHours && timeTheCustomerArrived <= closingTimeSaturday;

        case "Sunday":
            return false;
        default:
            return "Erro, dia inválido";
    }
}

console.log(isOpen(new Date(2021, 3, 25, 12)));
console.log(isOpen(new Date(2021, 3, 26, 12)));
console.log(isOpen(new Date(2021, 3, 26, 7, 59)));
console.log(isOpen(new Date(2021, 3, 24, 9, 30)));