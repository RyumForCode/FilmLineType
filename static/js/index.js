// 한번만 실행 되는 함수 is_action()
var is_action = false;
// 타이머 작동 함수 timer()
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
            popup()
        }
    }, 1000);
}