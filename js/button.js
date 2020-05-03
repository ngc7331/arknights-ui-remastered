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
		case 32: //space
			var out=(document.getElementById("battletext").innerHTML == "作战");
			bgm_switch(out);
			break;
		case 38: //up
			var volume = document.getElementById("bgm").volume*100;
			bgm_volume(volume+1);
			document.getElementById("set_volume").value=volume+1;
			update_vol_display();
			break;
		case 40: //down
			var volume = document.getElementById("bgm").volume*100;
			bgm_volume(volume-1);
			document.getElementById("set_volume").value=volume-1;
			update_vol_display();
			break;
		case 37: //left
			change_bgm("prv");
			break;
		case 39: //right
			change_bgm("nxt");
			break;
	}
	console.log("keypress "+event.keyCode);
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
			document.getElementById(boxes[i]).className = "hidden";
		}
	}
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
	document.getElementById("settingBox").className = "hidden";
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
	if(num>=100) num=100;
	if(num<=0) num=0;
	document.getElementById("bgm").volume=num/100;
	var total = parseInt(document.getElementById("figure_total").innerHTML.slice(1));
	document.getElementById("figure_value").innerHTML=parseInt(num*total/100);
}

function bgm_end(){
	if(!document.getElementById("bgm_loop").checked) change_bgm("nxt");
	document.getElementById("bgm").play();
}

function change_bgm(type){
	if (document.getElementById("bgm").dataset.netease=="false"){
		return 1;
	}
	var arr_id = [
		"1371757760",//生命流排序提前
		"1371757762",
		"1371760675",
		"1371757759",
		"1371760677",
		"1371760676",
		"1371757758",
		"1371760669",
		"1371760673",
		"1371760674",
		"1371757763",
		"1371757761",
		"1396557696",
		"1396557518",
		"1396561141",
		"1403774122",
		"1405147102",
		"1406452570",
		"1411527086",
		"1417483463",
		"1427681638",
		"1428299645",
		"1431593851",
		"1436614177",
		"1442033701",
		"1444493657",
		"1444493780",
		"1444503072",
	];
	var arr_name = [
		"生命流",
		"Synthetech",
		"逃亡 part2",
		"泛用型自动化解决方案0.3.2.9f2",//基建
		"人性",
		"短兵相接",
		"大柏墟",
		"终局抵抗者",
		"血液",
		"执棋者之骨",
		"永冻症",
		"旅途前方",
		"Aflame Avenue",
		"Not Your Business Part.2",
		"Ready ?",
		"Speed of Light",
		"Speed of Light (Inst.)",
		"Zone 10⁻⁸",
		"Boiling Blood",
		"示岁",
		"独行长路",
		"Operation Barrenland (W&W Soundtrack Mix)",
		"故乡的风",
		"春弦",
		"Curtain Call",
		"Renegade",
		"Requiem",
		"Sparkling Hydraulics",
	];
	if(document.getElementById("ngc7331_selected_bgm").checked){
		arr_id = [
			"1371757760", 
			"1405147102",
			"1411527086",
			"1436614177",
			"1444503072",
		];
		arr_name = [
			"生命流",
			"Speed of Light (Inst.)",
			"Boiling Blood",
			"春弦",
			"Sparkling Hydraulics",
		];
	}
	var id = document.getElementById("bgm").src.match("id=.*\.mp3")[0].substr(3,10);
	var pos = arr_id.indexOf(id);
	switch(type){
		case "nxt":
			if (pos >= arr_id.length-1) pos=0;
			else pos++;
			break;
		case "prv":
			if (pos <= 0) pos=arr_id.length-1;
			else pos--;
			break;
		case "ori":
			pos = 0;
			break;
	}
	var paused=document.getElementById("bgm").paused;
	document.getElementById("bgm").src="https://music.163.com/song/media/outer/url?id="+arr_id[pos]+".mp3";
	document.getElementById("bgm_name").innerHTML="正在播放："+arr_name[pos];
	if (!paused) document.getElementById("bgm").play();
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
	document.getElementById("charBox").className = "hidden";
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
	document.getElementById("exportBox").className = "hidden";
}