/*
*	Function ResizeImage
*	Description: Resizes an image to half the screen height and half the 
*				 screen width.
*	Parameters: The Image path
*	Returns: A resized canvas Element (Image)
*
*/


var ResizeImage = {
	
	resize: function(imgsrc){
	
		var img = new Image(),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext("2d");
	
		img.src	 = imgsrc


		//console.log('imgWidth',img.width);
		//console.log('imgHeight',img.height);
		//console.log('Screen Width',screen.width);
		//console.log('Screen Height',screen.height);
		//console.log('Max Img Width',screen.width/2);
		//console.log('Max Img Height',screen.height/2);

	
	
		canvas.width = screen.width/2;
		canvas.height = screen.height/2;
		ctx.drawImage(img,0,0,screen.width/2,screen.height/2); 

	
		return canvas;
	}

};
