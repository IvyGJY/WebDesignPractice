var provSel = document.getElementById("province");
var citySel = document.getElementById("city");
var xhr = getXhr();

// 页面加载后，就在后端获取到省份信息，加载到页面上，省份信息在php中
window.onload = function (){
    xhr.open("get","Case-2.php?state=1");
    xhr.send(null);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = xhr.responseText;
            var prov = data.split(",");
            for(var i=0; i<prov.length;i++){
                var opt = document.createElement("option");
                opt.value = prov[i];
                opt.innerHTML = prov[i];
                provSel.appendChild(opt);
            }
        }
    }
}

// 根据选择的省份，显示对应的城市列表，城市的信息在php中
provSel.onchange = function (){
    citySel.innerHTML = "";
    xhr.open("post","Case-2.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("state=2&province="+provSel.value);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            var data = xhr.responseText;
            var cities = data.split(",");
            for(var i=0; i<cities.length;i++){
                var opt = document.createElement("option");
                opt.value = cities[i];
                opt.innerHTML = cities[i];
                citySel.appendChild(opt);
            }
        }
    }
}

function getXhr (){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}