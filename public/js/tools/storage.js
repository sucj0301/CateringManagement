//缓存临时数据,生命周期只是从页面打开到结束
//利用sessionStorage(会话存储，临时存储)
// localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的stringify和parse来处理

// 用了匿名函数
var cache = (
    function () {
        function set(key,value) {
            //缓存里只能存入值类型，所以需要序列化对象
            value = JSON.stringify(value);

            sessionStorage.setItem(key,value);// 保存数据到sessionStorage
            // 打开一个页面时记录sessionStorage,把页面或者浏览器关闭时session中的数据即销毁
        }
        function get(key) {
            var result = sessionStorage.getItem(key);// 从sessionStorage获取数据

            //获取对象的时候，解析JSON字符串为对象
            return JSON.parse(result);
        }

        return {
            set:set,
            get:get
        }
    }
    
)();