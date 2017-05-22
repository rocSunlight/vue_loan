
<template>
  <div class="details" id="myList">
    <div class="jp-content ">
      <div class="goods-list">
        <div class="item-new list-item">
          <div class="item-left">
            <img  :src="'http://'+$store.state.urlIp+info.c_img" :alt="user.name">
            <span class="item-name" v-text="user.name"></span>
            <span class="text-right"><i class="jp-ico_residual_task"></i>剩余佣金 <span v-text="">{{info.s_num * info.money}}</span> 元</span>
          </div>
          <div class="item-right">
            <div class="item-div">
              <span>投资本金 <span>{{info.capital}}元</span></span>
              <span>投资收益 <span><strong>{{info.interest_rate}}</strong>元</span></span>
            </div>
            <div class="item-div">
              <span>投资期限 <span>{{info.duration}}天</span></span>
              <span>剩余任务 <span>{{info.s_num}}个</span></span>
            </div>
            <div class="price">
              <div class="new-price">
                <span class="text">任务返利</span>
                <span class="prices">￥<em>{{info.money}}</em></span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="h20"></div>

      <div class="user-list">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            发布者
            <span class="mui-badge">{{info.author}}</span>
          </li>
          <li class="mui-table-view-cell">
            截止日期
            <span class="mui-badge" >{{info.end_time | formatDate }}</span>
          </li>

          <li class="mui-table-view-cell">
            <span style="float: left; width: 25%;">任务链接</span>
            <span class="mui-badge blue">{{info.url}}</span>
          </li>
        </ul>
      </div>
      <div class="h20"></div>

      <div class="deta-title"><i class="jp-ico_platform_introduction"></i><span>平台介绍</span></div>
      <div class="introduce">
        <p class="information">
          {{info.introduce}}
        </p>
      </div>

      <div class="h20"></div>
      <div class="deta-title "><i class="jp-ico_task_details"></i><span>任务详情</span></div>
      <div class="uploadContent" v-html="info.explain">

      </div>

    </div>
    <div class="link-url" style="display: none" id="show_url" v-show="declaration"><span>{{info.url}}</span></div>
    <div class="details-nav">
        <div class="food-left">
          <div  class="contact" @click="contact()">
            <i class="jp-ico_consultation"></i>
            <span>咨询</span>
          </div>
        </div>
        <div class="food-right">
          <div  v-if="!declaration"  class="pate cys" id="cys" @click="participate">参与任务</div>
          <router-link  v-if="declaration" id="goto" class="pate2" :to="{name : 'Dotask' , params: { userId: urlId }}" @click="dotask()" >
           报单<span class="suc">0时00分00秒</span>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //formatDate时间戳转换
  import {formatDate} from '../../style/js/time'
  import '../../../static/js/jquery-1.4.4.min'
  import '../../../static/js/mui.previewimage'
  import '../../../static/js/mui.zoom'

  //mui滚动条下执行a标签跳转
  mui('body').on('tap','a',function () {
    document.location.href=this.href
  })


  //timer用于储存setInterval传来的id
  var timer =''
  export default {
    name : 'details',
    data() {
      return {
        info : [],
        user:[],
        declaration : false, //记录已经报单的状态
        is_do:false,
        endTime:'',
        token1 :this.$store.state.user.token, //读取本地储存的token
        urlId: this.$route.params.userId //获取从外部跳转的链接id
      }
    },
    //生命周期
    mounted() {
        this.$nextTick(function () {
          this.$http.get('http://'+this.$store.state.urlIp+'/api/Home/infos/id/' + this.urlId,{params:{token:this.token1,id:this.urlId}}).then(response => {
            this.info = response.body.info   //获取数据
            this.user = response.body.c_name[response.body.info.c_id]  //获取商家信息
            this.endTime = response.body.djs
            if(this.endTime>0){
              this.declaration = true
              this.timeEnd(this.endTime)
            }

          })
          mui.previewImage()
        })
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time)*1000);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    //updated数据加载完后可以操作 DOM
    updated(){

      $(".uploadContent img").attr('data-preview-group',"1" );
      $(".uploadContent img").attr('data-preview-src',"" );
    },

    //实例方法
    methods:{
      contact () {
        //弹出QQ框
        mui.alert('<span class="suc">如有疑问，请咨询闪财网客服</span><br/> <small class="c999">(长按复制QQ或微信公众号)</small> <br> <span class="red"><span >QQ:</span>'+this.info.qq+'</span>', "<i class='jp-ico_customer_service'></i>", '我知道了',function(){},'div');

      },
      // 点击参与报单
      participate() {
        //判断是否登录,在缓存中提取

        var tok = localStorage.user
        if(tok != undefined){
            this.token1 = JSON.parse(tok)
          const userId = this.info.id
          const _this =this
          mui.confirm('<span class="suc">请在300分钟之内完成任务并报单</span><br/> <small class="c999">(长按复制链接)</small> <br>  <input type="text" value="'+_this.info.url+'" style="width: auto; height: 0.8rem; padding: .2em; margin: 0.32rem 0; "/></span> ','<span style="font-size: 0.6rem">提示</span>',new Array('取消','确定'),function (e) {
            var  is_do = false
            if (e.index == 1 && is_do==false) {
              is_do = true;
              _this.$http.post('http://'+_this.$store.state.urlIp+'/api/home/willtask',{token: _this.token1.token,id:_this.info.id}).then(response=>{
                _this.declaration = true
                $("#djs").val(response.body.djs);
                _this.timeEnd(300*60)
              })
            }else {
              _this.declaration = false
            }
          },'div')

            if(_this.endTime>0){
              _this.timeEnd(_this.endTime);
              mui(document).off("click","#cys");
            }

        }else{
          mui.alert('<span class="span-text">请登录之后再来报单</span>', '<span class="span-successful">提示</span>',function() {
            document.location.href='#/login';
          },'div');
        }
      },
      //报单剩余时间
      timeEnd(value){
        //timer用于储存setInterval传来的id
        timer =  window.setInterval(function(){
          var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值   
          if(value > 0){
            day = Math.floor(value / (60 * 60 * 24));
            hour = Math.floor(value / (60 * 60)) - (day * 24);
            minute = Math.floor(value / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(value) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          var tm ='报单<span class="suc">'+hour+'时'+minute+'分'+second+'秒</spa>';
          $("#goto").html(tm);
          value--;
        }, 1000);

      }

    },
    beforeDestroy(){
      clearInterval(timer)
      // 退出路由后操作图片预览
      $('#__MUI_PREVIEWIMAGE').removeClass('mui-preview-in')
      $('#__MUI_PREVIEWIMAGE').addClass('mui-preview-out')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../style/css/photo.css"
    .link-url {
      position: fixed;
      bottom: 1.3rem;
      left: 0;
      right: 0;
      padding: 0.29rem 0.4rem;
      background-color: #fb5a5a;
      font-size:0.4rem;
      color: #fff;
      z-index: 8;
    }
    .mui-preview-header .mui-preview-indicator
      font-size: 0.4rem
    .mui-preview-header
      top:3%;
    .details
      height 100%
      .h20
        background-color #f5f5f5
      .jp-content
        .goods-list
          overflow: hidden
          padding: 0.24rem 0px 0.32rem
        .mui-table-view-cell
          color #666
        .mui-badge
          background-color:inherit
          color #333
          &.blue
            color #0007f5
        .introduce, .uploadContent
          padding 0 0.4rem 0.26rem
          font-size 0.38rem
          .information
            line-height 0.5rem
            color #333
        .uploadContent
            img
              width: 1.6rem
              height: 1.6rem
              padding: 0.08rem
            p
              margin 0.32rem 0
      .details-nav
        position: fixed
        bottom: 0
        left: 0
        right: 0
        display: flex
        text-align: center
        border-top: 1px solid #eee
        height 1.306rem
        box-sizing: border-box
        background-color #fff
        .food-left
          flex: 0 0 40%
          display: flex
          .contact
            flex: 1
            padding:0.21rem 0
            line-height 0
            i
              display: block
              font-size: 0.43rem
              color #fb5a5a
            span
              font-size: 0.4rem
              color: #333
              line-height 0.6rem
        .food-right
          flex: 1
          display: flex
          a,div
            flex: 1
            width: 50%
            float: left
            height 1.306rem
            line-height 1.306rem
            font-size 0.45rem
            color: #fff
            &.pate
              background-color: #fb5a5a
            &.pate2
              background-color: #ffad3e
    .mui-popup-title
      color #fb5a5a
    .c999
        font-size: 0.29rem
        color: #999

</style>
