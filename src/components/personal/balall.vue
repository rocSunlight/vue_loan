<template>
  <jroll-infinite class="div-scroll">
    <ul class="mui-table-view show">
      <li class="mui-table-view-cell" v-for="item in info" >
        <div class="title">
          <span class="titles">{{type[item.type]}}</span>
          <small class="time">{{item.add_time | formatDate }}</small>
        </div>

        <span class="mui-badge " :class="{ green : operation[item.type]=='-'}">{{operation[item.type]}}{{item.money}}</span>
      </li>
      <input type="hidden" class="nexturl" value="aa">
    </ul>
  </jroll-infinite>
</template>

<script type="text/ecmascript-6">
  //formatDate时间戳转换
  import {formatDate} from '../../../static/js/date'

  const _this = {} //用于储存vue数据的this
  const _page = 1
  export default {
    data(){
      return {
        token1: JSON.parse(localStorage.user),
        info: [],
        type: [],
        total_page : '',
        operation: '',

      }
    },
    created(){
      _this = this
      this.$http.get('api/home/balance', {params: {token: this.token1.token}}).then(response => {
        this.info = response.body.info
        this.type = response.body.money_type
        this.operation = response.body.money_types
        this.total_page = response.body.total_page
      })
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time)*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<div class="loadhide"><img src="../../../static/image/006.gif">正在加载...</img></div> ',
        bottomed: function () {
          var me = this
          var page = _this.total_page  //获取后台传来的数据页数
          var token = _this.token1.token
          if (_page < page) {
            mui.ajax({
              url: "http://192.168.1.168:8089/api/home/balance?token="+token+"&p="+(_page+1),
              type:"get",
              success: function (data) {
                $('.loadhide').addClass('loadshow') //显示加载
                setTimeout(function () {
                  _page++ // 请求成功将page加1，失败则不要改变page
                  var jons = JSON.parse(data)
                  _this.info = _this.info.concat(jons.info)
                  if (_page === page) {
                    me.tip = '已全部加载完成'
                  }
                })
              }
            })
          }
        }
      }, {
        scrollBarY: true,
        bounce :false,
        scrollBarFade:true
      })
    }
  }


</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
