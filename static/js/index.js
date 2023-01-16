// 영화 대사 관련 정보 중 하나의 대사를 랜덤으로 리턴
// response['movieLines'][random_int()] 리턴 형태:
//
//         {
//             "movie": "Star Wars: Episode V - The Empire Strikes Back",
//             "num": 0,
//             "quote": "Do, or do not. There is no try.",
//             "type": "movie",
//             "year": 1890
//         }
/*
function extract_random_line() {
    $.ajax({
        type: 'GET',
        url: '/line',
        data: {},
        success: function (response) {
            {
                return response['movieLines'][random_int()]['quote'];
            }
        }
    })
}
*/
//upperSide = Protocol

//lowerSide = Main contents implement

const quoteDisplayElement = document.getElementById('scriptContainer');
const quoteInputElement = document.getElementById('text-input');
let wordSelectorIndex = 0;

//wpm & acc var
const wpmTag = document.getElementById('wpm-value');
const accTag = document.getElementById('acc-value');
let solveCount = 0;
let wholeCount = 0;
let failureCount = 0;


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

//0~731 랜덤 정수
function random_int() {
    const line_no = Math.floor(Math.random() * 732)
    return line_no
}

//time
let time = 30;
let increaseTime = 0;

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
        min = parseInt(time / 60);
        sec = time % 60;

        if (sec > 9) {sec = time % 60
        } else {sec = "0" + time % 60}

        // HTML에 출력 되는 양식
        document.getElementById("timer").innerHTML = sec;
        time--;
        // 함수 timer() 가 끝나면 실행 되는 코드
        if (time < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Time out";
        }
        increaseTime += 1/60;
    }, 1000);
}


//WPM counter implement

// wpm 및 cpm 계산
// wpm 계산식은 변경 가능 있음
const wpmCalculate = () => {
    let wpmText = ((solveCount/5)/(increaseTime));
    //console.log(time);
    wpmText = wpmText < 0 || ! wpmText || wpmText == Infinity ? 0 : wpmText;
    wpmTag.innerText = Math.round(wpmText);
}

const accCalculate = () => {
    let accuracyText = ((wholeCount - failureCount) / wholeCount);
    accuracyText = accuracyText < 0 || !accuracyText || accuracyText ==Infinity ? 0:accuracyText;
    accTag.innerText=Math.round(accuracyText*100) + '%';
}