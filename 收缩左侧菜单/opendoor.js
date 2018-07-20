function toogle (d2){
    // console.log(d2.innerHTML);
    d1 = document.getElementById("d1");
    if(d2.innerHTML=="&lt;&lt;"){
        d2.innerHTML = "&gt;&gt;";
        d1.style.display="none";
    }else{
        d2.innerHTML = "&lt;&lt;";
        d1.style.display="inline-block";
    }
}