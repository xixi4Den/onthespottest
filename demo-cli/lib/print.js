/* eslint-disable no-console */

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

function printGreetings() {
    clear()

    console.log(
        chalk.red(
            figlet.textSync('OnTheSpotDev', { horizontalLayout: 'full' })
        )
    )
    console.log(
        chalk.green(
            figlet.textSync('Test Task', { horizontalLayout: 'default' })
        )
    )
}

function printCoins(coins) {
    const denominations = coins.map(x => x.denomination).join(', ')
    console.log(
        chalk.green.bold(`Result - [ ${denominations} ]`)
    )
}

function printInventory(inventory) {
    console.log(chalk.grey.bold('Inventory:'))
    for (const denomination of inventory.denominations) {
        console.log(
            chalk.grey.bold(`${denomination.value} - ${denomination.count}`)
        )
    }
}

function printError(message) {
    console.log(chalk.red.bold(message))
}

module.exports = {
    printGreetings,
    printCoins,
    printInventory,
    printError
}
