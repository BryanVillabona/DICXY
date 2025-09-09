const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const natural = require('natural');
const { default: translate } = require('translate');

const wordnet = new natural.WordNet();

translate.engine = 'google';
translate.key = null;

async function definicionTraduccion() {
    try {
        const { palabra } = await inquirer.prompt([
            {
                type: 'input',
                name: 'palabra',
                message: 'Escribe la palabra que quieres definir (en inglés):'
            }
        ]);

        const definiciones = await new Promise((resolve, reject) => {
            wordnet.lookup(palabra, (results) => {
                if (results.length === 0) {
                    reject(new Error('No se encontraron definiciones.'));
                } else {
                    resolve(results);
                }
            });
        });

        const { seleccion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'seleccion',
                message: `Se encontraron ${definiciones.length} definiciones. Escoge una:`,
                choices: definiciones.map((def, i) => ({
                    name: `${i + 1}. (${def.pos}) ${def.gloss}`,
                    value: def
                }))
            }
        ]);

        const { idioma } = await inquirer.prompt([
            {
                type: 'list',
                name: 'idioma',
                message: 'Selecciona el idioma de destino:',
                choices: [
                    { name: 'Español (es)', value: 'es' },
                    { name: 'Francés (fr)', value: 'fr' },
                    { name: 'Alemán (de)', value: 'de' },
                    { name: 'Italiano (it)', value: 'it' },
                    { name: 'Portugués (pt)', value: 'pt' }
                ]
            }
        ]);

        const traduccion = await translate(seleccion.gloss, { from: 'en', to: idioma });

        const salida = `
📖 Palabra: ${chalk.bold(palabra)}
🔎 Definición: ${chalk.yellow(seleccion.gloss)}
➡️  Traducción (${chalk.cyan(idioma)}): ${chalk.green(traduccion)}
        `;

        console.log(
            boxen(salida, {
                padding: 1,
                borderColor: 'magenta',
                margin: 1,
                title: 'Definición + Traducción'
            })
        );

    } catch (error) {
        console.log(chalk.red('Error: ' + error.message));
    }
}

module.exports = definicionTraduccion;

