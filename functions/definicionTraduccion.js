// se importa la libreria "inquirer"
const inquirer = require('inquirer');

// Se importa la libreria "chalk"
const chalk = require('chalk');

// Se importa la libreria "boxen"
const boxen = require('boxen');

// Se importa la libreria "natural"
const natural = require('natural');

// Se importa la libreria "translate"
const { default: translate } = require('translate');

// Se importa la libreria "WordNet"
const wordnet = new natural.WordNet();

// Motor en el que se desarrolla la busqueda del termino
translate.engine = 'google';
translate.key = null;

// Funcion para realizar la traduccion
async function definicionTraduccion() {
    
    // bloque "try" 
    try {

        // Se captura la palabra del usuario
        const { palabra } = await inquirer.prompt([
            {
                // Entrada
                type: 'input',
                name: 'palabra',
                message: 'Escribe la palabra que quieres definir (en inglés):'
            }
        ]);

        // Se consultan los resultados
        const definiciones = await new Promise((resolve, reject) => {
            wordnet.lookup(palabra, (results) => {

                // Si no hay resultados
                if (results.length === 0) {
                    reject(new Error('No se encontraron definiciones.'));
                } else {
                    resolve(results);
                }
            });
        });

        // Se crea un prompt para elegir la definicion
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

        // Se crea un prompt para elegir el idioma de destino
        const { idioma } = await inquirer.prompt([
            {
                type: 'list',
                name: 'idioma',
                message: 'Selecciona el idioma de destino:',
                // Lenguajes
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

        // Se renderiza la salida por consola
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

    } 
    
    // En caso de error
    catch (error) {
        console.log(chalk.red('Error: ' + error.message));
    }
}

module.exports = definicionTraduccion;

