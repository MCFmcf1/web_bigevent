$(function () {

    var form = layui.form
    var layer = layui.layer

    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // console.log(res);
                var htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                // 从新渲染页面
                form.render()
            }
        })
    }

    // 裁剪区域
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 选择图片区
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 拿到图片
    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return
        }
        // 把文件赋值url地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域替换
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })


    var art_state = '已发布'


    // 存为草稿绑定事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })



    // 表单提交
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 基于form表单快速创建一个formdata对象
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)

        // 将才见过后的图片添加的fd的属性里
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 添加
                fd.append('cover_img', blob)
                // 提交数据
                publishArticle(fd)

            })
    })

    // 定义一个发送数据的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('oooooooook')
                location.href = './art_list.html'
            },

        })
    }

})