const ArgumentError = require('../../errors/argumentError')
const Environment = require('../../environment')

const environment = new Environment(process.env)

function validate(euro) {
    if (euro < 0) {
        throw new ArgumentError('input argument cannot be a negative number')
    }

    if (euro >= environment.maxAllowedEuro) {
        throw new ArgumentError(`input argument cannot be greater than ${environment.maxAllowedEuro} Euro`)
    }
}

module.exports = {
    validate
}
