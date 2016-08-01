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
	stage : 0,
	userPlayed : null,
	
	comp: {
		color: null,
		char : null,
		pos : [],
		posObject : []
	},
	
	user : {
		color: null,
		char : null,
		pos : [],
		posObject : []
	}
};

deactive(true);





/*----------------------------------------------------------------------*/

function hide(){
	GAME.firstGo = true;
	document.getElementById("startButton").style.visibility = "hidden";
	write("I'm going first!, now your turn!");
	document.getElementById("notification").style.visibility = "visible";
}


/*-------------------------------------------------------------------------*/

function play(){
	GAME.user.color = "green";
	GAME.user.char = "X";

	GAME.comp.color = "red";
	GAME.comp.char = "O";
	hide();
	if(GAME.firstGo){
		firstGo();
	}
	else{

	}
}

function write(message){
	var bar = document.getElementById("notification");
	bar.innerHTML = message;
}

/*---checks if won*/
function won(user){
	curr=0;
	var match = [];
	for(var i=0; i < WIN.length; ++i){
		for( var j=0; WIN[i].length; ++j){
			if(user.indexOf(WIN[i][j]) == -1){

				break;
			}
			curr +=1;
			match.push(WIN[i][j]);
		}
		if(curr ==3){ color(match); return true;}
		else{curr =0; match = [];}
	}
	return false;
}

function color(match){
	for(var i=0; i<match.length; ++i){
		curr =document.getElementById(match[i]).style;
		curr.backgroundColor = "yellow";
	}

}

/*--------------------------------------------------------------*/

function mark(curr, user){
	if(user == null){ //playing v/s AI
		curr.innerHTML = "X";
		curr.style.color = "green";
		curr.value = "filled";
		curr.disabled = true;
		GAME.stage += 1;
		GAME.user.pos.push(curr.id);
		GAME.user.posObject.push(position(curr.id));
		if(won(GAME.user.pos)){
			write("You won!");
			//congrats();
			return;
		}
		else{
			write("hmm, let me think!")
		}
		deactive(true);
		compTurn();
		if(won(GAME.comp.pos)){
			write("Ah, I win! ;) ");
		}
	}

}
