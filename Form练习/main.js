window.$=HTMLElement.prototype.$=function(sel){
    return (this==window?document:this).querySelectorAll(sel);
}

window.onload=function(){
    var form = document.forms[0];
    var userName = form.elements["userName"];
    var pwd = form.elements["userPassword"];

    userName.onfocus=pwd.onfocus=function(){
        this.className = "textFocus";
        this.parentNode.parentNode.$("div")[0].className=" ";
    }

    userName.onblur = nameValidation;
    pwd.onblur = pwdValidation;

    form.onsubmit = function(){
        // 当输入错误数据不符合要求时需要进行拦截  
        var result = userName.onblur() && pwd.onblur();
        var e = window.event || arguments[0];
        if (result == false){

            if (e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        }
    }

    form.onreset = function(){
        // 当点击重置时 清空输入内容以及提示信息
        userName.value = " ";
        pwd.value = " ";
        userName.parentNode.parentNode.$("div")[0].className = "validationInfo";
        pwd.parentNode.parentNode.$("div")[0].className = "validationInfo";
    }
}

function nameValidation (){
    this.className = " ";
    var div = this.parentNode.parentNode.$("div")[0];
    var r = /^\w{1,10}$/.test(this.value);
    if (r){
        div.className = "validationSuccess";
    }else{
        div.className = "validationFailure";
    }
    return r;
}
function pwdValidation (){
    this.className = " ";
    var div = this.parentNode.parentNode.$("div")[0];
    var r = /^\d{6}$/.test(this.value);
    if (r){
        div.className = "validationSuccess";
    }else{
        div.className = "validationFailure";
    }
    return r;
}