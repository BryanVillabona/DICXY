// se importa la libreria "inquirer"
const inquirer = require('inquirer');

// Se importa la libreria "chalk"
const chalk = require('chalk');

// Se importa la libreria "boxen"
const boxen = require('boxen');

// Se importa la libreria "translate"
const { default: translate } = require('translate');

// Motor de busqueda en el que se hace la traducción
translate.engine = 'google';
translate.key = null;

// Se crea una función para manejar la traducción
async function traducir() {

    // Se crea el prompt para elegir el idioma de origen
    const { texto, origen, idioma } = await inquirer.prompt([
        {

            // Entrada
            type: 'input',
            name: 'texto',
            message: 'Escribe el texto que quieres traducir:'
        },
        {

            // Tipo de prompt
            type: 'list',
            name: 'origen',
            message: 'Selecciona el idioma de origen:',

            // Opciones
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

            // Tipo de prompt
            type: 'list',
            name: 'idioma',
            message: 'Selecciona el idioma de destino:',

            // Opciones
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

    // Con bloque "try/catch" se manejan los resultados
    try {

        // Se realiza la traducción
        const traduccion = await translate(texto, { from: origen, to: idioma });

        // Se renderiza la salida
        const salida = `
        Texto original: ${chalk.bold(texto)} (${origen})
        Traducción (${chalk.cyan(idioma)}): ${chalk.green(traduccion)}
        `;

        // Se diseña la "box" en la que irá la traduccón        
        console.log(
            boxen(salida, {
                padding: 1,
                borderColor: 'blue',
                margin: 1,
                title: 'Traducción'
            })
        );
    } 
    
    // En casi de error
    catch (error) {
        console.log(chalk.red('❌ Error al traducir: ' + error.message));
    }
}

module.exports = traducir;







