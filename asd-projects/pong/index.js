/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = 440;
  const BOARD_HEIGHT = 440;

  const KEYCODE = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  }
  
  // Game Item Objects
  function makeObject(id){
    var gameObject = {};
    gameObject.id = id;
    gameObject.x = parseFloat($(gameObject.id).css("left"));
    gameObject.y = parseFloat($(gameObject.id).css("top"));
    gameObject.width = $(gameObject.id).width();
    gameObject.height = $(gameObject.id).height();
    gameObject.speedX = 0;
    gameObject.speedY = 0;
    return gameObject
  }

  var paddleL = makeObject('#paddleL');
  var paddleR = makeObject('#paddleR');
  var pongBall = makeObject('#pongBall');

  var p1Score = 0;
  var p2Score = 0;



  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    if(p1Score >= 5){
      console.log('PLAYER 1 WINS!!!');
      endGame();
    }
    if(p2Score >= 5){
      console.log('PLAYER 2 WINS!!!');
      endGame();
    }

    moveObject(paddleL);
    moveObject(paddleR);
    moveObject(pongBall);

    var leftColl = wallCollision(paddleL);
    var rightColl = wallCollision(paddleR);
    var ballColl = wallCollision(pongBall);

    if(rightColl == 2){
      paddleR.speedY = 0;
      paddleR.y = 10;
    }
    if(rightColl == 4){
      paddleR.speedY = 0;
      paddleR.y = 430 - paddleR.height;
    }

    if(leftColl == 2){
      paddleL.speedY = 0;
      paddleL.y = 10;
    }
    if(leftColl == 4){
      paddleL.speedY = 0;
      paddleL.y = 430 - paddleL.height;
    }
    
    if(ballColl == 2 || ballColl == 4){
      pongBall.speedY = (pongBall.speedY * -1 );
    }

    if(doCollide(paddleL, pongBall)){
      pongBall.speedX = (pongBall.speedX * -1);
      pongBall.speedY = (pongBall.speedY * -1 * Math.random());
    }
    if(doCollide(paddleR, pongBall)){
      pongBall.speedX = (pongBall.speedX * -1);
      pongBall.speedY = (pongBall.speedY * -1* Math.random());
    }
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  function handleKeyDown(event) {
    var keycode = (event.which);
    console.log(keycode);
    if(keycode == KEYCODE.DOWN){
      paddleR.speedY += 1;
      if (paddleR.speedY > 3){
        paddleR.speedY = 3;
      }
    }
    else if(keycode == KEYCODE.S){
      paddleL.speedY += 1;
      if (paddleL.speedY > 3){
        paddleL.speedY = 3;
      }
    }
    else if(keycode == KEYCODE.UP){
      paddleR.speedY -= 1;
      if (paddleR.speedY < -3){
        paddleR.speedY = -3;
      }
    }
    else if(keycode == KEYCODE.W){
      paddleL.speedY -= 1;
      if (paddleL.speedY < -3){
        paddleL.speedY = -3;
      }
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function startBall(){
    pongBall.speedX = randomNum = (Math.random() * 3 + 1 ) * (Math.random() > 0.5 ? -1 : 1);;
    pongBall.speedY = randomNum = (Math.random() + 1) * (Math.random() > 0.5 ? -1 : 1);;
    pongBall.x = 200;
    pongBall.y = 200;
  }
  
  function moveObject(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);

  }

  function wallCollision(obj){
    if (obj.x <= 0){
      p2Score += 1;
      startBall();
      return 1;
    }
    if (obj.y <= 0){
      return 2;
    }
    if ((obj.x + obj.width) >= BOARD_WIDTH){
      p1Score += 1;
      startBall();
      return 3;
    }
    if ((obj.y + obj.height) >= BOARD_HEIGHT){
      return 4;
    }
  }

  function doCollide(obj1, obj2){
    if(obj1.x < (obj2.x + obj2.width) && (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && (obj1.y + obj1.height) > obj2.y){
      return true;
    }
    else{
      return false;
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
