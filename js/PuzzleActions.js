$(document).ready(function() {

	// listener attached to form submit button
	// generates table
	$('#pieceSelection').submit(function() {
		
		var rowCount = $("#numOfPieces").val();
		
		console.log("Scrambling image into " + rowCount + 'x' + rowCount + ' rows and cols');
		var canvasArray = PicPuzzle_Image.split( $("#image").val() , rowCount * rowCount);
		
		$(function () {

			var $tbl = $('<table border="1">').attr('id', 'grid');
			var $tbody = $('<tbody>').attr('id', 'tableBody');
			
			var tileCount = 0;
			
			for (var i = 0; i < rowCount; i++) {

				var trow = $("<tr>").attr('id', 'row' + i); // New row
				
				for (var j = 0; j < rowCount; j++) {
				
					//var $cell = $("<td>").text('Row : ' + i + ', Col: ' + j);
					
					var $cell = $("<td>").append(canvasArray[tileCount]); // Each data cell will contain a separate <canvas> element
					
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
		$('#grid tr:nth-child(2) td:last').prev().text("empty");
		$('#grid tr:nth-child(2) td:last').prev().attr('id', 'blankCell');
		
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
			
		if ($(this).parent().prev().children("#blankCell").index() == $(this).index()){
			//alert('blank is above');

			var blank = document.getElementById("blankCell");
			var after = blank.nextSibling; 
			this.parentNode.insertBefore(blank, this); 
			after.parentNode.insertBefore(this, after);
			
			$(this).attr('id', 'blankCell');
			$(this).parent().prev().children("#blankCell").attr('id', 'piece');
			
		}else if ($(this).parent().next().children("#blankCell").index() == $(this).index()){
			//alert('blank is below');	
			
			var blank = document.getElementById("blankCell");
			var after = blank.previousSibling; 
			this.parentNode.insertBefore(blank, this); 
			after.parentNode.insertBefore(this, after);
			
			//var emtpyCellText = $(this).parent().next().children("#blankCell").text();
			//$(this).parent().next().children("#blankCell").text($(this).text());
			$(this).text(emtpyCellText);
			$(this).attr('id', 'blankCell');
			$(this).parent().next().children("#blankCell").attr('id', 'piece');
			
		}
	});
});
