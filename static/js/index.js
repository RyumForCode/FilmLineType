const quoteDisplayElement = document.getElementById('scriptContainer');
const quoteInputElement = document.getElementById('text-input');

// Test quote generater.
const quote = 'This is the test quote.';
const quoteWordArray = quote.split(' ');

quoteWordArray.forEach((word, index) => {
    console.log(word);
    const quoteCharArray = word.split('');
    const textWord = document.createElement('span');
    textWord.setAttribute('class', 'text-word');
    quoteDisplayElement.appendChild(textWord);
    quoteCharArray.forEach((char) => {
        console.log(char);
        const textChar = document.createElement('span');
        textChar.setAttribute('class', 'text-char');
        textChar.textContent = char;
        textWord.appendChild(textChar);
    });
});
// Test quote generater end.

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    arrayQuote.forEach((charactorSpan , index) => {
        const charactor = arrayValue[index];
        if (charactor == null) {
            charactorSpan.classList.remove('correct');
            charactorSpan.classList.remove('incorrect');
        } else if (charactor === charactorSpan.innerText) {
            charactorSpan.classList.remove('incorrect');
            charactorSpan.classList.add('correct');
        } else {
            charactorSpan.classList.remove('correct');
            charactorSpan.classList.add('incorrect');
        }
    });
});