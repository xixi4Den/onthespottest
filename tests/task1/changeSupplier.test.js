const sut = require('../../task1/changeSupplier')

function checkReturnedCoins(actualCoins, expectedDenominations) {
    const expectedCoins = expectedDenominations.map(denomination => ({ denomination }))
    expect(actualCoins).toEqual(expectedCoins)
}

describe('positive flow', () => {
    test('should return empty array if 0 passed', () => {
        expect(sut.getOptimalChangeFor(0)).toEqual([])
    })

    test('should return a single coin if possible', () => {
        expect(sut.getOptimalChangeFor(0.01)).toEqual([{ denomination: 1 }])
        expect(sut.getOptimalChangeFor(0.02)).toEqual([{ denomination: 2 }])
        expect(sut.getOptimalChangeFor(0.05)).toEqual([{ denomination: 5 }])
        expect(sut.getOptimalChangeFor(0.1)).toEqual([{ denomination: 10 }])
        expect(sut.getOptimalChangeFor(0.2)).toEqual([{ denomination: 20 }])
        expect(sut.getOptimalChangeFor(0.5)).toEqual([{ denomination: 50 }])
        expect(sut.getOptimalChangeFor(1)).toEqual([{ denomination: 100 }])
    })

    test('should return coin with max denomination as much times as possible', () => {
        const res = sut.getOptimalChangeFor(5.15)
        checkReturnedCoins(res, [100, 100, 100, 100, 100, 10, 5])
    })

    test('should be able to start supply from coin with non-max denomination if input is less than max denomination', () => {
        const res = sut.getOptimalChangeFor(0.44)
        checkReturnedCoins(res, [20, 20, 2, 2])
    })

    test('should return one coin of each denomination for 1.88 Euro', () => {
        const res = sut.getOptimalChangeFor(1.88)
        checkReturnedCoins(res, [100, 50, 20, 10, 5, 2, 1])
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
})
