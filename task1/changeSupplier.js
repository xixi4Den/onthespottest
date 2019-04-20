const times = require('lodash/times')

const MAX_ALLOWED_EURO = process.env.MAX_ALLOWED_EURO || 500 // 500 is max Euro banknote

const coinDenominations = [100, 50, 20, 10, 5, 2, 1]

function validate(euro) {
    if (euro < 0) {
        throw new Error('input argument cannot be a negative number')
    }

    if (euro >= MAX_ALLOWED_EURO) {
        throw new Error(`input argument cannot be greater than ${MAX_ALLOWED_EURO} Euro`)
    }
}

function getOptimalChangeFor(euro) {
    validate(euro)

    const res = []

    let remainingCoins = Math.floor(euro * 100)
    if (remainingCoins === 0) {
        return []
    }

    for (const denomination of coinDenominations) {
        if (remainingCoins >= denomination) {
            const quotient = Math.floor(remainingCoins / denomination)
            times(quotient, () => res.push({ denomination }))
            remainingCoins -= denomination * quotient
        }
    }

    return res
}

module.exports = {
    getOptimalChangeFor
}
