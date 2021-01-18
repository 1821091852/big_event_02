$(function () {
    getUserInof();

    //2.退出
    var layer = layui.layer;
    $("#btnLogout").on('click', function () {
    // 在 layui里的弹出层的询问 复制的
    layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
        //1.清空本地token
        localStorage.removeItem("token");
        //2.页面跳转
        location.href = "/login.html";
        //关闭询问框
        layer.close(index);
        });
    })
});

// 获取用户基本信息(原因:后面的其他页面也要调用)
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem
        //     ("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvator(res.data);
        }
    })
}

function renderAvator(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}