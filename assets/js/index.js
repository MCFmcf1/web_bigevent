$(function () {
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').click(function () {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1清空本地数据
            localStorage.removeItem('token')

            // 2跳转回登录页面
            location.href = '/login.html'
            layer.close(index);
        });

    })

})











// 获取用户的基本信息函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败')
            }
            // 调用这个渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败都会调用这个函数
        // complete: function (res) {
        //     // console.log('555');
        //     console.log(res);
        //     // 在这个回调中都会有个res.responseJSON属性用来判断
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         // location.href = '/login.html'
        //     }
        // }

    })
}





// 渲染
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎 ' + name)

    // 获取用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}