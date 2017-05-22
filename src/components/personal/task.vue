<template>
  <div class="task balance">
    <div class="mui-content">
      <div style="padding-top: 0.266rem;">
        <div  class="select-nav">
          <router-link class="select-item " :to="{name: 'Taskall'}">
            全部
          </router-link>
          <router-link class="select-item " :to="{name : 'Audit'}">
            审核中
          </router-link>
          <router-link class="select-item "  :to="{name : 'Rejected'}">
            驳回
          </router-link>
          <router-link class="select-item "  :to="{name : 'Successful'}">
            审核成功
          </router-link>
          <router-link class="select-item "  :to="{name : 'Failure'}">
            审核失败
          </router-link>
        </div>
      </div>
      <div class="h20 bgf5"></div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <!--底部导航-->
      <nav-gation :clicked="false" :clicked2="false"></nav-gation>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from '../navigation/navigation'

  //  jroll滚动条
  import '../../../static/js/jroll.min'
  import '../../../static/js/jroll-vue-infinite'

  export default{
    name : 'task',
    components:{
      'nav-gation' : Navigation
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .task
      .yellow{color: #ffad3e}
      .green{color: #01bf5f}
      .red{color: #fb5a5a}
      .jp-control{position absolute; top: 1.36rem; bottom: 1.506rem; left: 0; right: 0;}
      .mui-segmented-control.mui-segmented-control-inverted .control-item.mui-active{    color: #fb5a5a;  border-bottom: 2px solid #fb5a5a;}
      .mui-segmented-control .control-item {  line-height: 38px;  display: table-cell;  overflow: hidden;  width: 1%;  -webkit-transition: background-color .1s linear;  transition: background-color .1s linear;  text-align: center;  white-space: nowrap;  text-overflow: ellipsis;  color: #333;  }
      .user  .number i{font-size: 14px;    vertical-align: text-bottom;}
      .mui-table-view:after,.mui-table-view-cell:after,.mui-table-view:before{height: 0}
      .mui-table-view-cell{padding: 0.29rem 0 0;border-bottom: 0.24rem solid #f5f5f5;}

      .title .titles,.title{position: relative}
      .title{padding: 0 0.4rem 0.29rem }
      .title:after{position: absolute;right: 0;bottom: 0;left: 0;height: 1px;content:'';    -webkit-transform: scaleY(.7);  transform: scaleY(.7);  background-color: #eee;}
      .title .titles .name{vertical-align: super;font-size:0.32rem;margin-left: 0.15rem }
      .title .titles .mui-badge{position: absolute;  top: 50%;  right: 15px;  -webkit-transform: translateY(-50%);  transform: translateY(-50%);background: inherit;font-size: 0.3rem;padding: 0}
      .list-data{padding: 0.29rem 0.4rem;position: relative}
      .list-data li{height: 0.6rem;line-height: 0.6rem;font-size: 0.32rem }
      .list-data .data-title{display: inline-block;width:24%;}
      .list-data .datas{display: inline-block;width:50%;}
      .list-data .icon-list:after{    font-family: Muiicons;  font-size: inherit;  line-height: 1;  position: absolute;  top: 50%;  display: inline-block;  -webkit-transform: translateY(-50%);  transform: translateY(-50%);  text-decoration: none;  color: #bbb;  -webkit-font-smoothing: antialiased;right: 15px;  content: '\e583';  }
      .icon-list a{display: inline-block;  width: 19%;  text-align: center;}
      .mui-control-content{position:absolute;}

</style>
