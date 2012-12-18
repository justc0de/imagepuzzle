/*
* Author: Dylan Byrne
*
* Function: SplitImg 
* Description: Splits an image into a number of canvas elements
* and appends those canvas elements to the invoking html page
* 
* Paramaters: Path to image and the number of tiles required
* Ex 9 tiles for a 3x3 image. Tiles must be a number squared
*/



function splitImg(imgsrc, tiles) {

	var img = new Image();
	var canvasArray = new Array();
	var imgWidth;
	var imgHeight;
	var r,g,b = 0;
	img.src = imgsrc;   
   
	console.log('imgWidth',img.width);
	console.log('imgHeight',img.height);
  
	//get the number of tiles in a row or column (row == column )
	var row_col = Math.sqrt(tiles); 
	var tileH = img.height / row_col;
	var tileW = img.width / row_col;

	console.log('row_col',row_col);
	console.log('tileH',tileH);
	console.log('tilW',tileW);

	canvasArray = [tiles];
  
	var xoffset = 0;
	var yoffset = 0;
 
	for (var i = 1; i < tiles + 1; i++){
    
		console.log('canvas', i);
		console.log('xoffset',xoffset);
		console.log('yoffset',yoffset);

		//create canvas element and set attributes and get the canvas context
		canvasArray[i - 1] = document.createElement('canvas');
		canvasArray[i - 1].setAttribute('width', tileW);
		canvasArray[i - 1].setAttribute('height', tileH);
		canvasArray[i - 1].setAttribute('id', 'canvas'+i);
		var ctx = canvasArray[i - 1].getContext('2d');
   
		//document.body.appendChild(canvasArray[i-1]);
    
    	ctx.drawImage(img,xoffset,yoffset);
     
		//draw tile numbers
		//ctx.fillStyle    = '#fff';
		//ctx.font         = 'italic 10px sans-serif';
		//ctx.textBaseline = 'top';
		//ctx.fillText  (i, 0, 0);
    
		//if i is a multiple of the total number of tiles to a row,
		//move down a column and reset the row_col
		if(i % row_col == 0){
			yoffset -= tileH;
			xoffset =0;
		}else{
			//otherwise move across the image
			xoffset -= tileW; 
      	}
	}
	
	return canvasArray;
}

