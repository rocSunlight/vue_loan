<template>
  <div class="withdrawal">
    <div class="with-wrapper">
      <span class="text"><i class="jp-ico_fund_details"></i> 可提现金额 <span class="red">￥{{money.account_money | default}}</span></span>
      <div class="content">
        <span class="money"><input name="money" id="money" value="" type="text" placeholder="0.00">元</span>
      </div>
      <span class="remind"><em>*</em> 提现将收取手续费2元/次,每次最少50元起提；</span>
    </div>

    <div class="btn-div" >
      <button type="button" class="mui-btn" @click="withdrawal">提现到支付宝</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  var _this = ''
  export default {
    name : 'withdrawal',
    data() {
     return {
       token1 :this.$store.state.user.token,
       money : '',
       user : '',
       ali_account : ''
     }
    },
    created(){
        _this = this

        this.$http.get('http://'+this.$store.state.urlIp+'/api/user/withdraw',{params:{token : this.token1}}).then(response=>{

            this.user = response.body.user
            this.money = response.body.balance
            this.ali_account = response.body.user.ali_account

            if(this.money === null ){
              this.money = '0.00'
            }
        })
    },
    filters: {
      default: function (value) {
        if(value == undefined){
          value = '0.00'
          return value
        }
        if(value == '0'){
          value = value + '.00'
          return value
        }
        return value
      }
    },
    methods: {
      btnArray() {
        //弹出验证框
        mui.confirm('<span>您还没完成个人信息认证 <br> 请绑定后再提现</span> ','<i class="jp-ico_information_authentication"></i>',new Array('暂不绑定','立即绑定'),function (e) {
          if (e.index == 1) {
            //mui.toast('是');
            location.href ='#/profile';
          } else {
            // mui.toast('否');
          }
        },'div')
      } ,
      withdrawal() {
        if(this.ali_account === null) {
            this.btnArray()
            return false
        }
        // 提现弹出框
        var money = $("#money").val();
        var fee = 2;
        var real_money = money-fee;
        var account_money = this.money.account_money;
        var token2 =  this.token1
        if(account_money-money<0){
          mui.toast('您的提现金额大于可用余额');
          return false;
        }
        if(money<50){
          mui.toast('单笔最少提现金额50元');
          return false;
        }

        mui.confirm('<span style="line-height: 0.6rem">提现至您绑定的支付宝账户 <br> 一个工作日到账，是否确认</span> ','<span class="price span-successful">实际到账<span class="red">'+real_money+'</span>元</span>',new Array('取消','确定'),function (e) {

          if (e.index == 1) {
            $.ajax({
              url: 'http://'+_this.$store.state.urlIp+"/api/user/dowithdraw",
              type: "post",
              dataType: "json",
              data: {"money":money,"token" : token2},
              success: function(d) {
                  console.log(d)
                if (d.status == 1) {
                  mui.alert('<span class="suc">您的提现申请成功，我们尽快给你转账。</span>', '<i class="jp-ico_customer_service"></i>', '我知道了',function() {
                    document.location.href='#/personal';
                  },'div');
                  //mui.toast('您的提现申请成功，我们尽快给你转账。');
                }else{
                  mui.toast(d.info);
                }
              }
            });



          } else {
            // mui.toast('否');
          }
        },'div')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .withdrawal
    .with-wrapper
      padding 0.4rem
    .text
      color: #666;
      font-size: 0.4rem;
      i
        vertical-align: middle;
        color: #ffbd65;
        margin-right: 0.133rem;
        font-size: 0.533rem;
      .red
        color: #fb5a5a;
        margin-left: 5px;
    .content
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      .money
        color: #666;
        font-size: 0.4rem;
        margin-right: 12%;
        input
          width: 30%;
          text-align: right;
          font-size: 0.8rem;
          height 1.2rem
          border: 0;
          padding: 0 0.133rem 0 0;
    .remind
      color: #666;
      font-size: 0.32rem;
      em
        color: #fb5a5a;
    .btn-div
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      .mui-btn
        width: 100%;
        height: 1.306rem;
        border-radius: 0px;
        font-size 0.45rem
        border: 0;
        background-color: #fb5a5a;
        color: #fff;


  .price
    font-size 0.6rem
</style>
