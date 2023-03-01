const radioGroup = document.querySelectorAll(('[name=theme]'))
const body = document.querySelector('body')

// Default theme if none found in local storage

let theme;

// Theme preference on initial load, in local storage.

window.addEventListener('load', () => {
    theme = localStorage.getItem('prefers-color-scheme')
    for (const btn of radioGroup) {
        if (btn.value === theme) {
            btn.checked = true
        }
    }
    setTheme(theme)
})

// Set theme on radio button select and store choice in local storage

radioGroup.forEach(btn => addEventListener('click', () => {
    if (btn.checked) {
        theme = btn.value
    }
    setTheme(theme)
    localStorage.setItem('prefers-color-scheme', theme)
}))

// Display correct theme

function setTheme(theme) {
    if (theme === '1') {
        body.classList.add('dark-theme')
        body.classList.remove('light-theme')
        body.classList.remove('color-theme')
    } else if (theme === '2') {
        body.classList.add('light-theme')
        body.classList.remove('dark-theme')
        body.classList.remove('color-theme')
    } else if (theme === '3') {
        body.classList.add('color-theme')
        body.classList.remove('light-theme')
        body.classList.remove('dark-theme')
    }
}


