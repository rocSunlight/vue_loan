<template>
  <div class="task balance">
    <div class="mui-content">
      <div style="padding-top: 0.266rem;">
        <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
          <a class="mui-control-item mui-active" href="javascript:void(0);" value="">
            全部
          </a>
          <a class="mui-control-item  " href="javascript:void(0);" value="0">
            审核中
          </a>
          <a class="mui-control-item " href="javascript:void(0);" value="3">
            驳回
          </a>
          <a class="mui-control-item " href="javascript:void(0);" value="1">
            审核成功
          </a>
          <a class="mui-control-item " href="javascript:void(0);" value="2">
            审核失败
          </a>
        </div>
      </div>
      <div class="h20 bgf5"></div>
      <div class="jp-control">
        <div class="mui-scroll-wrapper mui-control-content mui-active" id="refreshContainer">
          <div class="mui-scroll">
            <ul class="mui-table-view show">
              <li class="mui-table-view-cell">
                <div class="title">
                  <div class="titles">
                    <img width="40" height="40" src="/themes/bilei/static/image/index/weblogo3.png" alt="">
                    <span class="name">春天金融</span>
                    <span class="mui-badge red">审核中</span>
                  </div>
                </div>
                <ul class="list-data">
                  <li>
                    <span class="data-title">任务返利</span>
                    <span class="datas"><span class="red">120.00</span>元</span>
                  </li>
                  <li class="icon-list">
                    <span class="data-title">报单人</span>
                    <span class="datas">你好 13800138000</span>
                    <a href="/user/center/dotask/id/61.html">查看</a>
                  </li>
                  <li>
                    <span class="data-title">报单时间</span>
                    <span class="datas">2017-03-17 17:20:38</span>
                  </li>
                </ul>
              </li>
              <li class="mui-table-view-cell">
                <div class="title">
                  <div class="titles">
                    <img width="40" height="40" src="/themes/bilei/static/image/index/weblogo3.png" alt="">
                    <span class="name">春天金融</span>
                    <span class="mui-badge yellow">审核中</span>
                  </div>
                </div>
                <ul class="list-data">
                  <li>
                    <span class="data-title">任务返利</span>
                    <span class="datas"><span class="red">120.00</span>元</span>
                  </li>
                  <li class="icon-list">
                    <span class="data-title">报单人</span>
                    <span class="datas">你好 13800138000</span>
                    <a href="/user/center/dotask/id/61.html">查看</a>
                  </li>
                  <li>
                    <span class="data-title">报单时间</span>
                    <span class="datas">2017-03-17 17:20:38</span>
                  </li>
                </ul>
              </li>
              <li class="mui-table-view-cell">
                <div class="title">
                  <div class="titles">
                    <img width="40" height="40" src="/themes/bilei/static/image/index/weblogo3.png" alt="">
                    <span class="name">春天金融</span>
                    <span class="mui-badge green">驳回</span>
                  </div>
                </div>
                <ul class="list-data">
                  <li>
                    <span class="data-title">任务返利</span>
                    <span class="datas"><span class="red">120.00</span>元</span>
                  </li>
                  <li class="icon-list">
                    <span class="data-title">报单人</span>
                    <span class="datas">你好 13800138000</span>
                    <a href="/user/center/dotask/id/61.html">查看</a>
                  </li>
                  <li>
                    <span class="data-title">报单时间</span>
                    <span class="datas">2017-03-17 17:20:38</span>
                  </li>
                </ul>
              </li>
            </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .task
      .yellow{color: #ffad3e}
      .green{color: #01bf5f}
      .red{color: #fb5a5a}
      .mui-segmented-control.mui-segmented-control-inverted .control-item.mui-active{    color: #fb5a5a;  border-bottom: 2px solid #fb5a5a;}
      .mui-segmented-control .control-item {  line-height: 38px;  display: table-cell;  overflow: hidden;  width: 1%;  -webkit-transition: background-color .1s linear;  transition: background-color .1s linear;  text-align: center;  white-space: nowrap;  text-overflow: ellipsis;  color: #333;  }
      .user  .number i{font-size: 14px;    vertical-align: text-bottom;}
      .mui-table-view:after,.mui-table-view-cell:after{height: 0}
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
