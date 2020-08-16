var stateArray = []; 
var canvasWidth = 30, canvasHeight = 30;

var gameCanv = document.getElementById("gamecanvas");
var gameCtx = gameCanv.getContext("2d");

var interval;

var bgCell = new Image(),
    yesCell = new Image(),
    noCell = new Image()


    bgCell.src = "img/cell.png";
    yesCell.src = "img/cell_on.png"; 
    noCell.src = "img/cell_off.png"; 

//init virgin array of state
for (let i = 0; i < canvasHeight; i++){
    stateArray[i] =[];
    
    for (let j = 0; j < canvasWidth; j++){
        stateArray[i][j] = [0, 0];
        /*
        **[0] - now  {0,1} 0 - no, 1 - yes
        **[1] - touch 0 
        */

    }
}

function drawBG(){
    for(let i = 0 ; i < canvasHeight  ;i++){
        for(let j = 0 ; j < canvasWidth; j++){
            gameCtx.drawImage(bgCell, i*30, j*30);
        }
    }
}

function drawCells(){
    for(let i = 0 ; i < canvasHeight  ;i++){
        for(let j = 0 ; j < canvasWidth; j++){
            if(stateArray[i][j][0] == 0){
                gameCtx.drawImage(noCell, j*30, i*30);
            }
            else{
                gameCtx.drawImage(yesCell, j*30, i*30);
            }
            
        }
    }
}

function draw(){
    drawBG();
    drawCells();
    //calcNextFrame();



}

function calcNextFrame(){
    


    for(let i = 0; i < canvasHeight ; i++){
        for(let j = 0; j < canvasWidth ; j++){
            let sum = 0;

            

            if (!(i == 0 || j == 0  ||i == canvasHeight-1  || j == (canvasWidth - 1))){
                sum = stateArray[i-1][j][0] + stateArray[i][j-1][0] +
                stateArray[i-1][j-1][0] + stateArray[i-1][j+1][0] +
                stateArray[i+1][j][0] + stateArray[i][j+1][0] +
                stateArray[i+1][j+1][0] + stateArray[i+1][j-1][0];
            }

            else{

                if (j == 0){
                    sum +=  stateArray[i][j+1][0];//R
                    sum +=  stateArray[i][canvasWidth-1][0];//L


                    if(i == 0 ){
                        sum +=  stateArray[canvasHeight-1][j][0];//T
                        sum +=  stateArray[i+1][j][0];//B
                        sum +=  stateArray[canvasHeight-1][j+1][0];//TR
                        sum +=  stateArray[canvasHeight-1][canvasWidth-1][0];//TL
                        sum +=  stateArray[i+1][j+1][0];//BR
                        sum +=  stateArray[i+1][canvasWidth-1][0];//BL
                    }
                    else if(i == canvasHeight-1){
                        sum +=  stateArray[i-1][j][0];//T
                        sum +=  stateArray[0][j][0];//B
                        sum +=  stateArray[i-1][canvasWidth-1][0];
                        sum +=  stateArray[0][canvasWidth-1][0];
                        sum +=  stateArray[i-1][j+1][0];
                        sum +=  stateArray[0][j+1][0];
                    }
                    else{
                        sum +=  stateArray[i-1][j][0];//T
                        sum +=  stateArray[i+1][j][0];//B
                        sum +=  stateArray[i-1][canvasWidth-1][0];//NILL
                        sum +=  stateArray[i+1][canvasWidth-1][0];//NILL
                        sum +=  stateArray[i-1][j+1][0];//NILL
                        sum +=  stateArray[i+1][j+1][0];//NILL
                    }

                }
                else if(j == canvasWidth-1){
                    sum +=  stateArray[i][j-1][0];//L
                    sum +=  stateArray[i][0][0];//R
                    
                    if(i == 0 ){
                        sum +=  stateArray[canvasHeight-1][j][0];//T
                        sum +=  stateArray[i+1][j][0];//B
                        sum +=  stateArray[canvasHeight-1][j-1][0];//NILL
                        sum +=  stateArray[i+1][j-1][0];//NILL
                        sum +=  stateArray[canvasHeight-1][0][0];//NILL
                        sum +=  stateArray[i+1][0][0];//NILL
                    }
                    else if(i == canvasHeight-1){
                        sum +=  stateArray[i-1][j][0];//T
                        sum +=  stateArray[0][j][0];//B
                        sum +=  stateArray[i-1][j-1][0];//NILL
                        sum +=  stateArray[0][j-1][0];//NILL
                        sum +=  stateArray[i-1][0][0];//NILL
                        sum +=  stateArray[0][0][0];//NILL
                    }
                    else{
                        sum +=  stateArray[i-1][j][0];//t
                        sum +=  stateArray[i+1][j][0];//b
                        sum +=  stateArray[i-1][j-1][0];//NILL
                        sum +=  stateArray[i+1][j-1][0];//NILL
                        sum +=  stateArray[i-1][0][0];//NILL
                        sum +=  stateArray[i+1][0][0];//NILL
                    }


                }
                else{
                    sum +=  stateArray[i][j-1][0];//L
                    sum +=  stateArray[i][j+1][0];//R

                    if(i == 0 ){
                        sum +=  stateArray[canvasHeight-1][j][0];//t
                        sum +=  stateArray[i+1][j][0];//b
                        sum +=  stateArray[canvasHeight-1][j-1][0];//NILL
                        sum +=  stateArray[i+1][j-1][0];//NILL
                        sum +=  stateArray[canvasHeight-1][j+1][0];//NILL
                        sum +=  stateArray[i+1][j+1][0];//NILL
                    }
                    else {
                        sum +=  stateArray[i-1][j][0];//t
                        sum +=  stateArray[0][j][0];//b
                        sum +=  stateArray[i-1][j-1][0];//NILL
                        sum +=  stateArray[0][j-1][0];//NILL
                        sum +=  stateArray[i-1][j+1][0];//NILL  
                        sum +=  stateArray[0][j+1][0];//NILL
                    }
                    

                }
            }


            /*
            if (!(i == 0 || j == 0  ||i == canvasHeight-1  || j == (canvasWidth - 1))){
                sum = stateArray[i-1][j][0] + stateArray[i][j-1][0] +
                stateArray[i-1][j-1][0] + stateArray[i-1][j+1][0] +
                stateArray[i+1][j][0] + stateArray[i][j+1][0] +
                stateArray[i+1][j+1][0] + stateArray[i+1][j-1][0];
            }
            else{

                if (i == 0){
                    sum +=  stateArray[i+1][j][0];//B
                    sum +=  stateArray[canvasWidth-1][j][0];//T

                    if (j == 0){
                        sum +=  stateArray[i][canvasHeight-1][0];//L
                        sum +=  stateArray[i][j+1][0];//R
                        sum +=  stateArray[i+1][canvasHeight-1][0];//BL
                        sum +=  stateArray[i+1][j+1][0];//BR
                        sum +=  stateArray[canvasWidth-1][canvasHeight-1][0];//TL
                        sum +=  stateArray[canvasWidth-1][j+1][0];//TR
                    }
                    else if (j == canvasWidth-1){
                        sum +=  stateArray[i][canvasHeight-1][0];//L
                        sum +=  stateArray[i][j+1][0];//R
                        sum +=  stateArray[i+1][canvasHeight-1][0];//BL
                        sum +=  stateArray[i+1][j+1][0];//BR*
                        sum +=  stateArray[canvasWidth-1][canvasHeight-1][0];//TL
                        sum +=  stateArray[canvasWidth-1][j+1][0];//TR*
                    }
                    else{

                    }
                }
                else if (i == canvasHeight-1){
                    sum +=  stateArray[0][j][0];
                    sum +=  stateArray[i-1][j][0];//canvasHeight


                }
                
                else{
                    sum +=  stateArray[i+1][j][0];
                    sum +=  stateArray[i-1][j][0]; 


                }



            }
            */





            
            stateArray[i][j][1] = sum;

            
        }
    }
}

