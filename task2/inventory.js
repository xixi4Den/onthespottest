const cloneDeep = require('lodash/cloneDeep')
const range = require('lodash/range')

class Inventory {
    constructor(denominations) {
        this.denominations = cloneDeep(denominations)
    }

    get(denominationValue) {
        const denomination = this.denominations.find(x => x.value === denominationValue)
        if (!denomination) {
            throw new Error('unsupported denomination')
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
        if (count <= 0 || count > denominations.count) {
            throw new Error('wrong count')
        }
        denominations.count -= count
        return range(count).map(() => ({ denomination }))
    }
}

module.exports = Inventory
