$(document).ready(function () {
    get_line_info();
})

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

function random_int() {
    const line_no = Math.floor(Math.random() * 732)
    return line_no
}


