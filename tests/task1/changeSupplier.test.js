const sut = require('../../task1/changeSupplier')

function checkReturnedCoins(actualCoins, expectedDenominations) {
    const expectedCoins = expectedDenominations.map(denomination => ({ denomination }))
    expect(actualCoins).toEqual(expectedCoins)
}

describe('positive flow', () => {
    test('should return empty array if 0 passed', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(0), [])
    })

    test('should return a single coin if possible', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(0.01), [1])
        checkReturnedCoins(sut.getOptimalChangeFor(0.02), [2])
        checkReturnedCoins(sut.getOptimalChangeFor(0.05), [5])
        checkReturnedCoins(sut.getOptimalChangeFor(0.1), [10])
        checkReturnedCoins(sut.getOptimalChangeFor(0.2), [20])
        checkReturnedCoins(sut.getOptimalChangeFor(0.5), [50])
        checkReturnedCoins(sut.getOptimalChangeFor(1), [100])
    })

    test('should return coin with max denomination as much times as possible', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(5.15), [100, 100, 100, 100, 100, 10, 5])
    })

    test('should be able to start supply from coin with non-max denomination if input is less than max denomination', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(0.44), [20, 20, 2, 2])
    })

    test('should return one coin of each denomination for 1.88 Euro', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(1.88), [100, 50, 20, 10, 5, 2, 1])
    })

    test('should not ignore 1 cent coin for 2.01 Euro', () => {
        checkReturnedCoins(sut.getOptimalChangeFor(2.01), [100, 100, 1])
    })
})

describe('negative flow', () => {
    test('should throw error if negative number passed', () => {
        expect(() => sut.getOptimalChangeFor(-1)).toThrow(Error)
    })

    test('should throw error if argument is >= max limit (default) for input value', () => {
        expect(() => sut.getOptimalChangeFor(499)).not.toThrow(Error)
        expect(() => sut.getOptimalChangeFor(500)).toThrow(Error)
        expect(() => sut.getOptimalChangeFor(501)).toThrow(Error)
    })

    describe('env variables', () => {
        const OLD_ENV = process.env

        beforeEach(() => {
            jest.resetModules()
            process.env = { ...OLD_ENV }
        })

        afterEach(() => {
            process.env = OLD_ENV
        })

        test('should be able to override default max limit for input value', () => {
            process.env.MAX_ALLOWED_EURO = 1000
            const newSut = require('../../task1/changeSupplier') // eslint-disable-line global-require
            expect(() => newSut.getOptimalChangeFor(999)).not.toThrow(Error)
            expect(() => newSut.getOptimalChangeFor(1000)).toThrow(Error)
            expect(() => newSut.getOptimalChangeFor(1001)).toThrow(Error)
        })
    })

    describe('handle input with float precision grater than 2', () => {
        test('should take into account first two decimal places', () => {
            checkReturnedCoins(sut.getOptimalChangeFor(0.331008654), [20, 10, 2, 1])
        })

        test('should not use banking rounding', () => {
            checkReturnedCoins(sut.getOptimalChangeFor(0.015), [1])
        })

        test('should handle very small decimals as zero', () => {
            checkReturnedCoins(sut.getOptimalChangeFor(0.000000000001), [])
        })
    })
})
