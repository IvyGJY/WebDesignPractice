var btn = document.getElementById("btn");
btn.onclick = function (){
    // readyState = 1
    var xhr = getXhr();
    // xhr.open("post", "readyState.php");
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    // readyState = 2
    xhr.open("get", "readyState.php");
    xhr.onreadystatechange = function (){
        alert(xhr.readyState); // 输出结果 依次为 2，3，4, IE 为 1，2，3，4， 0一般在客户端看不到
    }
    // readyState = 3
    xhr.send();
    // readyState = 4
    // xhr.onreadystatechange = function (){
    //     alert(xhr.readyState); // 输出结果 依次为 2，3，4
    // }
}

function getXhr(){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}