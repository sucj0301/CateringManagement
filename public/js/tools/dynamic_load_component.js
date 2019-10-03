//动态加载页面组件
var dynamicLoad = function () {
    $(
        function(){
            $('.right .content').load('./pages/home.html');

            $(".nav_list>ul>li").on('click',function(){
                $('.right .content').load($(this).attr('data-url'));
            });
        }
    );
};

dynamicLoad();