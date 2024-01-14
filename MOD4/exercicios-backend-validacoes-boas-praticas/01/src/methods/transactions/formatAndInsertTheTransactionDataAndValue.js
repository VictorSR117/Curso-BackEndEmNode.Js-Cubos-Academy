const { format } = require('date-fns');

const formatTheDataAndvaluesAndInsertInArray = array => {
    let formattedTransaction = [];

    array.forEach(element => {
        formattedTransaction.push({
            ...element,
            data: format(element.data, "dd/MM/yyyy"),
            valor: parseFloat((Math.ceil(element.valor / 100 * 100) / 100).toFixed(2))
        });
    });

    return formattedTransaction;
}

module.exports = formatTheDataAndvaluesAndInsertInArray;