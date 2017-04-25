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
              <input type="file" id="fileid" name="imgfile0" tip="图片文件" accept="image/*" onchange="preivew(this, document.getElementById('imgid'))">
              <div class="cation_div_one" id="idnumberpic" style="display:none;">

                <span style="margin-left:40px ;display:none"><img id="loading_makeclub0" style="display:none" src="../../../static/image/loading.gif" /></span><span style="color:red; font-size:12px; margin-left:40px" id="idimg0"></span>
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
  import '../../../static/js/jquery-1.4.4.min'
  import '../../../static/js/ajaxfileupload'


  var allowExt = ['.jpg', '.gif', '.png', '.jpeg', '.JPG', '.GIF', '.PNG', '.JPEG'];
  var preivew = function (file, container) {
    try {
      //var pic = new Picture(file, container);
      setImagePreview();
      inputPath();
      ajaxFileUploads0();
    } catch (e) {
      alert(e);
    }
  }

  function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  function ajaxFileUploads0() {

    var wenjian = $("#fileid").val();
    var result = /\.[^\.]+/.exec(wenjian);
    $("#loading_makeclub0").ajaxStart(function () {
      $(this).show();
    }).ajaxComplete(function () {
      $(this).hide();
    });

    $.ajaxFileUpload({
      url: '',
      secureuri: false,
      fileElementId: 'fileid',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        // $("#imgs").append(data.html_info);
        $("#imgs").append(htmlDecode(data.html_info));
      },
      error: function (data) {
        console.log(data);
        $("#imgs").append(data.html_info);

      }
    });

  }

  function showidpic() {
    if ($("#idtype").val() != 1) {
      $("#idnumberpic").show("slow");
    } else {
      $("#idnumberpic").hide("slow");
    }
  }

  //缩略图类定义
  var Picture = function (file, container) {
    var height = 0,
      widht = 0,
      ext = '',
      size = 0,
      name = '',
      path = '';
    var self = this;
    if (file) {
      name = file.value;
      //alert(name.substr(name.lastIndexOf("."), name.length));
      //alert(allowExt.indexOf('.jpg'));
      if (allowExt.indexOf(name.substr(name.lastIndexOf("."), name.length)) == -1) {
        throw '目前只支持：png、jpg、jpeg、gif文件，请重新选择文件上传！';
        return false;
      }
      if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
//            file.select();
//            file.blur();
//            path = document.selection.createRange().text;
        var fileObj = document.getElementById("file");
        if (fileObj.files) {
          path = window.URL.createObjectURL(fileObj.files[0]);
        } else {
          path = fileObj.value;
        }


      } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
        try {
          if (file.files) {
            path = file.files.item(0).getAsDataURL();
          } else {
            path = file.value;
          }
        }
        catch (e) {
          if (file.files) {
            path = window.URL.createObjectURL(file.files[0]);
          } else {
            path = file.value;
          }
        }
      } else {
        if (window.navigator.userAgent.indexOf("MSIE") == -1 && path == "") {
          if (file.files) {
            path = window.URL.createObjectURL(file.files[0]);
          } else {
            path = file.value;
          }
        }
      }
    } else {
      throw "bad file";
    }


    ext = name.substr(name.lastIndexOf("."), name.length);

    if (container.tagName.toLowerCase() != 'img') {
      throw "container is not a valid img label";
      container.visibility = 'hidden';
    }
    container.src = path;
    container.alt = name;
    container.style.visibility = 'visible';
    height = container.height;
    widht = container.widht;
    size = container.fileSize;


    this.get = function (name) {
      return self[name];
    }

  }

  //获取图片文件名
  function getFileName(obj) {
    var pos = obj.value.lastIndexOf("/") * 1;
    return obj.value.substring(pos + 1);
  }
  //获取图片扩展名
  function getFileExt(obj) {
    return obj.value.replace(/.+./, "");
  }

  //图片文件名赋值给隐藏text
  //    input1.onchange = inputPath;//当控件对象input1有变化时执行函数inputPath
  function inputPath() {
    var input1 = document.getElementById("fileid");//获得控件对象
    var input2 = document.getElementById("picture");//获取input对象input2
    input2.value = input1.value;//将控件input1的值赋给input2
  }

  if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == obj) {
          return i;
        }
      }
      return -1;
    }
  }

  function setImagePreview() {
    var docObj = document.getElementById("fileid");

    var imgObjPreview = document.getElementById("imgid");

    name = docObj.value;
    if (allowExt.indexOf(name.substr(name.lastIndexOf("."), name.length)) == -1) {
      throw '目前只支持：png、jpg、jpeg、gif文件，请重新选择文件上传！';
      return false;
    }

    if (docObj.files && docObj.files[0]) {
      //火狐下，直接设img属性
//        imgObjPreview.style.display = 'block';
      //imgObjPreview.style.width = '150px';
      //imgObjPreview.style.height = '180px';

      //imgObjPreview.src = docObj.files[0].getAsDataURL();
      //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
      imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    } else {
      //IE下，使用滤镜
      docObj.select();
      docObj.blur();
      var imgSrc = document.selection.createRange().text;
      var localImagId = document.getElementById("imgid");

      $("li#idnumberpic").removeClass();


      try {
        //localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
        //localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;

        localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + imgSrc + "')";

        //必须设置初始大小
        // localImagId.style.width = "150px";
        // localImagId.style.height = "180px";
      } catch (e) {
        alert("您上传的图片格式不正确，请重新选择!");
        return false;
      }
      //imgObjPreview.style.display = 'none';
      document.selection.empty();
    }
    return true;
  }
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
