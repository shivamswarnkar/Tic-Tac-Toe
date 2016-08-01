var WIN = [
	["C_UL", "C", "C_DR"],
	["C_UR", "C", "C_DL"],
	["E_L", "C", "E_R"],
	["E_U", "C", "E_D"],
	["C_UL", "E_U", "C_UR"],
	["C_DL", "E_D", "C_DR"],
	["C_UR", "E_R", "C_DR"],
	["C_UL", "E_L", "C_DL"] 
];

var GAME = {
	firstGo : null,
	userPlayed : null,
	userPos : [],
	compPos : []
};


deactive(true);






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
		GAME.userPos.push(curr.id);
		if(won(GAME.userPos)){
			write("You won!");
		}
		else{
			write("hmm, let me think!")
		}
		//deactive(true);
		compTurn();
	}

}

/*---checks if won*/
function won(user){
	curr=0;
	for(var i=0; i < WIN.length; ++i){
		for( var j=0; WIN[i].length; ++j){
			if(user.indexOf(WIN[i][j]) == -1){

				break;
			}
			curr +=1;
		}
		if(curr ==3){return true;}
		else{curr =0;}
	}
	return false;
}