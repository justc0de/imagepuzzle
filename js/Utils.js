var PicPuzzle_Utils = {
	
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
         $(elementID).fadeTo('fast', 1)
                                
	     //set message to fade out
	     setTimeout(function() {
	      	$(elementID).fadeTo('fast', 0)
		  }, duration); 
	},
	
	diffBetweenTimes: function(beginTime, endTime){
		var timeTaken = endTime.getTime() - beginTime.getTime(),
	 	daysTaken = Math.round(timeTaken / (1000*60*60*24)),
	 	hoursTaken = Math.round(timeTaken / (1000*60*60)),
	 	minutesTaken = Math.round(timeTaken / (1000*60)),
	 	secondsTaken = Math.round(timeTaken / (1000)),
	 	timeTakenString = "";
	 
	 if (daysTaken > 0)
		 timeTakenString += daysTaken + " day(s), ";
	 
	 if (hoursTaken > 0)
		 timeTakenString += hoursTaken + " hour(s), ";
	 
	 if (minutesTaken > 0)
		 timeTakenString += minutesTaken + " minute(s), ";
	 
	 if (secondsTaken > 0)
		 timeTakenString += secondsTaken + " second(s)";
		
	 	return timeTakenString;
	},

	//Display the winning message to the user(s)
	//ask them to play again ?
	//Parameters: the winning message
	playAgain: function(message){
	            
		var NewDialog = $('<div id="playAgainDialog">\<p>'+message+'.</p>\</div>');
	    NewDialog.dialog({
	    	modal: true,
		    title: "Play Again ?",
		    buttons: [
			          {text: "Yes", click: function() {$('#pieceSelection').submit(),$(this).dialog("close")}},
			          {text: "No", click: function() {$(this).dialog("close")}}
			         ]
		});
		
		return false;
				                      
	}      
};
