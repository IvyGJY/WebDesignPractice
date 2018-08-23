// 定义一个游戏类
var game = {
    smallWin : null,
    start : function(){
        // 打开一个新窗口，并设置窗口的大小,随机初始化位置
        var rTop = Math.random()*(window.innerHeight-20+1);
        var rLeft = Math.random()*(window.innerWidth-200+1);
        var config = "top="+rTop+", left="+rLeft+", height=20, width=200, resizable=yes"; 
        this.smallWin = open("about:blank", "small", config);
        // this.smallWin.document.write("<img src='E:\\workspace-JS\\WebDesignPractice\\永远点不到的小窗口\\Cute.jpg'/>");
        this.smallWin.document.write("<div style='text-align: center'><img src='E:\\workspace-JS\\WebDesignPractice\\永远点不到的小窗口\\hello.gif'/></div>");
        this.smallWin.document.write("<br><div style='text-align: center'><button>Catch me</button></div>");
        this.smallWin.onmouseover=function(){
            // onmuseover 就可以判断鼠标是不是碰到小窗口了
            var e = window.event || arguments[0];
            var x =e.screenX;
            var y =e.screenY;
            // 反复随机计算新的 top、left 的值，要使鼠标不在新生成的窗口范围下才可以
            while(true){
                var rTop = Math.random()*(window.innerHeight-20+1);
                var rLeft = Math.random()*(window.innerWidth-200+1);
                if(!((x>=rLeft&&x<=rLeft+300)&&(y>=rTop&&y<=rTop+20))){
                    this.moveTo(rLeft,rTop);
                    break;
                }
            }
           
        }
    }
}