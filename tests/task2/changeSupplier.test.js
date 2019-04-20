const Inventory = require('../../task2/inventory')
const ChangeSupplier = require('../../task2/changeSupplier')
const testDenominations = require('./testData/denominations')
const testDenominationsFull = require('./testData/denominations-full')

function checkReturnedCoins(actualCoins, expectedDenominations) {
    const expectedCoins = expectedDenominations.map(denomination => ({ denomination }))
    expect(actualCoins).toEqual(expectedCoins)
}

describe('getChangeFor()', () => {
    let inventory
    let sut

    beforeEach(() => {
        inventory = new Inventory(testDenominations)
        sut = new ChangeSupplier(inventory)
    })

    describe('positive flow', () => {
        function checkNumberOfCoinsInInventory(expected) {
            expect(inventory.getAvailableDenominations()).toEqual(expected)
        }

        test('should return empty array if 0 passed', () => {
            checkReturnedCoins(sut.getChangeFor(0), [])
            checkNumberOfCoinsInInventory(testDenominations)
        })

        test('should return a single coin if possible', () => {
            checkReturnedCoins(sut.getChangeFor(0.01), [1])
            checkReturnedCoins(sut.getChangeFor(0.02), [2])
            checkReturnedCoins(sut.getChangeFor(0.05), [5])
            checkReturnedCoins(sut.getChangeFor(0.1), [10])
            checkReturnedCoins(sut.getChangeFor(0.2), [20])
            checkReturnedCoins(sut.getChangeFor(0.5), [50])
            checkReturnedCoins(sut.getChangeFor(1), [100])
        })

        test('should return coins with higher denomination first', () => {
            const res = sut.getChangeFor(2.55)
            checkReturnedCoins(res, [100, 50, 50, 20, 20, 10, 5])
            checkNumberOfCoinsInInventory([
                { value: 20, count: 1 },
                { value: 10, count: 3 },
                { value: 5, count: 4 },
                { value: 2, count: 1 },
                { value: 1, count: 1 }
            ])
        })

        test('should be able to start supply from coin with non-max denomination if input is less than max denomination', () => {
            checkReturnedCoins(sut.getChangeFor(0.43), [20, 20, 2, 1])
            checkNumberOfCoinsInInventory([
                { value: 100, count: 1 },
                { value: 50, count: 2 },
                { value: 20, count: 1 },
                { value: 10, count: 4 },
                { value: 5, count: 5 }
            ])
        })

        test('should return one coin of each denomination for 1.88 Euro', () => {
            checkReturnedCoins(sut.getChangeFor(1.88), [100, 50, 20, 10, 5, 2, 1])
            checkNumberOfCoinsInInventory([
                { value: 50, count: 1 },
                { value: 20, count: 2 },
                { value: 10, count: 3 },
                { value: 5, count: 4 }
            ])
        })

        test('should not ignore 1 cent coin for 2.01 Euro', () => {
            checkReturnedCoins(sut.getChangeFor(2.01), [100, 50, 50, 1])
            checkNumberOfCoinsInInventory([
                { value: 20, count: 3 },
                { value: 10, count: 4 },
                { value: 5, count: 5 },
                { value: 2, count: 1 }
            ])
        })
    })

    describe('negative flow', () => {
        test('should throw error if negative number passed', () => {
            expect(() => sut.getChangeFor(-1)).toThrow(Error)
        })

        describe('check max limit for imput value', () => {
            beforeEach(() => {
                inventory = new Inventory(testDenominationsFull)
                sut = new ChangeSupplier(inventory)
            })

            test('should throw error if argument is >= max limit (default) for input value', () => {
                expect(() => sut.getChangeFor(499)).not.toThrow(Error)
                expect(() => sut.getChangeFor(500)).toThrow(Error)
                expect(() => sut.getChangeFor(501)).toThrow(Error)
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
                    // eslint-disable-next-line global-require
                    const ChangeSupplierWithModifiedMaxAllowedEuro = require('../../task2/changeSupplier')
                    inventory = new Inventory(testDenominationsFull)
                    sut = new ChangeSupplierWithModifiedMaxAllowedEuro(inventory)
                    expect(() => sut.getChangeFor(999)).not.toThrow(Error)
                    expect(() => sut.getChangeFor(1000)).toThrow(Error)
                    expect(() => sut.getChangeFor(1001)).toThrow(Error)
                })
            })
        })

        describe('handle input with float precision grater than 2', () => {
            test('should take into account first two decimal places', () => {
                checkReturnedCoins(sut.getChangeFor(0.331008654), [20, 10, 2, 1])
            })

            test('should not use banking rounding', () => {
                checkReturnedCoins(sut.getChangeFor(0.015), [1])
            })

            test('should handle very small decimals as zero', () => {
                checkReturnedCoins(sut.getChangeFor(0.000000000001), [])
            })
        })

        describe('inventory', () => {
            function checkNumberOfCoinsInInventoryDidNotChanged() {
                expect(inventory.getAvailableDenominations()).toEqual(testDenominations)
            }

            test('shoudl throw error if total amount of coins in inventory is less than requested amount', () => {
                expect(() => sut.getChangeFor(3.29)).toThrow(Error)
                checkNumberOfCoinsInInventoryDidNotChanged()
            })

            test('should not throw error if total amount of coins in inventory is equal to requested amount', () => {
                expect(() => sut.getChangeFor(3.28)).not.toThrow(Error)
            })

            test('should throw error if inventory does not contain denominations to provide full amount', () => {
                // inventory cannot provide 9 cents
                // because it contains one 2cents coin and one 1cent coin
                expect(() => sut.getChangeFor(1.79)).toThrow(Error)
                checkNumberOfCoinsInInventoryDidNotChanged()
                expect(() => sut.getChangeFor(1.78)).not.toThrow(Error)
            })
        })
    })
})
