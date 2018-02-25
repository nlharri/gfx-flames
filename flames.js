window.onload = function() {

  const numOfColorsAtIndex = 4;
  const numOfColors = 256*256*256;
  const divider = 4.000000001;
  //const divider = 5;
  const createFlamesRandomRows = 1;

  var createFlamesCurrentRandomRows = createFlamesRandomRows;
  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

  var width = canvas.width;
  var height = canvas.height;
  var imagedata = context.createImageData(width, height);

  var paletteRed   = [];
  var paletteGreen = [];
  var paletteBlue  = [];

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    for (var x=mousePos.x - 5; x<mousePos.x+5; x++) {
      for (var y=mousePos.y - 5; y<mousePos.y+5; y++) {
        var palIndex = Math.floor(Math.random()*numOfColors);
        imagedata.data[pixelIndex(x,y,'r')] = getColor(palIndex,'r');
        imagedata.data[pixelIndex(x,y,'g')] = getColor(palIndex,'g');
        imagedata.data[pixelIndex(x,y,'b')] = getColor(palIndex,'b');
      }
    }
    var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    console.log(message);
  }, false);


  // to calculate the pixel index
  function pixelIndex(x, y, colorComp) {
    // x --> fi
    // y --> MAXradius - r
    // var xnew = Math.round( (y) * Math.cos( ((x / width) * 2*Math.PI) ) );
    // var ynew = Math.round( (y) * Math.sin( ((x / width) * 2*Math.PI) ) );
    var pixelIndex = (y * width + x) * numOfColorsAtIndex;
    // var pixelIndex = (ynew * width + xnew) * numOfColorsAtIndex;
    var colorCompOffset = 0;
    switch (colorComp) {
      case 'r':
        break;
      case 'g':
        colorCompOffset = 1;
        break;
      case 'b':
        colorCompOffset = 2;
        break;
      case 'a':
        colorCompOffset = 3;
        break;
      default:
        break;
    }
    return pixelIndex + colorCompOffset;
  }

  /*
  Colors from
    #FFFF00 to
    #FF0000 to
    #000000
  */
  function generatePalette() {
    var halfNumOfColors = Math.floor(numOfColors/2);
    for (var i = 0; i<halfNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = Math.floor((halfNumOfColors - i) / halfNumOfColors * 256);
      paletteBlue[i]  = 0;
    }
    for (var i = halfNumOfColors; i<numOfColors; i++) {
      paletteRed[i]   = Math.floor((numOfColors - i) / halfNumOfColors * 256);
      paletteGreen[i] = 0;
      paletteBlue[i]  = 0;
    }
  }

  /*
  Colors from
    #FFFFFF to
    #FFFF00 to
    #FF8000 to
    #FF0000 to
    #000000
  */
  function generatePalette3() {
    var quarterNumOfColors = Math.floor(numOfColors/4);
    var halfNumOfColors = Math.floor(numOfColors/2);
    for (var i = 0; i<quarterNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = 255;
      paletteBlue[i]  = Math.floor((quarterNumOfColors - i) / quarterNumOfColors * 256);
    }
    for (var i = quarterNumOfColors; i<halfNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = Math.floor((halfNumOfColors - i) / quarterNumOfColors * 128) + 128;
      paletteBlue[i]  = 0;
    }
    for (var i = halfNumOfColors; i<halfNumOfColors + quarterNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = Math.floor((halfNumOfColors + quarterNumOfColors - i) / quarterNumOfColors * 128);
      paletteBlue[i]  = 0;
    }
    for (var i = halfNumOfColors + quarterNumOfColors; i<numOfColors; i++) {
      paletteRed[i]   = Math.floor((numOfColors - i) / quarterNumOfColors * 256);
      paletteGreen[i] = 0;
      paletteBlue[i]  = 0;
    }
  }

  /*
  Colors from
    #FFFFFF to
    #FFFF00 to
    #FF8000 to
    #FF0000
  */
  function generatePalette4() {
    var partialNumOfColors = Math.floor(numOfColors/3);
    for (var i = 0; i<partialNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = 255;
      paletteBlue[i]  = Math.floor((partialNumOfColors - i) / partialNumOfColors * 256);
    }
    for (var i = partialNumOfColors; i<2*partialNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = Math.floor((2*partialNumOfColors - i) / partialNumOfColors * 128) + 128;
      paletteBlue[i]  = 0;
    }
    for (var i = 2*partialNumOfColors; i<3*partialNumOfColors; i++) {
      paletteRed[i]   = 255;
      paletteGreen[i] = Math.floor((3*partialNumOfColors - i) / partialNumOfColors * 128);
      paletteBlue[i]  = 0;
    }
  }

  function getColor(index, colorComp) {
    switch (colorComp) {
      case 'r':
        return paletteRed[index];
        break;
      case 'g':
        return paletteGreen[index];
        break;
      case 'b':
        return paletteBlue[index];
        break;
      default:
        break;
    }
  }

