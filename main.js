// se importa la libreria "inquirer"
const inquirer = require('inquirer');

// Se importa la libreria "chalk"
const chalk = require('chalk');

// Se importa la libreria "boxen"
const boxen = require('boxen');

// Se importan las funciones de los archivos JS en la carpeta "functions"
const buscarDefinicion = require('./functions/buscardefinicion');
const traducir = require('./functions/translate');
const definicionTraduccion = require('./functions/definicionTraduccion');

// Se crea la función para mostrar el menú
function mostrarBienvenida() {

    // Presentación
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

// Función para pausar la ejecución
async function pausar() {

    // Se crea un prompt
    await inquirer.prompt([
        {
            // tipo de entrada
            type: 'input',
            name: 'continuar',
            message: 'Presiona ENTER para volver al menú...'
        }
    ]);
}

// Funciones del menú (elecciones)
async function menuPrincipal() {

    // Para evitar salidas inesperadas se crea la variable en "false"
    let salir = false;

    // Para mantener la ejecución 
    while (!salir) {

        // Se crea un prompt
        const opciones = await inquirer.prompt([
            {
                // lista de opciones
                type: 'list',
                name: 'accion',
                message: '¿Qué deseas hacer?',

                // opciones a elegir
                choices: [
                    'Buscar definición',
                    'Traducir texto',
                    'Definición + Traducción',
                    'Salir'
                ]
            }
        ]);

        // Elección de las opciones en el menú
        switch (opciones.accion) {

            // Opción de buscar definición
            case 'Buscar definición':
                await buscarDefinicion();
                await pausar();
                break;
            // Opción de traducir texto
            case 'Traducir texto':
                await traducir();
                await pausar();
                break;
            // Opción de definir con traducción
            case 'Definición + Traducción':
                await definicionTraduccion();
                await pausar();
                break;
            // Opción de salir
            case 'Salir':
                console.log(chalk.blue('¡Hasta pronto! 👋'));
                salir = true;
                break;
        }
    }
}

// Por defecto se ejecuta la función "mostrarBienvenida"
async function main() {
    mostrarBienvenida();
    await menuPrincipal();
}

main();




