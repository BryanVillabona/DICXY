// se importa la libreria "inquirer"
const inquirer = require('inquirer');

// Se importa la libreria "chalk"
const chalk = require('chalk');

// Se importa la libreria "boxen"
const boxen = require('boxen');

// Se importa la libreria "natural"
const natural = require('natural');

// Se importa la libreria "wordNet"
const wordnet = new natural.WordNet();

// Se crea una async function para buscar la definición 
async function buscarDefinicion() {

    // Se crea el prompt para obtener la palabra
    const { palabra } = await inquirer.prompt([
        {
            // tipo de entrada
            type: 'input',
            name: 'palabra',
            message: 'Escribe la palabra que quieres definir (en inglés):'
        }
    ]);

    // Se obtienen los resultados
    wordnet.lookup(palabra, async (results) => {

        // Si no se encontraron resultados se devuelve la función
        if (!results || results.length === 0) {
            console.log(chalk.red(`No se encontró definición para "${palabra}"`));
            return;
        }

        // Se mapean las opciones para las clases gramaticales
        const opciones = results.map((r, i) => ({
            name: `${i + 1}. (${r.pos}) ${r.def}`,
            value: i
        }));

        // Se crea un prompt para la selección de clase gramatical
        const { seleccion } = await inquirer.prompt([
            {
                // Lista de opciones
                type: 'list',
                name: 'seleccion',
                message: `Se encontraron ${results.length} definiciones. Escoge una:`,
                choices: opciones
            }
        ]);

        // Resultados tras haber obtenido su selecciòn contextual gramatical 
        const def = results[seleccion];

        // se renderiza "def" como los resultados de la busqueda
        const salida = `
            Palabra: ${chalk.bold(palabra)}
            Tipo: ${chalk.cyan(def.pos)}
            Definición: ${chalk.green(def.def)}
            Ejemplo: ${chalk.yellow(def.expamples?.join('; ') || 'No disponible')}
            `;

        console.log(
            boxen(salida, {
                padding: 1,
                borderColor: 'green',
                margin: 1,
                title: 'Definición seleccionada'
            })
        );
    });
}

module.exports = buscarDefinicion;



