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
	
		img.src	 = imgsrc;

		//minimum image size
		if(img.width < screen.width/4 || img.height < screen.height/4){
			
			canvas.width = screen.width/4;
			canvas.height = screen.height/4;
			ctx.drawImage(img,0,0,screen.width/4,screen.height/4);
		
		}
		else{

			//maximum imaage size
			canvas.width = screen.width/2;
			canvas.height = screen.height/2;
			ctx.drawImage(img,0,0,screen.width/2,screen.height/2); 
		
		}
	
		return canvas;
	}

};
