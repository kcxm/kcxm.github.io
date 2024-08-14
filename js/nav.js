layui.use(['jquery','colorpicker','util','form','element','flow'],function () {
  var $ =layui.jquery;
  var colorpicker=layui.colorpicker;
  var util=layui.util;
  var form=layui.form;
  var element = layui.element;
  var flow = layui.flow;
  var shoucang=layui.data('nav').shoucang;
  var user=layui.data('user');
//
flow.lazyimg({
  elem: 'img'
});
//
const paramsStr = window.location.search;
var urldata=document.location.hash.slice(1);
const params = new URLSearchParams(paramsStr);
var url = params.get('url');
if(url){
if(layui.device().weixin){
  imgpage();
}else{
location.href = url+"#"+urldata;
console.log(url+"#"+urldata);
}
}
//
element.on('collapse(colla1)', function(data){
var colla=layui.data('user').colla;
var id=$(this).attr("idd");
if($("#" +id).attr("class")=="layui-colla-content layui-show") {
colla.push(id);
layui.data('user', {key: 'colla', value: colla});
//for(var i=0; i < $('.' +id).length; i++) {
//$('#' +id+i).attr("src", $('#' +id+i).attr("lay-src"));
//}
}else {
colla=colla.filter(function(item) {return item !==id;});
layui.data('user', {key: 'colla', value: colla});
}
});
if(layui.data('user').colla) {
var colla=layui.data('user').colla;
}else {
layui.data('user', {key: 'colla', value: []});
var colla=layui.data('user').colla;
}
colla.filter(function(item) {
$("#" +item).attr("class", "layui-colla-content layui-show");
element.render('collapse', 'colla1');
//for(var i=0; i < $('.' +item).length; i++) {
//$('#' +item+i).attr("src", $('#' +item+i).attr("lay-src"));
//console.log($('#' +item+i).attr("lay-src"));
//}
});
//
element.tab({
  headerElem: '.demo-tab-header>.layui-btn',
  bodyElem: '.demo-tab-body>div'
});
//
function chengshi(chengshi){
layer.confirm('当前城市：'+chengshi+'，是否跳转？', {
  closeBtn: 0,title:false,btn: ['修改城市','是', '否']
}, function(){
  userpage();
},function(){
  location.href = '/c/'+chengshi;
});
}
$('#chengshi').click(function(){
if(layui.data('user').province){
  chengshi(layui.data('user').province+'/'+layui.data('user').city+'/'+layui.data('user').county);
}else{
  $.get("https://ip.useragentinfo.com/json", function(data) {
    layui.data('user', {key: 'province', value: data.province});
    layui.data('user', {key: 'city', value: data.city});
    layui.data('user', {key: 'county', value: data.area});
    chengshi(data.province+'/'+data.city+'/'+data.area);
    }, 'json');
}
})
//
shoucangf();
if(layui.data('nav').shoucang) {
var shoucang=layui.data('nav').shoucang;
}else {
layui.data('nav', {key: 'shoucang', value: []});
var shoucang=layui.data('nav').shoucang;
}
var urljson=shoucang.filter((item)=> {
return item.url==$("#shoucangbtn").attr("urldata");
});
$("#shoucang").click(function() {
layer.prompt({title: '添加标签', placeholder:"输入名称"},
function(value, index, elem) {
if(value==='') return elem.focus();
if(shoucang.length > 0) {
var max=Math.max.apply(Math, shoucang.map(function(o) {
if(o.id) {return o.id;}else {return 0;}
}));
}else {
var max=0;
}
if(isValidHttpUrl($("#zxr").val())) {
shoucang.push({id: max+1, name: value, url: $("#zxr").val(), color:$(".layui-colorpicker-trigger-span").css("background-color")});
layui.data('nav', {key: 'shoucang', value: shoucang});
layer.close(index);
location.reload();
}else{
layer.msg("请输入完整URL");
}
});
$(".layui-layer-content").append(`<br/><input type="text" id="zxr" class="layui-input" placeholder="输入链接" /></br><div id="colorpicker" ></div>`);
colorpicker.render({
elem: '#colorpicker',
format: 'rgb',
color: '#ffffff',
predefine: true, 
colors: ['#ff8c00', '#00ced1', '#9d8a0e']
});
});
//
them();
//
util.event('class', {
e1: function(othis) {
var id=othis.context.dataset.id;
var v1=$("#pso").val().replace(/\+/g, "%2B");
urllist = solist(id,v1);
urlhtml='';
urllist.filter((item)=> {
urlhtml=urlhtml+'<a target="_blank" type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" href="' +item.url+'">' +item.name+'</a>';
});
$("#psodata").html(urlhtml);
}
});
$("#pso").on("input propertychange", function(event) {
var v1=$(this).val().replace(/\+/g, "%2B");
urllist = solist(1,v1);
if(v1=="") {
$("#psodata").html(``);
}else{
urlhtml='';
urllist.filter((item)=> {
urlhtml=urlhtml+`<a target="_blank" type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" href="`+item.url+`" >`+item.name+`</a>`;
});
$("#psodata").html(urlhtml);
}
});
$("#searchform").submit(function(event){
event.preventDefault();
var v1=$("#pso").val().replace(/\+/g, "%2B");
window.open("http://baidu.tao234.com/?0243&wd=" +v1, "_blank");
});
form.on('input-affix(search)',function(data){
var elem=data.elem; 
var value=elem.value.replace(/\+/g, "%2B"); 
if(!value) {layer.msg('请输入搜索内容');return elem.focus();}
window.open("http://baidu.tao234.com/?0243&wd=" +value, "_blank");
});
//
$(".user").click(function(){userpage();});
$(".imgpage").click(function(){var url=$(this).attr("href");location.href=url;location.reload();});
//if(document.location.hash.slice(1)){imgpage();}
//
function tianqi(){
  $(".tianqi-btn").click(function() {
    if(layui.data('user').tianqi) {
      layui.data('user', {key: 'tianqi', value: false});
      $(".tianqi-btn").html(`<i class="layui-icon layui-icon-tree" style="font-size: 20px; color: #1E9FFF;" ></i>`);
      layer.msg("已禁用天气，每天都是晴天！");
    }else{
    layui.data('user', {key: 'tianqi', value: true});
    $(".tianqi-btn").html(`<i class="layui-icon layui-icon-water" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    layer.msg("已起用天气，未雨绸缪！");
    }
    });
    if(layui.data('user').tianqi) {
      $(".tianqi-btn").html(`<i class="layui-icon layui-icon-water" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    }else{
      layui.data('user', {key: 'tianqi', value: false});
      $(".tianqi-btn").html(`<i class="layui-icon layui-icon-tree" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    }
}
//
function them(){
  $(".theme-btn").click(function() {
    if(layui.data('user').theme=='dark') {
    layui.data('user', {key: 'theme', value: 'light'});
    $("#theme_css").attr("href", "");
    $(".theme-btn").html(`<i class="layui-icon layui-icon-light" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    }else{
    layui.data('user', {key: 'theme', value: 'dark'});
    $("#theme_css").attr("href", "/css/layui-theme-dark.css");
    $(".theme-btn").html(`<i class="layui-icon layui-icon-moon" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    }
    });
    if(layui.data('user').theme=='dark') {
    $(".theme-btn").html(`<i class="layui-icon layui-icon-moon" style="font-size: 20px; color: #1E9FFF;" ></i>`);
    }else{
    layui.data('user', {key: 'theme', value: 'light'});
    }
}
//
function solist(id,v1){
if(id==1) {
var urllist=[ 
{url:'http://baidu.tao234.com/?0243&wd=' +v1, name:'百度'},
{url:'https://cn.bing.com/search?q=' +v1, name:'必应'},
{url:'https://yandex.com/search/?text=' +v1, name:'YanDex'},
{url:'https://www.sogou.com/web?query=' +v1, name:'搜狗'},
{url:'https://www.so.com/s?q=' +v1, name:'360'}
]}
if(id==2) {
var urllist=[ 
{url:'https://www.kuwo.cn/search/list?key=' +v1, name:'酷我'},
{url:'https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=' +v1, name:'酷狗'},
{url:'https://music.163.com/#/search/m/?s=' +v1, name:'网易云'},
{url:'https://music.apple.com/cn/search?term=' +v1, name:'Apple'},
{url:'https://so.1ting.com/all.do?q=' +v1, name:'一听'},
{url:'https://kq-m.dtsoft.cn/#/pages/digital/index?code=aDq99Ffx&showMenu=false', name:'低价会员'}
]}
if(id==3) {
var urllist=[ 
{url:'https://search.bilibili.com/all?keyword=' +v1, name:'哔哩哔哩'},
{url:'https://v.qq.com/x/search/?q=' +v1, name:'腾讯视频'},
{url:'https://www.iqiyi.com/search/' +v1+'.html', name:'爱奇艺'},
{url:'https://so.mgtv.com/so?k=' +v1, name:'芒果TV'},
{url:'https://so.tv.sohu.com/mts?box=1&wd=' +v1, name:'搜狐视频'},
{url:'https://kq-m.dtsoft.cn/#/pages/digital/index?code=aDq99Ffx&showMenu=false', name:'低价会员'}
]}
if(id==4) {
var urllist=[ 
{url:'https://www.lzpanx.com/search?exact=false&page=1&q=' +v1, name:'聚合搜'},
{url:'https://pansou.cc/s/' +v1+'-1.html', name:'百度搜'},
{url:'https://aliso.cc/s/' +v1+'-1-0.html', name:'阿里搜'},
{url:'https://www.ucpanso.com/search?exact=false&page=1&q=' +v1, name:'UC搜'},
{url:'https://heimabt.top/search?keyword=' +v1, name:'磁力搜'},
{url:'https://kq-m.dtsoft.cn/#/pages/digital/index?code=aDq99Ffx&showMenu=false', name:'低价会员'}
]}
if(id==5) {var urllist=[
{url:'https://sj.qq.com/search?q=' +v1, name:'应用宝'}
]}
return urllist;
}
//
function userpage(){
var userhtml = $("userpage").html();
var reg1 = new RegExp("userpagedemo","g");
userhtml = userhtml.replace(reg1,"");
$.getScript("https://yxtcfw.cn/layarea.js", function() {
layer.open({
type: 1,
title:false,
content: util.unescape(userhtml),
area: ['100%', '100%'],
anim: 5,
closeBtn: 0,
scrollbar: false,
success: function() {
var layarea=layui.layarea;
var table=layui.table;
them();
tianqi();
$("#userhome").click(function() {layer.closeAll('page');});
layarea.render({
elem: '#area-picker',
data: {province: user.province,city: user.city,county: user.county,},
change: function (res) {
layui.data('user', {key: 'province', value: res.province});
layui.data('user', {key: 'city', value: res.city});
layui.data('user', {key: 'county', value: res.county});
}
});
table.render({
elem: '#ID-table-demo-editmodes',
data: shoucang,
page: true,
css: [
'.layui-table-cell{height: 50px; line-height: 40px;}',
'.layui-table-cell .layui-colorpicker{width: 38px; height: 38px;}',
'.layui-table-cell select{height: 36px; padding: 0 5px;}'
].join(''),
cols: [[ 
{field: 'id', title: 'ID', width:50, align: 'center'},
{field: 'name', title: '名称', edit: 'text'},
{field: 'url', title: '链接', minWidth:150, edit: 'text'},
{field: 'color', title: '颜色', width: 80, unresize: true, align: 'center', templet: '#TPL-colorpicker-demo'},
{fixed: 'right', title:'操作', maxWidth: 80, toolbar: '#barDemo'}
]],
done: function(res, curr, count) {
var options=this;
table.getRowData=function(tableId, elem) {
var index=$(elem).closest('tr').data('index');
return table.cache[tableId][index] || {};
};
colorpicker.render({
elem: '.colorpicker-demo',
done: function(value) {
var data=table.getRowData(options.id, this.elem); 
data.color=value;
shoucang.filter((item)=> {
if(item.id==data.id){item.name=data.name;item.url=data.url;item.color=data.color;}
});
layui.data('nav', {key: 'shoucang', value: shoucang});
//console.log(shoucang);
}
});
table.on('edit(ID-table-demo-editmodes)', function(obj) {
var value=obj.value;
var data=obj.data;
var field=obj.field;
var update= {};
update[field]=value;
obj.update(update);
shoucang.filter((item)=> {
if(item.id==data.id){item.name=data.name;item.url=data.url;item.color=data.color;}
});
layui.data('nav', {key: 'shoucang', value: shoucang});
//console.log(shoucang);
});
table.on('tool(ID-table-demo-editmodes)', function(obj) {
var data=obj.data;
//console.log(data);
if(obj.event==='delete') {
layer.confirm('真的删除行 [id: ' + data.id +'] 么', function(index) {
obj.del();
layer.close(index);
shoucang.filter((item)=> {
if(item.id==data.id) {
var i=shoucang.indexOf(item);
//console.log(i);
shoucang.splice(i, 1);
}
});
layui.data('nav', {key: 'shoucang', value: shoucang});
//console.log(shoucang);
});
}
});
}
});
}
});
});
}
//
function isValidHttpUrl(string){
try {const newUrl=new URL(string);return newUrl.protocol==='http:' || newUrl.protocol==='https:';}
catch (err) {return false;}
}

//
function shoucangf () {
  if(layui.data('nav').shoucang){
  layui.data('nav').shoucang.forEach(el=> {
  var rgbnum=el.color.match(/\d+(\.\d+)?/g);
  if((rgbnum[0]||rgbnum[1]||rgbnum[2])==255) {
  $("#shoucang").before(`<a href="?url=` + el.url + `" type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" >` + el.name + `</a>`);
  }else if((rgbnum[0]||rgbnum[1]||rgbnum[2]) < 240) {
  $("#shoucang").before(`<a href="?url=` + el.url + `" style="background-color:`+el.color+`" type="button" class="layui-btn layui-btn-sm layui-btn-radius" >` + el.name + `</a>`);
  }else {
  $("#shoucang").before(`<a href="?url=` + el.url + `" style="background-color:`+el.color+`" type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" >` + el.name + `</a>`);
  }
  })
}
  }
//
function queryURLParams(url) {
  let pattern = /(\w+)=(\w+)/ig; 
  let parames = {};
  url.replace(pattern, ($, $1, $2) => {
    parames[$1] = $2;
  });
  return parames;
}
//
$("#xinxil1").click(function() {
$("#xinxil1").css("display", "none");$("#xinxil2").css("display", "block");
$("#tianqi").html(`<iframe allowtransparency="true" frameborder="0" width="575" height="96" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=0&v=0&d=5&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=575&h=96&align=center" ></iframe>`);
});
$("#tianqi").click(function(){
$("#xinxil1").css("display", "block");$("#xinxil2").css("display", "none");
});
if(layui.data('user').tianqi) {
$("#tianqi1").html(`<iframe allowtransparency="true" frameborder="0" width="1145" height="20" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=1&t=1&v=0&d=5&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=900&h=28&align=left" ></iframe>`);
}
//
window.onload= function(){
  $(".rect").css("display", "none");
}
//
});