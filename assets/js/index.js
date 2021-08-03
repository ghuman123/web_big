
$(function () {
    // 调用函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            location.href = '/login.html'

            // 关闭confirm  询问框
            layer.close(index)
        })
    })

})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 无论成功与否，都会调用这个回调函数
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
        //         localStorage.removeItem('token')//强制清空token
        //     location.href = '/login.html'//强制跳转登录页面
        // }
    })
}
// 渲染用户头像 和名称
function renderAvatar(user) {
    // 拿到用户名
    var name = user.nickname || user.username
    $('#welocme').html('欢迎&nbsp;&nbsp;' + name)
    // 先判断用户是否有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}