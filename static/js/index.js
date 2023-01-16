const quoteDisplayElement = document.getElementById('scriptContainer');
const quoteInputElement = document.getElementById('text-input');
let wordSelectorIndex = 0;

// Test quote generater.
const quote = 'This is the test quote. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis tortor placerat, semper libero non, tincidunt enim. Pellentesque hendrerit porta est, ut placerat purus. Etiam pulvinar neque sem, nec imperdiet orci aliquet vel. Fusce ut gravida felis, nec blandit diam. Donec fermentum luctus metus vel tempor. Vivamus pharetra, libero at rutrum commodo, ipsum turpis malesuada sapien, a blandit justo sem vitae lacus. Donec fringilla maximus tellus, a eleifend quam cursus at. Donec maximus ornare eros, nec eleifend tellus. Mauris nec pretium urna. Suspendisse tincidunt accumsan velit. Integer nec eleifend sem. Nam mattis egestas vulputate. Donec posuere ex a leo hendrerit, et ultricies enim fringilla.';
const quoteWordArray = quote.split(' ');

quoteWordArray.forEach((word) => {
    const quoteCharArray = word.split('');
    const textWord = document.createElement('span');
    textWord.setAttribute('class', 'text-word');
    quoteDisplayElement.appendChild(textWord);
    quoteCharArray.forEach((char) => {
        const textChar = document.createElement('span');
        textChar.setAttribute('class', 'text-char');
        textChar.textContent = char;
        textWord.appendChild(textChar);
    });
});
// Test quote generater end.
const initialShowAndHide = quoteDisplayElement.querySelectorAll('span.text-word');

quoteInputElement.addEventListener('input', (e) => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span.text-word');
    const arrayValue = quoteInputElement.value.split('');
    const firstWordSelector = arrayQuote[wordSelectorIndex].querySelectorAll('span.text-char');

    firstWordSelector.forEach((charactorSpan , index) => {
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
        };
    });
    if (!(quoteInputElement.value === ' ')) {
        if (e['data'] === ' ') {
            if (arrayQuote[wordSelectorIndex].querySelectorAll('span.text-word span.incorrect').length == 0 && firstWordSelector.length == arrayQuote[wordSelectorIndex].querySelectorAll('span.text-word span.incorrect').length + arrayQuote[wordSelectorIndex].querySelectorAll('span.text-word span.correct').length) {
                arrayQuote[wordSelectorIndex].classList.add('correct');
                quoteInputElement.value = '';
                wordSelectorIndex++;
            } else {
                arrayQuote[wordSelectorIndex].classList.add('incorrect');
                firstWordSelector.forEach((charactor) => {
                    charactor.classList.remove('correct');
                    charactor.classList.add('incorrect');
                });
                quoteInputElement.value = '';
                wordSelectorIndex++;
            }
            lineBreakManager(arrayQuote[wordSelectorIndex], arrayQuote);
            lineHideAndShow(arrayQuote);
        }
    } else {
        quoteInputElement.value = '';
    }
});

const lineBreakManager = (domCountElement, domHistory) => {
    const rectPosition = domCountElement.getBoundingClientRect();
    if (!(rectPosition['y'] == 335.75)) {
        for (let i = 0; i <= wordSelectorIndex; i++) {
            domHistory[i].remove();
        };
        wordSelectorIndex = 0;
    };
};

const lineHideAndShow = (domHideElement) => {
    if (domHideElement.length === 0) return;
    for (let i = 0; i <= quoteWordArray.length; i++) {
        if (!domHideElement[i]) return;
        const rectPositionToHide = domHideElement[i].getBoundingClientRect();
        if (rectPositionToHide['y'] >= 512.75) {
            domHideElement[i].classList.add('hide');
        } else {
            domHideElement[i].classList.remove('hide');
        };
    };
};

window.onload = lineHideAndShow(initialShowAndHide);