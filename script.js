function start(){
	console.log("working");;
	document.getElementById("content").style.visibility = "visible";
	document.getElementById("initial").style.visibility = "hidden";
	document.getElementById("initial").style.position = "fixed";

	GAME.user.name = document.getElementById("name").value || "Friend";
	







	play();
}