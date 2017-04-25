<template>
  <div class="balance">
    <div class="mui-content">

      <div style="padding-top: 0.266rem;">
        <div  class="select-nav">
          <router-link class="select-item " to="/balance/balall">
            全部
          </router-link>
          <router-link class="select-item " :to="{name : 'Cash'}">
            任务返利
          </router-link>
          <router-link class="select-item "  :to="{name : 'Balance2'}">
            提现明细
          </router-link>
        </div>
      </div>
      <div class="h20 bgf5"></div>
      <router-view></router-view>

      <!--底部导航-->
      <nav-gation :clicked="false" :clicked2="false"></nav-gation>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from '../navigation/navigation'

  //  jroll滚动条
  import '../../../static/js/jroll.min'
  import '../../../static/js/jroll-vue-infinite'
  //mui滚动条下执行a标签跳转
  mui('body').on('tap','a',function () {
    document.location.href=this.href
  })

  export default{
    components:{
      'nav-gation' : Navigation
    }
  }


</script>

<style lang="stylus" rel="stylesheet/stylus">
  .balance
    .mui-control-content.mui-active
      display: block;
      position: absolute;
      top: 1.36rem;
      bottom: 0;
      left: 0;
      right: 0;
    .mui-badge
      background-color: inherit;
      font-size 0.48rem
      color: #fb5a5a;
      margin-right 0.29rem
      &.green
        color #01bf5f
    .title .titles,.title .time
      display: block;font-size:0.4rem;color: #333;
    .title .titles
      line-height: 0.7rem
    .title .time
      color: #666;font-size: 0.34rem;
    .div-scroll
      position absolute
      top: 1.36rem;
      bottom: 1.506rem;
      left: 0;
      right: 0;
    .loadhide
      opacity 0
      &.loadshow
        opacity 1
</style>
