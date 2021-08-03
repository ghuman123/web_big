// 每次发起$.get/post/ajax() 的时候，都会调用这个函数
// 这里的options  就是调ajax传递的配置对象
$.ajaxPrefilter(function (options) {
    // 拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载  complete  回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
            localStorage.removeItem('token')//强制清空token
        location.href = '/login.html'//强制跳转登录页面
    }
})