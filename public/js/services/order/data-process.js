//对订单管理的数据处理


var orderData = {
    //数据未填写时的默认显示信息
    dataProcess : function(type,data) {
        switch(type) {
            case "customerId": 
                result = !data?'未填写':data;
            break;
            case "orderTime": 
                result = !data?'未填写':data;
            break;
            case "total": 
                result = !data?'未填写':data;
            break;
            case "status": 
                result = !data?'未填写':data;
            break;
            case "addressId": 
                result = !data?'未填写':data;
            break;
            case "waiterId": 
                result = !data?'未填写':data;
            break;
            case "remark": 
                result = !data?'未填写':data;
            break;
            default:
                console.log('匹配无效')
        }
            return result;
    },

    //初始化
    dataInit : function() {
        $('tbody').empty();
        order.findAll(function(data){
            // console.log(data);
            var template = "";
            data.data.map(function(item,index){
                template += `
                <tr data-id="${item.id}">
                    <td scope="row">
                        ${item.id}
                        <input type="checkbox" value="${item.id}"/>
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('customerId',item.customerId)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="customerId"
                               value="${orderData.dataProcess('customerId',item.customerId)}"
                               placehoder="请选择顾客Id"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('orderTime',item.orderTime)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="orderTime"
                               value="${orderData.dataProcess('orderTime',item.orderTime)}"
                               placehoder="请输入下单时间"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('total',item.total)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="total"
                               value="${orderData.dataProcess('total',item.total)}"
                               placehoder="请输入订单量"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('status',item.status)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="status"
                               value="${orderData.dataProcess('status',item.status)}"
                               placehoder="请输入状态"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('addressId',item.addressId)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="addressId"
                               value="${orderData.dataProcess('addressId',item.addressId)}"
                               placehoder="请选择地址Id"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('waiterId',item.waiterId)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="waiterId"
                               value="${orderData.dataProcess('waiterId',item.waiterId)}"
                               placehoder="请选择客服Id"
                        />
                    </td>
                    <td>
                        <span class="currentData">
                            ${orderData.dataProcess('remark',item.remark)}
                        </span>
                        <input type="text"
                               class="form-control inputData form-control-sm"
                               name="remark"
                               value="${orderData.dataProcess('remark',item.remark)}"
                               placehoder="请输入备注信息"
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

                //追加完成后提示
                PubSub.publish('appendFinished',true);

        })
    },

    //根据id删除订单信息
    deleteById : function() {
        $('.deleteBtn').on('click',function(){
            // alert($(this).attr('data-id'))
            order.deleteById($(this).attr('data-id'),function(data){
                // console.log(data);
                if(data.status === 200){
                    notify('success','删除成功');
                    orderData.dataInit();
                }else{
                    notify('error','删除失败，服务器故障');
                }
            });
        })
    },

    //保存或更新订单信息
    saveOrUpdate : function() {
        $('.updateBtn').on('click',function(){
            if($(this).text() === '保存') {
                $(this).text('修改');
                $(`tr[data-id="${$(this).attr('data-id')}"] .inputData`).hide();
                $(`tr[data-id="${$(this).attr('data-id')}"] .currentData`).show();
                $(this).removeClass('saveBtn');

                //收集表单数据
                var formObj = {};
                formObj.id = $(this).attr('data-id');
                formObj.customerId = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="customerId"]`).val();
                formObj.orderTime = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="orderTime"]`).val();
                formObj.total = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="total"]`).val();
                formObj.status = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="status"]`).val();
                formObj.addressId = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="addressId"]`).val();
                formObj.waiterId = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="waiterId"]`).val();
                formObj.remark = $(`tr[data-id="${$(this).attr('data-id')}"] input[name="remark"]`).val();

                console.log(formObj);

                //发送ajax
                order.saveOrUpdate(formObj,function(data){
                    console.log(data);
                    if(data.status === 200){
                        orderData.dataInit();
                    }else {
                        notify('warning','修改失败,服务器故障');
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

    //分页查询订单信息

}