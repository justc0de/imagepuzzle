$(document).ready(function() {
	
	var rowCount,
		idCounter,
		score,
		target;
	
	//the number of moves a player has made
	var noOfMoves = 0;


	// listener attached to form submit button
	// generates table
	$('#pieceSelection').submit(function() {
	
		rowCount = $("#numOfPieces").val();
		console.log("Scrambling image into " + rowCount + 'x' + rowCount + ' rows and cols');

		// array to store the newly created canvas elements
		var canvasArray = PicPuzzle_Image.split( $("#image").val() , rowCount * rowCount);
		
		//list to keep track of the tiles which are available for random selection 
		var tilesAvailable = new Array(rowCount^2);
		
		//store the row and col of the blank cell
		var blankRow =0,
			blankCol =0;


		$(function () {

			//initialize tilesAvailable         
			//it contains the tile numbers that are possible to select from at random
			//array is full as no values have been randomly selected yet

			for (var i = 0; i <canvasArray.length; i++) {
				tilesAvailable[i] = i ;
			}


			var $tbl = $('<table border="1">').attr('id', 'grid'),
				$tbody = $('<tbody>').attr('id', 'tableBody');
			
			for (var i = 0; i < rowCount; i++) {

				var trow = $("<tr>").attr('id', 'row' + i); // New row
				
				for (var j = 0; j < rowCount; j++) {
				
					//var $cell = $("<td>").text('Row : ' + i + ', Col: ' + j);
					console.log('TilesAvailable: ',tilesAvailable);

					//choose a random tile
					var random =randomChoice(tilesAvailable),
						$cell = $("<td>").append(canvasArray[random]);

					//remove random value from the possible selection of tiles
					tilesAvailable = removeItemFromList(tilesAvailable, random);
					console.log('Random tile: ',random);
					
				 	//Get the row and column position of the last canvas element
				    if(random == ((canvasArray.length -1))){
					                   
						blankRow = i ;
						blankCol = j ;
					}                 

					$cell.appendTo(trow); 
				}

				trow.appendTo($tbody);
			}

			$tbl.append($tbody);
			
			if ($('#content').children().length > 0 ){
				$('table').remove();
			}
			
			$('#content').append($tbl);
		});

		//Position the blank cell in the position of the last canvas element
		$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').children().hide();
		$('#grid tr:eq('+blankRow+') td:eq('+blankCol+')').attr('id', 'blankCell');
		console.log('br: '+blankRow+' bc:  '+blankCol);
		
		//reset number of moves if the image has been scrambled
		if (noOfMoves != 0)
			noOfMoves = 0;
			
			updateText('moveCount',noOfMoves);

		return false;
	});

	//remove a value from a array
	//returns an array
	function removeItemFromList(array, removeItem){

		array =  jQuery.grep(array, function(value) {
			return value != removeItem;
		});

		return array;
	};

	//get a random value from a list of elements
	//returns a random value
	function randomChoice(list){
		return list[Math.floor(Math.random()*list.length)];
	};

	//update text of an element
	//Parameters: The element ID, the text
	function updateText(elementID,text){
		document.getElementById(elementID).innerHTML = text;
	};
	

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
			
			updateText('moveCount',noOfMoves);

			console.log('Moves: '+noOfMoves);
	    }
	    
	    // Check if puzzle is complete after each move
	    $("td").each(function() {
	    	target = rowCount * rowCount;
	    	
	    	if ($(this).children().attr("id") == "canvas" + idCounter){
	    		score++;
	    		if (score == target){
	    			alert("Congratulations You have solved the puzzle!\nIn "+noOfMoves+" moves");
	    		}
	    	}
	    	
	    	idCounter++;
		});
	});
});
