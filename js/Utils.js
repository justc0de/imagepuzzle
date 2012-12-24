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
	}
};