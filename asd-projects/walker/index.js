/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }
  
  // Game Item Objects
  var walker = {
    "x": 0,
    "y": 0,
    "xSpeed": 0,
    "ySpeed": 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log("Key Pressed");
    if (event.which == KEY.ENTER){
      walker.xSpeed = 0
      walker.x = 0
      walker.ySpeed = 0
      walker.y = 0
    }
    else if(event.which == KEY.UP){
      walker.ySpeed = walker.ySpeed - .5
      walker.y = walker.y - 3
    }
    else if(event.which == KEY.DOWN){
      walker.ySpeed = walker.ySpeed + .5
      walker.y = walker.y + 3
    }
    else if(event.which == KEY.LEFT){
      walker.xSpeed = walker.xSpeed - .5
      walker.x = walker.x - 3
    }
    else if(event.which == KEY.RIGHT){
      walker.xSpeed = walker.xSpeed + .5
      walker.x = walker.x + 3
      console.log(walker.x);
      console.log(walker.xSpeed);    }

  }

  function handleKeyUp(){
    walker.xSpeed = 0;
    walker.ySpeed = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function repositionGameItem(){
    walker.y = walker.y + walker.ySpeed;
    walker.x = walker.x + walker.xSpeed;

  }

  function redrawGameItem(){
    $("#walker").css("top", ( 100 + walker.y));
    $("#walker").css("left", ( 100 + walker.x))
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
