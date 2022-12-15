const keypad = document.querySelector('[role="grid"]')
const rows = document.querySelectorAll('[role="row"]')

// Logic for keypad navigation only see calc.js for keyboard inputs

let btnFocus = 0;
let rowFocus = 0;

keypad.addEventListener('keydown', changeBtnFocus)

function changeBtnFocus(e) {
    const keydownRight = 39;
    const keydownLeft = 37;
    const keydownDown = 40;
    const keydownUp = 38;
    const keydownTab = 9;
    const keydownEnd = 35;
    const keydownHome = 36;

    if (e.keyCode === keydownRight ||
        e.keyCode === keydownLeft ||
        e.keyCode === keydownDown ||
        e.keyCode === keydownUp ||
        e.keyCode === keydownTab ||
        e.keyCode === keydownEnd ||
        e.keyCode === keydownHome) {

        rows[rowFocus].children[btnFocus].setAttribute('tabindex', -1)

        if (e.keyCode === keydownTab) {
            btnFocus = 0
            rowFocus = 0
        }

        if (e.keyCode === keydownEnd) {
            btnFocus = 3;
        }

        if (e.keyCode === keydownHome) {
            btnFocus = 0;
        }

        if (e.keyCode === keydownHome && e.ctrlKey) {
            btnFocus = 0;
            rowFocus = 0;
        }

        if (e.keyCode === keydownEnd && e.ctrlKey) {
            btnFocus = 1;
            rowFocus = 4;
        }

        if (e.keyCode == keydownRight) {
            if (rowFocus === 4 && btnFocus === 1) {
                btnFocus = 0;
                rowFocus = 4;
            }
            btnFocus++
            if (btnFocus === 4) {
                btnFocus = 0
                rowFocus++
            }
        }

        if (e.keyCode === keydownDown) {
            if (rowFocus === 3 && btnFocus <= 1) {
                btnFocus = 0
            } else if (rowFocus === 3 && btnFocus > 1) {
                btnFocus = 1
            }
            if (rowFocus === 4) {
                rowFocus = 3;
            }
            rowFocus++
        }

        if (e.keyCode === keydownLeft) {
            if (btnFocus === 0 && rowFocus === 0) {
                btnFocus = 1;
                rowFocus = 0;
            }
            if (btnFocus === 0 && rowFocus > 0) {
                rowFocus--
                btnFocus = rows[rowFocus].children.length
            }
            btnFocus--
        }

        if (e.keyCode === keydownUp) {
            if (rowFocus === 0) {
                rowFocus = 1;
            }
            if (rowFocus === 4 && btnFocus === 1) {
                btnFocus = 2;
            }
            rowFocus--
        }
        rows[rowFocus].children[btnFocus].setAttribute('tabindex', 0)
        rows[rowFocus].children[btnFocus].focus()
    }
}

