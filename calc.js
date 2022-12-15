// Main calc logic line 22
// Keyboard inputs logic line 172

const buttons = document.querySelectorAll('button')
const output = document.querySelector('#calc-screen-output')
const equals = document.querySelector('.equals')
const screen = document.querySelector('.calc-screen')

calculation = []
let first;
// Has dot been used
let dot = false;

window.addEventListener('resize', () => {
    calculation = []
    first = undefined
    output.innerHTML = ''
})

window.addEventListener('keydown', keypadNumbers)

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    output.setAttribute('aria-live', 'off')

    if (btn.value === 'equals' && !first && calculation.length === 0) {
        return
    }
    if (btn.value === 'equals' && first && calculation.length === 0) {
        return
    }

    // Exclude equation type on first input or if last input was an equation 
    // unless continuing previously calculated calculation.

    if (btn.hasAttribute('data-equation')) {
        if (first && calculation.length === 0) {
            calculation.push(first)
            dot = false
        }
        else if (calculation.length === 0
            || calculation[calculation.length - 1] === '*'
            || calculation[calculation.length - 1] === '/'
            || calculation[calculation.length - 1] === '+'
            || calculation[calculation.length - 1] === '-'
        ) {
            return
        }
    }

    // Prevent repeated dots

    if (calculation[calculation.length - 1] === '.') {
        if (btn.value === '.') {
            return
        }
    }

    // Reset if first input after calculation is a dot

    if (first && btn.value === '.' && calculation.length < 1) {
        calculation = []
        first = undefined
        dot = false
    }

    if (btn.value === '.' && dot === false) {
        dot = true
        let value = btn.value
        calculation.push(value)
    }

    // Equation type

    // Input equation

    if (btn.value === '/' ||
        btn.value === '+' ||
        btn.value === '*' ||
        btn.value === '-') {
        equation = btn.value
        calculation.push(equation)
        dot = false
    }

    // Numbers

    // Reset if first input after calculation is a number

    if (first && btn.hasAttribute('data-number') && calculation.length < 1) {
        calculation = []
        first = undefined
    }

    // Input number

    if (btn.hasAttribute('data-number')) {
        num = btn.value
        calculation.push(num)
    }

    // Delete from input

    if (btn.value === 'delete') {
        let deleted = calculation[calculation.length - 1]
        if (deleted = '.') {
            dot = false;
            calculation.pop()
        } else {
            calculation.pop()
        }
    }

    // If delete is first button pressed after calculation, reset

    if (btn.value === 'delete' && first && calculation.length === 0) {
        calculation = []
        first = undefined
    }

    // Reset

    if (btn.value === 'reset') {
        calculation = []
        first = undefined
    }

    // Display output as it's typed

    output.innerHTML = sumComponents(calculation)

    let sumArr = sumComponents(calculation).split(/([+/*-])/g)
    let newSumArr = parseNumbers(sumArr)

    // On equals

    if (btn.value === 'equals') {

        // convert strings to numbers

        first = newSumArr[0]
        newSumArr.shift()
        dot = false

        while (newSumArr.length) {

            let operation = newSumArr[0]
            let second = newSumArr[1]

            if (operation === '+') {
                first = first + second;
            }
            if (operation === '-') {
                first = first - second;
            }
            if (operation === '/') {
                first = first / second;
            }
            if (operation === '*') {
                first = first * second;
            }
            newSumArr.shift()
            newSumArr.shift()
        }
        output.innerHTML = configOutput(first)
        output.setAttribute('aria-live', 'assertive')
        calculation = []
    }
}))

// Input using keyboard

function keypadNumbers(e) {
    const keys = [
        {
            value: '0',
            codes: [48, 96],
            row: 3,
            column: 1
        },
        {
            value: '1',
            codes: [49, 97],
            row: 2,
            column: 0
        },
        {
            value: '2',
            codes: [50, 98],
            row: 2,
            column: 1
        },
        {
            value: '3',
            codes: [51, 99],
            row: 2,
            column: 3
        },
        {
            value: '4',
            codes: [52, 100],
            row: 1,
            column: 0
        },
        {
            value: '5',
            codes: [53, 101],
            row: 1,
            column: 1
        },
        {
            value: '6',
            codes: [54, 102],
            row: 1,
            column: 2
        },
        {
            value: '7',
            codes: [55, 103],
            row: 0,
            column: 0
        },
        {
            value: '8',
            codes: [56, 104],
            alt: '*',
            row: 0,
            column: 1,
            altRow: 3,
            altColumn: 3
        },
        {
            value: '9',
            codes: [57, 105],
            row: 0,
            column: 2
        },
        {
            value: 'equals',
            codes: [13, 187],
            row: 4,
            alt: '+',
            column: 1,
            altRow: 1,
            altColumn: 3
        },
        {
            value: '/',
            codes: [111, 191],
            row: 3,
            column: 2
        },
        {
            value: '*',
            codes: [106],
            row: 3,
            column: 3
        },
        {
            value: '-',
            codes: [109, 189],
            row: 2,
            column: 3
        },
        {
            value: '+',
            codes: [107],
            row: 1,
            column: 3
        },
        {
            value: '.',
            codes: [110, 190],
            row: 3,
            column: 0
        },
        {
            value: 'delete',
            codes: [8],
            row: 0,
            column: 3
        },
        {
            value: 'reset',
            codes: [46],
            row: 4,
            column: 0
        }
    ]

    if (e.shiftKey) {
        keys.forEach(val => {
            for (let i = 0; i < val.codes.length; i++) {
                if (e.keyCode === val.codes[i]) {
                    buttons.forEach(btn => {
                        if (btn.value === val.alt) {
                            btn.focus()
                            btn.click()
                            rowFocus = val.altRow
                            btnFocus = val.altColumn
                        }
                    })
                }
            }
        })
    } else {
        keys.forEach(val => {
            for (let i = 0; i < val.codes.length; i++) {
                if (e.keyCode === val.codes[i]) {
                    buttons.forEach(btn => {
                        if (btn.value === val.value) {
                            btn.focus()
                            btn.click()
                            rowFocus = val.row
                            btnFocus = val.column
                        }
                    })
                }
            }
        })
    }
}

function sumComponents(arr) {
    return arr.toString().replaceAll(',', '')
}

function parseNumbers(arr) {
    let newArray = []
    arr.forEach(val => val.includes('/') ||
        val.includes('+') ||
        val.includes('-') ||
        val.includes('*')
        ? newArray.push(val) : newArray.push(Number.parseFloat(val)))
    return newArray
}

function configOutput(num) {
    if (num < 999) {
        return num
    } else {
        const remainder = num.toString().length % 3;
        let numStr = num.toString()
        let strStart = numStr.slice(0, remainder)
        let strEndArr = numStr.split('').splice(remainder)
        let strEndStr = strEndArr.toString().replaceAll(',', '').match(/.{1,3}/g).toString()
        if (strStart) {
            return strStart + ',' + strEndStr
        } else {
            return strEndStr
        }
    }
}