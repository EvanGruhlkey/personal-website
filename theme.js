(function () {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }
    updateLabel();
})();

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    updateLabel();
}

function updateLabel() {
    var el = document.getElementById('theme-link');
    if (el) {
        el.textContent = document.body.classList.contains('dark') ? 'light' : 'dark';
    }
}
