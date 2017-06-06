<template>
  <jroll-infinite class="div-scroll" id="div-scroll1">
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
  import {formatDate} from '../../style/js/time'

  var _this2 = {} //用于储存vue数据的this
  var _page = ''
  export default {
    name : 'balall',
    data(){
      return {
        token1:this.$store.state.user.token,
        info: [],
        type: [],
        total_page : '',
        operation: '',
        pg : ''

      }
    },
    created(){
      _this2 = this
      this.$http.get('http://'+this.$store.state.urlIp+'/api/home/balance', {params: {token: this.token1}}).then(response => {
        this.info = response.body.info
        this.type = response.body.money_type
        this.operation = response.body.money_types
        this.total_page = response.body.total_page


        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#div-scroll1");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if(this.info.length === 0){
          jroll.disable()
        }

      })
    },
    activated(){
      var jroll = new JRoll("#div-scroll1");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time)*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img src="./static/image/006.gif">正在加载...</img> ',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this2.total_page  //获取后台传来的数据页数
          var token = _this2.token1

          //判断数据是否存在，有则刷新
          if(_this2.info.length === 0){
            me.tip = '暂无数据'
          }else {
            if (me.page === page-1 ) {
              me.tip = '已全部加载完成'
            }else {
              me.tip = '<img class="homeLoding" src="./static/image/006.gif" >正在加载...</img>'
            }
          }
          if (me.page < ( (page === 1)? page = 1 : page = page - 1)) {
            if(typeof complete === 'function'){
              _page = 0
              _this2.info = []
            }else {
              _page ++
              me.page++
            }
            mui.ajax({
              url: 'http://'+this.$store.state.urlIp+"/api/home/balance?token="+token+"&p="+(_page+1),
              type:"get",
              success: function (data) {
                var jons = JSON.parse(data)
                if (typeof complete === 'function') {
                  _this2.info = _this2.info.concat(jons.info)
                  me.page = 0
                  complete()
                }else{
                  _this2.info = _this2.info.concat(jons.info)
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
     if( _page >= this.total_page -1 ){
       _page = 0
     }
//      console.log( '我是全部的'+_page + '+' + this.total_page)
    },
    //路由切换后的状态
    beforeDestroy(){
      _page = 0
    }
  }


</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
