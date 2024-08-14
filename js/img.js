layui.use(['jquery','colorpicker','util','form','element','flow'],function () {
    var $ =layui.jquery;
    var util=layui.util;
    var shoucang=layui.data('nav').shoucang;
    var user=layui.data('user');
    const paramsStr = window.location.search;
    var urldata=document.location.hash.slice(1);
    const params = new URLSearchParams(paramsStr);

  var unum=$('.swiper-slide').length-1;
  //console.log(unum);
  location.href="./#slide"+Math.floor(Math.random()*unum);

   // var imgpagecss=`<style type="text/css">html,body{height:100%;overflow:hidden}.container{height:100%;background-color:#efeff4}.item{color:#ffffff;background-color:#000000}.imgnav{z-index:9999;height:20px;width:100%;position:fixed;top:0;padding-top:10px;margin-left:10px;margin-right:10px}.imgnav .layui-btn{background-color:#9f9f9f5c !important}::-webkit-scrollbar{width:0px}.box{display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;}img{width:100%}@media screen and (min-width:530px){img{width:460px;}}</style>`;
    //$("head").append(imgpagecss);
    $("#swiper_css").attr("href","https://cdn.bootcdn.net/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css");

    mySwiper=new Swiper ('.swiper', {
    direction: 'vertical', 
    hashNavigation: true,
    loop: true, 
    on: {
      slideChangeTransitionStart: function() {
    var urldata=document.location.hash.slice(1);
    if($('video#dd' +urldata)[0]){
      $('video#dd' +urldata)[0].pause();
    }
    var idnum=urldata.replace(/[^0-9]/ig, '');
    var unum=$('.swiper-slide').length-1;
    console.log($('.swiper-slide').length-1);
    $('#d' +urldata).attr("src", $('#d' +urldata).attr("imgpage-src"));
    if(idnum==unum){
      $('#dslide0').attr("src", $('#dslide0').attr("imgpage-src"));
    }else if(idnum==0){
      $('#dslide'+unum).attr("src", $('#dslide' +unum).attr("imgpage-src"));
    }
    $('#dslide' +(Number(idnum)+1)).attr("src", $('#dslide' +(Number(idnum)+1)).attr("imgpage-src"));
    $('#dslide' +(Number(idnum)-1)).attr("src", $('#dslide' +(Number(idnum)-1)).attr("imgpage-src"));

    },
    slideChangeTransitionEnd: function(){
      
      var urldata=document.location.hash.slice(1);
    
      var shoucang=layui.data('nav').shoucang;
      var urljson=shoucang.filter((item)=> {
      return item.url==location.href;
      });
      if(urljson.length==0) {
        console.log(location.href);
        $(".layui-icon-rate-solid").attr("class","layui-icon layui-icon-rate");
      }else{
        $(".layui-icon-rate").attr("class","layui-icon layui-icon-rate-solid");
      }
      if($('video#dd' +urldata)[0]){
        new Plyr('#dd' +urldata);
        if(layui.device().mobile){$('#dd' +urldata).attr("style", "display: block;height: 100%;width: 100%;");}
      }
      if($('#d' +urldata)[0]){
        const iframe = document.querySelector('#d' +urldata);
        if(layui.device().mobile){ 
         var width = document.body.offsetWidth;
         $(".docs").css("width",document.body.offsetWidth-20);
        }else{
         var width = 800;
         $(".docs").css("width",780);
        }
         const height = width * 9 / 16;
         iframe.width = width;
         iframe.height = height;
      }
    
    },
    }
    });
    var url = params.get('url');
    var urldata=document.location.hash.slice(1);
    //var idnum=urldata.replace(/[^0-9]/ig, '');
    $('#d' +urldata).attr("src", $('#d' +urldata).attr("imgpage-src"));
    if(url){
      $('img#dslide0').attr("src","https://api.qrtool.cn/?text="+url);
      $('img#dslidetitle0').html("请扫描二维码访问");
    }

      const iframe = document.querySelector('#d' +urldata);
      if(layui.device().mobile){ 
        menulist();
       var width = document.body.offsetWidth;
       $(".docs").css("width",document.body.offsetWidth-20);
      }else{
        menulistpc();
       var width = 800;
       $(".docs").css("width",780);
      }
       const height = width * 9 / 16;
       if(iframe){
       iframe.width = width;
       iframe.height = height;
       }

       var shoucang=layui.data('nav').shoucang;
       var urljson=shoucang.filter((item)=> {
       return item.url==location.href;
       });
       if(urljson.length==0) {
        console.log(location.href);
        $(".layui-icon-rate-solid").attr("class","layui-icon layui-icon-rate");
      }else{
        $(".layui-icon-rate").attr("class","layui-icon layui-icon-rate-solid");
      }
    

    //
function shoucangbtn(){
  var urldata=document.location.hash.slice(1);
  var idnum=urldata.replace(/[^0-9]/ig, '');
  var shoucang=layui.data('nav').shoucang;
  var urljson=shoucang.filter((item)=> {
  return item.url==location.href;
  });
  if(shoucang.length > 0) {
  var max=Math.max.apply(Math, shoucang.map(function(o) {
  if(o.id) {return o.id;}else{return 0;}
  }));
  }else{
  var max=0;
  }
  if(urljson.length==0){
  shoucang.push({id: max+1, name: $('#dslidetitle' +idnum).text(), url: location.href, color:"rgb(0, 206, 209)"});
  layui.data('nav', {key: 'shoucang', value: shoucang});
  $(".layui-icon-rate").attr("class","layui-icon layui-icon-rate-solid");
  }else{
  var index=shoucang.indexOf(urljson[0]);
  shoucang.splice(index, 1);
  layui.data('nav', {key: 'shoucang', value: shoucang});
  $(".layui-icon-rate-solid").attr("class","layui-icon layui-icon-rate");
  }
  };

  function menulist(){
    util.fixbar({
      bars: [
      {type: 'home',icon: 'layui-icon-home',style: 'border-radius: 20px;margin-bottom: 10px;background-color: #9f9f9f5c;'},
      {type: 'rate',icon: 'layui-icon-rate',style: 'border-radius: 20px;margin-bottom: 10px;background-color: #9f9f9f5c;'},
      {type: 'down',icon: 'layui-icon-down',style: 'border-radius: 20px;margin-bottom: 10px;background-color: #9f9f9f5c;'},
    ],
      css: {right: 5, bottom: 50},
      target: '#container',
      click: function(type) {
      if(type=="home"){location.href="/index.html";}
      if(type=="rate"){shoucangbtn();}
      if(type=="down"){mySwiper.slideNext();}
    }
      });
  }

  function menulistpc(){
    util.fixbar({
      bars: [
      {type: 'home',icon: 'layui-icon-home',style: 'float: left;border-radius: 20px;margin-left: 20px;margin-right: 20px;background-color: #9f9f9f5c;'},
      {type: 'rate',icon: 'layui-icon-rate',style: 'float: left;border-radius: 20px;margin-left: 20px;margin-right: 20px;background-color: #9f9f9f5c;'},
      {type: 'down',icon: 'layui-icon-down',style: 'float: left;border-radius: 20px;margin-left: 20px;margin-right: 20px;background-color: #9f9f9f5c;'}
    ],
      css: {'display': 'flex','justify-content': 'center', 'bottom': 10,'width': '100%'},
      target: '#container',
      click: function(type) {
      if(type=="home"){location.href="/index.html";}
      if(type=="rate"){shoucangbtn();}
      if(type=="down"){mySwiper.slideNext();}
      }
      });
  }

})