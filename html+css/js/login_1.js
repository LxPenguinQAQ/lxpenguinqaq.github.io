// 定义一个con绑定.container
const con = document.querySelector(".container");

// 定义两个函数开关（门）
let isIn = true;    // 鼠标进去的门，默认打开
let isOut = false;  // 鼠标出去的门，默认关闭

let span;   // 给未出现的元素取名为span

// 添加监听
// 监听鼠标进去的事件
con.addEventListener("mouseenter", (event)=> {
    // 如果进去的门是打开的，就可以执行这个函数
    if (isIn) {
        // 获取进入鼠标的位置，相对于container
        // 生成元素的位置 = 进入点距离窗口的距离 - 父盒子距离窗口的距离
        let inX = event.clientX - event.target.offsetLeft;
        let inY = event.clientY - event.target.offsetTop;

        // 创建一个span元素，并且给它对应的出生坐标
        let el = document.createElement("span");
        el.style.left = inX + "px";
        el.style.top = inY + "px";

        // 添加到con对应的父元素，即container
        con.appendChild(el);

        $(".container span").removeClass("out");    // 移除出去的动画
        $(".container span").addClass("in");    // 添加进入的动画
        $("*").css("color", "#1d1928");

        span = document.querySelector(".container span");
        isIn = false;   // 关闭进来的门（不能使用进入的方法）
        isOut = true;   // 打开出去的门（不能使用出去的方法）
    }
})
// 监听鼠标出去的事件
con.addEventListener("mouseleave", (event)=> {
    if (isOut) {
        // 获取出去的鼠标位置
        // 生成元素的位置 = 出去点距离窗口的位置 - 父盒子距离窗口的距离
        let outX = event.clientX - event.target.offsetLeft; 
        let outY = event.clientY - event.target.offsetTop;  

        $(".container span").removeClass("in"); // 移除进入的动画
        $(".container span").addClass("out");   // 添加出去的动画
        $("*").css("color", "#fff");

        $(".out").css("left", outX + "px");
        $(".out").css("top", outY + "px");

        isOut = false;  // 关闭出去的门
        // 当动画结束后再删除元素
        setTimeout(()=> {
            con.removeChild(span);  // 删除元素
            isIn = true;    // 打开进入的门
        }, 500);

    }
})