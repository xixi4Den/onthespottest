const changeSupplier = require('../../task1/changeSupplier')
const dialog = require('../lib/dialog')
const { printCoins, printError } = require('../lib/print')

const init = () => {}

const run = async () => {
    const input = await dialog.requestInput()
    try {
        const change = changeSupplier.getOptimalChangeFor(input.euro)
        printCoins(change)
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
