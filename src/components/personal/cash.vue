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
        this.$http.get('api/home/balance/type/1', {params: {token: this.token1.token}}).then(response => {
          this.info = response.body.info
          this.type = response.body.money_type
          this.operation = response.body.money_types
        })
      })
    },
  }


</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
