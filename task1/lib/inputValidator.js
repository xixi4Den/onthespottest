const ArgumentError = require('../../errors/argumentError')

const MAX_ALLOWED_EURO = process.env.MAX_ALLOWED_EURO || 500 // 500 is max Euro banknote

function validate(euro) {
    if (euro < 0) {
        throw new ArgumentError('input argument cannot be a negative number')
    }

    if (euro >= MAX_ALLOWED_EURO) {
        throw new ArgumentError(`input argument cannot be greater than ${MAX_ALLOWED_EURO} Euro`)
    }
}

module.exports = {
    validate
}
