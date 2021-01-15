//开发环境
var baseURL = 'http://api-breakingnews-web.itheima.net';

//每次调用get,post,ajax方法的时候,会先调用ajaxPrefilter这函数
$.ajaxPrefilter(function (options) {
    //在发起ajax请求之前,统一拼接请求的根路径
    options.url = baseURL + options.url
    // alert(options.url)
})