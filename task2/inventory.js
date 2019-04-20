const cloneDeep = require('lodash/cloneDeep')
const range = require('lodash/range')

const ArgumentError = require('../errors/argumentError')
const UnknownDenominationError = require('../errors/unknownDenominationError')
const NotEnoughCoinsError = require('../errors/notEnoughCoinsError')

class Inventory {
    constructor(denominations) {
        this.denominations = cloneDeep(denominations)
    }

    get(denominationValue) {
        const denomination = this.denominations.find(x => x.value === denominationValue)
        if (!denomination) {
            throw new UnknownDenominationError('denomination does not exist')
        }

        return denomination
    }

    getAvailableDenominations() {
        return this.denominations.filter(x => x.count)
    }

    getAvailableTotal() {
        return this.getAvailableDenominations()
            .reduce((acc, x) => acc + (x.value * x.count), 0)
    }

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
