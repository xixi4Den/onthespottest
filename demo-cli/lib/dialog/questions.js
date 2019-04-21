module.exports = {
    task: [
        {
            type: 'list',
            message: 'Select task',
            name: 'task',
            choices: [
                {
                    name: 'task1'
                },
                {
                    name: 'task2'
                }
            ],
            validate: (answer) => {
                if (answer.length < 1) {
                    return 'You must choose at least one topping.'
                }
                return true
            }
        }
    ],
    input: [
        {
            type: 'number',
            name: 'euro',
            message: 'Provide change for (Euro): ',
            validate: (answer) => {
                if (Number.isNaN(answer)) {
                    return 'You must specify a number'
                }
                return true
            }
        }
    ],
    continue: [
        {
            type: 'confirm',
            name: 'continue',
            message: 'Would you like to continue?'
        }
    ],
}
