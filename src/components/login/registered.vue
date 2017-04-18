<template>
    <div class="login reset">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" href="/"></a>
      <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group"  @submit.prevent="submit">
        <div class="mui-input-row">
          <label><i class="jp-ico_telepohone"></i></label>
          <input style="width: 54%;margin-right:30%;" name="username" id='account' type="text" class="mui-input-clear mui-input" placeholder="请填写账号" v-model="form.username">
          <a class="sms" href="#">获取手机验证码</a>
        </div>
        <div class="mui-input-row">
          <label><i class="jp-ico_verification_code"></i></label>
          <input name="password" id='password' type="password" class="mui-input-clear mui-input" placeholder="请填写密码" v-model="password">
        </div>
        <div class="mui-input-row">
          <label><i class="jp-ico_password"></i></label>
          <input name="password" id='password' type="password" class="mui-input-clear mui-input" placeholder="请填写密码" v-model="password">
        </div>
        <div class="mui-content-padded">
          <button id='login' class="mui-btn mui-btn-block mui-btn-primary">注册</button>
        </div>
        <div class="mui-content-padded oauth-area">

        </div>
      </form>
    </div>
  </div>
</template>

<script >
  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'

  export default {
    data() {
      return {
        btn: false, //true 已经提交过， false没有提交过
        password: '',
        form: {
          token:'',
          username: ''
        }
      }
    },

    methods: {
      ...mapActions([USER_SIGNIN]),
      submit() {
        //判断是否点击提交后验证用户名和密码
        this.btn = true
        if(!this.form.username && !this.password) {
          mui.toast('用户名和密码不能为空')
          return
        }
        if(!this.form.username){
            mui.toast('请输入用户名')
          return
        }
        if(!this.password){
          mui.toast('请输入密码')
          return
        }

        //向后端发送数据，返回token状态
        this.$http.post('/api/user/login', {username:this.form.username,password:this.password}).then(response=>{
            // 获取后台返回的token状态
          if(response.body.state === 'fail'){ // 判断后台返回state数据类型为fail则返回
            mui.toast('用户名或密码错误')
            return false
          }
          //用户登录成功后储存token状态传给后台
          this.form.token = response.body.data.token
          this.$http.post('/api/user/user', {token: this.form.token}).then(response => {
            //判断登录 成功后跳转到个人中心页面
            this.USER_SIGNIN(this.form)
            mui.toast('登录成功')
            this.$router.replace({path: '/personal'})
          })

        },response => {
          console.log('请求失败1')
        })

      }
    }
  }
</script>


