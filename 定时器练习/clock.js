window.$=function(sel){
    return document.querySelectorAll(sel);
}
// 动画每一步
function calc(){
    // 计算当前时间的时分秒针旋转的角度
    var now = new Date();
    var hh = now.getHours()<12?now.getHours():now.getHours()-12;
    var rh = (hh*3600+now.getMinutes()*60+now.getSeconds())/43200*360;  //43200=12个大格子*60*60
    var rm = (now.getMinutes()*60+now.getSeconds())/3600*360;
    var rs = now.getSeconds()/60*360;
    $("#h")[0].style = "transform:rotate("+rh+"deg)";
    $("#m")[0].style = "transform:rotate("+rm+"deg)";
    $("#s")[0].style = "transform:rotate("+rs+"deg)";
}

var timer;

window.onload=function(){
    calc();
    timer = setInterval(calc, 1000);
}