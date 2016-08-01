












/*----------------------------------------------------------------------*/

function hide(){
	document.getElementById("startButton").style.visibility = "hidden";
	write("I'm going first!, now your turn!");
	document.getElementById("notification").style.visibility = "visible";
}


/*-------------------------------------------------------------------------*/

function play(){
	hide();
	firstGo("red", "O");
}

function write(message){
	var bar = document.getElementById("notification");
	bar.innerHTML = message;
}

function compTurn(){
	


}

/*--------------------------------------------------------------*/

function mark(curr, user){
	if(user == null){
		curr.innerHTML = "X";
		curr.style.color = "green";
		curr.value = "disable";
		curr.disabled = true;
		write("hmm, let me think!")
		deactive(true);
		compTurn();
	}

}

function won(user){

}