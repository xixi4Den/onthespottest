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

/**
 * Encapsulates manipulations with environment variables.
 */
class Environment {
    constructor(env) {
        this.env = env
    }

    /**
     * Try to get environment variable and parse to positive numeric value.
     * Set default value otherwice.
     * @param {String} key environment variable key
     * @param {Number} defaultValue default value to set if environment variable is not presented
     * @returns {Number} value based on env var if specified or default value
     * @throws {InvalidConfigError} environment variable should be a positive number.
     * @private
     */
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

    /**
     * Try to get inventory config row from environment variable.
     * Set default config row otherwice.
     * @param {Object} defaultConfigRow default inventory config row
     * @returns {Object} config row based on env var if specified or default config row
     * @private
     */
    getInventoryRowConfig(defaultConfigRow) {
        const key = `INVENTORY_CONFIG_${defaultConfigRow.value}`
        const count = this.getPositiveNumericValueOrDefault(key, defaultConfigRow.count)

        return { value: defaultConfigRow.value, count }
    }

    /**
     * Get full inventory config.
     * It uses environment variables if specified or hardcoded default values otherwice.
     * @returns {Array} full inventory config representing coin denominations and their counts
     */
    get inventoryConfig() {
        return inventoryConfigDefault.map(x => this.getInventoryRowConfig(x))
    }

    /**
     * Get upper limit for Euro input.
     * @returns {Number} value based on env var if specified or 500
    */
    get maxAllowedEuro() {
        return this.getPositiveNumericValueOrDefault('MAX_ALLOWED_EURO', 500)
    }
}

module.exports = Environment
