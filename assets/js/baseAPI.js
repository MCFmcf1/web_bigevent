$.ajaxPrefilter(function (options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url);

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 全局统一挂载comptelet函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            console.log('1')
            location.href = '/login.html'
        }


    }

})


// 'http://www.liulongbin.top:3007'


