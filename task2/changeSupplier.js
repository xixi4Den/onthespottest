const flatten = require('lodash/flatten')

const {
    validate,
    convertToCoins,
    getOptimalDistribution,
} = require('../task1/changeSupplier')

class ChangeSupplier {
    constructor(inventory) {
        this.inventory = inventory
    }

    validateInventoryTotal(requestedAmount) {
        const availableTotal = this.inventory.getAvailableTotal()
        if (availableTotal < requestedAmount) {
            throw new Error('not enough coins to provide change')
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

        return flatten(Array.from(distribution, ([denomination, count]) =>
            this.inventory.provide(denomination, count)))
    }
}

module.exports = ChangeSupplier
