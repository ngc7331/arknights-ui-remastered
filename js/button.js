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
	//console.log("click");
}

function user(){
	document.getElementById("username").innerHTML = document.getElementById("new_username").value;
	document.getElementById("userid").innerHTML = "ID："+document.getElementById("new_userid").value;
	document.getElementById("level-num").innerHTML = document.getElementById("new_userlv").value;
	document.getElementById("battlelv").innerHTML = document.getElementById("new_battlelv").value;
	document.getElementById("money").innerHTML = document.getElementById("new_money").value;
	document.getElementById("jasper").innerHTML = document.getElementById("new_jasper").value;
	document.getElementById("stone").innerHTML = document.getElementById("new_stone").value;
	document.getElementById("dialog").innerHTML = document.getElementById("new_dialog").value;
	hide("settingBox");
}

function bgm(){
	var audio = document.getElementById("lifestream");
	if(audio.paused){                 
		audio.play();
	}
	else{
		audio.pause();
	}
	//console.log("bgm");
}

function bgm_volume(num){
	document.getElementById("lifestream").volume=num;
}

function set_char(obj){
	document.getElementById("chara").src = "img/characters/char_"+obj+".png";
	hide("charBox");
}