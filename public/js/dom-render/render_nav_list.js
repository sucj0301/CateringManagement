// $() : $(document).ready(function() {})

//作用：DOM元素全部加载，js去操作DOM完成交互。

// 渲染侧栏导航

//渲染函数
var render = function (navList) {
    $(function () {
        var navListTemplate = '';

        //元素的自定义属性，data-attr="value"
        navList.map(function (item,index) {
           navListTemplate  += `
            <li data-key="${item.key}" data-name="${item.name}" data-url="${item.url}">
                <span class="${item.icon}"></span>
                &nbsp;
                ${item.name}
            </li>
           `
        });
        $('.sider_container .nav_list ul').append(navListTemplate);
    })
};

render(navList);

//交互效果，状态 激活(点击或者未点击),以及面包屑导航
var mutual = function () {
   $(function(){

    //页面加载之后激活首页
    $("ul>li[data-key='home']").css({
        backgroundColor:'#263445',
        color:'#409eff'
    });

    //交互效果
    $(".nav_list>ul>li").on('click',function(){

        //$()的另外一个作用就是将目标对象转换成一个jQuery对象
        // console.log(this);
        $(this).css({
            backgroundColor:'#263445',
            color:'#409eff'
        })
        .siblings().css({
            backgroundColor:'#304156',
            color:'#bfcbd9'
        });

        //替换动态面包屑
        if(!($(this).attr('data-key') === 'home')) {
            $('#availChange').html(`/&emsp; ${$(this).attr('data-name')}`);
        }else {
            $('#availChange').html(``);
        }
      
    })

   })
};

mutual();