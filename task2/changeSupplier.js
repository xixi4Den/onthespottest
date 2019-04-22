const { validate } = require('../task1/lib/inputValidator')
const { convertToCoins } = require('../task1/lib/converter')
const { getOptimalDistribution, iterate } = require('../task1/lib/distributionGenerator')
const NotEnoughCoinsError = require('../errors/notEnoughCoinsError')

/**
 * Class representing logic for getting the change for a given number of Euro
 * based on a limited supply of coins.
 */
class ChangeSupplier {
    constructor(inventory) {
        this.inventory = inventory
    }

    /**
     * Check if inventory contains requested amount of coins.
     * It checks total amounts not taking into account available denominations.
     * @throws {NotEnoughCoinsError}
     * @private
     */
    validateInventoryTotal(requestedAmount) {
        const availableTotal = this.inventory.getAvailableTotal()
        if (availableTotal < requestedAmount) {
            throw new NotEnoughCoinsError('not enough coins to provide change')
        }
    }

    /**
     * Return the optimal change for a given number of Euro based on a limited supply of coins.
     * Return the least number of coins possible as long as they are available in the inventory.
     * @param {*} euro decimal value in Euro rounded to two decimal places
     * @returns {Array} array of coins
     */
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
