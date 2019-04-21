const inquirer = require('inquirer')

const questions = require('./questions')

function chooseTask() {
    return inquirer.prompt(questions.task)
}

function requestInput() {
    return inquirer.prompt(questions.input)
}

function shouldContinue() {
    return inquirer.prompt(questions.continue)
}

function requestInventoryConfig(defaultConfig) {
    return inquirer.prompt(questions.inventoryConfig(defaultConfig))
}

module.exports = {
    chooseTask,
    requestInput,
    shouldContinue,
    requestInventoryConfig
}
