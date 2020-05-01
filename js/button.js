/*!
 * Author: xu_zh, AKA ngc7331
 * License: MIT
 */
"use strict";

function keypress(event){
	if(document.getElementById("settingBox").className == "container"){
		return;
	}
	switch(event.keyCode){
		case 32:
			var out=(document.getElementById("battletext").innerHTML == "作战");
			bgm_switch(out);
			break;
		case 38:
			var volume = document.getElementById("bgm").volume*100;
			bgm_volume(volume+1);
			document.getElementById("set_volume").value=volume+1;
			update_vol_display();
			break;
		case 40:
			var volume = document.getElementById("bgm").volume*100;
			bgm_volume(volume-1);
			document.getElementById("set_volume").value=volume-1;
			update_vol_display();
			break;
			
	}
}

function box_switch(obj){
	var stat = document.getElementById(obj).className;
	switch(stat){
		case "hidden":
			document.getElementById(obj).className = "container";
			break;
		case "container":
			document.getElementById(obj).className = "hidden";
			break;
	}
	var boxes = ["infoBox","charBox","settingBox","exportBox","volumeBox","devBox"];
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
	var arr = ["username","level-num","battlelv","money","jasper","stone","dialog"];
	for (var i=0; i<arr.length; i++){
		document.getElementById(arr[i]).innerHTML = document.getElementById("new_"+arr[i]).value;
	}
	document.getElementById("userid").innerHTML = "ID："+document.getElementById("new_userid").value;
	document.getElementById("figure_total").innerHTML = "\\"+document.getElementById("new_figure_total").value;
	var volume = document.getElementById("bgm").volume*100;
	bgm_volume(volume);
	hide("settingBox");
}

function bgm_switch(keyboard){
	var audio = document.getElementById("bgm");
	if(keyboard){
		if(audio.paused){
			audio.play();
			document.getElementById("battletext").innerHTML = "开始播放";
			setTimeout(function(){document.getElementById("battletext").innerHTML = "作战";},500);
		}
		else{
			audio.pause();
			document.getElementById("battletext").innerHTML = "已暂停";
			setTimeout(function(){document.getElementById("battletext").innerHTML = "作战";},500);
		}
	}
	else{
		if(audio.paused){
			audio.play();
			document.getElementById("battletext").innerHTML = "暂停";
		}
		else{
			audio.pause();
			document.getElementById("battletext").innerHTML = "播放";
		}
	}
}

function bgm_volume(num){
	if(num>=100){
		num=100;
	}
	if(num<=0){
		num=0;
	}
	document.getElementById("bgm").volume=num/100;
	var total = parseInt(document.getElementById("figure_total").innerHTML.slice(1));
	document.getElementById("figure_value").innerHTML=parseInt(num*total/100);
}

function mouseover(obj){
	switch(obj){
		case "bgm":
			var audio = document.getElementById("bgm");
			if(audio.paused){                 
				document.getElementById("battletext").innerHTML = "播放";
			}
			else{
				document.getElementById("battletext").innerHTML = "暂停";
			}
			break;
		case "friends":
			document.getElementById("friends_text").innerHTML = "设置";
			break;
		case "warehouse":
			document.getElementById("warehouse_text").innerHTML = "导出";
			break;
	}
}

function mouseout(obj){
	switch(obj){
		case "bgm":
			document.getElementById("battletext").innerHTML = "作战";
			break;
		case "friends":
			document.getElementById("friends_text").innerHTML = "好友";
			break;
		case "warehouse":
			document.getElementById("warehouse_text").innerHTML = "仓库";
			break;
			
	}
}

function set_char(obj){
	document.getElementById("chara").src = "img/characters/"+obj;
	hide("charBox");
}

function update_vol_display(){
	document.getElementById("vol_display").innerHTML = "当前音量："+document.getElementById("set_volume").value+"%";
}

function export_to_obj(){
	var character = document.getElementById("chara").src;
	character = character.match("img\/characters\/char_.*")[0];
	var obj = {
		username:document.getElementById("username").innerHTML,
		userid:document.getElementById("userid").innerHTML,
		"level-num":document.getElementById("level-num").innerHTML,
		battlelv:document.getElementById("battlelv").innerHTML,
		money:document.getElementById("money").innerHTML,
		jasper:document.getElementById("jasper").innerHTML,
		stone:document.getElementById("stone").innerHTML,
		dialog:document.getElementById("dialog").innerHTML,
		chara:character,
		figure_total:document.getElementById("figure_total").innerHTML,
		vol:document.getElementById("bgm").volume,
		
	}
	document.getElementById("export_obj").value = JSON.stringify(obj);
}

function import_from_obj(){
	var obj = JSON.parse(document.getElementById("import_obj").value);
	for (var x in obj){
		switch (x){
			case "chara":
				document.getElementById("chara").src = obj.chara;
				break;
			case "vol":
				bgm_volume(obj.vol*100);
				document.getElementById("set_volume").value = obj.vol*100;
				update_vol_display();
				break;
			default:
				document.getElementById(x).innerHTML = obj[x];
		}
	}
	hide("exportBox");
}