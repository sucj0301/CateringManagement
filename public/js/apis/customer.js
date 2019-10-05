// var customer = (
//     function () {
//         function findAll(fn) {
//             request.get("customer/findAll",null,fn);
//         }

//         function deleteById(id,fn) {
//             request.get('/customer/deleteById',{
//                 id:id
//             },fn);
//         }

//         return {
//             findAll:findAll,
//             deleteById:deleteById
//         }
//     }
// )();


//顾客管理API
var customer = {
    //查询所有
    findAll : function (fn) {
        request.get("customer/findAll",null,fn);
    },

    //根据id删除
    deleteById : function (id,fn) {
        request.get('customer/deleteById',{
            id:id
        },fn);
    },

    //分页查询 
    query : function (data,fn) {
        request.post('customer/query',data,fn);
    },

    //保存或者修改
    saveOrUpdate : function(data,fn) {
        request.post('customer/saveOrUpdate',data,fn)
    },

    //批量删除
    batchDelete : function(data,fn) {
        data = data.join(',');
        request.post('customer/batchDelete',data,fn);
    }
}