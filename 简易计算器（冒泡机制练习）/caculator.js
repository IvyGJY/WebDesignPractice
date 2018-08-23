var div = document.getElementById("calc");
div.onclick = function(){
    var e = window.event || arguments[0];
    var src = e.srcElement || e.target;
    if(src.nodeName == "BUTTON"){
        var txt = document.querySelector("textarea");
        switch(src.innerHTML){
            case "C":
                txt.innerHTML = "";
                break;
            case "=":
                try{
                    txt.innerHTML = eval(txt.innerHTML);
                    break;
                }catch(err){
                    txt.innerHTML = err;
                }               
            default:
                txt.innerHTML += src.innerHTML;
        }
    }
}