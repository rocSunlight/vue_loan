<template>
  <div class="navigation">
    <div class="jp-nav border-1px border-top">
      <div class="nav-item">
        <router-link to="/home" :class="{active : clicked}">
          <i :class="clicked? 'jp-btn_homehl':'jp-btn_home'" ></i>
          <span class="text">首页</span>
        </router-link>
      </div>

      <div class="nav-item">
        <router-link to="/personal" :class="{active : !clicked2}">
          <i :class="clicked2? 'jp-btn_account' : 'jp-btn_accounthl'"></i>
          <span class="text">个人中心</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        bottomNav: 'movies',
        bottomNavColor: 'movies',
      }
    },
    //接收父元素传来的参数值
    props: {
      clicked: {
        type: Boolean
      },
      clicked2: {
        type: Boolean
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .navigation
    position fixed
    bottom 0
    left 0
    right 0
    height: 1.36rem;
    background-color: #fff;
    z-index: 99;
    .jp-nav
      background-color #fff
      height 1.306rem
      position: fixed !important
      bottom: 0
      left: 0
      right: 0
      display: flex
     .nav-item
       flex: 1
       text-align: center
       a
        color #7e8c8d ;display: block;    line-height: 0;    margin-top: 0.1rem;
        &.active
          color #fb5a5a
        i
          font-size: 0.64rem
          margin-bottom: 0.1rem;
          display: inline-block;
        .text
          display: block
          font-size: 0.32rem
          line-height: 0.32rem;
</style>
