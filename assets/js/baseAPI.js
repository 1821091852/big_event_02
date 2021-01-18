//开发环境
var baseURL = 'http://api-breakingnews-web.itheima.net';

//每次调用get,post,ajax方法的时候,会先调用ajaxPrefilter这函数
$.ajaxPrefilter(function (options) {
    //在发起ajax请求之前,统一拼接请求的根路径
    options.url = baseURL + options.url;
    // alert(options.url)

    // 查不到的值,indexOf()为-1
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
        Authorization: localStorage.getItem
        ("token") || ""
        }
    }
    
//3.拦截所有响应,判断身份的认证信息
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            localStorage.removeItem("token");
            location.href="/login.html"
        }
    }
})