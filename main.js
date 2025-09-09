const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

const buscarDefinicion = require('./functions/buscardefinicion');

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

    switch (opciones.accion) {
        case 'Buscar definición':
            await buscarDefinicion();
            break;
        case 'Traducir texto':
            console.log(chalk.yellow('Aquí va la traducción...'));
            break;
        case 'Definición + Traducción':
            console.log(chalk.yellow('Aquí va la definición con traducción...'));
            break;
        case 'Salir':
            console.log(chalk.blue('¡Hasta pronto!'));
            process.exit(0);
    }
}

async function main() {
    mostrarBienvenida();
    await menuPrincipal();
}

main();


