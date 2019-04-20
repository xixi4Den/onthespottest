const flatten = require('lodash/flatten')

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

function iterate(distribution, fn) {
    return flatten(Array.from(distribution, ([denomination, count]) =>
        fn(denomination, count)))
}


module.exports = {
    getOptimalDistribution,
    iterate
}
