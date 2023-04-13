// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilterNoBackground(increaseGreenByBlue);
  applyFilterNoBackground(decreaseBlue);

  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterfunction){
  for (i = 0; i <= image.length - 1; i++){
    for(j = 0; j <= image[i].length - 1; j++){
      rgbString = image[i][j];
      rgbNumbers = rgbStringToArray(rgbString);
      filterfunction(rgbNumbers);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }
  }
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterfunction){
  background = image[0][0];
  for (i = 0; i <= image.length - 1; i++){
    for(j = 0; j <= image[i].length - 1; j++){
      if (image[i][j] != background){
        rgbString = image[i][j];
        rgbNumbers = rgbStringToArray(rgbString);
        filterfunction(rgbNumbers);
        rgbString = rgbArrayToString(rgbNumbers);
        image[i][j] = rgbString;
      }
    }
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num){
  return Math.max(0, Math.min(num, 255))
}

// TODO 3: Create reddify function
function reddify(rgb){
  rgb[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(rgb){
  rgb[BLUE] = keepInBounds(rgb[BLUE] - 50);
}
function increaseGreenByBlue(rgb){
  rgb[GREEN] = keepInBounds(rgb[GREEN] + rgb[BLUE]);
}

// CHALLENGE code goes below here
