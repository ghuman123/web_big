// 每次发起$.get/post/ajax() 的时候，都会调用这个函数
// 这里的options  就是调ajax传递的配置对象
$.ajaxPrefilter(function (options) {
    // 拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})