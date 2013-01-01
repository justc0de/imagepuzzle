var PicPuzzle_Utils = {
		
	startTime: null,
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
         $(elementID).fadeTo('fast', 1)
                                
	     //set message to fade out
	     setTimeout(function() {
	      	$(elementID).fadeTo('fast', 0)
		  }, duration); 
	},
	

	//Get the time difference between two javascript date objects
	//Paramaters: Two Date Objects
	//Returns a string containing the time.
	diffBetweenTimes: function(beginTime, endTime){
		var timeTaken = endTime.getTime() - beginTime.getTime(),
	 	daysTaken,
	 	hoursTaken, 
	 	minutesTaken, 
	 	secondsTaken = Math.round(timeTaken / (1000)),
	 	timeTakenString = "";
		
		if (secondsTaken >= 60){
				//convert seconds into minutes
				minutesTaken = Math.floor(secondsTaken / 60);
				
				//remove converted seconds
				secondsTaken = Math.floor(secondsTaken % 60);
			
			if(minutesTaken >= 60){
			
				//convert minutes to hours
				hoursTaken = Math.floor(minutesTaken / 60);

				//remove converted minutes
				minutesTaken = Math.floor(minutesTaken % 60);

				if(hoursTaken >= 24){
				
					//convert hours to days
					daysTaken = Math.floor(hoursTaken / 24);
					
					//remove converted hours
					hoursTaken = Math.floor(hoursTaken % 24);
				}
			
			}
		}



	if (daysTaken > 0)
		timeTakenString += daysTaken + " day(s) ";
	 
	if (hoursTaken > 0 && hoursTaken < 10)
		timeTakenString += "0" +  hoursTaken + ":";
	
    if (hoursTaken >= 10)
		timeTakenString += hoursTaken + ":";


	if (minutesTaken > 0 && minutesTaken < 10)
		timeTakenString += "0" + minutesTaken + ":";
	else if(minutesTaken >= 10)
	 	timeTakenString += minutesTaken + ":";
    else
	 	timeTakenString += "00:";

    if (secondsTaken > 0 && secondsTaken < 10)
		timeTakenString += "0"+ secondsTaken ;
    else if(secondsTaken >= 10)
	 	timeTakenString += secondsTaken;
    else
	 	timeTakenString += "00" ;
	

	
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
		    buttons:[
		             {
		            	 text: "Yes", click: function() {
		            		 $('#pieceSelection').submit();
		            		 $(this).dialog("close");
		            	 }
		             },
			         {
		            	 text: "No", click: function() {
		            		 $(this).dialog("close");
			        	 }
			         }
			        ]
		});
		
		return false;
				                      
	},
	
	
	//Initialize UI elements
	initUIElements: function(){
		$( document ).tooltip();
		$( "#image" ).tooltip({
            show: {
                effect: "slideDown",
                delay: 250
            }
        });
		
		$(function() {
		    $("#radio").buttonset();
		});

		$("#radio :radio").click(function(e) {
			$('#pieceSelection').submit();
		});
		
		$(function() {
		    $("#selectable").selectable();
		});

		$("#selectable" ).selectable({
		   selected: function(event, ui) { 
			   $("#image").val($(ui.selected).children().attr('src'));
			   $('#pieceSelection').submit();
		   }
		});

	},
	
	initTimer: function(){

		PicPuzzle_Utils.updateText(
	    		'timer', 
	    		PicPuzzle_Utils.diffBetweenTimes(
	    				PicPuzzle_Utils.startTime, 
	    				new Date()));
	}
};
