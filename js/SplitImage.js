/*
* Function SplitImg 
* Description: splits an image into a number or canvas elements
* 			   and appends those canvas elements to the invoking 
*			   html page
* 
* Paramaters: Path to image and the number of tiles required
* 			  Ex 9 tiles for a 3x3 image. tiles must be a 
*			  number squared
* Returns: an Array of canvasElements (Images)			  
*
*/

var PicPuzzle_Image = {
  split: function(imgsrc, tiles) {
		
	//resize the image
	var img = ResizeImage.resize(imgsrc);
	
	var	canvasArray = new Array();
   
	//console.log('imgWidth',img.width);
	//console.log('imgHeight',img.height);
  
	//get the number of tiles in a row or column (row == column )
	var row_col = Math.sqrt(tiles),
		tileH = img.height / row_col,
		tileW = img.width / row_col;

	//console.log('row_col',row_col);
	//console.log('tileH',tileH);
	//console.log('tilW',tileW);
	//console.log('Tiles: ', tiles)

	canvasArray = [tiles];
  
	var xoffset = 0,
		yoffset = 0;
 
	for (var i = 0; i < tiles; i++){
    
		//console.log('canvas', i);
		//console.log('xoffset',xoffset);
		//console.log('yoffset',yoffset);

		//create canvas element and set attributes and get the canvas context
		canvasArray[i] = document.createElement('canvas');
		canvasArray[i].setAttribute('width', tileW);
		canvasArray[i].setAttribute('height', tileH);
		canvasArray[i].setAttribute('id', 'canvas'+i);
		var ctx = canvasArray[i].getContext('2d');
   
		//document.body.appendChild(canvasArray[i-1]);
    
    	ctx.drawImage(img,xoffset,yoffset);
     
		//draw tile numbers
		//ctx.fillStyle    = '#fff';
		//ctx.font         = 'italic 10px sans-serif';
		//ctx.textBaseline = 'top';
		//ctx.fillText  (i, 0, 0);
    
		//if i is a multiple of the total number of tiles to a row,
		//move down a column and reset the row_col
		if((i + 1) % row_col == 0){
			yoffset -= tileH;
				xoffset =0;
		}else{
			//otherwise move across the image
			xoffset -= tileW; 
      	}
	}
	
	return canvasArray;
  }
};
