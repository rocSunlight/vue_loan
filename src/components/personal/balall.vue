<template>
  <div class="div-scroll">
    <ul class="mui-table-view show">
      <li class="mui-table-view-cell" v-for="item in info" >
        <div class="title">
          <span class="titles">{{type[item.type]}}</span>
          <small class="time">{{item.add_time | time}}</small>
        </div>

        <span class="mui-badge " :class="{ green : operation[item.type]=='-'}">{{operation[item.type]}}{{item.money}}</span>
      </li>
      <input type="hidden" class="nexturl" value="aa">
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  //mui滚动条下执行a标签跳转
  mui('body').on('tap','a',function () {
    document.location.href=this.href
  })

  export default {
    data(){
      return {
        token1: JSON.parse(localStorage.user),
        info: [],
        type: [],
        operation: '',

      }
    },
    mounted(){
      this.$nextTick(function () {

        this.$http.get('api/home/balance', {params: {token: this.token1.token}}).then(response => {
          this.info = response.body.info
          this.type = response.body.money_type
          this.operation = response.body.money_types
//          console.log(response.body)
        })
      })
    },
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
      line-height: 0.55rem
    .title .time
      color: #666;font-size: 0.34rem;
    .div-scroll
      position absolute
      top: 1.36rem;
      bottom: 0;
      left: 0;
      right: 0;
</style>
