/*!
 * Author: xu_zh, AKA ngc7331
 * License: MIT
 */
var app = new Vue({
  el: '#app',
  data: {
    volume: 20,
    username: '小造xu_zh',
    userid: 27975991,
    userlv: 115,
    battlelv: '全部完成',
    money: '+∞',
    jasper: '+∞',
    stone: '+∞',
    dialog: '欢迎回来，博士',
    figure_total: 134,
    boxes: {
      infoBox: 'hidden',
      charBox: 'hidden',
      settingBox: 'hidden',
      bgmBox: 'hidden',
      offsetBox: 'hidden',
      devBox: 'hidden'
    },
    text_index: {
      friends: 0,
      battle: 0,
      information: 0,
      team: 0,
      member: 0,
    },
    texts: {
      friends: ['好友', '设置'],
      battle: ['作战', '播放', '暂停', '已暂停', '开始播放'],
      information: ['档案', '信息'],
      team: ['编队', '调整位置'],
      member: ['角色', '选择角色'],
    },
    bgm_index: 0,
    bgm_loop: true,
    bgm_list: [{id: 1371757760, name: "生命流" }],
    bgm_keyboard: 0,
    char_src: 'img/characters/char_002_amiya_1.png',
    char_offsetX: 70,
    char_offsetY: -20,
  },
  computed: {
    text: function () {
      var obj = {};
      for (let t in this.texts) obj[t] = this.texts[t][this.text_index[t]];
      return obj;
    },
    bgm: function () {
        return {
          id: this.bgm_list[this.bgm_index].id,
          name: this.bgm_list[this.bgm_index].name,
          src: "https://music.163.com/song/media/outer/url?id="+this.bgm_list[this.bgm_index].id+".mp3",
        };
    },
    figure_value: function () {
      return parseInt(this.volume * this.figure_total / 100);
    },
    bgm_name_style: function () {
      var obj1 = { width: '300px', height: '50px' };
      var obj2 = {};
      if (this.bgm.name.length >= 30) obj2 = { fontSize: '1.5vmin' };
      else if (this.bgm.name.length >= 15) obj2 = { fontSize: '2.25vmin' };
      else obj2 = { fontSize: '3vmin' };
      return Object.assign(obj1, obj2);
    },
    level_num_style: function () {
      var obj1 = {
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#fff',
        fontWeight: 500,
        position: 'absolute'
      };
      var obj2 = {};
      if (this.userlv >= 100) obj2 = { fontSize: '50px', margin: '-55px 72px' };
      else if (this.userlv >= 10) obj2 = { fontSize: '60px', margin: '-60px 80px' };
      else obj2 = { fontSize: '60px', margin: '-60px 100px' };
      return Object.assign(obj1, obj2);
    },
    char_arts_layer: function () {
      return { left: '70px !important', top: '-20px !important' };
    }
  },
  watch: {
    char_offsetX: function () { this.setOffset(); },
    char_offsetY: function () { this.setOffset(); },
  },
  methods: {
    loadData: function () {
      console.log('load bgm_list');
      axios.get("data/bgm_list.json")
        .then(response => {
          this.bgm_list = response.data;
          console.log('load data');
        for (var i = 0; i<data.length; i++) {
          var key = data[i][0];
          var type = data[i][1];
          if (localStorage.getItem(key) != null) {
            this[key] = localStorage.getItem(key);
            if (type == 'int') this[key] = parseInt(this[key]);
            else if (type == 'bool') this[key] = this[key] == 'true';  
          }
        }})
        .catch(function (error) { console.log(error); });
    },
    setText: function (obj, over) {
      if (obj == 'battle') {
        if (over) {
          var audio = document.getElementById("bgm");
          if (audio.paused) this.text_index.battle = 1+this.bgm_keyboard;
          else this.text_index.battle = 2+this.bgm_keyboard;
        }
        else this.text_index.battle = 0;
      }
      else {
        if (over) this.text_index[obj] = 1;
        else this.text_index[obj] = 0;
      }
    },
    boxSwitch: function (obj) {
      if (this.boxes[obj] == 'hidden') {
        this.closeBoxes();
        this.boxes[obj] = 'container';
      }
      else{ this.boxes[obj] = 'hidden'; }
    },
    closeBoxes: function () {
      for (let box in this.boxes) this.boxes[box] = 'hidden';
    },
    playBGM: function (keyboard) {
      var audio = document.getElementById("bgm");
      if (audio.paused) audio.play();
      else audio.pause();
      this.bgm_keyboard = keyboard;
      this.setText('battle', true);
      if (keyboard) setTimeout(function () {app.text_index.battle = 0; app.bgm_keyboard = 0; }, 500);
    },
    changeBGM: function (m) {
      if (m == 0) { this.bgm_index = 0; }
      else {
        this.bgm_index += m;
        if (this.bgm_index == -1) { this.bgm_index = this.bgm_list.length-1; }
        if (this.bgm_index == this.bgm_list.length) {this.bgm_index = 0; }
      }
    },
    bgmEnd: function () {
      if (!this.bgm_loop) this.changeBGM(1);
      this.playBGM(-2);
    },
    setOffset: function () {
      var cssText = $("#char-arts-layer").attr("style")+";"
          + "left:" + this.char_offsetX + "px !important;"
          + "top:" + this.char_offsetY + "px !important;";
      $("#char-arts-layer").css("cssText", cssText);
    },
    resetOffset: function () {
      this.char_offsetX = 70;
      this.char_offsetY = -20;
    }
  }
})