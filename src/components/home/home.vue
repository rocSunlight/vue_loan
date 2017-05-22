<template>

    <div class="home">


        <!--轮播图-->
      <div class="jp-content">
        <jroll-infinite class="jroll-scroll">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <router-link to="/">
                <img width="100%" src="static/image/banner.png" alt="广告图">
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
  //  底部导航
  import Navigation from '../navigation/navigation'

  var _this = {}//用于储存vue数据的this
  var dataPage = 1//上拉加载数据的开始位置
  export default {
    //mounted 生命周期钩子
    name : 'home',
    data() {
      return {
        someData:[],
        nexturl:'',
        loading: false,
        num: 10,
        scroller: null,
        t_page : ''
      }
    },

    mounted(){
      _this = this
      this.$http.get('http://'+this.$store.state.urlIp+'/api/home/indexs' ).then(response=> {
        this.nexturl = response.nexturl
        this.t_page = response.body.t_page
        const rel = response.body
        this.someData = rel.info
      })

      //实例化轮埠图
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        autoplay: 3000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      })

    },

    components: {
      'nav-gation': Navigation,
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<img src="./static/image/006.gif">正在加载...</img>',
        bottomed: function () {
          var me = this
          var page = _this.t_page  //获取后台传来的数据页数
          if (dataPage < page) {
            mui.ajax({
              url: 'http://'+_this.$store.state.urlIp+'/Api/Home/indexs/p/' + (dataPage + 1) +'.html',
              success: function (data) {
               setTimeout(function () {
                 dataPage++ // 请求成功将page加1，失败则不要改变page
                 var jons = JSON.parse(data)
                 _this.someData = _this.someData.concat(jons.info)
                 if (dataPage === _this.t_page) {
                   me.tip = '已全部加载完成'
                 }
               },300)
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
