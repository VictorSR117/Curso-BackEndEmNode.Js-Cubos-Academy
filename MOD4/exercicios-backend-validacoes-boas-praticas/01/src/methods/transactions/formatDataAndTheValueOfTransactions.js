const { format } = require('date-fns');
const formatDateAndValueOftransaction = array => {
    return {
        ...array,
        data: format(array.data, "dd/MM/yyyy"),
        valor: parseFloat((Math.ceil(array.valor / 100 * 100) / 100).toFixed(2))
    };
}

module.exports = formatDateAndValueOftransaction;