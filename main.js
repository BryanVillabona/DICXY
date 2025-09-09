const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

const buscarDefinicion = require('./functions/buscardefinicion');
const traducir = require('./functions/translate');
const definicionTraduccion = require('./functions/definicionTraduccion');

function mostrarBienvenida() {
    const bienvenida = chalk.bold.green('Bienvenido a DICXY - Diccionario/traductor en una sola app');
    console.log(
        boxen(bienvenida, {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'red'
        })
    );
}

async function pausar() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'continuar',
            message: 'Presiona ENTER para volver al menú...'
        }
    ]);
}

async function menuPrincipal() {
    let salir = false;

    while (!salir) {
        const opciones = await inquirer.prompt([
            {
                type: 'list',
                name: 'accion',
                message: '¿Qué deseas hacer?',
                choices: [
                    'Buscar definición',
                    'Traducir texto',
                    'Definición + Traducción',
                    'Salir'
                ]
            }
        ]);

        switch (opciones.accion) {
            case 'Buscar definición':
                await buscarDefinicion();
                await pausar();
                break;
            case 'Traducir texto':
                await traducir();
                await pausar();
                break;
            case 'Definición + Traducción':
                await definicionTraduccion();
                await pausar();
                break;
            case 'Salir':
                console.log(chalk.blue('¡Hasta pronto! 👋'));
                salir = true;
                break;
        }
    }
}

async function main() {
    mostrarBienvenida();
    await menuPrincipal();
}

main();




