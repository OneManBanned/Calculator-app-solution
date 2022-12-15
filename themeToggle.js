const slider = document.querySelector('[aria-label="darkModeToggle"]')
const body = document.querySelector('body')

// Logic to switch theme and store theme on local storage

slider.addEventListener('change', setTheme)
window.addEventListener('load', () => {
    slider.value = localStorage.getItem('prefers-color-scheme')
    setTheme()
})

function setTheme() {
    body.className = '';
    if (slider.value === '1') {
        body.classList.add('dark-theme')
        slider.setAttribute('aria-valuenow', '1')
        slider.setAttribute('aria-valuetext', 'dark mode')
    } else if (slider.value === '2') {
        body.classList.add('light-theme')
        slider.setAttribute('aria-valuenow', '2')
        slider.setAttribute('aria-valuetext', 'light mode')
    } else if (slider.value === '3') {
        body.classList.add('color-theme')
        slider.setAttribute('aria-valuenow', '3')
        slider.setAttribute('aria-valuetext', 'color mode')
    }
    localStorage.setItem('prefers-color-scheme', slider.value)
}