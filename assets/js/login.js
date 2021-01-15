$(function () {
    $('#link_reg').on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    $('#link_login').on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    //3.注册表单验证
    // 获取form
    var form = layui.form;
    // form.verify 表单自定义验证
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须为6-16位，且不能输入空格"
        ],
        //确认密码规则
        repwd: function (value) {
            var pwd = $(".reg-box input[name=password]").val()
            if (pwd !== value ) {
                return "两次密码输入不一致";
            }
        }
    });
    //4.监听注册表单的提交事件
    var layer=layui.layer
    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username:$(".reg-box input[name=username]").val(),
                password:$(".reg-box input[name=password]").val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录")
                //手动切换到登录页面
                $("#link_login").click();
                // 重置form表单,清空输入框的内容
                $("#form_reg")[0].reset();
            }
        })
    })

    //5.监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提示信息,保存token
                layer.msg("恭喜您,登录成功!")
                //保存token
                localStorage.setItem("token", res.token);
                //跳转
                location.href = "/index.html"
            }
        })
    });
})