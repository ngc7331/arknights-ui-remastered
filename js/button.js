// JavaScript Document
function hide(obj){
	var stat = document.getElementById(obj).className;
	switch(stat){
		case "hidden":
			document.getElementById(obj).className = "container";
			break;
		case "container":
			document.getElementById(obj).className = "hidden";
			break;
	}
	console.log("click");
}

function user(){
	document.getElementById("username").innerHTML = document.getElementById("new_username").value;
	document.getElementById("userid").innerHTML = "ID："+document.getElementById("new_userid").value;
	document.getElementById("level-num").innerHTML = document.getElementById("new_userlv").value;
	console.log(typeof document.getElementById("new_userlv").value);
	hide("settingBox");
}

function bgm(){
	var audio = document.getElementById('lifestream');
	if(audio.paused){                 
		audio.play();
	}
	else{
		audio.pause();
	}
	console.log("bgm");
}