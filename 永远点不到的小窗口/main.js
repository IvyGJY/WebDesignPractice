// 定义一个游戏类
var game = {
    smallWin : null,
    start : function(){
        // 打开一个新窗口，并设置窗口的大小,随机初始化位置
        var rTop = Math.random()*(window.innerHeight-20+1);
        var rLeft = Math.random()*(window.innerWidth-300+1);
        var config = "top="+rTop+", left="+rLeft+", height=20, width=300, resizable=yes"; 
        this.smallWin = open("about:blank", "small", config);
        this.smallWin.document.write("<img src='E:\\workspace-JS\\WebDesignPractice\\永远点不到的小窗口\\Cute.jpg'/>");
        this.smallWin.onmouseover=function(){
            var e = window.event || arguments[0];
            var x =e.screenX;
            var y =e.screenY;
            // 当鼠标进入小窗口时，反复随机计算新的 top、left 的值
            while(true){
                var rTop = Math.random()*(window.innerHeight-20+1);
                var rLeft = Math.random()*(window.innerWidth-300+1);
                if(!((x>=this.screenX&&x<=this.screenX+300)&&(y>=this.screenY&&y<=this.screenY+20))){
                    this.moveTo(rLeft,rTop);
                    break;
                }
            }
           
        }
    }
}