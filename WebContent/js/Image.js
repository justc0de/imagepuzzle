var PicPuzzle_ImageActions = {
 
/*
 * Function Split 
 * Description: splits an image into a number or canvas elements
 *              and appends those canvas elements to the invoking 
 *              html page
 * 
 * Paramaters: Path to image and the number of tiles required
 *             Ex 9 tiles for a 3x3 image. tiles must be a 
 *             number squared
 * Returns: an Array of canvasElements (Images)            
 *
 */
 	split: function(imgsrc, tiles, callback) {

        var canvasArray = new Array();
        var split = function() {
        	var img = PicPuzzle_ImageActions.resize(imgsrc);
            
			var row_col = Math.sqrt(tiles),
                tileH = Math.round(img.height / row_col),
                tileW = Math.round(img.width / row_col),

                xoffset = 0,
                yoffset = 0;
            
			var imgNumBgSizeWidth,
				imgNumXOffset;

			
			for (var i = 0; i < tiles; i++) {
            
				//create canvas element and set attributes and get the canvas context
                canvasArray[i] = document.createElement('canvas');
                canvasArray[i].setAttribute('width', tileW);
                canvasArray[i].setAttribute('height', tileH);
                canvasArray[i].setAttribute('id', 'canvas' + i);
                var ctx = canvasArray[i].getContext('2d');

                ctx.drawImage(img, xoffset, yoffset);

				
				if (i+1 > 9){
					imgNumBgSizeWidth = 16;
					imgNumXOffset = 1;
				}
				else{

	            	imgNumBgSizeWidth = 10;
					imgNumXOffset = 2;
				}

				//draw tile numbers
				ctx.fillStyle     = 'rgba(0, 0, 0, 0.5)';
				ctx.fillRect(0, 0, imgNumBgSizeWidth, 10);
				ctx.fillStyle = '#fff';
				ctx.font = 'italic 10px sans-serif';
				ctx.textBaseline = 'top';
				ctx.fillText (i+1, imgNumXOffset, 1);

                //if i is a multiple of the total number of tiles to a row,
                //move down a column and reset the row_col
                if ((i + 1) % row_col == 0) {
                    yoffset -= tileH;
                    xoffset = 0;
                } else {
                    //otherwise move across the image
                    xoffset -= tileW;
                }
            }
            callback(canvasArray);
        };
        var img = new Image();
        //console.log(img.complete);
        
        if (img.complete) {split();} else  $(img).load(split);
    },

/*
 *  Function ResizeImage
 *  Description: Resizes an image to half the screen height and half the 
 *         screen width.
 *  Parameters: The Image path
 *  Returns: A resized canvas Element (Image)
 *
 */
    resize: function(imgsrc){
    	
		var img = new Image(),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext("2d");
	
		img.src	 = imgsrc;
		
		//console.log(imgsrc);
		//console.log("image h "+img.height+"\nimage w "+img.width);
		//console.log("screen h/4 "+screen.height/4+"\nscreen w/4 "+screen.width/4);
		
		//show message to the user if the image is a small size
		if((img.width < screen.width/4 && img.width != 0) || (img.height < screen.height/4 && img.height !=0) ){
			PicPuzzle_Utils.updateText('message','As the submitted image is small it may lose quality when scaled up');
			PicPuzzle_Utils.notify('#message',3000);
		}

		//maximum image size
		canvas.width = screen.width/2;
		canvas.height = screen.height/2;
		
		try{
			ctx.drawImage(img,0,0,screen.width/2,screen.height/2); 
		}catch(err){
			PicPuzzle_Utils.updateText('message','Please try again, image loading did not fully complete that time.');
			PicPuzzle_Utils.notify('#message',5000);
		}
		
		return canvas;
	}
};
