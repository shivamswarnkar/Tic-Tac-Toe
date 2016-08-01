/*This Game belongs to Shivam Swarnkar.
 *This is an AI system which decides the next move of the computer based on the current 
 *situation of the game.
*/ 

function deactive(bool){
	var places = document.getElementsByClassName("place");
	for (var i=0;  i < places.length; ++i){
		if(places[i].value != "disable"){
			places[i].disabled = bool;
		}
	}
	
}

function markPosition(pos, color, char){
	var curr = document.getElementById(pos.pos);
	curr.style.color = color;
	curr.innerHTML = char;
	curr.value = "disable";
	curr.disabled = true;
	deactive(false);
}

/*------AI--------*/



/*----Function returns a positon object for the 9 positions*/

function position(pos){ //pos should be an array
	var newPos = new Object();
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

	return newPos;

}

/*Returns opposite corner for a given corener or a furthest corner for given edge. center is returned
for given center.
*/
function counterCorner(pos){
	if(pos.type == "center"){return pos;}

	else if(pos.type == "edge"){ //returns furthest corner
		var side = opp(pos.pos[2]);  //sends L or R, gets opposite
		var diffSide = diff(pos.pos[2]);
		return [ position ( [diffSide[0], side] ), position([diffSide[1], side]) ] ;
	}

	else{ //returns opposite corner
		return [ position( [ opp(pos.pos[2]), opp(pos.pos[3]) ] ) ];
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
function firstGo(color, char){
	markPosition(position(), color, char);

}

