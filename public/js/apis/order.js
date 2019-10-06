var order = {
    //查询所有订单
   findAll : function (fn) {
       request.get('order/findAll',null,fn)
   },
   //根据id删除订单
   deleteById : function (id,fn) {
       request.get('order/deleteById',{
           id:id
       },fn);
   },
   //分页查询订单信息
   queryPage : function (data,fn) {
       request.post('order/queryPage',data,fn);
   },
   //批量删除订单
   batchDelete : function (data,fn) {
       data = data.join(',');
       request.post('order/batchDelete',data,fn);
   },
   //保存订单信息
   saveOrUpdate : function (data,fn) {
       request.post('order/save',data,fn);
   }

}