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

module.exports = {
    chooseTask,
    requestInput,
    shouldContinue
}
