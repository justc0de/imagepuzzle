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
    split: function(imgsrc, tiles, callback) {

        var canvasArray = new Array(),
            imgWidth, imgHeight, r, g, b = 0;
        var split = function() {
        	var img = ResizeImage.resize(imgsrc);
            //console.log(1);
            var row_col = Math.sqrt(tiles),
                tileH = Math.round(img.height / row_col),
                tileW = img.width / row_col,

                xoffset = 0,
                yoffset = 0;
            for (var i = 0; i < tiles; i++) {
                //create canvas element and set attributes and get the canvas context
                canvasArray[i] = document.createElement('canvas');
                canvasArray[i].setAttribute('width', tileW);
                canvasArray[i].setAttribute('height', tileH);
                canvasArray[i].setAttribute('id', 'canvas' + i);
                var ctx = canvasArray[i].getContext('2d');

                ctx.drawImage(img, xoffset, yoffset);

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
        img.src = imgsrc;
        //console.log(img.complete);
        
        if (img.complete) {split()} else  $(img).load(split);
    }
};