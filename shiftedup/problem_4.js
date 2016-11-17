'use strict'
/* Write a function that given a list of non-negative integers,
 * arranges them such that they form the largest possible number.
 * For example, given [50, 2, 1, 9], the largest formed number is 95021.
 * http://www.shiftedup.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour
 */

function arrange(numbers) {
    numbers.sort(function compare(a, b) {
        return ('' + b + a).localeCompare('' + a + b)
    })
    return numbers.join('')
}

if (require.main == module) {
    const assert = require('assert')

    assert(arrange([50, 2, 1, 9]) == '95021')
    assert(arrange([5, 50, 56]) == '56550')
    assert(arrange([420, 42, 423]) == '42423420')
}
