<template>

    <div class="home">


        <!--轮播图-->
      <div class="jp-content">
          <jroll-infinite class="jroll-scroll" id="wrapper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <router-link to="/">
                <img width="100%" src="static/image/banner.png" alt="广告图" @click="close()">
              </router-link>
            </div>
            <div class="swiper-slide">
              <router-link to="/">
                <img  width="100%" src="static/image/banner.png" alt="广告图">
              </router-link>
            </div>
          </div>
          <!-- 分页器 -->
          <div class="swiper-pagination"></div>
        </div>

        <div class="list-title">
          <em class="border-2px redBg"></em><span class="title">任务精选</span>
        </div>

        <ul class="list-item">
          <li class="item" v-for="(item,$index) in someData">
            <router-link :to="{ name: 'Details', params: { userId: item.id }}" replace :urlid="item.id">
              <div class="item-left">
                <img :src="'http://'+$store.state.urlIp+item.c_img" :alt="item.c_name">
                <span class="item-name" v-text="item.c_name"> </span>
                <span class="text-right"><i class="jp-ico_residual_task"></i>剩余佣金 <span>{{item.money*item.last_num}}</span> 元</span>
              </div>
              <div class="item-right">

                <div class="item-div">
                  <span>投资本金 <span>{{item.capital}}元</span></span>
                  <span>投资利息 <span><strong>{{item.interest_rate}}</strong>元</span></span>
                </div>
                <div class="item-div">
                  <span>投资期限 <span>{{item.duration}}天</span></span>
                  <span>剩余任务 <span>{{item.last_num}}个</span></span>
                </div>
                <div class="price">
                  <div class="new-price">
                    <span class="text">任务返利</span>
                    <span class="prices">￥<em>{{item.money}}</em></span>
                  </div>

                </div>
              </div>
            </router-link>
          </li>
        </ul>
        </jroll-infinite>
      </div>
      <!--底部导航-->
      <nav-gation :clicked="true" :clicked2="true"></nav-gation>
    </div>

</template>

<script type="text/ecmascript-6">

  //swiper轮播图
  import '../../../static/js/swiper-3.4.2.min'
//  jroll滚动条
  import '../../../static/js/jroll.min'
  import '../../../static/js/jroll-vue-infinite'
  import '../../../static/js/jroll-pulldown.min'
  //  底部导航
  import Navigation from '../navigation/navigation'

  var _this = {}//用于储存vue数据的this
  var _datapage = '';
  export default {
    //mounted 生命周期钩子
    name : 'home',
    data() {
      return {
        someData:[],
        num: 10,
        t_page : '',
      }
    },
    created(){
      _this = this
      this.$http.get('http://'+this.$store.state.urlIp+'/api/home/indexs' ).then(response=> {
        this.t_page = response.body.t_page
        const rel = response.body
        this.someData = rel.info

        //判断数据是否有数据，有则刷新，没有的话禁止滚动
        var jroll = new JRoll("#wrapper");
        //do something，例：动态修改scroller的内容，使scroller的高度发生变化
        if(this.someData.length === 0){
          jroll.disable()
        }
      })

    },
    activated(){
      var jroll = new JRoll("#wrapper");
      //do something，例：动态修改scroller的内容，使scroller的高度发生变化
      jroll.refresh();
    },
    mounted(){
      //实例化轮埠图
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: 3000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      })
      // 扩展API加载完毕后调用onPlusReady回调函数
      document.addEventListener( "plusready", onPlusReady, false );

      // 扩展API加载完毕，现在可以正常调用扩展API
      function onPlusReady() {
          if(_this.$route.name === 'Hello'){
//            var _toast = false;
//            //用于修改系统自动的toast事件
//            mui.back = function() {
//              if(!_toast || !_toast.isVisible()) {
//                _toast = mui.toast('点击确认退出', {});
//              } else {
//                plus.runtime.quit();
//              }
//            }
            plus.key.addEventListener( "backbutton", onKeyBack, false );
          }

      }

      function onKeyBack() {
        if(_this.$route.name === 'Hello'){

          window.history.forward(1);
          mui.confirm('确定要退出闪财宝吗？', '提示', new Array('取消', '确认'), function (e) {
            if (e.index == 1) {
              plus.runtime.quit()
            } else {
            }
          });
        }

      }

    },


    components: {
      'nav-gation': Navigation,
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img class="homeLoding" src="./static/image/006.gif" >正在加载...</img>',
        pulldown: {
          refresh: function(complete) {
            //完成加载数据的操作后回调执行complete方法
            complete();
          }
        },
        bottomed: function (complete) {
          var me = this
          var page = _this.t_page  //获取后台传来的数据页数

          //判断数据是否存在，有则刷新
          if(_this.someData.length === 0){
            me.tip = '暂无数据'
          }else {
            if (me.page === page-1 ) {
              me.tip = '已全部加载完成'
            }else {
              me.tip = '<img class="homeLoding" src="./static/image/006.gif" >正在加载...</img>'
            }
          }

          if (me.page < ( (page === 1)? page = 1 : page = page - 1) ) {
              if(typeof complete === 'function'){
                _datapage = 0
                _this.someData = []
              }else {
                _datapage ++
              }
              mui.ajax({
                url: 'http://'+_this.$store.state.urlIp+'/Api/Home/indexs/p/' + (_datapage + 1) +'.html',
                success: function (data) {
                  var jons = JSON.parse(data)
                  if (typeof complete === 'function') {
                    _this.someData =_this.someData.concat(jons.info)
                    me.page = 0
                    complete()
                  }else{
                    me.page++
                    _this.someData = _this.someData.concat(jons.info)
                  }
                }
              })
          }
        },

      }, {
        scrollBarY: false,
        momentum :true,
      })
    },
    deactivated(){
      //在离开的时候把缓冲的_page值还原
      if( _datapage >= this.total_page -1 ){
        _datapage = 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../style/css/swiper-3.4.2.min.css';

  .home
    height 100%;
    .jp-content
      margin-bottom: 0rem;
      .swiper-pagination-bullet
        width 0.2rem
        height 0.2rem
        margin 0 0.12rem
      .demo-infinite-container
        height: 90%;
</style>
