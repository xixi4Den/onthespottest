const InvalidConfigError = require('./errors/invalidConfigError')

const inventoryConfigDefault = [
    { value: 100, count: 11 },
    { value: 50, count: 24 },
    { value: 20, count: 0 },
    { value: 10, count: 99 },
    { value: 5, count: 200 },
    { value: 2, count: 11 },
    { value: 1, count: 23 }
]

class Environment {
    constructor(env) {
        this.env = env
    }

    getPositiveNumericValueOrDefault(key, defaultValue) {
        const envVarStr = this.env[key]
        if (envVarStr) {
            const envVar = Number.parseInt(envVarStr, 10)
            if (Number.isNaN(envVar) || envVar < 0) {
                throw new InvalidConfigError(`${key} env variable should be a positive number`)
            }
            return envVar
        }
        return defaultValue
    }

    getInventoryRowConfig(defaultConfigRow) {
        const key = `INVENTORY_CONFIG_${defaultConfigRow.value}`
        const count = this.getPositiveNumericValueOrDefault(key, defaultConfigRow.count)

        return { value: defaultConfigRow.value, count }
    }

    get inventoryConfig() {
        return inventoryConfigDefault.map(x => this.getInventoryRowConfig(x))
    }

    get maxAllowedEuro() {
        return this.getPositiveNumericValueOrDefault('MAX_ALLOWED_EURO', 500)
    }
}

module.exports = Environment
