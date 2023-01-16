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
            // console.log(response['movieLines'])
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

// formerge


