const Environment = require('../environment')
const InvalidConfigError = require('../errors/invalidConfigError')

describe('environment', () => {
    const OLD_ENV = process.env
    let sut

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV }
    })

    afterEach(() => {
        process.env = OLD_ENV
    })

    describe('maxAllowedEuro', () => {
        test('default value should be 500', () => {
            sut = new Environment(process.env)
            expect(sut.maxAllowedEuro).toBe(500)
        })

        test('should return MAX_ALLOWED_EURO env var if specified and greater than default value', () => {
            process.env.MAX_ALLOWED_EURO = '1000'
            sut = new Environment(process.env)
            expect(sut.maxAllowedEuro).toBe(1000)
        })

        test('should return MAX_ALLOWED_EURO env var if specified and less than default value', () => {
            process.env.MAX_ALLOWED_EURO = '200'
            sut = new Environment(process.env)
            expect(sut.maxAllowedEuro).toBe(200)
        })

        test('should throw error if MAX_ALLOWED_EURO env var is NaN', () => {
            process.env.MAX_ALLOWED_EURO = 'string'
            sut = new Environment(process.env)
            expect(() => sut.maxAllowedEuro).toThrow(InvalidConfigError)
        })

        test('should throw error if MAX_ALLOWED_EURO env var is negative number', () => {
            process.env.MAX_ALLOWED_EURO = '-100'
            sut = new Environment(process.env)
            expect(() => sut.maxAllowedEuro).toThrow(InvalidConfigError)
        })
    })

    describe('inventoryConfig', () => {
        test('should return default config if env vars not specified', () => {
            sut = new Environment(process.env)
            expect(sut.inventoryConfig).toEqual([
                { value: 100, count: 11 },
                { value: 50, count: 24 },
                { value: 20, count: 0 },
                { value: 10, count: 99 },
                { value: 5, count: 200 },
                { value: 2, count: 11 },
                { value: 1, count: 23 }
            ])
        })

        test('should be able to override some particular config rows', () => {
            process.env.INVENTORY_CONFIG_100 = '15'
            process.env.INVENTORY_CONFIG_2 = '8'
            sut = new Environment(process.env)
            expect(sut.inventoryConfig).toEqual([
                { value: 100, count: 15 },
                { value: 50, count: 24 },
                { value: 20, count: 0 },
                { value: 10, count: 99 },
                { value: 5, count: 200 },
                { value: 2, count: 8 },
                { value: 1, count: 23 }
            ])
        })

        test('should be able to override a config row to zero', () => {
            process.env.INVENTORY_CONFIG_50 = '0'
            sut = new Environment(process.env)
            expect(sut.inventoryConfig.find(x => x.value === 50).count).toBe(0)
        })

        test('should throw error if env var is NaN', () => {
            process.env.INVENTORY_CONFIG_10 = 'non-numeric-string'
            sut = new Environment(process.env)
            expect(() => sut.inventoryConfig).toThrow(InvalidConfigError)
        })

        test('should throw error if env var is negative number', () => {
            process.env.INVENTORY_CONFIG_10 = '-1'
            sut = new Environment(process.env)
            expect(() => sut.inventoryConfig).toThrow(InvalidConfigError)
        })
    })
})
