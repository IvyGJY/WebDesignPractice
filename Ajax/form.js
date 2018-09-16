// 表单元素中的 submit，只要点击就会提交
// 但是现在想用 Ajax 方法进行提交表单，所以不能写 <input type="submit"> ,应该将 submit 换为 button
var btn = document.getElementById("btn");
btn.onclick = function(){
    var xhr = getXhr();
    // 其实这个 open 里的信息，可以获取 form 里的 action 和 method
    // 或者 form 里直接不写 action 和 method，在 open 里设置就好
    xhr.open("post", "form.php");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var user = document.getElementById("userName").value;
    var pwd = document.getElementById("userPwd").value;
    xhr.send("user="+user+"&pwd="+pwd);
    xhr.onreadystatechange = function (){
        if (xhr.readyState == 4 && xhr.status == 200){
            var data = xhr.responseText;
            console.log(data);
        }
    }

}

// 创建 XMLHttpRequest 对象，由于版本不同，所以有两种获取方式
function getXhr (){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}