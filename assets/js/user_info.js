$(function () {

    var layer = layui.layer
    //  导入layform的方法
    var form = layui.form
    // form正则属性
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间'
            }
        }
    })

    initUserInfo()



    function initUserInfo() {
        $.ajax({
            method: "get",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                console.log(res);
                // 直接用form提供的方法给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })


    // 提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            // 直接获取表单值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改ok')
                window.parent.getUserInfo()
            }
        })
    })




})