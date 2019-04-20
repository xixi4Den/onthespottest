const range = require('lodash/range')

const { validate } = require('./lib/inputValidator')
const { convertToCoins } = require('./lib/converter')
const { getOptimalDistribution, iterate } = require('./lib/distributionGenerator')

const coinDenominations = [
    { value: 100 },
    { value: 50 },
    { value: 20 },
    { value: 10 },
    { value: 5 },
    { value: 2 },
    { value: 1 }
]

function getOptimalChangeFor(euro) {
    validate(euro)

    const coinsAmount = convertToCoins(euro)
    if (coinsAmount === 0) {
        return []
    }

    const distribution = getOptimalDistribution(coinsAmount, coinDenominations)

    return iterate(distribution, (denomination, count) =>
        range(count).map(() => ({ denomination })))
}

module.exports = {
    getOptimalChangeFor
}
