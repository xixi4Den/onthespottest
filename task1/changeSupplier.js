const times = require('lodash/times')

const MAX_ALLOWED_EURO = process.env.MAX_ALLOWED_EURO || 500 // 500 is max Euro banknote
const EURO_TO_COINS_COEFFICIENT = 100

const coinDenominations = [
    { value: 100 },
    { value: 50 },
    { value: 20 },
    { value: 10 },
    { value: 5 },
    { value: 2 },
    { value: 1 }
]

function validate(euro) {
    if (euro < 0) {
        throw new Error('input argument cannot be a negative number')
    }

    if (euro >= MAX_ALLOWED_EURO) {
        throw new Error(`input argument cannot be greater than ${MAX_ALLOWED_EURO} Euro`)
    }
}

function convertToCoins(euro) {
    return (euro.toFixed(2) * EURO_TO_COINS_COEFFICIENT).toFixed()
}

function getOptimalDistribution(amount, denominations) {
    let remainingCoins = amount

    const distribution = new Map()
    for (const denomination of denominations) {
        if (remainingCoins >= denomination.value) {
            const optimalQuotient = Math.floor(remainingCoins / denomination.value)
            const quotient = Number.isInteger(denomination.count)
                ? Math.min(optimalQuotient, denomination.count)
                : optimalQuotient
            distribution.set(denomination.value, quotient)
            remainingCoins -= denomination.value * quotient
        }
    }

    if (remainingCoins > 0) {
        throw Error('insufficient coinage')
    }

    return distribution
}

function getCoins(coinsDistribution) {
    const res = []
    coinsDistribution.forEach((count, denomination) => {
        times(count, () => res.push({ denomination }))
    })

    return res
}

function getOptimalChangeFor(euro) {
    validate(euro)

    const coinsAmount = convertToCoins(euro)
    if (coinsAmount === 0) {
        return []
    }

    const distribution = getOptimalDistribution(coinsAmount, coinDenominations)
    return getCoins(distribution)
}

module.exports = {
    validate,
    convertToCoins,
    getOptimalDistribution,
    getOptimalChangeFor
}
