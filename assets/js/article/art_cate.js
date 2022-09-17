$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCatelListo()



    function initArtCatelListo() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
            }
        })
    }


    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '300px'],
            content: $('#dialog-add').html(),
        })
    })



    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                initArtCatelListo()
                layer.msg('提交成功')
                layer.close(indexAdd)
            }
        })
    })


    // 编辑
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '300px'],
            content: $('#dialog-edit').html(),
        })


        var id = $(this).attr('data-id')

        $.ajax({
            method: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val('form-edit', res.data)

            }
        })
    })



    // 通过代理方式
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败了')
                }
                layer.msg('修改成功了')
                layer.close(indexEdit)
                initArtCatelListo()

            }
        })
    })



    // 删除
    $('tbody').on('click', '.btn_delete', function () {
        var id = $(this).attr('data-id')
        // 询问框
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('没删掉')
                    }
                    layer.msg('删掉了')
                    layer.close(index)
                    initArtCatelListo()
                }
            })


        });
    })





})