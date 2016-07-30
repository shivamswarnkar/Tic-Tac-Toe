/*This Game belongs to Shivam Swarnkar.
 *This is an AI system which decides the next move of the computer based on the current 
 *situation of the game.
*/ 

function mark(curr, user){
	if(user == null){
		curr.innerHTML = "X";
		curr.style.color = "green";
		curr.value = "disable";
		deactive(true);
	}

}

function deactive(bool){
	var places = document.getElementsByClassName("place");
	for (var i=0;  i < places.length; ++i){
		places[i].disabled = bool;
	}
	
}



/*------AI--------*/





/*------AI--------*/