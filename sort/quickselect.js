'use strict'

function swap(array, i, j) {
    if (i == j)
        return

    const t = array[i]
    array[i] = array[j]
    array[j] = t
}

function partition(array, a, b) {
    const pivot = Math.floor((a + b) * 0.5)
    const pValue = array[pivot]
    let p = a

    swap(array, pivot, b)

    for (let i = a; i < b; ++i) {
        if (array[i] < pValue) {
            swap(array, i, p)
            ++p
        }
    }

    swap(array, b, p)

    return p
}

function quickselect(array, k, a, b) {
    if (typeof a == 'undefined')
        a = 0
    if (typeof b == 'undefined')
        b = array.length - 1

    const pivot = partition(array, a, b)

    if (pivot > k)
        return quickselect(array, k, a, pivot)
    if (pivot < k)
        return quickselect(array, k, pivot + 1, b)

    return array[pivot]
}

if (require.main == module) {
    const assert = require('assert')

    const test = []
    for (let i = 0; i < 10; ++i) {
        test.push(Math.floor(Math.random() * 10))
    }

    const sorted = test.slice().sort(function (a, b) { return a - b })
    for (let i = 0; i < sorted.length; ++i) {
        assert(quickselect(test.slice(), i) == sorted[i])
    }

    console.log('It works.')
}
