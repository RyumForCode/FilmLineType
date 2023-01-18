// Session storage
const pageStorage = window.sessionStorage;
let wpmStorage = 0;
let accStorage = 0;

const quoteDisplayElement = document.getElementById('scriptContainer');
const quoteInputElement = document.getElementById('text-input');
let wordSelectorIndex = 0;

// WPM & ACC var
const wpmTag = document.getElementById('wpm-value');
const accTag = document.getElementById('acc-value');
let solveCount = 0;
let wholeCount = 0;
let failureCount = 0;

// Quote generater
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

// Type checker
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
            solveCount += firstWordSelector.length;
            wholeCount += 1;
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
                failureCount += 1;
            }
            lineBreakManager(arrayQuote[wordSelectorIndex], arrayQuote);
            lineHideAndShow(arrayQuote);
            wpmCalculate();
            accCalculate();
        }
    } else {
        quoteInputElement.value = '';
    }
});

const initialShowAndHide = quoteDisplayElement.querySelectorAll('span.text-word');

const lineBreakManager = (domCountElement, domHistory) => {
    const rectPosition = domCountElement.getBoundingClientRect();
    if (!(rectPosition['y'] == 335.75)) {
        for (let i = 0; i < wordSelectorIndex; i++) {
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

// Timer
let setTime = 30;
let totalTime = 0;
let whenTypeBegin = false;

//const Timer = () => {
    //if ()
//};


// 한번만 실행 되는 함수 is_action()
let is_action = false;
function timer() {
    if (is_action === true) { return false; }
    is_action = true;
    // 타이머 시간 설정(초 단위)
    // 초 단위로 적어 주면 됩니다.
    let min = "";
    let sec = "";

    let x = setInterval(function () {
        min = parseInt(setTime / 60);
        sec = setTime % 60;

        if (sec > 9) {sec = setTime % 60
        } else {sec = "0" + setTime % 60}

        // HTML에 출력 되는 양식
        document.getElementById("timer").innerHTML = sec;
        setTime--;
        // 함수 timer() 가 끝나면 실행 되는 코드
        if (setTime < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Time out";
            storeWPMandACC();
            location.href = '/result';
        }
        totalTime += 1/60;
    }, 1000);
}


// WPM calculator
const wpmCalculate = () => {
    let wpmText = ((solveCount/5)/(totalTime));
    wpmText = (wpmText == Infinity ? 0 : wpmText);
    wpmTag.innerText = Math.round(wpmText);
    wpmStorage = Math.round(wpmText);
}

// Accuracy calculator
const accCalculate = () => {
    let accuracyText = ((wholeCount - failureCount) / wholeCount);
    accuracyText = accuracyText < 0 || !accuracyText || accuracyText ==Infinity ? 0:accuracyText;
    accTag.innerText=Math.round(accuracyText*100) + '%';
    accStorage = Math.round(accuracyText * 100);
}

const storeWPMandACC = () => {
    pageStorage.setItem('wpmValue', wpmStorage);
    pageStorage.setItem('accValue', accStorage);
};