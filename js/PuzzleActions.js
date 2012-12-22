$(document).ready(function() {

	// listener attached to form submit button
	// generates table
	$('#pieceSelection').submit(function() {
		
		var rowCount = $("#numOfPieces").val();
		
		console.log("Scrambling image into " + rowCount + 'x' + rowCount + ' rows and cols');

		// array to store the newly created canvas elements
		// it stores the sequence of images in the correct order
		// can be comared against to check if the puzzle is solved
		var canvasArray = PicPuzzle_Image.split( $("#image").val() , rowCount * rowCount);
		
		$(function () {

			var $tbl = $('<table border="1">').attr('id', 'grid');
			var $tbody = $('<tbody>').attr('id', 'tableBody');
			
			var tileCount = 0;
			
			for (var i = 0; i < rowCount; i++) {

				var trow = $("<tr>").attr('id', 'row' + i); // New row
				
				for (var j = 0; j < rowCount; j++) {
				
					//var $cell = $("<td>").text('Row : ' + i + ', Col: ' + j);

					// Each data cell will contain a separate <canvas> element
					var $cell = $("<td>").append(canvasArray[tileCount]);
					
					console.log('jQuery Tiles: ', canvasArray.length);
					tileCount++;

					$cell.appendTo(trow); 
				}

				trow.appendTo($tbody);
			}

			$tbl.append($tbody);
			$('table').remove();
			$('body').append($tbl);
		});
		
		// set table cell to be blank for logic purposes
		// Dynamically sets last cell to be the blank one
		$('#grid tr:last td:last').text("empty");
		$('#grid tr:last td:last').attr('id', 'blankCell');
		return false;
	});

	
	// Event handler for clicking table cells
	$('body').on('click', '#grid td', function(e) {
		
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
	    }
	});
});
