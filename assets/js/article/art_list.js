$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage


    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (data) {
        const dt = new Date(data)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())



        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss


    }


    // 定义补零的函数
    function padZero(n) {
        return n <= 9 ? '0' + n : n
    }



    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }

    initTable()
    initCate()


    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('错错错')
                }
                // 使用模板引擎渲染
                // console.log(res);
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                renderPage(res.total)
            }
        })
    }



    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败')
                }
                // 渲染模板
                var htmlstr = template('tpl-cate', res)
                // console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr)
                // 通知layui重新渲染表单的结构
                form.render()
            }
        })
    }


    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name = cate_id]').val()
        var state = $('[name = state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })


    // 定义一个渲染分页的函数
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',    //装分页的容器id
            count: total,       //总数据条数
            limit: q.pagesize,  //每页显示的条数
            curr: q.pagenum,    //默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5],


            // 分页发生切换的时候 触发的函数
            jump: function (obj, first) {
                console.log(first);
                q.pagenum = obj.curr

                // 把最新的条目数，赋值到q上面
                q.pagesize = obj.limit
                // initTable() 这里直接调用渲染会陷入死循环
                if (!first) {
                    initTable()
                }
            }
        })
    }


    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        // 拿到删除按钮的个数
        var len = $('.btn-delete').length
        // 获取到文章的id
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('没删掉')
                    }
                    layer.msg('删掉了啊')

                    // 判断页面上删除按钮的个数，如果等于1那删完之后就没有数据了 
                    // 所以先页面-1在渲染就ok
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }

                    initTable()
                }
            })

            layer.close(index);
        });
    })





})