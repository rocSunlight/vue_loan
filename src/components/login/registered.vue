<template>

    <div class="login reset">
    <header class="mui-bar mui-bar-nav">
      <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to=""></router-link>
      <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group" action="http://192.168.1.108:8088/api/user/register" method="POST" id="registerForm1" >
        <div class="mui-input-row">
          <label><i class="jp-ico_telepohone"></i></label>
          <input style="width: 54%;margin-right:30%;" name="mobile" id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入手机号" >
          <span class="sms" id="sms2" >获取手机验证码</span>
        </div>
        <div class="mui-input-row">
          <label><i class="jp-ico_verification_code"></i></label>
          <input name="mobile_code" id='note' type="text" class="mui-input-clear mui-input" placeholder="输入短信验证码" >
        </div>
        <div class="mui-input-row">
          <label><i class="jp-ico_password"></i></label>
          <input name="password" id='password' type="password" class="mui-input-clear mui-input" placeholder="请填写密码" >
        </div>
        <div class="mui-content-padded">
          <button id='reg' class="mui-btn mui-btn-block mui-btn-primary">注册</button>
        </div>
        <div class="mui-content-padded oauth-area">

        </div>
      </form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  (function($, doc) {
    $.init();
    $.plusReady(function() {
      var settings = app.getSettings();
      var regButton = doc.getElementById('reg');
      var accountBox = doc.getElementById('account');
      var passwordBox = doc.getElementById('password');
      var passwordConfirmBox = doc.getElementById('password_confirm');
      var emailBox = doc.getElementById('email');
      regButton.addEventListener('tap', function(event) {
        var regInfo = {
          account: accountBox.value,
          password: passwordBox.value,
          email: emailBox.value
        };
        var passwordConfirm = passwordConfirmBox.value;
        if (passwordConfirm != regInfo.password) {
          plus.nativeUI.toast('密码两次输入不一致');
          return;
        }
        app.reg(regInfo, function(err) {
          if (err) {
            plus.nativeUI.toast(err);
            return;
          }
          plus.nativeUI.toast('注册成功');
          /*
           * 注意：
           * 1、因本示例应用启动页就是登录页面，因此注册成功后，直接显示登录页即可；
           * 2、如果真实案例中，启动页不是登录页，则需修改，使用mui.openWindow打开真实的登录页面
           */
          plus.webview.getLaunchWebview().show("pop-in",200,function () {
            plus.webview.currentWebview().close("none");
          });

        });
      });

    });

    $(document).on('click', '#sms2', function() {
      $this = $(this)[0];
      if($this.getAttribute('disabled') == 'disabled') {
        return false;
      }
      $.ajax('http://192.168.1.108:8088/api/code/send_register', {
        type: 'POST',
        dataType: 'json',
        data: {
          'mobile': $('input[name=mobile]')[0].value
        },
        success: function(data) {
          if(data.state == 'success') {
            $this.innerHTML = '发送成功';
            $this.setAttribute('disabled', 'disabled');
            $.toast('短信验证码发送成功');
          } else {
            if(data.msg) {
              $.toast(data.msg);
            } else {
              $.toast('短信验证码发送失败');
            }
          }
        },
        error: function(data) {
          $.toast('接口出错，请稍后再试');
        }
      })
    });
  }(mui, document));

  mui.ready(function() {
    mui(document).on('submit', '#registerForm1', function() {
      mui.ajax('http://192.168.1.108:8088/api/user/register', {
        type: 'POST',
        dataType: 'json',
        data: {
          mobile: mui('input[name=mobile]')[0].value,
          mobile_code: mui('input[name=mobile_code]')[0].value,
          password: mui('input[name=password]')[0].value
        },
        success: function(data) {
         mui.toast(data.data);
          if(data.state == 'fail') {
//            console.log(data.info);
          } else {
            mui.alert('<span class="span-text">注册成功</span>', '<span class="span-successful">提示</span>', function() {
              document.location.href='#/login';
            });
          }
        },
        error: function(data) {
          console.log(data);
        }
      });

      return false;
    });

  });
</script>

<style scope>
  mui-toast-message{
    line-height: 5rem;
  }
</style>


