const isOpen = (timeTheCustomerArrived) => {
    const openingHours = new Date(timeTheCustomerArrived);
    openingHours.setUTCHours(8, 0, 0, 0); // 8h00 UTC

    const closingTime = new Date(timeTheCustomerArrived);
    closingTime.setUTCHours(18, 0, 0, 0); // 18h00 UTC

    // Verifiqua se a hora da chegada do cliente está entre o horário de abertura e fechamento
    return timeTheCustomerArrived >= openingHours && timeTheCustomerArrived < closingTime;
}

console.log(isOpen(new Date(2015, 1, 1, 2)));