<template>
  <div class="mui-content release-wrapper bgColor" id="cont" >
    <div class="deta-title "><i class="jp-ico_fill_information"></i><span>请填写报单必须项</span> </div>
    <div class="content" >
      <form method="post" class="mui-input-group" enctype="api/home/todotask" @submit.prevent="submit">
        <div class="bgfff">
          <div class="mui-input-row">
            <input type="hidden" name="" value="">
            <label >做单人姓名 <small class="red">*</small></label>
            <input id="username" class="inputText"  type="text" placeholder="请输入做单人姓名">
          </div>
          <div class="mui-input-row">
            <label >做单人电话 <small class="red">*</small></label>
            <input id="userphone" class="inputText" type="text"  placeholder="请输入做单人电话">
          </div>
          <div class="mui-input-row">
            <label>做单数*</label>
            <i class="jp-btn_reduce_picture jian" @click="jian1"></i>
            <input class="inputText2" type="text" id="do_num" value="1"  name="do_num">
            <i class="jp-btn_add2_picture jia" @click="jia1();"></i>
          </div>
          <div class="mui-input-row hInherit" >

            <label >任务截图 </label>
            <div class="image-item space">
              <div class="jp-btn_add_picture"></div>
              <input type="file" id="fileid" name="imgfile0" tip="图片文件" accept="image/*" @change="onFileChange">

              <div class="imgs" id="imgs">
                <ul>
                  <li v-for="(key,image) in images">
                    <img width="100" height="100" :src="key" @click='delImage(key)' />
                    <a href="#" style="position: absolute;" @click='delImage(key)'>
                      <span class="glyphicon glyphicon-remove"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mui-input-row hInherit">
            <label >添加备注 </label>
            <textarea  name="remark" id="remark" cols="30" rows="10" placeholder="可不填" ></textarea>
          </div>
        </div>
        <div class="prompt-text">
          <p>
            温馨提示 <br>
            请认真提交资料，若审核失败不给予返利;<br>
            恶意提交无关报单项，将扣款1~5元
          </p>
        </div>
        <div class="mit" id="mit">
          <div  class="mui-btn cancel-btn" onclick="window.history.go(-1)"  >取消参与</div>
          <button  class="mui-btn submit-btn"  >提交</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  var _this = {}


  export default{
    name : 'dotask',
    data(){
      return {
        token1 : this.$store.state.user.token,
        images: []
      }
    },
    created(){
        _this = this
    },
    methods: {

      submit(){
          var username = $('#username').val()
          var userphone = $('#userphone').val()
          var do_num = $('#do_num').val()
          var remark = $('#remark').val()


         this.$http.post('http://'+this.$store.state.urlIp+'/api/home/todotask',{tid:this.$route.params.userId,token:this.token1,name:username,phone:userphone,do_num:do_num,remark:remark,imgs_data:this.images}).then(response=>{
              let body  = response.body
              if(body.status != '1'){
                mui.toast(body.message)
              }else{
                mui.alert('<span class="span-text">正在跳转到任务详情</span>', '<span class="span-successful">报单成功</span>',function() {
                  document.location.href='#/task/taskall';
                },'div');
              }
         })
      },
      jian1 () {
        var do_num = mui('input[name=do_num]')[0].value;
        if(do_num<=1){
          return false;
        }
        do_num--;
        $("#do_num").val(do_num);
      },
      jia1(){
        var do_num = mui('input[name=do_num]')[0].value;
        do_num++;
        $("#do_num").val(do_num);
      },

      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        this.createImage(files);
        this.uploadImage()


      },
      createImage(file) {
        if(typeof FileReader==='undefined'){
          alert('您的浏览器不支持图片上传，请升级您的浏览器');
          return false;
        }
        var image = new Image();
        var vm = this;
        var leng=file.length;
        for(var i=0;i<leng;i++){
          var reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload =function(e){
            vm.images.push(e.target.result);
          };
        }
      },
      delImage:function(index){
        this.images.shift(index);
      },
      uploadImage: function() {
        return false;
        var obj = {};
        obj.images=this.images
        $.ajax({
          type: 'post',
          url: 'http://'+_this.$store.state.urlIp+"/api/home/ajaxupimg",
          data: obj,
          dataType: "json",
          success: function(data) {
            if(data.status){
              alert(data.msg);
              return false;
            }else{
              alert(data.msg);
              return false;
            }
          }
        });
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >

  .red
    color #fb5a5a
  .release-wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color #f5f5f5
    #cont
      position static
    .deta-title
      background-color: #f5f5f5;
      color: #666;
    .mui-input-row
      .inputText2
        width: 10%;
        padding: 0;
        float: none;
        text-align: center;
    .hInherit
      height: inherit !important;
    .image-item input[type="file"]
      position: absolute;
      left: 36.1%;
      top: 0;
      width: 1.8rem;
      height: 1.8rem;
      opacity: 0;
      cursor: pointer;
      z-index: 0;
    .mui-input-row label ~ textarea
      width: 61%;
      height: 2.53rem;
      font-size 0.4rem
      margin: 0.26rem 0.4rem  0.26rem 0;
      border: 1px solid #c8c7cc;
      border-radius: 3px;
      padding: 0.13rem;
    .prompt-text
      padding: 0.26rem 0.4rem;
      p
        font-size: 0.32rem;
        color: #fb5a5a;
        line-height: 0.5rem;
    .image-item
      .jp-btn_add_picture
        font-size: 1.6rem;
        color: #666;
        width: 65px;
        height: 65px;
        display: inline-block;
        position: relative;
        border-radius: 5px;
        margin: 11px 10px 10px 15px;
      #imgs
        ul
          padding 0 0.13rem
          li
            float left
            margin: 0 0.12rem;
    .mit
      background-color: #fff;
      height: 1.306rem;
      position: fixed ;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      .cancel-btn
        background-color: #ffad3e;
        line-height 1rem
      .submit-btn
        background-color: #fb5a5a;
      .cancel-btn,.submit-btn {
        flex: 1;
        border: 0;
        border-radius: 0;
        color: #fff;
        font-size 0.45rem
      }

</style>
