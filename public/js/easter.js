const easterEggTitle = document.getElementById('easter-egg-title');
let clickCount = 0;

easterEggTitle.addEventListener('click', () => {
    clickCount++;
    if (clickCount >= 5) {
        document.documentElement.classList.toggle('easter-egg-active');
    }
});