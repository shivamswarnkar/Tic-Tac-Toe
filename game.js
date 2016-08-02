/*This Game belongs to Shivam Swarnkar.
 *This is an AI system which decides the next move of the computer based on the current 
 *situation of the game.
*/ 

function lol(){
	console.log('klo');
}

function deactive(bool){
	var places = document.getElementsByClassName("place");
	for (var i=0;  i < places.length; ++i){
		if(places[i].value != "filled"){
			places[i].disabled = bool;
		}
	}
	
}

function markPosition(pos, color, char){
	var curr = document.getElementById(pos.pos);
	curr.style.color = color;
	curr.innerHTML = char;
	curr.value = "filled";
	curr.disabled = true;
	GAME.left.splice(GAME.left.indexOf(pos.pos), 1);
	deactive(false);
}

/*------AI--------*/



/*----Function returns a positon object for the 9 positions*/

function position(str, pos){ //pos should be an array
	var newPos = new Object();
	if(str){
		newPos.pos = str;
		if(str.length ==1){
			newPos.type = 'center';
		}

		else if(str.length == 3){
			newPos.type = "edge";
		}
		else{
			newPos.type = "corner";
		}

	}
	else{
		if(pos == null || pos.length==0){
			newPos.type = "center";
			newPos.pos = "C";
		}
		else if(pos.length == 1){
			newPos.type = "edge";
			newPos.pos = 'E_'+ pos[0][0].toUpperCase();

		}

		else{
			newPos.type = "corner";
			newPos.pos = 'C_' + pos[0][0].toUpperCase() + 
			pos[1][0].toUpperCase();
		}
	}

	return newPos;

}

/*Returns opposite corner for a given corener or a furthest corner for given edge. center is returned
for given center.
*/
function counterCorner(pos){
	var result;
	if(pos.type == "center"){result = [pos];}

	else if(pos.type == "edge"){ //returns furthest corner
		var side = opp(pos.pos[2]);  //sends L or R, gets opposite
		var diffSide = diff(pos.pos[2]);
		if(side=='L'|| side=='R'){
			result= [ position ( "", [diffSide[0], side] ), position("", [diffSide[1], side]) ] ;
		}
		else{
			result= [ position ( "", [side, diffSide[0]] ), position("", [side, diffSide[1]]) ] ;
		}

	}

	else{ //returns opposite corner
		result= [ position("", [ opp(pos.pos[2]), opp(pos.pos[3]) ] ) ];
	}
	if(result.length==0){
		result = GAME.left;
		console.log(GAME.left);
	}
	return result;

}

//Helping function, opp returns opposite direction and diff returns different side;
function opp(char){
	if(char == 'L'){return 'R';}
	else if(char == 'R'){return 'L';}

	else if(char == 'U'){return 'D';}
	else if(char == 'D') { return 'U';}
}

function diff(char){
	if(char == 'L' || char == 'R'){
		return ['U', 'D'];
	}
	else if(char == 'U' || char=='D'){
		return ['L', 'R'];
	}
}




/*------AI--------*/


/*---AI follows this algorithm when plays first*/
function firstGo(){
	var center = position();
	markPosition(center, GAME.comp.color, GAME.comp.char); //center first mark
	GAME.comp.pos.push(center.pos);
	GAME.comp.posObject.push(center);
	GAME.stage += 1;
}

function compTurn(){
	var result = canWin(GAME.comp) || canWin(GAME.user); //checks if comp can win in one move, and then makes that move.
	if(result){
		markPosition(result, GAME.comp.color, GAME.comp.char);
		GAME.comp.pos.push(result.pos);
		GAME.comp.posObject.push(result);
		deactive(true);
	}
	else if(GAME.firstGo){
		var compPos;
		if(GAME.stage ==2){
			compPos = counterCorner(GAME.user.posObject[0]);
			compPos = compPos[Math.floor(Math.random()*compPos.length)];
			markPosition(compPos, GAME.comp.color, GAME.comp.char);
			GAME.comp.pos.push(compPos.pos);
			GAME.comp.posObject.push(compPos);
			write("Your turn!");
		}
		else if(GAME.stage>=4){
			compPos = canWin(GAME.user) || canWin(GAME.comp, 2);
			if(!compPos){
				compPos = counterCorner(GAME.user.posObject[1]);
				compPos = compPos[Math.floor(Math.random()*compPos.length)];
			}
			markPosition(compPos, GAME.comp.color, GAME.comp.char);
			GAME.comp.pos.push(compPos.pos);
			GAME.comp.posObject.push(compPos);
			write("hmm, I think you're in truble!");
		}
				
	}	
		
	else {				//if user decides to go first!

	}
	

	GAME.stage += 1;
	deactive(false);


}

function canWin(player,turn){
	if(!turn){turn =1;}
	var numMatch=0;
	var match = [];
	var un;

	var pos = player.pos;
	for(var i=0; i< WIN.length; ++i){
		match =[];
		for(var j=0; j < 3; ++j){//3 because just combination of 3 pos can win
			if(pos.indexOf(WIN[i][j]) != -1){
				match.push(WIN[i][j]);
			}
			if(match.length>=(3-turn)){
				un = uncommon(WIN[i], match);
				if(document.getElementById(un).value != "filled"){
					return position(un);
				}

			}		
		}
	}
}

//returns first uncommon function
function uncommon(x, y){//x length should be greater or equal than y
	var un;
	for(var i=0; i<x.length; ++i){
		if(y.indexOf(x[i]) == -1){
			return x[i];
		}
	}
}