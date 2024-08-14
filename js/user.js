
layui.use(['layer', 'form', 'layarea'],function(){
  var $ = layui.$;
  var table = layui.table;
  var colorpicker = layui.colorpicker;
  var util = layui.util;
  var form = layui.form
  var layarea = layui.layarea;
  var shoucang = layui.data('nav').shoucang;
  var user = layui.data('user');

  $("#userhome").click(function(){
    layer.closeAll('page');
  })
  // 渲染
  layarea.render({
    elem: '#area-picker',
     data: {
         province: user.province,
         city: user.city,
         county: user.county,
     },
    change: function (res) {
        //选择结果
        layui.data('user', {key: 'province',value: res.province});
        layui.data('user', {key: 'city',value: res.city});
        layui.data('user', {key: 'county',value: res.county});
    }
});

  table.render({
    elem: '#ID-table-demo-editmodes',
    data: shoucang, // 此处为静态模拟数据，实际使用时需换成真实接口
    page: true,
    css: [ // 设置单元格样式
      // 取消默认的溢出隐藏，并设置适当高度
      '.layui-table-cell{height: 50px; line-height: 40px;}',
      '.layui-table-cell .layui-colorpicker{width: 38px; height: 38px;}',
      '.layui-table-cell select{height: 36px; padding: 0 5px;}'
    ].join(''),
    cols: [[ // 表头
      {field: 'id', title: 'ID', width:50, align: 'center'},
      {field: 'name', title: '名称', edit: 'text'},
      {field: 'url', title: '链接', minWidth:150, edit: 'text'},
      {field: 'color', title: '颜色', width: 80, unresize: true, align: 'center', templet: '#TPL-colorpicker-demo'},
      {fixed: 'right', title:'操作', maxWidth: 80, toolbar: '#barDemo'}
    ]],
    done: function(res, curr, count){
      var options = this;
      
      // 获取当前行数据 - 自定义方法
      table.getRowData = function(tableId, elem){
        var index = $(elem).closest('tr').data('index');
        return table.cache[tableId][index] || {};
      };

      // colorpicker
      colorpicker.render({
        elem: '.colorpicker-demo',
        done: function(value){
          var data = table.getRowData(options.id, this.elem); // 获取当前行数据(如 id 等字段，以作为数据修改的索引)
          // 更新数据中对应的字段
          data.color = value;
          
    shoucang.filter((item) => {
      if(item.id == data.id){
item.name = data.name;
item.url = data.url;
item.color = data.color;
      }
    });
    layui.data('nav', {key: 'shoucang',value: shoucang});
    console.log(shoucang);
          // 显示当前行最新数据 - 仅用于示例展示
         // showData(data);
        }
      });
      
      // 单元格普通编辑事件
      table.on('edit(ID-table-demo-editmodes)', function(obj){
        var value = obj.value // 得到修改后的值
        var data = obj.data // 得到所在行所有键值
        var field = obj.field; // 得到字段
        
        // 更新数据中对应的字段
        var update = {};
        update[field] = value;
        obj.update(update);
        
        // 编辑后续操作，如提交更新请求，以完成真实的数据更新
        // …
        
    shoucang.filter((item) => {
      if(item.id == data.id){
item.name = data.name;
item.url = data.url;
item.color = data.color;
      }
    });
    layui.data('nav', {key: 'shoucang',value: shoucang});
    console.log(shoucang);
        // 显示当前行最新数据 - 仅用于示例展示
       // showData(data);
      });
      
      // 更多编辑方式……

      // 触发单元格工具事件
  table.on('tool(ID-table-demo-editmodes)', function(obj){ // 双击 toolDouble
    var data = obj.data; // 获得当前行数据
     console.log(data)
    if(obj.event === 'delete'){
        layer.confirm('真的删除行 [id: '+ data.id +'] 么', function(index){
              obj.del(); // 删除对应行（tr）的DOM结构
              layer.close(index);
              // 向服务端发送删除指令
              shoucang.filter((item) => {
      if(item.id == data.id){
        var i = shoucang.indexOf(item);
        console.log(i);
        shoucang.splice(i,1);
      }
    });
    layui.data('nav', {key: 'shoucang',value: shoucang});
    console.log(shoucang);
            });
    }
  });

    }
  });
});
