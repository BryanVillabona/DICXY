const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

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

async function menuPrincipal() {
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
    console.log(opciones);
}

async function main() {
    mostrarBienvenida();
    await menuPrincipal();
}

main();

