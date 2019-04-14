
window.onload= function () {
    var can1=document.getElementById("canvas1");   /*承载场景、泡泡、墙*/
    var can2=document.getElementById("canvas2");   /*承载人物、箱子*/
    var context1=can1.getContext("2d");
    var context2=can1.getContext("2d");
    var nowLevel=[];
    var boxs=[];
    var balls=[];
    var walls=[];
    var blocks=[];
    var trees = [];
    var me;
    var time=0;
    var level=0;
    var changeX=0;
    var changeY=0;
    var timeOut=true;
    var complete=0;
    var step = 0;
    getValue();
    setItem();    
 
    setInterval(function () {    /*帧动画刷新*/
        context2.clearRect(0,0,can2.width,can2.height)
        drawMap();
        drawItem();
        key();
        setContent();
    },30);
    //获取初始时关卡数
    function getValue(){
        var res;
        var url=window.location.search; //获取url中"?"符后的字串
        console.log(url);
        if(url.indexOf("?")!=-1){
            res = url.substr(url.indexOf("=")+1);
            console.log(res)
            switch(res){
            case '0'://简单
                level = 0;
                break;
            case '1'://中等
                level = 29;
                break;
            case '2'://超难
                level = 59;
                break;    
            }
            console.log(level);
        }
    }

    //初始化地图
    function drawMap(){  
        var game=document.getElementById("game")
        var block=new Image();
        var ball=new Image();
        block.src="img/block.png";
        ball.src="img/plate.png";
        for(var i=0;i<levels[level].length;i++) {
            for (var j = 0; j <levels[level][i].length; j++) {
                    context1.beginPath();
                    context1.drawImage(block, 35 * i, 35 * j,35,35);

            }
        }
    }

    //初始化墙、箱子、人
    function setItem(){ 
        for(var i = 0; i<levels[level].length;i++){
            nowLevel[i]=[];
            for(var j=0;j<levels[level][i].length;j++){
                nowLevel[i][j]=levels[level][i][j]
            }
        }
        boxs=[];
        balls=[]
        walls=[];
        blocks=[];
        trees = [];
        me=null;
        time=0;
        changeX=0;
        changeY=0;
        timeOut=true;
        complete=0;

        for (var i=0;i<nowLevel.length;i++){
            for (var j=0;j<nowLevel[i].length;j++){
                block={
                    x:i*35,
                    y:j*35,
                    pic:new Image
                }
                block.pic.src="img/block.png";
                blocks.push(block);
                if(nowLevel[i][j]==1){ //画墙
                    aWall={
                        x:i*35,
                        y:j*35,
                        pic:new Image(),
                        realX:i,
                        realY:j
                    };
                    aWall.pic.src="img/wall.png";
                    walls.push(aWall);
                }
                if(nowLevel[i][j]==2){//画目标点
                    ball={
                        x:i*35,
                        y:j*35,
                        pic:new Image,
                    };
                    ball.pic.src="img/plate.png";
                    balls.push(ball);
                }
                if(nowLevel[i][j]==3){//画箱子
                    aBox={
                        x:i*35,
                        y:j*35,
                        pic:new Image,
                        realX:i,
                        realY:j
                    };
                    aBox.pic.src="img/cake.png";
                    boxs.push(aBox);
                }
                
                if(nowLevel[i][j]==4){ //画人物
                    me={
                        x:i*35,
                        y:j*35,
                        role:new Image(),
                        walkX:0,
                        walkY:0,
                        realX:i,
                        realY:j
                    };
                    me.role.src="img/duck.jpg";
                }
                if(nowLevel[i][j]==5){ //画树
                    tree={
                        x:i*35,
                        y:j*35,
                        pic:new Image,
                        realX:i,
                        realY:j
                    };
                    tree.pic.src="img/tree.png";
                    trees.push(tree);
                }
            }
        }
    }

    function setContent(){
        context1.fillStyle="rgba(255,255,255,1)";
        context1.font="bold 30px cursive";
        var level2=level+1;
        context2.fillText("Level:"+level2,10,30);
        context2.fillText("Step:"+step,10,60);
    }

    //更新一行中的内容
    function drawLine(x){
        var i=0;
        while(block[i]){
            context1.beginPath();
            context1.drawImage(blocks[i].pic, blocks[i].x, blocks[i].y,35,35);
        }
        while(balls[i]) {
            if (balls[i].y/35 == x){
                context2.beginPath();
                context2.drawImage(balls[i].pic, balls[i].x, balls[i].y);
            }
            i++;
        }
        i=0;
        while(walls[i]) {
            if (walls[i].realY == x){
                context2.beginPath();
                context2.drawImage(walls[i].pic, walls[i].x, walls[i].y);
            }
            i++;
        }
        i=0;
        while(boxs[i]) {
            if (boxs[i].realY == x){
                context2.beginPath();
                context2.drawImage(boxs[i].pic, boxs[i].x,boxs[i].y-10);/*箱子*/
            }
            i++;
        }
        i=0;
        while(trees[i]) {
            if (trees[i].realY == x){
                context2.beginPath();
                context2.drawImage(trees[i].pic, trees[i].x, trees[i].y-10);/*箱子*/
            }
            i++;
        }
        i=0;
        if (me.realY == x){
            context2.beginPath();
            context2.drawImage(me.role,me.walkX,me.walkY,100,100,me.x-18,me.y-65,70,90);/*人物*/
        }
    }

    //绘制每一行
    function drawItem(){
        for(var i=0;i<16;i++){
            drawLine(i);
        }
    }

    //添加键盘事件
    document.onkeydown=function(){
        if(time==0){
            switch (event.keyCode){
                case 37:
                    changeX=-1;
                    me.walkY=100;
                    step++;
                    break;
                case 38:
                    changeY=-1;
                    me.walkY=300;
                    step++;
                    break;
                case 39:
                    changeX=1;
                    me.walkY=200;
                    step++;
                    break;
                case 40:
                    changeY=1;
                    me.walkY=0;
                    step++;
                    break;
            }
        }
    };

    function key(){
        if (changeX!=0 || changeY!=0){
            if(nowLevel[me.realX+changeX][me.realY+changeY]==0 || nowLevel[me.realX+changeX][me.realY+changeY]==2){//如果前方是空地
                me.y+=5*changeY;
                me.x+=5*changeX;
            }else if(nowLevel[me.realX+changeX][me.realY+changeY]==3){//如果前方有箱子
                if (nowLevel[me.realX+2*changeX][me.realY +2*changeY] == 0||nowLevel[me.realX+2*changeX][me.realY+2*changeY]==2) {//如果箱子前方是空地
                    me.y+=5*changeY;
                    me.x+=5*changeX;
                    for(var i=0;i<boxs.length;i++){
                        if(boxs[i].realX == me.realX+changeX && boxs[i].realY == me.realY+changeY){
                            boxs[i].y+=5*changeY;
                            boxs[i].x+=5*changeX;
                        }
                    }
                }
            }
            time+=5;
            if(time>=7){
                me.walkX=100;
            }
            if(time>=14){
                me.walkX=200;
            }
            if(time>=21){
                me.walkX=300;
            }
            if(time>=35){
                me.walkX=0;
                time=0;
                if(nowLevel[me.realX+changeX][me.realY+changeY]!=1&&nowLevel[me.realX+changeX][me.realY+changeY]!=3){//如果前方是空地
                    nowLevel[me.realX][me.realY]=0;//人后方设置为地面
                    nowLevel[me.realX+changeX][me.realY+changeY]=4;
                    me.realY+=changeY;
                    me.realX+=changeX;
                }else if(nowLevel[me.realX+changeX][me.realY+changeY]==3) {//如果前方有箱子
                    if (nowLevel[me.realX+2*changeX][me.realY +2*changeY] == 0||nowLevel[me.realX+2*changeX][me.realY+2*changeY]==2) {//如果箱子前方是空地
                        for(var i=0;i<boxs.length;i++){
                            if(boxs[i].realX==me.realX+changeX&&boxs[i].realY==me.realY+changeY){
                                boxs[i].realY+=changeY;
                                boxs[i].realX+=changeX;

                            }
                        }
                        nowLevel[me.realX+2*changeX][me.realY + 2*changeY]=3;
                        nowLevel[me.realX+changeX][me.realY + changeY]=4;
                        nowLevel[me.realX][me.realY]=0;
                        me.realY+=changeY;
                        me.realX+=changeX;

                    }
                }
                changeX=0;
                changeY=0;
                timeOut=true;
                fail();
                win();
            }        
        }
    }
    //检测是否到达目标点
    function test(x,y){
        for(var j=0;j<balls.length;j++){
            if(balls[j].x == x && balls[j].y == y){
                return true;
            }
        }
        return false;
    }

    //判断失败
    function fail(){
        for(var i=0;i<boxs.length;i++){
            console.log(boxs[i].x/35,boxs[i].y/35);
            var tag = test(boxs[i].x,boxs[i].y);
            var s1 = nowLevel[boxs[i].x/35-1][boxs[i].y/35];
            var s2 = nowLevel[boxs[i].x/35][boxs[i].y/35+1];
            var s3 = nowLevel[boxs[i].x/35+1][boxs[i].y/35];
            var s4 = nowLevel[boxs[i].x/35][boxs[i].y/35-1];
            console.log(s1,s2,s3,s4);
            if(!tag && ((s1 == 1 && s2 == 1 ) || (s2 == 1 && s3 == 1) || (s3 == 1 && s4 == 1) || (s4 == 1 && s1 == 1))){
                alert("Game Over! click to restart");
                step = 0;
                setItem();
            }

        }
    }
    //判断胜利
    function win(){
        complete=0;
        for(var i=0;i<balls.length;i++){
            for(var j=0;j<boxs.length;j++){
                if(balls[i].x == boxs[j].realX*35 && balls[i].y == boxs[j].realY*35){
                    complete++;
                }
            }
        }
        if(complete == balls.length){
            level++;
            step =0;
            setItem()
        }        
    }
    //跳转关卡
    document.getElementById("jump").onclick= function () {
        if(document.getElementById("guanQia").value>0&&document.getElementById("guanQia").value<100){
            level=document.getElementById("guanQia").value;
            level--;
            step = 0;
            setItem()
        }else{
            document.getElementById("guanQia").value="num:from 0 to 99"
        }


    }
    //重玩
    document.getElementById("replay").onclick= function (){
        step = 0;
        setItem()
    }
    //跳转到简单
    document.getElementById("easy").onclick= function (){
        step = 0;
        level = 0;        
        setItem()
        console.log("aa");
    }
    //跳转到中等
    document.getElementById("medium").onclick= function (){
        step = 0;
        level = 29;
        setItem()
    }
    //跳转到超难
    document.getElementById("hard").onclick= function (){
        step = 0;
        level = 59;
        setItem()
    }
    
};