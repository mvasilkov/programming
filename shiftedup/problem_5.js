'use strict'
/* Write a program that outputs all possibilities to put + or - or nothing
 * between the numbers 1, 2, ..., 9 (in this order) such that the result is
 * always 100. For example: 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.
 * http://www.shiftedup.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour
 */

function solve(numbers, partialSolution, partialString) {
    if (numbers.length == 0) {
        if (partialSolution == 100) {
            console.log(partialString)
        }
        return
    }

    const x = numbers[0]
    const tail = numbers.slice(1)

    if (partialString == '') {
        solve(tail, partialSolution + x, '' + x)
    }
    else {
        solve(tail, partialSolution + x, partialString + ' + ' + x)
        solve(tail, partialSolution - x, partialString + ' - ' + x)
    }

    if (tail.length != 0) {
        tail[0] += x * 10
        solve(tail, partialSolution, partialString)
    }
}

function solveNoRecur(numbers) {
    let branches = [{ numbers, target: 100, solution: '' }]

    while (branches.length) {
        const branches2 = []

        while (branches.length) {
            const b = branches.pop()

            if (b.numbers.length == 0) {
                if (b.target == 0) {
                    console.log(b.solution)
                }
                continue
            }

            const x = b.numbers[0]
            let tail = b.numbers.slice(1)

            if (b.solution == '') {
                branches2.push({ numbers: tail, target: b.target - x, solution: '' + x })
            }
            else {
                branches2.push({ numbers: tail, target: b.target - x, solution: b.solution + ' + ' + x })
                branches2.push({ numbers: tail, target: b.target + x, solution: b.solution + ' - ' + x })
            }

            if (tail.length != 0) {
                tail = tail.slice()
                tail[0] += x * 10
                branches2.push({ numbers: tail, target: b.target, solution: b.solution })
            }
        }

        branches = branches2
    }
}

if (require.main == module) {
    solve([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, '')
    console.log('---')
    solveNoRecur([1, 2, 3, 4, 5, 6, 7, 8, 9])

    /* This returns 11 possible solutions:
     * 1 + 2 + 3 - 4 + 5 + 6 + 78 + 9
     * 1 + 2 + 34 - 5 + 67 - 8 + 9
     * 1 + 23 - 4 + 5 + 6 + 78 - 9
     * 1 + 23 - 4 + 56 + 7 + 8 + 9
     * 12 + 3 + 4 + 5 - 6 - 7 + 89
     * 12 + 3 - 4 + 5 + 67 + 8 + 9
     * 12 - 3 - 4 + 5 - 6 + 7 + 89
     * 123 + 4 - 5 + 67 - 89
     * 123 + 45 - 67 + 8 - 9
     * 123 - 4 - 5 - 6 - 7 + 8 - 9
     * 123 - 45 - 67 + 89
     */
}
