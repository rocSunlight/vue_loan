<template>
  <div class="accout">
    <div class="mui-content">
      <div class="inform-wrapper">
        <div class="avatar">
          <i class="jp-btn_head_portrait"></i>
          <span>你好</span>
        </div>
        <div class="h20 bgf5"></div>
        <div class="inform-list">
          <div class="title"><i class="jp-ico_account_information2"></i><span>账户信息</span></div>
          <ul class="mui-table-view">
            <li class="mui-table-view-cell"><span>可用金额</span> <span class=" min-data-span">120</span></li>
            <li class="mui-table-view-cell"><span>冻结金额</span> <span class=" min-data-span">120</span></li>
            <li class="mui-table-view-cell"><span>提现金额</span> <span class="min-data-span">120</span></li>
            <li class="mui-table-view-cell"><span>赚取金额</span> <span class=" min-data-span">120</span></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .accout
      height: 100%;
      background-color: #f5f5f5;
      .inform-wrapper .avatar
        background-image: url(/static/image/bg_acconut.png);
        height: 4.533rem;
        box-sizing: border-box;
        padding: 0.4rem 0.4rem 0.346rem ;
        background-size: 100%;
        background-position: center;
        text-align center
      .jp-btn_head_portrait
        font-size: 1.76rem;
        color: #fff;
        line-height: 2.08rem;
      .avatar span
        display: block;
        font-size: 0.42rem;
        color: #fff;
        margin-top: 0.133rem;
      .inform-list .title
        font-size: 0.373rem;
        color: #fb5a5a;
        line-height: 1.44rem;
        padding: 0 0.4rem;
        i
          font-size: 0.64rem;
          color: #fb5a5a;
          vertical-align: middle;
          margin-right: 0.133rem;

      .min-data-span
        color: #fc8026;
        margin-left: 0.8rem;
</style>
