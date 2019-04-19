const times = require('lodash/times')

const coinDenominations = [100, 50, 20, 10, 5, 2, 1]

function getOptimalChangeFor(euro) {
    const res = []

    let remainingCoins = euro * 100
    for (const denomination of coinDenominations) {
        const quotient = Math.floor(remainingCoins / denomination)
        times(quotient, () => res.push({ denomination }))
        remainingCoins -= denomination * quotient
    }

    return res
}

module.exports = {
    getOptimalChangeFor
}