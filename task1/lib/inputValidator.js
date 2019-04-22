const ArgumentError = require('../../errors/argumentError')
const Environment = require('../../environment')

const environment = new Environment(process.env)

/**
 * Validate input value.
 * Checks min and max limits.
 * Min limit is 0. Max limit is configurable, by default 500.
 * @param {Number} euro
 * @throws {ArgumentError}
 */
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
