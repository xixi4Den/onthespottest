const EURO_TO_COINS_COEFFICIENT = 100

/**
 * Convert value in Euro to  value in cents.
 * @param {Number} euro decimal value in Euro rounded to 2 decimal places
 * @returns {Number} integer value in cents
 */
function convertToCoins(euro) {
    return +(euro.toFixed(2) * EURO_TO_COINS_COEFFICIENT).toFixed()
}

module.exports = {
    convertToCoins
}
