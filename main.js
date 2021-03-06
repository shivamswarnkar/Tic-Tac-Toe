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
	left : ["C_UL", "E_U", "C_UR", "E_L", "C", "E_R", "C_DL", "E_D", "C_DR"],
	comp: {
		color: null,
		char : null,
		pos : [],
		posObject : []
	},
	
	user : {
		name : null,
		color: null,
		char : null,
		pos : [],
		posObject : []
	}
};

deactive(true);





/*----------------------------------------------------------------------*/

function hide(){
	document.getElementById("startButton").style.visibility = "hidden";
	document.getElementById("notification").style.visibility = "visible";
}


/*-------------------------------------------------------------------------*/

function play(){
	
	hide();
	if(GAME.firstGo){
		write("I'm going first!, now your turn "+GAME.user.name+"!");
		firstGo();
	}
	else{
		write("Well then, first your turn "+GAME.user.name+"!");
		deactive(false);

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
		if(curr ==3){ color(match); deactive(true); return true;}
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
		curr.innerHTML = GAME.user.char;
		curr.style.color = GAME.user.color;
		curr.value = "filled";
		curr.disabled = true;
		
		//update game object about changes
		GAME.stage += 1;
		GAME.user.pos.push(curr.id);
		GAME.user.posObject.push(position(curr.id));
		GAME.left.splice(GAME.left.indexOf(curr.id), 1);
		
		if(won(GAME.user.pos)){
			write("You won "+GAME.user.name+"!");
			//congrats();
			return;
		}
		else{
			write("hmm, let me think "+GAME.user.name+"!")
		}
		deactive(true);
		compTurn();
		if(won(GAME.comp.pos)){
			write("Ah, I win "+GAME.user.name+"! " +";) ");
		}
		else if(GAME.left <= 1){
			write("Seems like it's a tie " +GAME.user.name);
			deactive(true);
		}
		else{
			write("your turn "+GAME.user.name+"!");
		}
	}

}
