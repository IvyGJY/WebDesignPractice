var provSel = document.getElementById("province");
var citySel = document.getElementById("city");
provSel.onchange = function (){
    citySel.innerHTML = "";
    var xhr = getXhr();
    xhr.open("post","Case-1.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("province="+provSel.value);
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