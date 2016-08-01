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
	if(pos.type == "center"){return [pos];}

	else if(pos.type == "edge"){ //returns furthest corner
		var side = opp(pos.pos[2]);  //sends L or R, gets opposite
		var diffSide = diff(pos.pos[2]);
		return [ position ( "", [diffSide[0], side] ), position("", [diffSide[1], side]) ] ;
	}

	else{ //returns opposite corner
		return [ position("", [ opp(pos.pos[2]), opp(pos.pos[3]) ] ) ];
	}

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
	var result = canWin(GAME.comp); //checks if comp can win in one move, and then makes that move.
	if(result){
		markPosition(result, GAME.comp.color, GAME.comp.char);
		write("looks like I win!!");
	}
	else if(GAME.firstGo){
		var compPos;
		if(GAME.user.posObject[0].type == "edge"){
			if(GAME.stage ==2){
				compPos = counterCorner(GAME.user.posObject[0]);
				compPos = compPos[Math.floor(Math.random()*compPos.length)];
				markPosition(compPos, GAME.comp.color, GAME.comp.char);
				GAME.comp.pos.push(compPos.pos);
				GAME.comp.posObject.push(compPos);
				write("Your turn!");
			}
			else if(GAME.stage==4){
				compPos = canWin(GAME.user);
				markPosition(compPos, GAME.comp.color, GAME.comp.char);
			}

		}
		else{

		}
		if(GAME.stage == 2){}
		else if(GAME.stage == 4){}
		else if(GAME.stage == 6){}
		else if(GAME.stage == 8){}
	}
	

	GAME.stage += 1;
	deactive(false);


}

function canWin(player){
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
			if(match.length>=2){
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