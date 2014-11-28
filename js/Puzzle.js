var ImagePuzzle_Game = {
		
	blankRow: 0,
    blankCol: 0,
	idCounter: null,
	score: null,
	imgsrc: null,
	rowCount: null,
	target: null,
	timerIntervalId: 0,
	move_snd: new Audio("sounds/move1.wav"),
	shuffle_snd: new Audio("sounds/shuffle1.wav"),
	win_snd: new Audio("sounds/success1.wav"),
	
	init: function(){
		
		ImagePuzzle_Game.imgsrc = document.getElementById('imageTextfield').value.replace("preview", "stock");
		ImagePuzzle_Game.rowCount = $('#gridSize :radio:checked').val();
		
		$('#chooseContainer').attr('style', 'display:none');
		$('#gameContainer').attr('style', 'display:inline');	
		
	    newGame(ImagePuzzle_Game.imgsrc, ImagePuzzle_Game.rowCount);

	    function newGame(imgsrc, rowCount){
			ImagePuzzle_ImageActions.loadImage(imgsrc, function(loadedImage){
				
				ImagePuzzle_ImageActions.resize(loadedImage, function(imageResizedOnCanvas){
					
					var canvasReady = ImagePuzzle_ImageActions.split(imageResizedOnCanvas, rowCount * rowCount);
			
					// tiles available for random selection 
					var tilesAvailable = new Array(rowCount ^ 2);
		
					// array is full as no values have been randomly selected yet
					for (var i = 0; i < canvasReady.length; i++) {
						tilesAvailable[i] = i;
					}
		
					var $tbl = $('<table border="1">').attr('id', 'grid'),
						$tbody = $('<tbody>').attr('id', 'tableBody'),
						index = 0;
			
					for (var i = 0; i < rowCount; i++) {
		
						var trow = $("<tr>").attr('id', 'row' + i); // New row
				
						for (var j = 0; j < rowCount; j++) {
				
							var $cell = $('<td data-transition="flow">').append(canvasReady[index]);
							$cell.attr('id','cell' + index);
		
							// Get the row and column position of the last canvas element
							if(index == ((canvasReady.length -1))){
					                   
								blankRow = i,
									blankCol = j;
							}                 
		
							$cell.appendTo(trow); 
							index++;
						}
		
						trow.appendTo($tbody);
						$tbl.append($tbody);
						$('table').remove();	
						$('#gridContainer').html($tbl);
					}
		
					// Position the blank cell in the position of the last canvas element
					$('#grid tr:eq(' + blankRow + ') td:eq(' + blankCol + ')').children().hide();
					$('#grid tr:eq(' + blankRow + ') td:eq(' + blankCol + ')').attr('id', 'blankCell');
		
					if ($('#mute').val() === 'off'){
						ImagePuzzle_Game.shuffle_snd.play();
					}
		
					ImagePuzzle_Utils.setStartTime(new Date());
		
					// ensuring timerIntervalId is cleared
					if (ImagePuzzle_Game.timerIntervalId){
						clearInterval(this.timerIntervalId);
					}
		
					ImagePuzzle_Utils.noOfMoves = 0;
					ImagePuzzle_Game.timerIntervalId = setInterval(ImagePuzzle_Utils.initTimer, 100);
					ImagePuzzle_Game.target = ImagePuzzle_Game.rowCount * ImagePuzzle_Game.rowCount;
					
					jumblePuzzle(rowCount);
		
					return false;
				});
			});
	    };
	    
	    
	    
	    //Description: Moves the empty cell with a cell in a specified direction
	    //Paramaters: empty cellIndex, empty rowIndex, direction to move
	    function moveEmptyCell(ex,ey,direction){
	    	
	    	var cellid = "";	  
	        
		    if(direction == 'u'){ //up
		    
		    	cellid =document.getElementById("row"+(ey-1)).childNodes[ex].id;
		    
		    } else if (direction == 'd'){ //down
		    
		    	cellid  =document.getElementById("row"+(ey+1)).childNodes[ex].id;
		    
		    } else if (direction == 'l'){ //left
		    
		    	cellid =document.getElementById("row"+ey).childNodes[ex-1].id;
		    
		    } else{ //right
		    
		    	cellid =document.getElementById("row"+ey).childNodes[ex+1].id;
		    }
		    
		    //swap cells
		    var cell = $("#"+cellid).get(0),
		        currow = cell.parentNode,
			empty = $("#blankCell").get(0),
		        emptyrow = empty.parentNode,
		        afterempty = empty.nextSibling,
		        afterthis = cell.nextSibling;
		        currow.insertBefore(empty, afterthis); 
		        emptyrow.insertBefore(cell, afterempty);
	    };
	    
	    
	    
	    
	    //Description: Get the possible directions that the empty cell can move in
	    //Paramaters: empty cell position,
	    //         empty row position,
	    //         the number of rows
	    //
	    //Returns: The possible directions to the empty cell can move
	    // ['l','r','u','d'] left,right,up,down
	    function getPossibleDirections(ex,ey,rowCount){
	    	
	    	var max = rowCount -1,
		    	min = 0; 
		    
	    	//calculate the possible directions to choose
		    //the random cell
		
		    //we can go right or down
		    //top left corner
		    if(ex == min && ey == min){
		
			var dirs = ['r','d'];
			return dirs;
		    }
		    //we can go right or up
		    //bottom left corner
		    else if(ex == min && ey == max){
		
			var dirs = ['r','u'];
			return dirs;
		    }
		    //we can go left or down
		    //top right corner
		    else if(ex == max && ey == min){
		
			var dirs = ['l','d'];
			return dirs;
		    }
		    //we can go left or up
		    //bottom right corner
		    else if(ex == max && ey == max){
		
			var dirs = ['l','u'];
			return dirs;
		    }
		    //we can go right, up or down
		    //left side
		    else if(ex == min && (ey > min  && ey < max)){
		
			var dirs = ['r','u','d'];
			return dirs;
		    }
		    //we can go left, up or down
		    //right side
		    else if(ex == max && (ey > min  && ey < max)){
		
			var dirs = ['l','u','d'];
			return dirs;
		    }
		    //we can go left, right or up
		    //bottom side
		    else if(ey == max && (ex > min  && ex < max)){
		
			var dirs = ['l','r','u'];
			return dirs;
		    }
		    //we can go left, right or down
		    //top side
		    else if(ey == min && (ex > min  && ex < max)){
		
			var dirs = ['l','r','d'];
			return dirs;
		    }
		    //we can choose a cell in any direction
		    //cell is not touching a puzzle edge
		    else{
		
			var dirs = ['l','r','u','d'];
			return dirs;
		    }
	    }
	    
	    
	    //Description: Jumbles the puzzle to a random but solvable state
	    //Paramaters: rowCount: The number or rows which is equal to the number
	    //         of columns
	    function jumblePuzzle(rowCount){
	    	
	    	var prevDir = null;
		
			for (var i = 0; i < rowCount * rowCount * 2; i++){
			  
			    var empty = $("#blankCell").get(0),
					emptyrow = empty.parentNode,
					ex = empty.cellIndex,
					ey = emptyrow.rowIndex;
		
			    var dirs = getPossibleDirections(ex,ey,rowCount);
			      
			    //check to make sure randDir is not the opposite of prevDir
			    //we do not want to undo the previous move
			    if (prevDir != null){
				  
			    	//remove the opposite direction from the possible choices
			    	if (prevDir == 'u')
			    		dirs = ImagePuzzle_Utils.removeItemFromList(dirs,'d');
			    	else if (prevDir == 'd')
			    		dirs = ImagePuzzle_Utils.removeItemFromList(dirs,'u');
			    	else if (prevDir == 'r')
			    		dirs = ImagePuzzle_Utils.removeItemFromList(dirs,'l');
			    	else
			    		dirs = ImagePuzzle_Utils.removeItemFromList(dirs,'r');
			    }
			      
			    var randDir = ImagePuzzle_Utils.randomChoice(dirs);
			    prevDir = randDir; 
			    moveEmptyCell(ex,ey,randDir);
			}
	    };
	}
}
