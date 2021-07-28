$(function () {
    // 1.登录与注册页面的切换
    // 点击注册账号 跳转到注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击登录 跳转到登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.密码框的自定义与校验
    // 从layui 中获取 from  对象
    var form = layui.form
    var layer = layui.layer

    // 通过 form.verify()  函数自定义校验规则
    form.verify({
        // 自定义了一个 pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {//通过形参 value 拿到确认密码框的值
            // 再拿到第一次输入密码的值 
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 3.监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录！')
            // 手动调用点击事件，成功后跳转至登录页面
            $('#link_login').click()
        })
    })
    // 3.监听登录表单提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        // var data = $(this).serialize()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})