function setNextFrame(){
    for(let i = 0; i < canvasHeight ; i++){
        for(let j = 0; j < canvasWidth ; j++){
            if (stateArray[i][j][0] == 1){
                if(stateArray[i][j][1] == 2 || stateArray[i][j][1] == 3/* ||stateArray[i][j][1] ==*/ )
                {
                    stateArray[i][j][0] = 1;
                }
                else
                {
                    stateArray[i][j][0] = 0;
                }
            
            }
            else{
                if(stateArray[i][j][1] == 3 || stateArray[i][j][1] == 2 || stateArray[i][j][1] == 7 || stateArray[i][j][1] == 4 )
                {
                    stateArray[i][j][0] = 1;
                }
                else
                {
                    stateArray[i][j][0] = 0;
                }   

            }

        }
    }
}

bgCell.onload = draw;



gameCanv.onclick = function(elem){
    let Vcanvas = gameCanv.getBoundingClientRect().top;
    let Hcanvas = gameCanv.getBoundingClientRect().left;

    var clickX = parseInt((elem.clientX - Hcanvas)/30);
    var clickY = parseInt((elem.clientY - Vcanvas)/30);

    if(stateArray[clickY][clickX][0]==0)
        stateArray[clickY][clickX][0] = 1;
    else
        stateArray[clickY][clickX][0] = 0;


    //alert(clickX + "  " + clickY);
    draw();
};




document.addEventListener('keydown', function () {
    var down;
    var state = false;

    //var interval;


    return function () {
        

        //alert(logArray());

        
    // your magic code here
        if (!state){
            state = true;
            interval = setInterval(function(){
                
                calcNextFrame();
                setNextFrame();
                
                draw();
                //alert(logArray());

            }, 200);
        }
        else{
            clearInterval(interval);
            state = 0;
        }
        //alert();
    }



}(), false);






var logArray = function(){
    let string = "";
    for (let i = 0; i < canvasHeight;i++){
        let tmp = "";
        for (let j = 0; j < canvasWidth;j++){
            tmp += "[" + stateArray[i][j][1] + "]";


        }
        string += tmp + "\n";
    }
    return string;


}


var logArray2 = function(){
    let string = "";
    for (let i = 0; i < canvasHeight;i++){
        let tmp = "";
        for (let j = 0; j < canvasWidth;j++){
            tmp += "[" + stateArray[i][j][0] + "]";


        }
        string += tmp + "\n";
    }
    return string;


}








