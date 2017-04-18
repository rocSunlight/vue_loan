<template>
  <div class="accout profile">
    <div class="mui-content">
      <div class="inform-wrapper">
        <div class="avatar">
          <i class="jp-btn_head_portrait"></i>
          <span>你好</span>
        </div>
        <div class="h20 bgf5"></div>
        <div class="inform-list">
          <div class="title"><i class="jp-ico_information_authentication"></i><span>提现必填信息</span></div>
          <div class="prompt"><i class="jp-ico_warn"></i><span>必须真实有效，否则提现无法到账。不能修改，若变化请联系客服</span></div>
          <ul class="mui-table-view">
            <li class="mui-table-view-cell"><span>真实姓名<strong>*</strong></span> <input v-model="real_name" name="real_name" type="text" class="min-input" placeholder="请输入您的真实姓名" ></li>
            <li class="mui-table-view-cell"><span>身份证号<strong>*</strong></span><input name="card_id"  type="text" class="min-input" placeholder="请输入您的身份证号" ></li>
            <li class="mui-table-view-cell"><span>支付宝账号<strong>*</strong></span><input name="ali_account"  type="text" class="min-input" placeholder="请输入您的支付宝账号" ></li>
            <li class="mui-table-view-cell"><span>常用邮箱<strong>*</strong></span><input name="email" type="text" class="min-input" placeholder="请输入您的常用邮箱" ></li>
            <li class="mui-table-view-cell"><span>常用QQ<strong>*</strong></span><input name="qq" type="text" class="min-input" placeholder="请输入您的常用QQ" readonly=""></li>
            <li class="mui-table-view-cell"><span>紧急电话<strong>*</strong></span><input name="emergency_mobile"  type="text" class="min-input" placeholder="请输入您的紧急电话" ></li>
          </ul>
        </div>
        <div class="btn-div">
          <button type="submit" class="mui-btn" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        token1: JSON.parse(localStorage.user),
        real_name :'',           //姓名
        card_id :'',            //身份证
        ali_account :'',        //支付宝账号
        emai :'',               //邮箱
        qq :'',                //qq
        emergency_mobile :'', //紧急电话
      }
    },
    mounted(){

      this.$nextTick(function () {
//        this.$http.post('/api/user/profile', {params: {token: this.token1.token}}).then(response=>{
//          console.log(response.body)
//        })
      })
    },
    methods: {
      submit() {

        this.$http.post('/api/user/profile',{token: this.token1.token,real_name:this.real_name}).then(response=>{

            console.log(response)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .profile
      .title
        span
          margin-left 0.2rem
      .prompt
        background-color: #f6e5da;
        padding: 0.266rem 0.4rem;
        font-size: 0.266rem;
        i
          margin-right: 0.37rem;
          font-size: 0.4rem;
          color: #f7751f;
          border-radius: 50%;
          vertical-align: super;
        span
          display: inline-block;
          width: 90%;
          font-size 0.32rem
      .mui-table-view-cell
        display: flex;
        span
          display: inline-block;
          flex: 0 0 2.5rem;
          width: 2.5rem
          strong
              color #fb5a5a
              margin-left 0.13rem
        .min-input
          flex: 1;
          margin: -3px 5px 0px 15px;
          padding: 0;
          text-align: right;
          border: 0;
      .btn-div
        padding: 0.26rem 0 0.4rem;text-align: center
        .mui-btn
          margin-top:20px;width: 84%;height:1rem;line-height: 0.8rem;border-radius: 6px;border:0;background-color:#fb5a5a;color: #fff;font-size:0.32rem
</style>
