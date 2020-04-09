// JavaScript Document
function info(){
	var stat = document.getElementById("infoBox").className;
	if (stat == "container")
	{
		document.getElementById("infoBox").className = "hidden";
	}
	else
	{
		document.getElementById("infoBox").className = "container";
	}
}