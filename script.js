//deals with the form and input data, and starts the game

function start(){
	document.getElementById("content").style.visibility = "visible";
	document.getElementById("content").style.position = "relative";
	document.getElementById("initial").style.visibility = "hidden";
	document.getElementById("initial").style.position = "fixed";

	GAME.user.name = document.getElementById("name").value || "Friend";
	var char = document.getElementById("user-char").value;
	if(char=="rand"){
		char = ["X","O"][Math.floor(Math.random()*2)];
	}
	if(char=="X"){
		GAME.user.char = "X";
		GAME.comp.char = "O";
	}
	else{
		GAME.user.char = "O";
		GAME.comp.char = "X";

	}

	var go = document.getElementById("go").value;
	if(go=="first"){
		GAME.firstGo = false;

	}
	else if(go=="second"){
		GAME.firstGo = true;
	}
	else{
		GAME.firstGo = [true, false][Math.floor(Math.random()*2)];
	}

	GAME.user.color = "green";
	GAME.comp.color = "red";


	play();
}