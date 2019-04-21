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

    getInventoryRowConfig(value) {
        const defaultConfig = inventoryConfigDefault.find(x => x.value === value)
        if (!defaultConfig) {
            throw new InvalidConfigError(`there is no default inventory config for denomination=${value}`)
        }

        let count
        const key = `INVENTORY_CONFIG_${value}`
        const countEnvVarStr = this.env[key]
        if (countEnvVarStr) {
            const countEnvVar = Number.parseInt(countEnvVarStr, 10)
            if (Number.isNaN(countEnvVar)) {
                throw new InvalidConfigError(`${key} env variable should be a number`)
            }
            count = countEnvVar
        } else {
            ({ count } = defaultConfig)
        }

        return { value, count }
    }

    get inventoryConfig() {
        return inventoryConfigDefault.map(x => this.getInventoryRowConfig(x.value))
    }

    get maxAllowedEuro() {
        return this.env.MAX_ALLOWED_EURO || 500
    }
}

module.exports = Environment
