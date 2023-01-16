
$(document).ready(function () {
    get_line_info();
})

// 페이지가 로드 됨과 동시에 영화 대사 정보를 불러옴
function get_line_info() {
    $.ajax({
        type: 'GET',
        url: '/line',
        data: {},
        success: function (response) {
            console.log(response['movieLines'])
        }
    })
}

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

function extract_random_line() {
    $.ajax({
        type: 'GET',
        url: '/line',
        data: {},
        success: function (response) {
            {
                return response['movieLines'][random_int()]['quote']
            }
        }
    })
}

//0~731 랜덤 정수
function random_int() {
    const line_no = Math.floor(Math.random() * 732)
    return line_no
}

// 한번만 실행 되는 함수 is_action()
var is_action = false;
function timer() {
    if (is_action === true) { return false; }
    is_action = true;
    // 타이머 시간 설정(초 단위)
    var time = 30;
    // 초 단위로 적어 주면 됩니다.
    var min = "";
    var sec = "";

    var x = setInterval(function () {
        min = parseInt(time / 60);
        sec = time % 60;

        if (sec > 9) {sec = time % 60
        } else {sec = "0" + time %60}

        // HTML에 출력 되는 양식
        document.getElementById("timer").innerHTML = min + ":" + sec;
        time--;
        // 함수 timer() 가 끝나면 실행 되는 코드
        if (time < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Time out";
        }
    }, 1000);
}
