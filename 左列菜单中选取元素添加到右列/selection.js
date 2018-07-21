//当页面加载后定义2个数组：unselected：存所有未选中的国家（左）  selected：存所有选中的国家（右边）
var unselected = [];
var selected = [];
window.$=function(selector){
    return document.querySelectorAll(selector);
}
//初始化
window.onload = function(){
    // 提取左侧所有元素并保存到 unselected 数组中
    unselected = $("#unselected")[0].innerHTML.trim().slice(8,-9).split(/<\/option>\s*<option>/);
    // 直接带option一起取出来放数组，免得还要加回来
    // unselected = $("#unselected")[0].innerHTML.trim().split("       "); 
    // console.log(selected);
    selList = document.getElementById("selected");
    unselList = document.getElementById("unselected");
}

function move(btn){
    if (btn.innerHTML=="&gt;&gt;"){
        // 将 unselected 中的所有元素拼接到 selected ，对数组排序 sort（）
        // selected = unselected.sort();
        // updateSel(selected);
        selected=selected.concat(unselected).sort();
        unselected.length=0;
    }else if (btn.innerHTML=="&lt;&lt;"){
        // 将 selected 中的所有元素拼接到  unselected ，对数组排序 sort（）
        // selected = $("#selected")[0].innerHTML.trim().slice(8,-9).split(/<\/option>\s*<option>/);
        // // console.log(selected);
        // unselected = selected.sort();
        // updateSel(unselected);
        unselected=unselected.concat(selected).sort();
        selected.length=0;
    }else if(btn.innerHTML=="&gt;"){
            // 将选中的移动到右边
            // option 有一个 selected 属性，可以被转成 true 或 false
            var opt=$("#unselected option");
            for(var i = opt.length-1; i >= 0; i--){
                if (opt[i].selected){
                    var selOpt = unselected.splice(i,1)[0];
                    selected.push(selOpt);
                    // selected.push(unselected.splice(i,1)[0]);
                }
            }
            selected.sort();
    }else{
        var opt=$("#selected option");
            for(var i = opt.length-1; i >= 0; i--){
                if (opt[i].selected){
                    var selOpt = selected.splice(i,1)[0];
                    unselected.push(selOpt);
                    // selected.push(unselected.splice(i,1)[0]);
                }
            }
            unselected.sort();

    }
    updateSel();
}

function updateSel(){
    // 将更改刷新到页面上   将option填回来
    // if(sel == selected){
    //     selList.innerHTML="<option>"+unselected.join("</option><option>")+"</option>";
    //     unselList.innerHTML="";
    // }else{
    //     unselList.innerHTML="<option>"+selected.join("</option><option>")+"</option>";
    //     selList.innerHTML="";
    // }
    selList.innerHTML="<option>"+selected.join("</option><option>")+"</option>";
    unselList.innerHTML="<option>"+unselected.join("</option><option>")+"</option>";
}

// function updateSel(sel){
//     // 将更改刷新到页面上   将option填回来
//     if(sel == selected){
//         selList.innerHTML="<option>"+unselected.join("</option><option>")+"</option>";
//         unselList.innerHTML="";
//     }else{
//         unselList.innerHTML="<option>"+selected.join("</option><option>")+"</option>";
//         selList.innerHTML="";
//     }
    
// }


