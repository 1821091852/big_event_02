$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度在1-6之间"
            }
        }
    });
    //2.用户渲染
    initUserInfo();
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method:"GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val("formUserInfo",res.data)
            }
        })
        
    }
    //3.重置表单
    $('#btnReset').on("click", function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //4.修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method:"POST",
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("res.message")
                }
                layui.layer.msg("更新用户信息成功")
                //调用父亲页面中的更新用户信息和头像的方法(这里以前写的是of只能用of)
                window.parent.getUserInof();
            }
        })
    })
})