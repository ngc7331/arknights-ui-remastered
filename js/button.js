/*!
 * Author: xu_zh, AKA ngc7331
 * License: MIT
 */
"use strict";

function keypress(event){
	if(app.boxes['settingBox'] == "container" && event.keyCode!=27){
		return;
	}
	switch(event.keyCode){
		case 32: //space
			var out=(document.getElementById("battletext").innerHTML == "作战");
			bgm_switch(out);
			break;
		case 38: //up
			app.volume = Math.min(app.volume+1, 100);
			break;
		case 40: //down
			app.volume = Math.max(app.volume-1, 0);
			break;
		case 37: //left
			change_bgm("prv");
			break;
		case 39: //right
			change_bgm("nxt");
			break;
		case 27: //esc
			app.closeBoxes();
			break;
	}
	console.log("keypress "+event.keyCode);
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

function bgm_end(){
	if(!document.getElementById("bgm_loop").checked) change_bgm("nxt");
	document.getElementById("bgm").play();
}

function reset_bgmsrc(){
	alert("ERR：从网易云音乐加载BGM资源失败，BGM源将重置为本地audio/生命流.mp3，切换BGM的功能将被禁用...");
	document.getElementById("bgm").src="audio/生命流.mp3";
	document.getElementById("bgm").dataset.netease="false";
	document.getElementById("bgm_btn").style="display: none;";
	document.getElementById("bgm_name").innerHTML="正在播放：生命流";
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
	app.closeBoxes();
}

function char_offset(){
	var x = document.getElementById("offsetX").value;
	var y = document.getElementById("offsetY").value;
	var cssText = $("#char-arts-layer").attr("style") + "; left:" + x + "px !important; top:" + y + "px !important;";
	$("#char-arts-layer").css("cssText", cssText);
}

function reset_char_offset(){
	document.getElementById("offsetX").value = 70;
	document.getElementById("offsetY").value = -20;
	char_offset();
}