function Cell(row, col, img){
    this.row = row;
    this.col = col;
    this.img = img;  // 每种图形的格子颜色不同,保存的是图片的路径
    if(!Cell.prototype.drop){
        Cell.prototype.drop = function(){
            this.row++;
        }
    }
    if(!Cell.prototype.moveLeft){
        Cell.prototype.moveLeft = function(){
            this.col--;
        }
    }
    if(!Cell.prototype.moveRight){
        Cell.prototype.moveRight = function(){
            this.col++;
        }
    }
}

function shapeState(r0,c0,r1,c1,r2,c2,r3,c3){
    // 第0个 cell 相对与参照 cell 的下标偏移量，参照 cell 是不变的
    this.r0 = r0;
    this.c0 = c0;
    // 第1个 cell 相对与参照 cell 的下标偏移量
    this.r1 = r1;
    this.c1 = c1;
    // 第2个 cell 相对与参照 cell 的下标偏移量
    this.r2 = r2;
    this.c2 = c2;
    // 第3个 cell 相对与参照 cell 的下标偏移量
    this.r3 = r3;
    this.c3 = c3;
}

function Shape(img, fixedCell){
    // 保存图片的路径
    this.img = img;
    // 保存旋转时，作为参照物的不动的那个格子的下标
    this.fixedCell = fixedCell;
    // 保存每种图形不同状态的数组
    this.states = []; 
    // 默认初始状态为states中的第0个
    this.state_index = 0; 

    if(!Shape.prototype.drop){
        Shape.prototype.drop = function(){
            for(var c=0; c<this.cells.length; c++){
                this.cells[c].drop();
            }
        }
    }
    if(!Shape.prototype.moveLeft){
        Shape.prototype.moveLeft = function(){
            for(var c=0; c<this.cells.length; c++){
                this.cells[c].moveLeft();
            }
        }
    }
    if(!Shape.prototype.moveRight){
        Shape.prototype.moveRight = function(){
            for(var c=0; c<this.cells.length; c++){
                this.cells[c].moveRight();
            }
        }
    }

    // 旋转
    if(!Shape.prototype.rotateRight){
        Shape.prototype.rotateRight = function(){
            if(Object.getPrototypeOf(this) != O.prototype){
                this.state_index++;
                if(this.state_index >= this.states.length){
                    this.state_index = 0;
                }
                for(var i=0; i<this.cells.length; i++){
                    this.cells[i].row = this.cells[this.fixedCell].row+this.states[this.state_index]["r"+i];
                    this.cells[i].col = this.cells[this.fixedCell].col+this.states[this.state_index]["c"+i];
                }
            }           
        }
    }
    if(!Shape.prototype.rotateLeft){
        Shape.prototype.rotateLeft = function(){
            if(Object.getPrototypeOf(this) != O.prototype){
                this.state_index--;
                if(this.state_index <0){
                    this.state_index = this.length-1;
                }
                for(var i=0; i<this.cells.length; i++){
                    this.cells[i].row = this.cells[this.fixedCell].row+this.states[this.state_index]["r"+i];
                    this.cells[i].col = this.cells[this.fixedCell].col+this.states[this.state_index]["c"+i];
                }
            }  
        }
    }
}

function O(){
    Shape.call(this, "../Tetris/images/O.png", 0);
    if(!Shape.prototype.isPrototypeOf(O.prototype)){
        Object.setPrototypeOf(O.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,4,this.img),
        new Cell(0,5,this.img),
        new Cell(1,4,this.img),
        new Cell(1,5,this.img)
    ]
}

function T(){
    Shape.call(this, "../Tetris/images/T.png", 1);
    if(!Shape.prototype.isPrototypeOf(T.prototype)){
        Object.setPrototypeOf(T.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,3,this.img),
        new Cell(0,4,this.img), //参照格
        new Cell(0,5,this.img),
        new Cell(1,4,this.img)
    ]

    this.states[0] = new shapeState(0,-1, 0,0, 0,1, 1,0);
    this.states[1] = new shapeState(-1,0, 0,0, 1,0, 0,-1);
    this.states[2] = new shapeState(0,1, 0,0, 0,-1, -1,0);
    this.states[3] = new shapeState(1,0, 0,0, -1,0, 0,1);
}

function L(){
    Shape.call(this, "../Tetris/images/L.png", 1);
    if(!Shape.prototype.isPrototypeOf(L.prototype)){
        Object.setPrototypeOf(L.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,4,this.img),
        new Cell(1,4,this.img), //参照格
        new Cell(2,4,this.img),
        new Cell(2,5,this.img)
    ]

    this.states[0] = new shapeState(-1,0, 0,0, 1,0, 1,1);
    this.states[1] = new shapeState(0,1, 0,0, 0,-1, 1,-1);
    this.states[2] = new shapeState(1,0, 0,0, -1,0, -1,-1);
    this.states[3] = new shapeState(0,-1, 0,0, 0,1, -1,1);
}

function J(){
    Shape.call(this, "../Tetris/images/J.png", 1);
    if(!Shape.prototype.isPrototypeOf(J.prototype)){
        Object.setPrototypeOf(J.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,5,this.img),
        new Cell(1,5,this.img), //参照格
        new Cell(2,5,this.img),
        new Cell(2,4,this.img)
    ]

    this.states[0] = new shapeState(-1,0, 0,0, 1,0, 1,-1);
    this.states[1] = new shapeState(0,1, 0,0, 0,-1, -1,-1);
    this.states[2] = new shapeState(1,0, 0,0, -1,0, -1,1);
    this.states[3] = new shapeState(0,-1, 0,0, 0,1, 1,1);
}

function I(){
    Shape.call(this, "../Tetris/images/I.png", 1);
    if(!Shape.prototype.isPrototypeOf(I.prototype)){
        Object.setPrototypeOf(I.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,3,this.img),
        new Cell(0,4,this.img), //参照格
        new Cell(0,5,this.img),
        new Cell(0,6,this.img)
    ]

    this.states[0] = new shapeState(0,-1, 0,0, 0,1, 0,2);
    this.states[1] = new shapeState(-1,0, 0,0, 1,0, 2,0);
}

function S(){
    Shape.call(this, "../Tetris/images/S.png", 0);
    if(!Shape.prototype.isPrototypeOf(S.prototype)){
        Object.setPrototypeOf(S.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,4,this.img), //参照格
        new Cell(0,5,this.img),
        new Cell(1,3,this.img),
        new Cell(1,4,this.img)
    ]

    this.states[0] = new shapeState(0,0, 0,1, 1,0, 1,-1);
    this.states[1] = new shapeState(0,0, 1,0, 0,-1, -1,-1);
}

function Z(){
    Shape.call(this, "../Tetris/images/Z.png", 1);
    if(!Shape.prototype.isPrototypeOf(Z.prototype)){
        Object.setPrototypeOf(Z.prototype, Shape.prototype);
    }
    this.cells = [
        new Cell(0,3,this.img),
        new Cell(0,4,this.img), //参照格
        new Cell(1,4,this.img),
        new Cell(1,5,this.img)
    ]

    this.states[0] = new shapeState(0,-1, 0,0, 1,0, 1,1);
    this.states[1] = new shapeState(-1,0, 0,0, 0,-1, 1,-1);
}