// // 使用周期性定时器实现（setInterval）
// function calculateTime(){
//     var overTime = new Date("2020/01/01 00:00:00");
//     // var overTime = new Date("2018/08/21 00:42:00");
//     var now = new Date();
//     var seconds = parseInt((overTime - now)/1000);
//     var span = document.querySelector("span");
//     if(seconds>1000){
//         var hh = parseInt(seconds/3600);  // 保留数字的整数部分
//         var mm = parseInt(seconds%3600/60);
//         var ss = seconds%3600%60;
//         // 设置输出格式，都以2位数字格式输出，如 00:06:21
//         hh = hh<10?"0"+hh:hh;
//         mm = mm<10?"0"+mm:mm;
//         ss = ss<10?"0"+ss:ss;

//         span.innerHTML = hh+":"+mm+":"+ss;
//         // 让时间的 “:” 也随倒计时一起闪动
//         // span.innerHTML = span.innerHTML.indexOf(":")==-1?hh+":"+mm+":"+ss:hh+" "+mm+" "+ss;
//     }else{
//         clearInterval(timer);
//         timer = null;
//         span.innerHTML = "00:00:00";
//     }

// }
// var timer;
// window.onload=function(){
//     calculateTime();
//     timer = setInterval(calculateTime, 500);
// }

// function stopTime(btn){
//     if(timer){
//         clearInterval(timer);
//         timer = null;
//         btn.innerHTML = "开始计时";
//     }else{
//         timer = setInterval(calculateTime, 500);
//         btn.innerHTML = "停止计时";
//     }

// }



// 使用一次性定时器实现（setTimeout）
function calculateTime(){
    var overTime = new Date("2020/01/01 00:00:00");
    // var overTime = new Date("2018/08/21 00:42:00");
    var now = new Date();
    var seconds = parseInt((overTime - now)/1000);
    var span = document.querySelector("span");

    var hh = parseInt(seconds/3600);  // 保留数字的整数部分
    var mm = parseInt(seconds%3600/60);
    var ss = seconds%3600%60;
    // 设置输出格式，都以2位数字格式输出，如 00:06:21
    hh = hh<10?"0"+hh:hh;
    mm = mm<10?"0"+mm:mm;
    ss = ss<10?"0"+ss:ss;

    span.innerHTML = hh+":"+mm+":"+ss;
    // 让时间的 “:” 也随倒计时一起闪动
    // span.innerHTML = span.innerHTML.indexOf(":")==-1?hh+":"+mm+":"+ss:hh+" "+mm+" "+ss;

    if(seconds>1000){
        // 一次性定时器需要在设计每一步的结尾判断是否需要继续注册定时器
        timer = setTimeout(calculateTime,500);
    }else{
        timer = null;
        span.innerHTML = "00:00:00";
    }
}
var timer;
window.onload=function(){
    calculateTime();
}

function stopTime(btn){
    if(timer){
        clearTimeout(timer);
        timer = null;
        btn.innerHTML = "开始计时";
    }else{
        // timer = setInterval(calculateTime, 500);
        calculateTime();
        btn.innerHTML = "停止计时";
    }

}