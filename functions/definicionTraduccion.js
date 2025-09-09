const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const natural = require('natural');
const { default: translate } = require('translate');

const wordnet = new natural.WordNet();

translate.engine = 'google';
translate.key = null;

async function definicionTraduccion() {
    const { palabra } = await inquirer.prompt([
        {
            type: 'input',
            name: 'palabra',
            message: 'Escribe la palabra que quieres definir (en inglés):'
        }
    ]);

    wordnet.lookup(palabra, async (results) => {
        if (!results || results.length === 0) {
            console.log(chalk.red(`No se encontró definición para "${palabra}"`));
            return;
        }

        const opciones = results.map((r, i) => ({
            name: `${i + 1}. (${r.pos}) ${r.def}`,
            value: i
        }));

        const { seleccion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'seleccion',
                message: `Se encontraron ${results.length} definiciones. Escoge una:`,
                choices: opciones
            }
        ]);

        const def = results[seleccion];

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

        try {
            const traduccion = await translate(def.def, { from: 'en', to: idioma });

            const salida = `
📌 Palabra: ${chalk.bold(palabra)}
📖 Tipo: ${chalk.cyan(def.pos)}
📝 Definición: ${chalk.green(def.def)}
➡️ Traducción (${chalk.cyan(idioma)}): ${chalk.yellow(traduccion)}
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
            console.log(chalk.red('Error al traducir la definición: ' + error.message));
        }
    });
}

module.exports = definicionTraduccion;
