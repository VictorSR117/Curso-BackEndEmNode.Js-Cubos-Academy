const fs = require('fs/promises');
const handlebars = require('handlebars');

const htmlCompiler = async (file, context) => {
    const html = await fs.readFile(file);
    const compiler = handlebars.compile(html.toString());
    return compiler(context);
}

module.exports = htmlCompiler;