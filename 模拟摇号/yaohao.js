window.$=function(sel){
    return document.querySelectorAll(sel);
}
window.onload=function(){
    var lis = $("#before li");
    var numbers=[];
    while(numbers.length < lis.length){
        var num = Math.round(Math.random()*lis.length);
        if(numbers.indexOf(num) == -1){
            numbers.push(num);
        }  
    }
    // console.log(numbers);

    for(var i = 0; i<numbers.length; i++){
        lis[i].setAttribute("data-num", numbers[i]);
        // console.log(lis[i].getAttribute());
    }
    // console.log(lis[0].attributes["data-num"].value);

    //要将 lis 转为数组型才能调用 sort 方法
    lis = Array.prototype.slice.call(lis);
    // 对lis根据 data-num 排序
    lis.sort(function(li1,li2){
            var value1 = parseInt(li1.attributes["data-num"].value);
            var value2 = parseInt(li2.attributes["data-num"].value);
            return value1-value2;
    });

    // 提取排序后的姓名名单
    var names=[];
    for (var j = 0; j<lis.length;j++){
        names.push(lis[j].innerHTML);
    }

    // 显示到摇号结果列表
    var afLis = document.getElementById("after");
    afLis.innerHTML = "<li>"+names.join("</li><li>")+"</li>";
}

