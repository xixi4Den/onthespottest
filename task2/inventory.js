const cloneDeep = require('lodash/cloneDeep')
const range = require('lodash/range')
const orderBy = require('lodash/orderBy')

const ArgumentError = require('../errors/argumentError')
const UnknownDenominationError = require('../errors/unknownDenominationError')
const NotEnoughCoinsError = require('../errors/notEnoughCoinsError')

/**
 * Class representing inventory with available coins.
 */
class Inventory {
    constructor(denominations) {
        this.denominations = orderBy(cloneDeep(denominations), ['value'], ['desc'])
    }

    /**
     * Get single denomination object by denomination value.
     * @param {Number} denominationValue
     * @returns {Object} denomination object
     * @throws {UnknownDenominationError}
     * @private
     */
    get(denominationValue) {
        const denomination = this.denominations.find(x => x.value === denominationValue)
        if (!denomination) {
            throw new UnknownDenominationError('denomination does not exist')
        }

        return denomination
    }

    /**
     * Get available coin denominations.
     * Denomination is unavailable is number of coins in inventory is 0.
     * @returns {Array}
     */
    getAvailableDenominations() {
        return this.denominations.filter(x => x.count)
    }

    /**
     * Get total amount of all coins.
     * @returns {Number}
     */
    getAvailableTotal() {
        return this.getAvailableDenominations()
            .reduce((acc, x) => acc + (x.value * x.count), 0)
    }

    /**
     * Provide requested number of coins with requested denomination and reduce size in inventory.
     * @returns {Array} list of coins.
     * @throws {ArgumentError} Count should be a positive number.
     * @throws {NotEnoughCoinsError} if inventory doesn't contain requested number of coins.
     */
    provide(denomination, count) {
        const denominations = this.get(denomination)
        if (count <= 0) {
            throw new ArgumentError('count cannot be negative')
        }
        if (count > denominations.count) {
            throw new NotEnoughCoinsError(`count cannot be bigger than ${denominations.count}`)
        }
        denominations.count -= count
        return range(count).map(() => ({ denomination }))
    }
}

module.exports = Inventory
