$(document).ready(function() {
	
	$('#imageSelection').children('li').bind('click', function(e) {
	    $('#imageTextfield').val($(this).children('a').children('img').attr('src'));
	});
	
	$('.loadChooseUI').click(function(){
		
		ImagePuzzle_Utils.loadChooseUI();
		$('#gameContainer').attr('style', 'display:none');
		$('#chooseContainer').attr('style', 'display:inline');
		$('#moveCount').html('0');
		clearInterval(ImagePuzzle_Game.timerIntervalId);
	});
	
	document.getElementById('submit').addEventListener('click', function(event) {
		
		ImagePuzzle_Game.init();
		
	}, false);
	
	document.getElementById('restartButton').addEventListener('click', function(event) {
		
		ImagePuzzle_Utils.loadChooseUI();
		$('#gameContainer').attr('style', 'display:none');
		$('#chooseContainer').attr('style', 'display:inline');
		$('#moveCount').html('0');
		
	}, false);
	
	document.getElementById('help').addEventListener('click', function(event) {
		
		window.open('https://github.com/justc0de/imagepuzzle/wiki/How-to-play');
		
	}, false);
	
	$('#gameContent').on('click', '#grid td', function(e) {
		
		ImagePuzzle_Game.idCounter = 0,
			ImagePuzzle_Game.score = 0;
		
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
			
	        ImagePuzzle_Utils.noOfMoves++;
	
			//play the move sound
			if($('#mute').val() === 'off'){
				ImagePuzzle_Game.move_snd.play();
			}
	
			ImagePuzzle_Utils.updateText('moveCount', ImagePuzzle_Utils.noOfMoves);
	    }
	    
	    // Check if puzzle is complete after each move
	    $("td").each(function() {
	    	
	    	if ($(this).children().attr("id") == "canvas" + ImagePuzzle_Game.idCounter){
	    		
	    		ImagePuzzle_Game.score++;
	    		
	    		
	    		if (ImagePuzzle_Game.score == ImagePuzzle_Game.target){
	    			
	    			//show complete image
					$("#blankCell").children().show();
					$("#blankCell").attr('id', $("#blankCell").children().attr('id'));
					
					if($('#mute').val() === "off"){
						ImagePuzzle_Game.win_snd.play();
					}
					
					// stop timer in UI
					clearInterval(ImagePuzzle_Game.timerIntervalId);	
					
					var endTime = new Date(),
						duration = ImagePuzzle_Utils.diffBetweenTimes(
		            		ImagePuzzle_Utils.getStartTime(), 
		            		endTime); 
					
					ImagePuzzle_Utils.puzzlesSolved++;
					ImagePuzzle_Utils.updateText('puzzlesSolved', ImagePuzzle_Utils.puzzlesSolved);
					
					$('#playAgainLink').click();
	    		}
	    	}
	    	
	    	ImagePuzzle_Game.idCounter++;
		});
	});
});


var ImagePuzzle_Utils = {
		
	startTime: null,
	notificationIntervalId: null,
	puzzlesSolved: 0,
	noOfMoves: 0,
	
	loadChooseUI: function(){
		
		$('#indexContainer').attr('style', 'display:none');
		$('#chooseContainer').attr('style', 'display:inline');
	},
	
	getStartTime: function(){
		return this.startTime;
	},
	
	setStartTime: function(startTimeTemp){
		this.startTime = startTimeTemp;
	},
	
	//remove a value from a array
	//returns an array
	removeItemFromList: function(array, removeItem) {
		array =  jQuery.grep(array, function(value) {
			return value != removeItem;
		});

		return array;
	},
	
	//get a random value from a list of elements
	//returns a random value
	randomChoice: function(list) {
		return list[Math.floor(Math.random()*list.length)];
	},
	
	
	//update text of an element
	//Parameters: The element ID, the text
	updateText: function(elementID,text) {
		document.getElementById(elementID).innerHTML = text;
	},

	
	//briefly show a notification to the user
	//Parameters: elementID to show and the duration 
	//to show in milliseconds
	notify: function(elementID,duration){
	
         //set message to show in case it has previously faded out
         $(elementID).fadeTo('fast', 1);
                                
       //ensuring notificationIntervalId is cleared
 		if (this.notificationIntervalId){
 			clearInterval(this.notificationIntervalId);
 		}
 		
	     //set message to fade out
 		this.notificationIntervalId = setTimeout(function() {
	      	$(elementID).fadeTo('fast', 0);
		  }, duration); 
	},
	

	//Get the time difference between two javascript date objects
	//Returns a string containing the time.
	diffBetweenTimes: function(beginTime, endTime){
		var timeTaken = new Date(endTime.getTime() - beginTime.getTime());
		
	 	return ImagePuzzle_Utils.formatTime(timeTaken);
	},
	
	formatTime: function(timeTaken){
		var timeTakenString = "";
		
		// calc hours
		/*if ((timeTaken.getHours() - 1) < 1)	
			timeTakenString += '00:';
		else if((timeTaken.getHours() - 1) >= 0 && (timeTaken.getHours() - 1) < 10)
			timeTakenString += '0' + (timeTaken.getHours() - 1).toString() + ':';
		else
			timeTakenString += (timeTaken.getHours() - 1).toString() + ':';*/
		
		// calc minutes
		if (timeTaken.getMinutes() < 1)
			timeTakenString += '00:';
		else if(timeTaken.getMinutes() >= 0 && timeTaken.getMinutes() < 10)
			timeTakenString += '0' + timeTaken.getMinutes().toString() + ':';
		else
			timeTakenString += timeTaken.getMinutes().toString() + ':';
		
		//calc seconds
		if (timeTaken.getSeconds() < 1)
			timeTakenString += '00.';
		else if(timeTaken.getSeconds() >= 0 && timeTaken.getSeconds() < 10)
			timeTakenString += '0' + timeTaken.getSeconds().toString() + '.';
		else
			timeTakenString += timeTaken.getSeconds().toString() + '.';
			
		//calc decisecond
		if (parseInt(timeTaken.getMilliseconds().toString()[0]) < 1)
			timeTakenString += '0';
		else
			timeTakenString += timeTaken.getMilliseconds().toString()[0];


	 	return timeTakenString;
	},
	
	initTimer: function(){

		ImagePuzzle_Utils.updateText(
	    		'timer', 
	    		ImagePuzzle_Utils.diffBetweenTimes(
	    				ImagePuzzle_Utils.startTime, 
	    				new Date()));
	},
	
	dialog: function(title, body){

		$('<div><p>' + body + '</p></div>').dialog({
	    	modal: true,
		    title: title,
		    buttons:[{ 
		    	text: "Ok", click: function() {
		    		$(this).dialog("close");
			    }
			}]
		});
	}
};
