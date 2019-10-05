//对于jQuery AJAX的封装 

// var request = (
//     function (baseURL) {

//         function get(url,data,fn) {
//             url = baseURL + url;
//             $.get(url,data,fn);
//         }

//         function post(url,data,fn) {
//             url = baseURL + url;
//             $.post(url,data,fn);
//         }

//         return {
//             get:get,
//             post:post
//         }
//     }
// )(baseURL);

var request = {
    get:function(url,data,fn) {
        url = baseURL + url;
        data = Qs.stringify(data);  //qs.stringify()可以将对象 序列化成URL的形式，以&进行拼接
        $.get(url,data,fn);
    },
    post:function(url,data,fn) {
        url = baseURL + url;
        data = Qs.stringify(data);
        $.post(url,data,fn);
    }
}