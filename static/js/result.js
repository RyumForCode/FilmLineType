const pageStorage = window.sessionStorage;
const wpmResult = document.getElementById('wpm-value');
const accResult = document.getElementById('acc-value');

wpmResult.innerText = pageStorage.getItem('wpmValue');
accResult.innerText = pageStorage.getItem('accValue') + '%';