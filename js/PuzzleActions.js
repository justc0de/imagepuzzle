$(document).ready(function() {
	
	var rowCount,
		idCounter,
		score,
		target,
		gameBeginTime,
		noOfMoves = 0;

	// listener attached to form submit button
	// generates table
	$('#pieceSelection').submit(function() {
	
		rowCount = $("#numOfPieces").val();

		// array to store the newly created canvas elements
		PicPuzzle_Image.split($("#image").val(), rowCount * rowCount, function(canvasArray) {	    
		
			//list to keep track of the tiles which are available for random selection 
			var tilesAvailable = new Array(rowCount^2);
			
			//store the row and col of the blank cell
			var blankRow = 0,
				blankCol = 0;
	
			//tilesAvailable contains possible tile numbers to select from at random
			//array is full as no values have been randomly selected yet
			for (var i = 0; i <canvasArray.length; i++) {
				tilesAvailable[i] = i ;
			}

			var $tbl = $('<table border="1">').attr('id', 'grid'),
				$tbody = $('<tbody>').attr('id', 'tableBody');
			
			for (var i = 0; i < rowCount; i++) {

				var trow = $("<tr>").attr('id', 'row' + i); // New row
				
				for (var j = 0; j < rowCount; j++) {
				
					//console.log('TilesAvailable: ',tilesAvailable);

					//choose a random tile
					var random = PicPuzzle_Utils.randomChoice(tilesAvailable),
						$cell = $("<td>").append(canvasArray[random]);

					//remove random value from the possible selection of tiles
					tilesAvailable = PicPuzzle_Utils.removeItemFromList(tilesAvailable, random);
					//console.log('Random tile: ',random);
					
				 	//Get the row and column position of the last canvas element
				    if(random == ((canvasArray.length -1))){
					                   
						blankRow = i,
							blankCol = j;
					}                 

					$cell.appendTo(trow); 
				}

				trow.appendTo($tbody);
	
				$tbl.append($tbody);
				$('table').remove();	
				$('#content').append($tbl);
			}
	
			//Position the blank cell in the position of the last canvas element
			$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').children().hide();
			$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').attr('id', 'blankCell');
			
			//reset number of moves when image is scrambled
			noOfMoves = 0;
			PicPuzzle_Utils.updateText('moveCount',noOfMoves);
			
			gameBeginTime = new Date();
		});

		return false;
	});
	

	// Event handler for clicking table cells
	$('#content').on('click', '#grid td', function(e) {
		
		idCounter = 0;
		score = 0;
		
		var empty = $("#blankCell").get(0);
		if (!empty || this == empty) return; // abort, abort!

	    var currow = this.parentNode,
	        emptyrow = empty.parentNode;
	    var cx = this.cellIndex,
	        cy = currow.rowIndex,
	        ex = empty.cellIndex,
	        ey = emptyrow.rowIndex;
	    if (cx==ex && Math.abs(cy-ey)==1 || cy==ey && Math.abs(cx-ex)==1) {
	        // empty and this are next to each other in the grid
	        var afterempty = empty.nextSibling,
	            afterthis = this.nextSibling;
	        currow.insertBefore(empty, afterthis); 
	        emptyrow.insertBefore(this, afterempty);
			

			noOfMoves++;			
			PicPuzzle_Utils.updateText('moveCount',noOfMoves);
			console.log('Moves: '+noOfMoves);
	    }
	    
	    // Check if puzzle is complete after each move
	    $("td").each(function() {
	    	target = rowCount * rowCount;
	    	
	    	if ($(this).children().attr("id") == "canvas" + idCounter){
	    		score++;
	    		if (score == target){
	    			
	    			//show complete image
					$("#blankCell").children().show();
					$("#blankCell").attr('id', $("#blankCell").children().attr('id'));
					
					//Show winning dialog and ask user to play again 
					PicPuzzle_Utils.playAgain("Congratulations, You solved the puzzle!\n" +
					                             "In "+noOfMoves+" move(s)\n" +
				                                 "and within " + PicPuzzle_Utils.diffBetweenTimes(gameBeginTime, new Date()) +
												 ". Would you like to play again ?");
												
					

	    		}
	    	}
	    	
	    	idCounter++;
		});
	});
});
