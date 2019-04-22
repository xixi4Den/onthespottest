const flatten = require('lodash/flatten')

const NotEnoughCoinsError = require('../../errors/notEnoughCoinsError')

/**
 * Get optimal coin distribution for specified amount based on available coins denomination.
 * Optimal distribution means the least number of result coins.
 * @param {Number} amount amount in cents
 * @param {Array} denominations available coin denominations
 * @returns {Map}
 * @throws {NotEnoughCoinsError} if available denominations cannot fully cover requested amount
 */
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
        throw new NotEnoughCoinsError('insufficient coinage')
    }

    return distribution
}

/**
 * Iterate distribution and return flat list of results.
 */
function iterate(distribution, fn) {
    return flatten(Array.from(distribution, ([denomination, count]) =>
        fn(denomination, count)))
}


module.exports = {
    getOptimalDistribution,
    iterate
}
