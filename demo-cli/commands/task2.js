const Inventory = require('../../task2/inventory')
const ChangeSupplier = require('../../task2/changeSupplier')
const dialog = require('../lib/dialog')
const { printCoins, printError, printInventory } = require('../lib/print')

let inventory
let changeSupplier

const init = () => {
    inventory = new Inventory([
        { value: 100, count: 11 },
        { value: 50, count: 24 },
        { value: 20, count: 0 },
        { value: 10, count: 99 },
        { value: 5, count: 200 },
        { value: 2, count: 11 },
        { value: 1, count: 23 }
    ])
    changeSupplier = new ChangeSupplier(inventory)
}

const run = async () => {
    const input = await dialog.requestInput()
    try {
        const change = changeSupplier.getChangeFor(input.euro)
        printCoins(change)
        printInventory(inventory)
    } catch (e) {
        printError(e.message)
    }

    const whatNext = await dialog.shouldContinue()
    if (whatNext.continue) {
        await run()
    }
}

module.exports = {
    init,
    run
}
