// 对于顾客模块的数据处理

var customerData = {
    dataProcess : function(type,data) {
        switch(type) {
            case "realname": 
                result = !data?'未命名':data;
            break;
            case "telephone":
                result = !data?'未填写':data;
            break;
            case "password":
                result = !data?'未设定':data;
            break;
            case "status":
                result = !data?'不正常':data;
            break;
            case "photo":
                result = !data?'未上传':data;
            break;
            default:
                console.log('匹配无效')
            
        }
        return result;
    },

    dataInit : function() {
        $('tbody').empty();
        //分页查询：
        // customer.query({
        //     page:0,
        //     pageSize:4
        // },function(data){
        //     cache.set('pageInfo',{
        //         page : data.data.page,
        //         pageSize : data.data.pageSize,
        //         total : data.data.total
        //     });(
        customer.findAll(function(data){
            // console.log(data);         
            var template = "";
            data.data.map(function(item,index){
                template += `
                <tr data-id="${item.id}">
                <th scope="row">
                    <input type="checkbox" value="${item.id}"/>
                </th>
                <td style="width:150px">
                <span class="currentData">
                    ${customerData.dataProcess('realname',item.realname)}
                </span>
                <input type="text"
                    class="form-control inputData form-control-sm"
                    name="realname"
                    value="${customerData.dataProcess('realname',item.realname)}"
                    placeholder="请输入真实姓名"
                />               
                </td>

                <td>
                <span class="currentData">
                    ${customerData.dataProcess('telephone',item.telephone)}
                </span>
                <input type="text"
                    class="form-control inputData form-control-sm"
                    name="telephone"
                    value="${customerData.dataProcess('telephone',item.telephone)}"
                    placeholder="请输入电话"
                />                                   
                </td>

                <td>
                <span class="currentData">
                    ${customerData.dataProcess('password',item.password)}
                </span>
                <input type="text"
                    class="form-control inputData form-control-sm"
                    name="password"
                    value="${customerData.dataProcess('password',item.password)}"
                    placeholder="请输入密码"
                />                                
                </td>

                <td>
                <span class="currentData">
                    ${customerData.dataProcess('status',item.status)}
                </span>
                <input type="text"
                    class="form-control inputData form-control-sm"
                    name="status"
                    value="${customerData.dataProcess('status',item.status)}"
                    placeholder="请输入状态"
                 />                                 
                </td>

                <td>
                <span class="currentData">
                    ${customerData.dataProcess('photo',item.photo)}
                </span>
                <input type="text"
                    class="form-control inputData form-control-sm"
                    name="photo"
                    value="${customerData.dataProcess('photo',item.photo)}"
                    placeholder="请上传照片"
                 />                              
                </td>
                <td>
                    <button class="btn btn-primary updateBtn"  data-id="${item.id}">修改</button>
                    <button class="btn btn-danger deleteBtn" data-id="${item.id}">删除</button> 
                </td>
              </tr>
                `
            });

            $('tbody').append(template);
           
            //追加完成后的提示
            PubSub.publish('appendFinished',true);
        })
    },

    /*
    query : function() {
        $('.prevBtn').on('click',function () {
            var pageInfo = cache.get('pageInfo');
            cache.set('pageIndex',pageInfo.page--);
            console.log(cache.get('pageIndex'))
            if(cache.get('pageIndex') <= 0) {
                alert('没有更多的数据了!');
            } else {
                $('tbody').empty();
                customer.query({
                    page: pageInfo.page,
                    pageSize: pageInfo.pageSize
                }, function (data) {
                    // console.log(data);
                    cache.set('pageInfo', {
                        page: data.data.page,
                        pageSize: data.data.pageSize,
                        total: data.data.total
                    });
                    var template = '';
                    data.data.list.map(function (item, index) {
                        template +=
                            `
                        <tr data-id="${item.id}">
                                <th scope="row">
                                    <input type="checkbox" value="${item.id}"/>
                                </th>
                                <td style="width: 150px">
                                <span class="currentData">
                                ${customerData.dataProcess('realname', item.realname)}
                                </span>
                                <input type="text"
                                    class="form-control inputData form-control-sm"
                                    name="realname"
                                    value="${customerData.dataProcess('realname', item.realname)}"
                                    placeholder="请输入真实姓名"/>
                                </td>
                                <td>
                                <span class="currentData">
                                ${customerData.dataProcess('telephone', item.telephone)}
                                </span>
                                <input type="text"
                                    class="form-control inputData form-control-sm"
                                    name="telephone"
                                    value=" ${customerData.dataProcess('telephone', item.telephone)}"
                                    placeholder="请输入电话号码"/>
                                </td>
                                <td>
                                <span class="currentData">
                                ${customerData.dataProcess('password', item.password)}
                                </span>
                                <input type="text"
                                    class="form-control inputData form-control-sm"
                                    name="password"
                                    value=" ${customerData.dataProcess('password', item.password)}"
                                    placeholder="请输入密码"/>
                                </td>
                                <td>
                                <span class="currentData">
                                ${customerData.dataProcess('status', item.status)}
                                </span>
                                <input type="text"
                                    class="form-control inputData form-control-sm"
                                    value="${customerData.dataProcess('status', item.status)}"
                                    name="status"
                                    placeholder="请输入状态"/>
                                </td>
                                <td>
                                <span class="currentData">
                                ${customerData.dataProcess('photo', item.photo)}
                                </span>
                                <input type="text"
                                    class="form-control inputData form-control-sm"
                                    value="${customerData.dataProcess('photo', item.photo)}"
                                    name="photo"
                                    placeholder="请输入图片地址"/>
                                </td>
                                <td>
                                    <button
                                        class="btn btn-primary btn-sm updateBtn"
                                        data-id="${item.id}">修改</button>
                                    <button
                                        class="btn btn-danger btn-sm deleteBtn"
                                        data-id="${item.id}">删除</button>
                                </td>
                            </tr>
                                    `
                    });

                    $('tbody').append(template);
                    PubSub.publish('appendFinished', true);
                })
            }
        });
    },
    */

    deleteById : function() {

        $('.deleteBtn').on('click',function(){
            // alert($(this).attr('data-id'))
            customer.deleteById($(this).attr('data-id'),function(data){
                // console.log(data);                       
                if(data.status === 200) {
                    notify('success','成功删除了');
                    customerData.dataInit();
                }else{
                    notify('error','删除失败，服务器故障');
                }                       
            });

        })

    },

    update : function() {
        $('.updateBtn').on('click',function(){
            if($(this).text() === '保存') {
                $(this).text('修改');
                $(`tr[data-id="${$(this).attr('data-id')}"] .inputData`).hide();
                $(`tr[data-id="${$(this).attr('data-id')}"] .currentData`).show();
                $(this).removeClass('saveBtn');
                //收集表单数据
                var obj = {};
                obj.id
                    = $(this).attr('data-id');
                obj.realname
                    = $(`tr[data-id="${$(this).attr('data-id')}"]  input[name="realname"]`).val();
                obj.telephone
                    = $(`tr[data-id="${$(this).attr('data-id')}"]  input[name="telephone"]`).val();
                obj.password
                    = $(`tr[data-id="${$(this).attr('data-id')}"]  input[name="password"]`).val();
                obj.status
                    = $(`tr[data-id="${$(this).attr('data-id')}"]  input[name="status"]`).val();
                obj.photo
                    = $(`tr[data-id="${$(this).attr('data-id')}"]  input[name="photo"]`).val();

                console.log(obj);
                //发送ajax
                customer.saveOrUpdate(obj,function(data){
                    console.log(data,'更新');
                   if(data.status === 200){
                      customerData.dataInit();
                   }
                })
            }else {
                $(this).text('保存');
                $(this).addClass('saveBtn');
                $(`tr[data-id="${$(this).attr('data-id')}"] .currentData`).hide();
                $(`tr[data-id="${$(this).attr('data-id')}"] .inputData`).show();             
            }
        })
    },

    //批量删除
    batchDelete : function (){     
        $('.delAll').on('click',function() {
            var checkedList = [];
            $("input[type='checkbox']:checked").each(function (index, item) {
                // console.log(Number.parseInt(item.value));
                if (!Number.isNaN(Number.parseInt(item.value))) {
                    checkedList.push(item.value);
                }

            });

            console.log(checkedList)

            customer.batchDelete(checkedList,function (data) {
                console.log(data);
                if(data.status === 200) {
                    notify('success','批量删除成功！！！');
                    customerData.dataInit();
                } else {
                    notify('error','服务器故障！！！');
                }

            });

        });


        $('.selectAll').on('change',function(){
            if($(this).prop('checked')){
                $("input[type='checkbox']:not(':checked')").trigger('click');
            }else {
                $("input[type='checkbox']:checked").trigger('click');
            }                                  
        })
        }


};
