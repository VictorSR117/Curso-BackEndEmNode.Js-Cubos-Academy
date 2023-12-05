const requestsByAxios = require('../api/axios');
const fs = require('fs/promises');

const listCompany = async (req, res) => {
    const { dominioEmpresa } = req.query;

    if (!dominioEmpresa) return res.status(400).json({ mensagem: "informe o dominio da empresa" })

    try {
        const { data: company } = await requestsByAxios.get(`/?domain=${dominioEmpresa}`);

        if (company && company.name) {
            const companyData = JSON.parse(await fs.readFile('empresas.json'));

            let repeatCompany = companyData.find(element => element.domain === company.domain);

            if (repeatCompany) return res.json(company);
            else {
                companyData.push(company);
                await fs.writeFile('empresas.json', JSON.stringify(companyData, null, 2));
                return res.json(company);
            }
        }
    }
    catch (error) {
        if (error.response) {
            let textError = error.message.slice(32);
            let code = parseInt(textError)
            res.status(code).json({ mensagem: error.response.data.error.message })
        }
        console.error(error.message);
        return res.status(500).json({ message: "Erro interno do Servidor." });
    }
}

module.exports = listCompany;