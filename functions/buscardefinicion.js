const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');
const natural = require('natural');

const wordnet = new natural.WordNet();

async function buscarDefinicion() {
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

        // Resultados tras haber obtenido su selecciòn contextual gramatical 
        const def = results[seleccion];

        // se renderiza "def" como los resultados de la busqueda
        const salida = `
            Palabra: ${chalk.bold(palabra)}
T           ipo: ${chalk.cyan(def.pos)}
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



