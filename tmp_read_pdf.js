const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Modelos de CV de como a IA deve criar/modelo de CV de referencia para o modelo gratuito.pdf');

// Dependendo da versão, pdf.default pode ser a função real
const parseFunc = typeof pdf === 'function' ? pdf : pdf.default;

parseFunc(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(console.error);
