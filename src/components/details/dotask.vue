<template>
  <div class="mui-content release-wrapper bgColor">
    <div class="deta-title "><i class="jp-ico_fill_information"></i><span>请填写报单必须项</span> </div>
    <div class="content">
      <form method="post" class="mui-input-group" enctype="multipart/form-data">
        <div class="bgfff">
          <div class="mui-input-row">
            <input type="hidden" name="" value="">
            <label >做单人姓名 <small class="red">*</small></label>
            <input class="inputText"  type="text" placeholder="请输入做单人姓名">
            <img id="my_img_id" class="my_img_class" />
          </div>
          <div class="mui-input-row">
            <label >做单人电话 <small class="red">*</small></label>
            <input class="inputText" type="text"  placeholder="请输入做单人电话">
          </div>
          <div class="mui-input-row">
            <label>做单数*</label>
            <i class="jp-btn_reduce_picture jian" ></i>
            <input class="inputText2" type="text" id="do_num" value="1"  name="do_num">
            <i class="jp-btn_add2_picture jia" ></i>
          </div>
          <div class="mui-input-row hInherit" >

            <label >任务截图 </label>
            <div class="image-item space">
              <div class="jp-btn_add_picture"></div>
              <input type="file" id="fileid" name="imgfile0" tip="图片文件" accept="image/*" >
              <div class="cation_div_one" id="idnumberpic" style="display:none;">

                <!--<span style="margin-left:40px" style="display:none"><img id="loading_makeclub0" style="display:none" src="__TMPL__static/js/loading.gif" /></span><span style="color:red; font-size:12px; margin-left:40px" id="idimg0"></span>-->
                <input type="hidden" id="picture" name="god.picture" tip="图片" readonly="readonly" maxlength="500">
                <div style="height:150px;width:150px"><img id="imgid" style="visibility: visible; visibility:hidden" height="150" width="150" src="">
                </div>
              </div>
              <div class="imgs" id="imgs">

              </div>
            </div>
          </div>
          <div class="mui-input-row hInherit">
            <label >添加备注 </label>
            <textarea name="remark" id="" cols="30" rows="10" placeholder="可不填"></textarea>
          </div>
        </div>
        <div class="prompt-text">
          <p>
            温馨提示 <br>
            请认真提交资料，若审核失败不给予返利;<br>
            恶意提交无关报单项，将扣款1~5元
          </p>
        </div>
        <div class="mit">
          <div  class="mui-btn cancel-btn" onclick="window.history.go(-1)"  >取消参与</div>
          <input type="submit" class="mui-btn submit-btn" value="提交">
        </div>
      </form>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default{
    methods: {
      divhide(){
        window.history.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@import "https://unpkg.com/animate.css@3.5.1/animate.min.css"*/
  .red
    color #fb5a5a
  .release-wrapper
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color #f5f5f5
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
        line-height 1.2rem
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
