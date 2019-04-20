const EURO_TO_COINS_COEFFICIENT = 100

function convertToCoins(euro) {
    return (euro.toFixed(2) * EURO_TO_COINS_COEFFICIENT).toFixed()
}

module.exports = {
    convertToCoins
}
