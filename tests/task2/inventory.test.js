const Inventory = require('../../task2/inventory')

describe('getAvailableDenominations()', () => {
    test('return empty array if there is no available denominations', () => {
        const sut = new Inventory([])
        expect(sut.getAvailableDenominations()).toEqual([])
    })

    test('return all denominations if available', () => {
        const denominations = [
            { value: 100, count: 25 },
            { value: 50, count: 50 },
            { value: 20, count: 100 }
        ]
        const sut = new Inventory(denominations)
        expect(sut.getAvailableDenominations()).toEqual(denominations)
    })

    test('return denominations with count = 1', () => {
        const denominations = [
            { value: 100, count: 1 },
            { value: 50, count: 1 },
            { value: 20, count: 1 }
        ]
        const sut = new Inventory(denominations)
        expect(sut.getAvailableDenominations()).toEqual(denominations)
    })

    test('ignore denominations with count = 0', () => {
        const denominations = [
            { value: 100, count: 150 },
            { value: 50, count: 0 },
            { value: 20, count: 12 }
        ]
        const sut = new Inventory(denominations)
        expect(sut.getAvailableDenominations()).toEqual([
            { value: 100, count: 150 },
            { value: 20, count: 12 }
        ])
    })
})

describe('getAvailableTotal()', () => {
    test('should return zero if there is no available denominations', () => {
        const sut = new Inventory([])
        expect(sut.getAvailableTotal()).toBe(0)
    })

    test('should return sum of all denominations if available', () => {
        const denominations = [
            { value: 100, count: 2 },
            { value: 50, count: 3 },
            { value: 20, count: 1 }
        ]
        const sut = new Inventory(denominations)
        expect(sut.getAvailableTotal()).toBe(370)
    })

    test('should ignore denominations with count = 0', () => {
        const denominations = [
            { value: 100, count: 5 },
            { value: 50, count: 0 },
            { value: 20, count: 4 }
        ]
        const sut = new Inventory(denominations)
        expect(sut.getAvailableTotal()).toBe(580)
    })
})

describe('provide()', () => {
    test('should throw error if requested denomination does not exist in inventory', () => {
        const sut = new Inventory([{ value: 100, count: 5 }])
        expect(() => sut.provide(50, 2)).toThrow(Error)
    })

    test('should throw error if requested reduce count is negative', () => {
        const sut = new Inventory([{ value: 100, count: 5 }])
        expect(() => sut.provide(100, -1)).toThrow(Error)
        expect(() => sut.provide(100, -99999)).toThrow(Error)
    })

    test('should throw error if requested reduce count is bigger than count in inventory', () => {
        const sut = new Inventory([{ value: 100, count: 5 }])
        expect(() => sut.provide(100, 6)).toThrow(Error)
        expect(() => sut.provide(100, 99999)).toThrow(Error)
    })

    test('should return correct coins and correctly reduce count of denomination', () => {
        const sut = new Inventory([{ value: 50, count: 5 }])
        const res = sut.provide(50, 2)
        expect(res.length).toBe(2)
        expect(res.every(x => x.denomination === 50)).toBe(true)
        expect(sut.get(50).count).toBe(3)
    })

    test('should reduce count to zero if requested count is equal to count in inventory', () => {
        const sut = new Inventory([{ value: 20, count: 25 }])
        const res = sut.provide(20, 25)
        expect(res.length).toBe(25)
        expect(res.every(x => x.denomination === 20)).toBe(true)
        expect(sut.get(20).count).toBe(0)
    })

    test('should affect requested denomination only', () => {
        const sut = new Inventory([
            { value: 5, count: 111 },
            { value: 2, count: 217 },
            { value: 1, count: 59 }
        ])
        sut.provide(2, 116)
        expect(sut.get(5).count).toBe(111)
        expect(sut.get(2).count).toBe(101)
        expect(sut.get(1).count).toBe(59)
    })
})
