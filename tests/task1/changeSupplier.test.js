const sut = require('../../task1/changeSupplier')

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
    expect(res).toEqual([
        { denomination: 100 },
        { denomination: 100 },
        { denomination: 100 },
        { denomination: 100 },
        { denomination: 100 },
        { denomination: 10 },
        { denomination: 5 }
    ])
})

test('should be able to start supply from coin with non-max denomination if input is less than max denomination', () => {
    const res = sut.getOptimalChangeFor(0.44)
    expect(res).toEqual([
        { denomination: 20 },
        { denomination: 20 },
        { denomination: 2 },
        { denomination: 2 }
    ])
})

test('should return one coin of each denomination for 1.88 Euro', () => {
    const res = sut.getOptimalChangeFor(1.88)
    expect(res).toEqual([
        { denomination: 100 },
        { denomination: 50 },
        { denomination: 20 },
        { denomination: 10 },
        { denomination: 5 },
        { denomination: 2 },
        { denomination: 1 }
    ])
})