/*
  _______
  #FF0000 to
  #FFFF00 to
  #00FF00 to
  #00FFFF to
  #0000FF to
  #FF00FF to
  #FF0000
*/
function generatePalette2() {
  // 7 szín - 6 elem
  var partialNumOfColors = Math.floor(numOfColors/6);
  // #FF0000 to #FFFF00
  for (var i = 0; i<partialNumOfColors; i++) {
    paletteRed[i]   = 255;
    paletteGreen[i] = Math.floor(i / partialNumOfColors * 256);
    paletteBlue[i]  = 0;
  }
  // #FFFF00 to #00FF00
  for (var i = partialNumOfColors; i<2*partialNumOfColors; i++) {
    paletteRed[i]   = Math.floor((2*partialNumOfColors - i) / partialNumOfColors * 256);
    paletteGreen[i] = 255;
    paletteBlue[i]  = 0;
  }
  // #00FF00 to #00FFFF
  for (var i = 2*partialNumOfColors; i<3*partialNumOfColors; i++) {
    paletteRed[i]   = 0;
    paletteGreen[i] = 255;
    paletteBlue[i]  = Math.floor((i - 2*partialNumOfColors) / partialNumOfColors * 256);
  }
  // #00FFFF to #0000FF
  for (var i = 3*partialNumOfColors; i<4*partialNumOfColors; i++) {
    paletteRed[i]   = 0;
    paletteGreen[i] = Math.floor((4*partialNumOfColors - i) / partialNumOfColors * 256);
    paletteBlue[i]  = 255;
  }
  // #0000FF to #FF00FF
  for (var i = 4*partialNumOfColors; i<5*partialNumOfColors; i++) {
    paletteRed[i]   = Math.floor((i - 4*partialNumOfColors) / partialNumOfColors * 256);
    paletteGreen[i] = 0;
    paletteBlue[i]  = 255;
  }
  // #FF00FF to #FF0000
  for (var i = 5*partialNumOfColors; i<6*partialNumOfColors; i++) {
    paletteRed[i]   = 255;
    paletteGreen[i] = 0;
    paletteBlue[i]  = Math.floor((6*partialNumOfColors - i) / partialNumOfColors * 256);
  }
}

  // Create the image
  function createFlames() {
    var paletteIndex = 0, useForThisNumberOfPixels = 0;
    if (createFlamesCurrentRandomRows % createFlamesRandomRows == 0) {
      createFlamesCurrentRandomRows = 1;
      for (var x=0; x<width; x++) {
        if (Math.random()>0.90) {
          if (useForThisNumberOfPixels == 0) {
            //paletteIndex = Math.round(Math.random()*2)*(numOfColors/4+numOfColors/8);
            paletteIndex = Math.floor(Math.random()*numOfColors);
            useForThisNumberOfPixels = Math.floor(Math.random()*1);
          } else {
            useForThisNumberOfPixels--;
          }
          imagedata.data[pixelIndex(x,height-1,'r')] = getColor(paletteIndex,'r');
          imagedata.data[pixelIndex(x,height-1,'g')] = getColor(paletteIndex,'g');
          imagedata.data[pixelIndex(x,height-1,'b')] = getColor(paletteIndex,'b');
          imagedata.data[pixelIndex(x,height-1,'a')] = 255;
        }
        createFlamesCurrentRandomRows++;
      }
    }

    for (var y = 0; y<height-1; y++) {
      for (var x = 0; x<width-1; x++) {
        var divid = (Math.random()/1000)+divider;
        imagedata.data[pixelIndex(x,y,'r')] =
          (imagedata.data[pixelIndex(x-1,(y+1)%height,'r')] +
           imagedata.data[pixelIndex(x  ,(y+1)%height,'r')] +
           imagedata.data[pixelIndex(x+1,(y+1)%height,'r')] +
           imagedata.data[pixelIndex(x  ,(y+2)%height,'r')]) / divid;
        imagedata.data[pixelIndex(x,y,'g')] =
          (imagedata.data[pixelIndex(x-1,(y+1)%height,'g')] +
           imagedata.data[pixelIndex(x  ,(y+1)%height,'g')] +
           imagedata.data[pixelIndex(x+1,(y+1)%height,'g')] +
           imagedata.data[pixelIndex(x  ,(y+2)%height,'g')]) / divid;
        imagedata.data[pixelIndex(x,y,'b')] =
          (imagedata.data[pixelIndex(x-1,(y+1)%height,'b')] +
           imagedata.data[pixelIndex(x  ,(y+1)%height,'b')] +
           imagedata.data[pixelIndex(x+1,(y+1)%height,'b')] +
           imagedata.data[pixelIndex(x  ,(y+2)%height,'b')]) / divid;
        imagedata.data[pixelIndex(x,y,'a')] = ((y%2)==0) ? 256 : 256;
      }
    }
  }


  // Main loop
  function main() {
      // Request animation frames
      window.requestAnimationFrame(main);

      // Create the image
      createFlames();

      // Draw the image data to the canvas
      context.putImageData(imagedata, 0, 1);
  }

  generatePalette2();

  // Call the main loop
  main();

}
