$(document).ready(function() {
	
	var rowCount,
		idCounter,
		score,
		usersName = "justc0de",
		stage,
		target,
		sound = "on",
		puzzlesSolved = 0,
		noOfMoves = 0,
		image,
		timerIntervalId = 0,
		move_snd = new Audio("sounds/move1.wav"),
		shuffle_snd = new Audio("sounds/shuffle1.wav");
		win_snd  = new Audio("sounds/success1.wav");
	

	//stock images for arcade and time trial
	var stockImages = new Array(8);
		stockImages[0]="images/stock/day_and_night.jpg";
		stockImages[1]="images/stock/denmark.jpg";
		stockImages[2]="images/stock/gherkin.jpg";
		stockImages[3]="images/stock/house.jpg";
		stockImages[4]="images/stock/looking_at_sunset.jpg";
		stockImages[5]="images/stock/nelson's_column.jpg";
		stockImages[6]="images/stock/slow_swaying.jpg";
		stockImages[7]="images/stock/walking.jpg";
	
	//array to keep track of the available images for Time Trial and Arcade
	var stockImagesAvailable = new Array(stockImages.length);
	
	//initialize the array
	for(var i=0; i<stockImages.length; i++)
		stockImagesAvailable[i] = i;



	//get mode and paramaters
	console.log(window.location.href)
	var url = window.location.href;
	



	image = decodeURIComponent((url.split('&')[0]).split('=')[1]);
	rowCount = (url.split('&')[1]).split('=')[1];

	//check incase user has changed the row count in the url
	//notify user in each case

	if(rowCount > 9){
		rowCount = 9;
		PicPuzzle_Utils.updateText('message','9x9 is the maximum grid size.');
		PicPuzzle_Utils.notify('#message',5000);

	}

	if(rowCount < 2){
		rowCount = 2;
		PicPuzzle_Utils.updateText('message','2x2 is the minimum grid size.');
		PicPuzzle_Utils.notify('#message',5000);

	}

	console.log(image);
	console.log(rowCount);
	newGame(image,rowCount);
	
	

		
    //check for sound toggle
    $('#soundClick').on('click', function(e) {
		if(sound == "on"){
        	sound = "off";
        	$(this).html('Unmute');
		}
        else{
        	sound = "on";
        	$(this).html('Mute');

		}
     });



	// New game
	function newGame(image,rowCount){

		//store the row and col of the blank cell
		var blankRow = 0,
			blankCol = 0;
		
		//rowCount = $("#radio :radio:checked + label").text()[0];

		PicPuzzle_ImageActions.split(image, rowCount * rowCount, function(canvasArray) {	    
		
			//list to keep track of the tiles which are available for random selection 
			var tilesAvailable = new Array(rowCount^2);
	
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
		});
		
		//Position the blank cell in the position of the last canvas element
		$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').children().hide();
		$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').attr('id', 'blankCell');
		
		//reset number of moves when image is scrambled
		noOfMoves = 0;
		PicPuzzle_Utils.updateText('moveCount',noOfMoves);
		
		//play start sound
		if (sound == "on"){
			shuffle_snd.play();
		  //shuffle_snd.currentTime = 0;
		}
		
		PicPuzzle_Utils.setStartTime(new Date());
		
		//ensuring timerIntervalId is cleared
		if (timerIntervalId){
			clearInterval(timerIntervalId)
		}
		
		timerIntervalId = setInterval(PicPuzzle_Utils.initTimer, 100);

		return false;
	};



	

	// Event handler for clicking table cells
	$('#content').on('click', '#grid td', function(e) {
		
		idCounter = 0,
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

			//play the move sound
			if(sound == "on"){
				move_snd.play();
				//move_snd.currentTime = 0 ;
			}

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
					

					//play success sound
					if(sound == "on"){
						win_snd.play();
						//win_snd.currentTime = 0;
					}
					
					
					//increase puzzlesSolved
					PicPuzzle_Utils.updateText('puzzlesSolved',++puzzlesSolved);
					
					// stop timer in UI
					clearInterval(timerIntervalId);	
					
					var endTime = new Date(),
						duration = PicPuzzle_Utils.diffBetweenTimes(
		            		PicPuzzle_Utils.getStartTime(), 
		            		endTime); 
					PicPuzzle_Utils.updateText('timer', duration);
					
					// check if users completion time was fastest for this grid size
					var durationLong = new Date(endTime.getTime() - PicPuzzle_Utils.getStartTime().getTime()).getTime();
					PicPuzzle_Utils.compareUsersTime(rowCount, usersName, durationLong);

					//Show winning dialog and ask user to play again 
					PicPuzzle_Utils.playAgain(
							"Congratulations!<br/>" +
							"You solved the puzzle in<br/>" +
					        + noOfMoves + " move(s)<br/>" +
				            "Duration: " + duration +
							"<br/><br/>Would you like to play again?");
	    		}
	    	}
	    	
	    	idCounter++;
		});
	});
});
