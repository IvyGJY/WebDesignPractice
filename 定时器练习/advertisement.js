var adv = {
    div:null,
    step:10,   //每次移动10px
    interval:10,  // 时间间隔 10ms
    init: function(){
        this.div = document.querySelector("#ad");
        this.moveUp();
    },
    moveUp: function(){
        // console.log(parseInt(getComputedStyle(this.div).bottom));
        var bottomStyle = getComputedStyle(this.div).bottom;
        var moveStep = parseInt(bottomStyle)+this.step;
        this.div.style.bottom = moveStep+"px";
        if(parseInt(moveStep)!=0){
            // setTimeout(function(){adv.moveUp();}, this.interval);
            setTimeout(function(){adv.moveUp();}, this.interval);
        }
    },
    moveDown:function(){
        var bottomStyle = getComputedStyle(this.div).bottom;
        var moveStep = parseInt(bottomStyle)-this.step;
        this.div.style.bottom = moveStep+"px";
        if(Math.abs(parseInt(moveStep))!= parseInt(getComputedStyle(this.div).height)){
            setTimeout(function(){adv.moveDown();}, this.interval);
        }else{
            setTimeout(function(){adv.moveUp();}, 5000);
        }       
    }
}

window.onload = function(){
    adv.init();
}