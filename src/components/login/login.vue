<template>
  <div class="login ">
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">登录</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group"  @submit.prevent="submit">
        <div class="mui-input-row">
          <label><i class="jp-ico_telepohone"></i></label>
          <input name="username" id='account' type="text" class="mui-input-clear mui-input" placeholder="请填写账号" v-model="form.username">
        </div>
        <div class="mui-input-row">
          <label><i class="jp-ico_password"></i></label>
          <input name="password" id='password' type="password" class="mui-input-clear mui-input" placeholder="请填写密码" v-model="password">
        </div>

        <div class="mui-content-padded">
          <button id='login' class="mui-btn mui-btn-block mui-btn-primary">登录</button>
          <div class="link-area"><a id='reg' href="#/registered">注册账号</a> <span class="spliter">| <a id='reg1' href="#/reset">忘记密码</a> </span>
          </div>
        </div>
        <div class="mui-content-padded oauth-area">

        </div>
      </form>
    </div>

    <!--底部导航-->
    <nav-gation :clicked="false" :clicked2="true"></nav-gation>
  </div>
</template>

<script  type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { USER_SIGNIN } from '../../style/js/user'
  import Navigation from '../navigation/navigation'


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


            //判断登录 成功后跳转到个人中心页面

            this.USER_SIGNIN(this.form)
            mui.toast('登录成功')
            this.$router.replace({path: '/personal'})


        })

      }
    },
    components: {
      'nav-gation' : Navigation,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >

  .login
    .mui-content
      background-color #f5f5f5
    input:-webkit-autofill
      background-color rgb(255, 255, 255) !important
    .mui-input-row label i
      font-size: 0.45rem
      color: #fb5a5a
      vertical-align: text-bottom;
    .span4
      label
        padding: 11px 15px
        vertical-align: super
    .mui-input-group
      margin-top: 10px
      label
        width: inherit;
      .mui-input-row:after
        left: 0px
    &.:first-child
      margin-top: 20px;
    .mui-btn-primary
      border:0
      background-color: #fb5a5a
    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea
      width: 84%
      padding: 0
    .mui-checkbox input[type=checkbox],
    .mui-radio input[type=radio]
      top: 6px
    .mui-content-padded
      width: 92%;
      margin: 0.8rem auto 0;
    .mui-btn
      line-height: 1rem;
      padding: 0;
      border-radius: 8px;
      font-size 0.32rem
    .link-area
      display: block
      margin-top: 0.5rem
      text-align: center
      padding-bottom: 15px
      .spliter
        color: #bbb
        padding: 0px 0.4rem
        font-size: 00.4rem
      a
        color: #007aff
        font-size: 0.32rem;
    .oauth-area
      position: absolute
      bottom: 20px
      left: 0px
      text-align: center
      width: 100%
      padding: 0px
      margin: 0px
    .mui-input-group:after
      height: 0
    #reg1
      margin-left: 0.35rem
  .reset
    .mui-input-row .sms
      position: absolute;
      right: 3%;
      top: -1%;
      font-size: 0.24rem;
      padding 0.08rem
      color: #fb5a5a;
    .mui-btn-yell
      background-color #ffad3e
      color #fff
    .mui-bar .mui-icon
      font-size: 0.6rem;
      left: 2.5%;
      top: 11%;
      color: #007aff;
</style>
