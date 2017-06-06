<template>
  <div class="balance">
    <div class="mui-content">

      <div style="padding-top: 0.266rem;">
        <div  class="select-nav">
          <div class="select-item "  :class="{active:active===1}" @click="teb(1)">
            全部
          </div>
          <div class="select-item " :class="{active:active===2}"  @click="teb(2)">
            任务返利
          </div>
          <div class="select-item " :class="{active:active===3}"  @click="teb(3)">
            提现明细
          </div>
        </div>
      </div>
      <div class="h20 bgf5"></div>

        <bcontent :active="active"></bcontent>

      <!--底部导航-->
      <nav-gation :clicked="false" :clicked2="false"></nav-gation>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from '../navigation/navigation'
  import bcontent from '../personal/bcontent'
//
//  //  jroll滚动条
//  import '../../../static/js/jroll.min'
//  import '../../../static/js/jroll-vue-infinite'

  //mui滚动条下执行a标签跳转
  mui('body').on('tap','a',function () {
    document.location.href=this.href
  })


  export default{
    name : 'balance',
    data(){
        return {
          active : 1
        }
    },
    methods:{
      teb:function(s){
        this.active = s

      }
    },
    components:{
      'nav-gation' : Navigation,
      'bcontent' : bcontent
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
