var PicPuzzle_Utils = {
		
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
         $(elementID).fadeTo('fast', 1)
                                
       //ensuring notificationIntervalId is cleared
 		if (this.notificationIntervalId){
 			clearInterval(this.notificationIntervalId)
 		}
 		
	     //set message to fade out
 		this.notificationIntervalId = setTimeout(function() {
	      	$(elementID).fadeTo('fast', 0)
		  }, duration); 
	},
	

	//Get the time difference between two javascript date objects
	//Paramaters: Two Date Objects
	//Returns a string containing the time.
	diffBetweenTimes: function(beginTime, endTime){
		var timeTaken = new Date(endTime.getTime() - beginTime.getTime()),
		 	timeTakenString = "";
		
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
	            
		var NewDialog = $('<div id="playAgainDialog">\<p>'+message+'.</p>\</div>');
	    NewDialog.dialog({
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
		

		$("#selectable" ).selectable({
		   selected: function(event, ui) { 
			   $("#image").val($(ui.selected).children().attr('src'));
		   }
		});

	},
	
	validateForm: function(){
		var imageurl = $('#image').val();
		
		//check to ensure an image has been selected
		if(imageurl == null || imageurl == ""){
			alert("You must select an image\nChoose one above or paste a URL");
			return false;
			
		//check that a valid image has been submitted
		}else if( (imageurl.toLowerCase()).indexOf(".png") == -1 && (imageurl.toLowerCase()).indexOf(".jpg") == -1 ){
			alert ("Image must be a PNG or JPG file type");
			return false;
		}else
			return true;

	},
	
	initTimer: function(){

		PicPuzzle_Utils.updateText(
	    		'timer', 
	    		PicPuzzle_Utils.diffBetweenTimes(
	    				PicPuzzle_Utils.startTime, 
	    				new Date()));
	},
	
	getTopTimes: function(){
		
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = callback;
		xmlhttp.open("GET", "TopTimes?operation=getTopTimes", true);
		xmlhttp.send(null);
		
		function callback() {

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

				var NewDialog = $('<div>\<p>' + xmlhttp.responseText + '.</p>\</div>');
			    NewDialog.dialog({
			    	modal: true,
				    title: "Top Times",
				    buttons:[{ 
				    	text: "Ok", click: function() {
				    		$(this).dialog("close");
					    }
					}]
				});
			    
			} else {
			    // have not recieved top times yet
			}
		}
	},
	
	compareUsersTime: function(){
		
		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange = callback;
		xmlhttp.open("GET", "TopTimes?operation=compareUsersTime", true);
		xmlhttp.send(null);
		
		function callback() {

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				
				// was users time the quickest?
			    
			} else {
			    // have not recieved result yet
			}
		}
	}
};
