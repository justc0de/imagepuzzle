var ImagePuzzle_Utils = {
		
	startTime: null,
	notificationIntervalId: null,
	
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
		if ((timeTaken.getHours() - 1) < 1)	
			timeTakenString += '00:';
		else if((timeTaken.getHours() - 1) >= 0 && (timeTaken.getHours() - 1) < 10)
			timeTakenString += '0' + (timeTaken.getHours() - 1).toString() + ':';
		else
			timeTakenString += (timeTaken.getHours() - 1).toString() + ':';
		
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



	//Display the winning message to the user(s)
	//ask them to play again ?
	//Parameters: the winning message
	playAgain: function(message){
	            
		$('<div id="playAgainDialog">\<p>'+message+'.</p>\</div>').dialog({
	    	modal: true,
		    title: "Play Again ?",
		    buttons:[
		             {
		            	 text: "Yes", click: function() {
		            		 window.location = "choose.html" ;
		            		 $(this).dialog("close");
		            	 }
		             },
			         {
		            	 text: "No", click: function() {
						 	window.location = "index.html" ;
		            		 $(this).dialog("close");
			        	 }
			         }
			        ]
		});
		
		return false;
				                      
	},
	
	initButtons: function(){
		$( ".styled-button" ).each(function( i ) {
			 $(this).button();
		 });
	},
	
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
		

		$("#selectable" ).selectable({
		   selected: function(event, ui) { 
			   $("#image").val($(ui.selected).children().attr('src').replace("preview","stock"));
		   }
		});
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
	},
	
	getCookie: function(cname) {
		
		var name = cname + "=",
			ca = document.cookie.split(';');
		
		for(var i=0; i < ca.length; i++){
			
			var c = ca[i].trim();
		  
			if (c.indexOf(name)==0) {
				
				return c.substring(name.length,c.length);
			}
		}
	
		return "";
	},
	
	setCookie: function(cname, cvalue){
		
		document.cookie = cname + "=" + cvalue; 
	},
	
	increasePuzzlesSolved: function(){

		this.setCookie("puzzlesSolved", parseInt(this.getCookie("puzzlesSolved")) + 1);
	},
	
	checkCookie: function(){		
		
		if (this.getCookie("puzzlesSolved") != "") {

			this.updateText("puzzlesSolved", this.getCookie("puzzlesSolved"));
		
		}else{
			
			this.setCookie("puzzlesSolved", '0');
		}
	} 
};
