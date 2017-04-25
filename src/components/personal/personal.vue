<template>
  <div class="personal">
    <div class="jp-content">
          <div class="user-top">
            <div class="user">
              <div class="avatar"><a href="#"><i class="jp-btn_head_portrait"></i></a></div>
              <div class="user-name">
                <h1>{{user.mobile}}</h1>
              </div>
            </div>
            <div class="user-money">
              <h1>我的余额<small>（元）</small></h1>
              <span>{{user.money}}</span>
              <router-link  class="mui-btm withdrawal" to="/withdrawal">提现</router-link>
            </div>
          </div>
          <div class="h20"></div>
          <div class="list">
            <ul class="mui-table-view">
              <li class="mui-table-view-cell">
                <router-link class="mui-navigate-right"  to="/balance/balall">
                  <i class="jp-iconred_packet"></i>
                  <span><i class="jp-ico_fund_details"></i>资金明细</span>
                </router-link>
              </li>
              <li class="mui-table-view-divider"></li>
              <li class="mui-table-view-cell">
                <router-link class="mui-navigate-right" to="/task/taskall">
                  <i class="jp-iconmyinvite"></i>
                  <span><i class="jp-ico_task_log"></i>任务记录</span>
                </router-link>
              </li>
              <li class="mui-table-view-divider"></li>
              <li class="mui-table-view-cell last">
                <router-link class="mui-navigate-right" to="/profile" >
                  <i class="jp-iconranking_list"></i>
                  <span><i class="jp-ico_account_information"></i>用户信息</span>
                </router-link>
              </li>
              <li class="mui-table-view-divider"></li>
              <li class="mui-table-view-cell last">
                <router-link class="mui-navigate-right" to="/account" :username="username">
                  <i class="jp-iconranking_list"></i>
                  <span><i class="jp-ico_account_information2"></i>账户信息</span>
                </router-link>
              </li>
              <li class="mui-table-view-divider"></li>
              <li class="mui-table-view-cell last"  @click="submit">
              <span >
                <i class="jp-iconranking_list"></i>
                <span ><i class="jp-log-off"></i>退出账户</span>
              </span>
              </li>
            </ul>
          </div>
          <div class="h20"></div>
    </div>

    <!--底部导航-->
    <nav-gation :clicked="false" :clicked2="false"></nav-gation>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from '../navigation/navigation'
  import { mapState } from 'vuex'
  import { mapActions } from 'vuex'
  import { USER_SIGNOUT } from '../../style/js/user'

  export default {
    data() {
      return {
        token1 :JSON.parse(localStorage.user), //读取本地储存的token
        username : '我叫',
        user : {}
      }
    },
    computed: mapState({ user: state => state.user }),
    created(){
      this.$http.get('api/user/user',{params : {token : this.token1.token}}).then( response => {
          this.user = response.body.user

      })
    },
    methods: {
      ...mapActions([USER_SIGNOUT]),
      submit() {
        this.USER_SIGNOUT()
        this.$router.replace({ path: '/login' })
      },

    },
    components: {
      'nav-gation' : Navigation,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  .personal
    height: 100%;
    .jp-content
      height: 100%;
      background-color: #f5f5f5
    .user-top
      background-image: url(/static/image/bg_acconut.png);
      height: 4.533rem;
      box-sizing: border-box;
      padding: 0.4rem 0.4rem 0.346rem ;
      background-size: 100%;
      background-position: center;
      .user
        display: flex;
        .avatar
          flex: 0 0 1rem;
          width: 1rem
          a
            display block
            i
              font-size 0.93rem
              color #fff
        .user-name
          flex: 1;margin-left: 10px;position: relative
          h1
            font-size: 0.36rem
            color: #fff
            margin-bottom: 6px;
            line-height: 1rem
          span
            font-size: 12px;color: #fff
      .user-money
        text-align: center
       h1
        font-size: 0.48rem;color: #fff ;line-height: 30px
       small
         font-size:80%
       span
          font-size: 0.8rem;
          color: #fff
          display inline-block
          line-height 1.5rem
      .withdrawal
        display: block;
        width: 1.946rem;
        border: 2px solid #fff;
        border-radius: 6px;
        line-height: 0.68rem;
        font-size: 0.346rem;
        color: #fff;
        margin: 0 auto
    .mui-table-view-divider
      padding-top: 0.133rem;
      padding-bottom:  0.133rem;
      background-color: #f5f5f5;
    .mui-table-view:before
      height: 0;
    .mui-table-view-cell:after
      left: 0;
    .mui-table-view-divider:before
      background-color: #fff;
    .mui-table-view-divider:after
      background-color: #fff;
    .mui-table-view-cell i
      font-size: 0.586rem;
      vertical-align: middle;
      margin-right: 0.133rem;
      display: inline-block;
    .mui-table-view-cell span
      vertical-align: middle;
      font-size: 0.373rem
    .mui-table-view-cell>a:not(.mui-btn)
      margin 0
      padding: 0;
</style>
