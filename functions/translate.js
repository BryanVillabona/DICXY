const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const { default: translate } = require('translate');

translate.engine = 'google';
translate.key = null;

async function traducir() {
    const { texto, origen, idioma } = await inquirer.prompt([
        {
            type: 'input',
            name: 'texto',
            message: 'Escribe el texto que quieres traducir:'
        },
        {
            type: 'list',
            name: 'origen',
            message: 'Selecciona el idioma de origen:',
            choices: [
                { name: 'Español (es)', value: 'es' },
                { name: 'Inglés (en)', value: 'en' },
                { name: 'Francés (fr)', value: 'fr' },
                { name: 'Alemán (de)', value: 'de' },
                { name: 'Italiano (it)', value: 'it' },
                { name: 'Portugués (pt)', value: 'pt' }
            ]
        },
        {
            type: 'list',
            name: 'idioma',
            message: 'Selecciona el idioma de destino:',
            choices: [
                { name: 'Español (es)', value: 'es' },
                { name: 'Inglés (en)', value: 'en' },
                { name: 'Francés (fr)', value: 'fr' },
                { name: 'Alemán (de)', value: 'de' },
                { name: 'Italiano (it)', value: 'it' },
                { name: 'Portugués (pt)', value: 'pt' }
            ]
        }
    ]);

    try {
        const traduccion = await translate(texto, { from: origen, to: idioma });

        const salida = `
Texto original: ${chalk.bold(texto)} (${origen})
Traducción (${chalk.cyan(idioma)}): ${chalk.green(traduccion)}
        `;

        console.log(
            boxen(salida, {
                padding: 1,
                borderColor: 'blue',
                margin: 1,
                title: 'Traducción'
            })
        );
    } catch (error) {
        console.log(chalk.red('❌ Error al traducir: ' + error.message));
    }
}

module.exports = traducir;







