$(document).ready(function() {

	// listener attached to form submit button
	// generates table
	$('#pieceSelection').submit(function() {
		console.log("Scrambling image into " + $("#numOfPieces").val() + 'x' + $("#numOfPieces").val() + ' rows and cols');
		var canvasArray = PicPuzzle_Image.split('Images/test.jpg', $("#numOfPieces").val() * $("#numOfPieces").val());
		//alert(canvasArray.length)
		
		$(function () {

			var $tbl = $('<table border="1">').attr('id', 'grid');
			var $tbody = $('<tbody>').attr('id', 'tableBody');
			var tileCount = 0;
			
			for (var i = 0; i < $("#numOfPieces").val(); i++) {

				var trow = $("<tr>").attr('id', 'row' + i); // New row
				
				for (var j = 0; j < $("#numOfPieces").val(); j++) {
				
					//var $cell = $("<td>").text('Row : ' + i + ', Col: ' + j);
					console.log('jQuery Tiles: ', canvasArray.length);
					
					//var $cell = $("<td>").append(canvasArray[tileCount]); // Each data cell will contain a separate <canvas> element
					//$cell.appendTo(trow); 
					tileCount++;
					
					var $cell = $("<td>").text('Row : ' + i + ', Col: ' + j);

					//$cell.append(canvasArray[i]); // Each data cell will contain a separate <canvas> element
					$cell.appendTo(trow); 
				}

				trow.appendTo($tbody);
			}

			$tbl.append($tbody);
			$('table').remove();
			$('body').append($tbl);

			// debug, output of canvas elements, need to be removed
			//for(var i = 0; i < canvasArray.length; i++) {

				//$('body').append(canvasArray[canvasArray.length - 1]);
			//}
		});
		
		// set table cell to be blank for logic purposes
		$('#grid tr:nth-child(2) td:last').prev().text("empty");
		$('#grid tr:nth-child(2) td:last').prev().attr('id', 'blankCell');
		
		return false;
	});
	
	// Event handler for clicking table cells
	$('body').on('click', '#grid td', function(e) {
		if ($(this).closest('td').next("#blankCell").length){
			//alert('cell to the right');
			var emtpyCellText = $(this).closest('td').next("#blankCell").text();
			$(this).closest('td').next("#blankCell").text($(this).text());
			$(this).text(emtpyCellText);
			$(this).attr('id', 'blankCell');
			$(this).closest('td').next("#blankCell").attr('id', 'piece');
			
		}else if ($(this).closest('td').prev("#blankCell").length){
			//alert('cell to the left');
			var emtpyCellText = $(this).closest('td').prev("#blankCell").text();
			$(this).closest('td').prev("#blankCell").text($(this).text());
			$(this).text(emtpyCellText);
			$(this).attr('id', 'blankCell');
			$(this).closest('td').prev("#blankCell").attr('id', 'piece');
			
		}else if ($(this).parent().prev().children("#blankCell").index() == $(this).index()){
			//alert('Cell is above');
			var emtpyCellText = $(this).parent().prev().children("#blankCell").text();
			$(this).parent().prev().children("#blankCell").text($(this).text());
			$(this).text(emtpyCellText);
			$(this).attr('id', 'blankCell');
			$(this).parent().prev().children("#blankCell").attr('id', 'piece');
			
		}else if ($(this).parent().next().children("#blankCell").index() == $(this).index()){
			//alert('Cell is below');	
			var emtpyCellText = $(this).parent().next().children("#blankCell").text();
			$(this).parent().next().children("#blankCell").text($(this).text());
			$(this).text(emtpyCellText);
			$(this).attr('id', 'blankCell');
			$(this).parent().next().children("#blankCell").attr('id', 'piece');
			
		}
	});
});
