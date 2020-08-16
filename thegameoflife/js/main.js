'use strict';

// let canv = document.getElementsByClassName('canvas_block')[0]
// let context = canv.getContext('2d');
// const WIDTH = 800;
// const HEIGHT = 800;
// //context.fillRect(50, 25,150,100);

// function drawCell(x, y){
//     context.fillStyle ='black';
//     context.fillRect(x*10, y*10, 10, 10);
// }



// context.strokeStyle = "#aaaaaa";
// for(let i = 10.5; i < HEIGHT; i+= 10 ){
//     context.moveTo(0, i);
//     context.lineTo(WIDTH, i);
//     context.stroke();
// }
// for(let i = 10.5; i < WIDTH; i+= 10 ){
//     context.moveTo(i, 0);
//     context.lineTo(i, HEIGHT);
//     context.stroke();
// }

// canv.onclick = function(event){

//     let rect = canv.getBoundingClientRect();
//     //alert(`top: ${rect.top}, left: ${rect.left}`);
//     // alert(event.pageX);
//     // alert(event.pageY);
//     //alert(`click: ${event.pageX-rect.left} ${event.pageY-rect.top}`);


//     let coordX = Math.floor ( ( event.clientX - rect.left ) / 10);
//     let coordY = Math.floor ( ( event.clientY - rect.top ) / 10);
//     drawCell(coordX, coordY);

   
// }


function Cells(elem, n){
    //this.elem = elem;
    this.context  = elem.getContext('2d');
    this.isWorking = false;
    this.interval = null;
    
    this.stateArray = [];
    this.images = {
        bg: new Image(),
        alive: new Image(),
        death: new Image()

    };
    this.images.bg.src = 'js/res/bg.png';
    this.images.death.src = 'js/res/death.png';
    this.images.alive.src = 'js/res/alive.png';

    for(let i = 0; i < n ; i++){
        this.stateArray[i] = []
        for(let j = 0; j < n; j++){

            this.stateArray[i][j] = {
                state: 0,
                next: 0
            };

        }
    }

    this.countNextState = function(){

        let countCellState = (i, j) => {
            let getState = (i, j) => {
                if(i < 0) i = n - 1;
                if(j < 0) j = n - 1;

                if(i >= n) i = 0;
                if(j >= n) j = 0;

                return this.stateArray[i][j].state;
            };

            let aliveNeigh = 0;
            [ [i,j+1],
                [i+1,j],
                [i+1,j+1],
                [i-1,j], 
                [i,j-1], 
                [i-1,j-1], 
                [i+1,j-1], 
                [i-1,j+1] ].forEach(function(item){
                    aliveNeigh += getState.apply(this, item);

               });
            
            let cellState = this.stateArray[i][j].state;
            if(cellState){
                if(aliveNeigh == 3 || aliveNeigh ==2) return 1;

                return 0;

            }

            if (aliveNeigh == 3) return 1;
            return 0;

        };



        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                this.stateArray[i][j].next = countCellState(i, j);
            }
        }
    };

    this.setNextState = function(){
        this.countNextState();

        for(let i = 0; i < n ; i++){
            for(let j = 0; j < n; j++){
    
                this.stateArray[i][j].state = this.stateArray[i][j].next;
    
            }
        }

        this.drawScreen();

        
    };

    this.drawScreen = function(){
        
        let drawBG = () =>{
            
            for(let i = 0; i < n ; i++){
                for(let j = 0; j < n; j++){
                    
                    this.context.drawImage(this.images.bg, i * 20, j * 20);
                    

                }
            }

        }
        let drawCells = ()=>{
            for(let i = 0; i < n ; i++){
                for(let j = 0; j < n; j++){
                    let img = (this.stateArray[i][j].state ) ?
                    this.images.alive :
                    this.images.death ;
                    
                    this.context.drawImage(img, j * 20, i * 20 );
                }
            }
        }

        this.loadCounter = 0;
        drawBG();
        drawCells();

        this.images.bg.onload =
         this.images.alive.onload =
          this.images.death.onload = () =>{
              this.loadCounter++;
              if(this.loadCounter ==3){
                drawBG();
                drawCells();
                  
              }

          }

        
        

    };
    elem.onclick = (event) =>{
        let rect = elem.getBoundingClientRect()

        let canvasTop = rect.top;
        let canvasLeft = rect.left;

        let jCord = Math.floor((event.clientX - canvasLeft) / 20);
        let iCord = Math.floor((event.clientY - canvasTop)/20);
        let tmp = this.stateArray[iCord][jCord];

        if(tmp.state == 1) tmp.state = 0;
        else tmp.state = 1;
        //this.setNextState();
        this.drawScreen();
        //alert(this.stateArray[0][0].state);
    }

    document.addEventListener('keydown', ()=>{
        if(!this.isWorking){
            this.isWorking = true ;
            this.interval = setInterval( ()=>{
                this.setNextState();
                this.drawScreen();
            }, 50);
        }
        else{
            
            clearInterval(this.interval);
            this.isWorking = false ;
        }
    })

}

let canv = document.getElementsByClassName('canvas_block')[0];

let field = new Cells(canv, 40);

field.drawScreen();


