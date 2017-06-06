/**
 * Created by Administrator on 2017/6/5.
 */

var wgtVerl;
var newVer;

var wgtUrl;// 下载wgt文件

function plusReady(){
  // ......
  // 获取本地应用资源版本号
  plus.runtime.getProperty(plus.runtime.appid,function(inf){
    wgtVer=inf.version;
    console.log("当前应用版本："+wgtVer);
    checkUpdate()
  });
}

document.addEventListener('plusready',plusReady,false);


// 检测更新
var checkUrl="http://192.168.1.158:8088/api/home/version";
function checkUpdate(){
  plus.nativeUI.showWaiting("检测更新...");
  var xhr=new XMLHttpRequest();
  xhr.onreadystatechange=function(){
    switch(xhr.readyState){
      case 4:
        plus.nativeUI.closeWaiting();
        var data=xhr.responseText;
        data = eval("("+data+")")
        if(xhr.status==200){
          console.log("检测更新成功："+xhr.responseText);
          newVer= data.version;
          wgtUrl= data.version_url;
          if(wgtVer&&newVer&&(wgtVer!=newVer)){
            mui.confirm('<span class="span-text">是否更新版本</span>', '<span class="span-successful">检测到有新版本</span>', new Array('否', '是'), function (e) {
              if (e.index == 1) {
                downWgt();  // 下载升级包
              } else {

              }
            },'div');

          }else{
            // plus.nativeUI.alert("无新版本可更新！");
          }
        }else{
          console.log("检测更新失败！");
          plus.nativeUI.alert("检测更新失败！");
        }
        break;
      default:
        break;
    }
  }
  xhr.open('GET',checkUrl);
  xhr.send();
}


function downWgt(){
  plus.nativeUI.showWaiting("下载wgt文件...");
  plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
    if ( status == 200 ) {
      console.log("下载wgt成功："+d.filename);
      installWgt(d.filename); // 安装wgt包
    } else {
      console.log("下载wgt失败！");
      plus.nativeUI.alert("下载wgt失败！");
    }
    plus.nativeUI.closeWaiting();
  }).start();
}


// 更新应用资源
function installWgt(path){
  plus.nativeUI.showWaiting("安装wgt文件...");
  plus.runtime.install(path,{},function(){
    plus.nativeUI.closeWaiting();
    console.log("安装wgt文件成功！");
    plus.nativeUI.alert("应用资源更新完成！",function(){
      plus.runtime.restart();
    });
  },function(e){
    plus.nativeUI.closeWaiting();
    console.log("安装wgt文件失败["+e.code+"]："+e.message);
    plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
  });
}
