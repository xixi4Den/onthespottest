const Environment = require('../../environment')
const Inventory = require('../../task2/inventory')
const ChangeSupplier = require('../../task2/changeSupplier')
const dialog = require('../lib/dialog')
const { printCoins, printError, printInventory } = require('../lib/print')

let inventory
let changeSupplier

const init = async () => {
    const environment = new Environment(process.env)
    const defaultInventoryConfig = environment.inventoryConfig

    const configAnswer = await dialog.requestInventoryConfig(defaultInventoryConfig)
    const inventorySeed = Object.keys(configAnswer).map(value =>
        ({ value: Number.parseInt(value, 10), count: configAnswer[value] }))

    inventory = new Inventory(inventorySeed)
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
