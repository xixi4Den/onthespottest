const requireDir = require('require-dir')

const { printGreetings, printError } = require('./lib/print')
const dialog = require('./lib/dialog')

const commands = requireDir('./commands')

async function run() {
    printGreetings()

    const taskAnswer = await dialog.chooseTask()

    const command = commands[taskAnswer.task]
    if (!command) {
        printError('task does not exist')
    }
    await command.init()
    await command.run()
}

module.exports = {
    run
}
