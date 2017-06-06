<template>
  <jroll-infinite3 class="div-scroll" id="div-scroll2">
    <ul class="mui-table-view show">
      <li class="mui-table-view-cell" v-for="item in info" >
        <div class="title">
          <span class="titles">{{type[item.type]}}</span>
          <small class="time">{{item.add_time | formatDate}}</small>
        </div>

        <span class="mui-badge " :class="{ green : operation[item.type]=='-'}">{{operation[item.type]}}{{item.money}}</span>
      </li>

      <input type="hidden" class="nexturl" value="aa">
    </ul>
  </jroll-infinite3>
</template>

<script type="text/ecmascript-6">
  //formatDate时间戳转换
  import {formatDate} from '../../style/js/time'

  var _this4 = {} //用于储存vue数据的this
  var _page4 = ''
  export default {
    name: 'cash',
    data(){
      return {
        token1: this.$store.state.user.token,
        info: [],
        type: [],
        total_page: '',
        operation: '',

      }
    },
    created(){
      _this4 = this
      this.$http.get('http://' + this.$store.state.urlIp + '/api/home/balance/type/1', {params: {token: this.token1}}).then(response => {
        this.info = response.body.info
        this.type = response.body.money_type
        this.operation = response.body.money_types
        this.total_page = response.body.total_page

        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#div-scroll2");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        jroll.refresh();
        if (this.info.length === 0) {
          jroll.disable()
        }
      })
    },
    activated(){

      var jroll = new JRoll("#div-scroll2");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time) * 1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      'jroll-infinite3': JRoll.VueInfinite({
        tip: '<img src="./static/image/006.gif">正在加载...</img>',
        pulldown: {
          refresh: function (complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this4.total_page  //获取后台传来的数据页数
          var token = _this4.token1

          //判断数据是否存在，有则刷新
          if (_this4.info.length === 0) {
            me.tip = '暂无数据'
          } else {
            if (me.page === page - 1) {
              me.tip = '已全部加载完成'
            } else {
              me.tip = '<img class="homeLoding" src="./static/image/006.gif" >正在加载...</img>'
            }
          }

          if (me.page < ( (page === 1)? page = 1 : page = page - 1)) {

            if (typeof complete === 'function') {
              _page4 = 0
              _this4.info = []
            } else {
              _page4++
              me.page++
            }

            mui.ajax({
              url: 'http://' + this.$store.state.urlIp + "/api/home/balance/type/1?token=" + token + "&p=" + (_page4 + 1),
              type: "get",
              success: function (data) {
               console.log('我是任务的'+_page4 + '+' + me.page + '+' + page)
                var jons = JSON.parse(data)
                if (typeof complete === 'function') {
                  _this4.info = _this4.info.concat(jons.info)
                  me.page = 0
                  complete()
                } else {
                  _this4.info = _this4.info.concat(jons.info)
                }
              }
            })
          }
        }
      }, {
        scrollBarY: false,
//        bounce :false,
//        scrollBarFade:true
      })
    },
    //缓存时离开的状态
    deactivated(){
      //在离开的时候把缓冲的_page值还原
      if (_page4 >= this.total_page - 1) {
        _page4 = 0
      }
      console.log( '我是任务的'+_page4 + '+' + this.total_page)
    },
    //路由切换后的状态
    beforeDestroy(){
      _page4 = 0
      console.log( '我是任务的'+_page4 + '+' + this.total_page)
    }
  }

</script>

