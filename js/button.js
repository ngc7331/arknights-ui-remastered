// JavaScript Document
function hidden_switch(obj){
	var stat = document.getElementById(obj).className;
	switch(stat){
		case "hidden":
			document.getElementById(obj).className = "container";
			break;
		case "container":
			document.getElementById(obj).className = "hidden";
			break;
	}
	var boxes = ["infoBox","charBox","settingBox","exportBox","volumeBox"];
	for (var i=0; i<boxes.length; i++){
		if (boxes[i] != obj){
			hide(boxes[i]);
		}
	}
}

function hide(obj){
	document.getElementById(obj).className = "hidden";
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
	document.getElementById("figure_total").innerHTML = "\\"+document.getElementById("new_figure_total").value;
	var volume = document.getElementById("lifestream").volume;
	bgm_volume(volume*100);
	hide("settingBox");
}

function bgm(){
	var audio = document.getElementById("lifestream");
	if(audio.paused){                 
		audio.play();
		document.getElementById("battletext").innerHTML = "暂停";
	}
	else{
		audio.pause();
		document.getElementById("battletext").innerHTML = "播放";
	}
}

function bgm_volume(num){
	document.getElementById("lifestream").volume=num/100;
	var total = parseInt(document.getElementById("figure_total").innerHTML.slice(1));
	document.getElementById("figure_value").innerHTML=parseInt(num*total/100);
}

function mouseover(obj){
	switch(obj){
		case "bgm":
			var audio = document.getElementById("lifestream");
			if(audio.paused){                 
				document.getElementById("battletext").innerHTML = "播放"
			}
			else{
				document.getElementById("battletext").innerHTML = "暂停"
			}
			break;
	}
}

function mouseout(obj){
	switch(obj){
		case "bgm":
			document.getElementById("battletext").innerHTML = "作战"
			break;
	}
}

function set_char(obj){
	document.getElementById("chara").src = "img/characters/char_"+obj+".png";
	hide("charBox");
}

function update_vol_display(){
	document.getElementById("vol_display").innerHTML = "当前音量："+document.getElementById("set_volume").value;
}

function export_to_obj(){
	var character = document.getElementById("chara").src;
	character = character.match("img\/characters\/char_.*")[0];
	var obj = {
		name:document.getElementById("username").innerHTML,
		id:document.getElementById("userid").innerHTML,
		lv:document.getElementById("level-num").innerHTML,
		battlelv:document.getElementById("battlelv").innerHTML,
		money:document.getElementById("money").innerHTML,
		jasper:document.getElementById("jasper").innerHTML,
		stone:document.getElementById("stone").innerHTML,
		dialog:document.getElementById("dialog").innerHTML,
		char:character,
	}
	document.getElementById("export_obj").value = JSON.stringify(obj);
}

function import_from_obj(){
	var obj = JSON.parse(document.getElementById("import_obj").value);
	document.getElementById("username").innerHTML = obj.name;
	document.getElementById("userid").innerHTML = obj.id;
	document.getElementById("level-num").innerHTML = obj.lv;
	document.getElementById("battlelv").innerHTML = obj.battlelv;
	document.getElementById("money").innerHTML = obj.money;
	document.getElementById("jasper").innerHTML = obj.jasper;
	document.getElementById("stone").innerHTML = obj.stone;
	document.getElementById("dialog").innerHTML = obj.dialog;
	document.getElementById("chara").src = obj.char;
}