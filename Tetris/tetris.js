window.$ = HTMLElement.prototype.$ = function(sel){
    return (this == window)?document.querySelectorAll(sel):this.querySelectorAll(sel);
}
var tetris = {
    RowsNum : 20,  //总行数
    ColNum : 10,   //总列数
    GridSize : 27,  //每个格子的宽高
    display_offsetX : 270, //display 显示区在x轴的偏移量
    display_offsetY : 10, //display 显示区在y轴的偏移量
    playPart : null, //保存游戏主界面对象
    displayPart : null, //保存右上角显示下一个图形界面对象
    currentShape : null, //保存正在移动的图形对象
    nextShape : null, //保存右上角显示的，下一个图形
    interval : 500, //默认每1s重绘一次
    timer : null,
    downCells : [], //保存已经下落在底部的方块

    state : 1, // 保存游戏的当前状态
    state_running : 1, //游戏正在进行
    state_over : 0,  //游戏结束
    state_pause : 2, //游戏暂停

    score : 0, //当前分数
    scoreLevel : [0, 10, 30, 50, 80], //分数档位，消除1行+10分，消除2行+30分，消除3行加50分，消除4行+80分
    lines : 0, //当前消掉的总行数

    init : function(){
        // 初始化 downCells 数组
        downCells = [];
        for (var i=0; i<this.RowsNum; i++){
            this.downCells[i] = [];
        }
        this.score = 0;
        this.lines = 0;
        this.state = 1;

        this.playPart = $(".playPart")[0];
        this.displayPart = $(".display")[0];
        this.currentShape = this.randomShape();
        this.nextShape = this.randomShape();
        this.paintShape();
        this.timer = setInterval(function(){
            tetris.drop();
            tetris.paint();
        }, this.interval);
        document.onkeydown = function(){
            var e = window.event || arguments[0];
            switch(e.keyCode){
                case 37: tetris.moveLeft(); break;
                case 39: tetris.moveRight(); break;
                case 40: tetris.drop(); break;
                case 38: tetris.rotateRight(); break;
                case 90: tetris.rotateLeft(); break;
                case 80: tetris.pause();break;
                case 67: tetris.toContinue();break;
                case 83: tetris.init();break;
            }
        }
    },

    // 每次绘制的图形, 包括图形，分数等等
    paint : function(){
        // this.paintLandedCells();
        this.paintShape();
        this.paintLandedCells();
        this.paintNext();
        this.paintResult();
        this.paintState();       
    },

    // 下落
    drop : function(){
        if(this.state == this.state_running){
            if(this.canDrop()){
                this.currentShape.drop();
            }else{
                this.saveLandedCells();
                // 删除满了的行
                var currentLinesNum = this.deletedLines();
                // 算分
                this.lines += currentLinesNum;
                this.score += this.scoreLevel[currentLinesNum];

                if(!this.isGameOver()){
                    // this.saveLandedCells();
                    this.currentShape = this.nextShape;
                    this.nextShape = this.randomShape();
                }else{
                    clearInterval(this.timer);
                    this.timer = null;
                    this.state = this.state_over;               
                    this.paintState();
                }
            }
        }
    },

    // 判断当前是否可以下落
    canDrop : function(){
        var cells = this.currentShape.cells
        for(var i=0; i<cells.length; i++){
            if(cells[i].row==this.RowsNum-1){
                return false;
            }
            if(this.downCells[cells[i].row+1][cells[i].col]){
                return false;
            }
        }
        return true;
    },
        
    // 保存已经不能再下落的格子
    saveLandedCells : function(){
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            var x = cells[i].row;
            var y = cells[i].col;
            this.downCells[x][y] = cells[i];
        }
    },
    
    // 初始化时，随机生成一个形状
    randomShape : function(){
        var r = parseInt(Math.random()*7);
        switch (r){
            case 0: return new O(); 
            case 1: return new S(); 
            case 2: return new T();
            case 3: return new L();
            case 4: return new J();
            case 5: return new Z();
            case 6: return new I();
        }
    },

    // 遍历当前的 downCells，找到满了的行并删除，最终返回被删掉的行数
    deletedLines : function(){
        var lines = 0;
        for(var i=0; i<this.downCells.length; i++){
            if(this.isFull(i)){
                this.deleteLine(i);
                lines ++;
            }
        }
        return lines;
    },

    // 删掉一行
    deleteLine : function(row){
        this.downCells.splice(row,1);
        this.downCells.unshift([]);
    },

    // 图形左移
    moveLeft : function(){
        if(this.state == this.state_running){
            this.currentShape.moveLeft();  
            if(this.isMoveToBound()||this.isMoveToCells()){      
                this.currentShape.moveRight();      
            }
        }
    },

    // 图形右移
    moveRight : function(){
        if(this.state == this.state_running){
            this.currentShape.moveRight();
            if(this.isMoveToBound()||this.isMoveToCells()){  
                this.currentShape.moveLeft();          
            }
        }
    },

    //  顺时针旋转
    rotateRight : function(){
        if(this.state == this.state_running){
            this.currentShape.rotateRight();
            if(this.isMoveToBound()||this.isMoveToCells()){  
                this.currentShape.rotateLeft();          
            }
        }
    },

    // 逆时针旋转
    rotateLeft : function(){
        if(this.state == this.state_running){
            this.currentShape.rotateLeft();
            if(this.isMoveToBound()||this.isMoveToCells()){  
                this.currentShape.rotateRight();          
            }
        }
    },

    // 判断左右移动时，是否越界
   isMoveToBound : function(){
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            if((cells[i].col >= this.ColNum) || (cells[i].col<0)){
                return true;
            }
        }
        return false;
    },

    // 判断左右移动时，是否会撞到现有的方块
    isMoveToCells : function(){
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            if(this.downCells[cells[i].row][cells[i].col]){
                return true;
            }
        }
        return false;
    },

    // 判断 downCells 中当前行是否填满了
    isFull : function(row){
        for(var i=0; i<this.ColNum; i++){
            if(!this.downCells[row][i]){
                return false;
            }
        }
        return true;
    },
    
    // 判断当前游戏是否结束
    isGameOver : function(){
        var nextCells = this.nextShape.cells;
        for(var i=0; i<nextCells.length; i++){
            if(this.downCells[nextCells[i].row][nextCells[i].col]){
                return true;
            }
        }
        return false;
    },

    // 绘制当前下落的图形的方法
    paintShape : function(){
        // 先把现有的图形清掉，再画新的，否则图形会摞在一起
        this.playPart.innerHTML = "";
        // 绘制过程
        var cells = this.currentShape.cells;
        for(var i=0; i<cells.length; i++){
            var x = cells[i].col*this.GridSize;
            var y = cells[i].row*this.GridSize;
            var img = new Image();
            img.style.left = x+"px";
            img.style.top = y+"px";
            img.style.width = this.GridSize+"px";
            img.style.height = this.GridSize+"px";
            img.style.position = "absolute";
            img.setAttribute("src", cells[i].img);
            this.playPart.appendChild(img);
        }
    },

    // 将已经下落的 cell 绘制出来
    paintLandedCells : function(){
        for(var i=0; i<this.RowsNum; i++){
                for(var j=0; j<this.ColNum; j++){
                    if(this.downCells[i][j]){
                    var x = j * this.GridSize;
                    var y = i * this.GridSize;
                    var img = new Image();
                    img.style.left = x+"px";
                    img.style.top = y+"px";
                    img.style.width = this.GridSize+"px";
                    img.style.height = this.GridSize+"px";
                    img.style.position = "absolute";
                    img.setAttribute("src", this.downCells[i][j].img);
                    this.playPart.appendChild(img);
                }
            }
        }
    },

    // 在右上角显示下一个即将下落的图形
    paintNext : function(){
        this.displayPart.innerHTML = "";
        // 绘制过程
        var cells = this.nextShape.cells;
        for(var i=0; i<cells.length; i++){
            var x = cells[i].col*this.GridSize+this.display_offsetX;
            var y = cells[i].row*this.GridSize+this.display_offsetY;
            var img = new Image();
            img.style.left = x+"px";
            img.style.top = y+"px";
            img.style.width = this.GridSize+"px";
            img.style.height = this.GridSize+"px";
            img.style.position = "absolute";
            img.setAttribute("src", cells[i].img);
            this.displayPart.appendChild(img);
        }
    },

    // 不同状态下，显示不同的图片
    paintState : function(){
        var img = new Image();
        switch (this.state){
            case 0: 
                this.playPart.innerHTML = "";
                img.src = "../Tetris/images/GameOver.jpg";
                img.style.left = "35px";
                img.style.top = "120px";
                img.style.width = "200px";
                img.style.height = "200px";
                img.style.position = "absolute";
                break;
            case 2: 
                img.src = "../Tetris/images/pause.png"; 
                img.style.left = "35px";
                img.style.top = "120px";
                img.style.width = "200px";
                img.style.height = "200px";
                img.style.position = "absolute";
                img.style.opacity = "0.5";
                break;
        };
        this.playPart.appendChild(img);            
    },

    // 将所得分数、消除行数，显示在屏幕上
    paintResult : function(){
        $(".score")[0].innerHTML = "SCORE:" + this.score;
        $(".line")[0].innerHTML = "LINES:" + this.lines;
    },

    pause : function(){
        if(this.state == this.state_running){
            this.state = this.state_pause;
        }
    },

    toContinue : function(){
        if(this.state == this.state_pause){
            this.state = this.state_running;
        }
    }
}

window.onload=function(){
    tetris.init();
}