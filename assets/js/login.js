$(function () {
    // localStorage.getItem('username')
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form

    var layer = layui.layer
    // 自定义一个正则表达式检测
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }

    })


    // 监听注册事件
    $('#form_reg').on('submit', function (e) {
        // 阻止提交默认事件
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('ok');
                $('#link_login').click()
            }
        )
    })


    // 监听提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: "/api/login",
            method: "post",
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登录成功的token值存入到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后面主页
                location.href = '/index.html'
            }
        })
    })






})