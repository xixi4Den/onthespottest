const { validate } = require('../task1/lib/inputValidator')
const { convertToCoins } = require('../task1/lib/converter')
const { getOptimalDistribution, iterate } = require('../task1/lib/distributionGenerator')
const NotEnoughCoinsError = require('../errors/notEnoughCoinsError')

class ChangeSupplier {
    constructor(inventory) {
        this.inventory = inventory
    }

    validateInventoryTotal(requestedAmount) {
        const availableTotal = this.inventory.getAvailableTotal()
        if (availableTotal < requestedAmount) {
            throw new NotEnoughCoinsError('not enough coins to provide change')
        }
    }

    getChangeFor(euro) {
        validate(euro)

        const coinsAmount = convertToCoins(euro)
        if (coinsAmount === 0) {
            return []
        }

        this.validateInventoryTotal(coinsAmount)
        const availableDenominations = this.inventory.getAvailableDenominations()
        const distribution = getOptimalDistribution(coinsAmount, availableDenominations)

        return iterate(distribution, (denomination, count) =>
            this.inventory.provide(denomination, count))
    }
}

module.exports = ChangeSupplier
