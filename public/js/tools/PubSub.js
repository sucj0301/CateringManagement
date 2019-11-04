// 发布-订阅模式
// 


var PubSub = (
    function () {
        //
        var handlers = {};

        function subscribe(type,fn) { //订阅者函数
           
            if(!(type in handlers)){
                handlers[type] = [];
            }
            
            handlers[type].push(fn);
        }

        function publish(type,msg) { //发布者函数
            if(!(type in handlers)) {
                alert('没有客户订阅此类信息！')
            }
            handlers[type].map(function(item){
                item(msg);
            })
        }

        return {
            subscribe:subscribe,
            publish:publish
        }
    }
)();