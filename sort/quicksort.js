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

function quicksort(array, a, b) {
    if (typeof a == 'undefined')
        a = 0
    if (typeof b == 'undefined')
        b = array.length - 1

    if (a < b) {
        const pivot = partition(array, a, b)

        quicksort(array, a, pivot)
        quicksort(array, pivot + 1, b)
    }
}

if (require.main == module) {
    const assert = require('assert')

    const test = []
    for (let i = 0; i < 10; ++i) {
        test.push(Math.floor(Math.random() * 10))
    }

    console.log(test)
    quicksort(test)
    console.log(test)

    for (let i = 0; i < test.length - 1; ++i) {
        assert(test[i] <= test[i + 1])
    }

    console.log('It works.')
}
