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
    bgm_index: 0,
    bgm_loop: true,
    bgm_list: [
      //OST1 12首
      {id: '1371757760', name: '生命流' },//生命流排序提前
      {id: '1371757762', name: 'Synthetech' },
      {id: '1371760675', name: '逃亡 part2' },
      {id: '1371757759', name: '泛用型自动化解决方案0.3.2.9f2' },//基建
      {id: '1371760677', name: '人性' },
      {id: '1371760676', name: '短兵相接' },
      {id: '1371757758', name: '大柏墟' },
      {id: '1371760669', name: '终局抵抗者' },
      {id: '1371760673', name: '血液' },
      {id: '1371760674', name: '执棋者之骨' },
      {id: '1371757763', name: '永冻症' },
      {id: '1371757761', name: '旅途前方' },
      //火蓝之心原声带 3首
      {id: '1396557696', name: 'Aflame Avenue' },
      {id: '1396557518', name: 'Not Your Business Part.2' },
      {id: '1396561141', name: 'Ready ?' },
      {id: '1403774122', name: 'Speed of Light' },
      {id: '1405147102', name: 'Speed of Light (Inst.)' },
      {id: '1406452570', name: 'Zone 10⁻⁸' },
      {id: '1411527086', name: 'Boiling Blood' },
      {id: '1811693306', name: 'Boiling Blood (伴奏版)' },
      {id: '1417483463', name: '示岁' },//新年快乐！
      {id: '1427681638', name: '独行长路' },
      {id: '1428299645', name: 'Operation Barrenland (W&W Soundtrack Mix)' },
      {id: '1431593851', name: '故乡的风' },
      {id: '1436614177', name: '春弦' },
      {id: '1442033701', name: 'Curtain Call' },
      {id: '1444493657', name: 'Renegade' },
      {id: '1811693575', name: 'Renegade (伴奏版)' },
      {id: '1444493780', name: 'Requiem' },
      {id: '1811701137', name: 'Requiem (伴奏版)' },
      {id: '1444503072', name: 'Sparkling Hydraulics' },
      {id: '1451700083', name: 'Reversed Time' },
      {id: '1456166162', name: '从那高地上远眺' },
      {id: '1456166166', name: 'УраУра' },
      {id: '1460626792', name: "Everything's Alright" }, //祝高考的同学Everything's Alright
      {id: '1811693389', name: "Everything's Alright (伴奏版)" },
      {id: '1462342505', name: 'Lily of the Valley' },
      {id: '1467848445', name: '夏浪' },
      {id: '1470071584', name: 'El Brillo Solitario' },
      {id: '1473615377', name: 'Evolutionary Mechanization' },
      {id: '1473615924', name: 'ALIVE' },
      {id: '1811693160', name: 'ALIVE (伴奏版)' },
      {id: '1481447983', name: 'Reconnection' },
      {id: '1485858993', name: '秋绪' },
      {id: '1811703834', name: '秋绪 (伴奏版)' },
      {id: '1488275299', name: 'Stay Gold' },
      {id: '1491495554', name: 'CONFRONT' },
      {id: '1491503292', name: 'Lullabye' },
      {id: '1811700924', name: 'Lullabye (伴奏版)' },
      {id: '1491511460', name: 'LITHOS' },
      {id: '1804654314', name: 'Tipsy' },
      {id: '1806528693', name: 'Rock the Night Away' },
      {id: '1809117428', name: 'Till the Bell Tolls' },
      {id: '1809781249', name: '冬涤' },
      //OST2
      {id: '1813556331', name: '0:00:01' },
      {id: '1813556335', name: '近卫局攻坚小队' },
      {id: '1813557642', name: 'Абсолю́тный нуль температу́ры (absolute zero)' },
      {id: '1813552624', name: '37℃' },
      {id: '1813557641', name: '来自雪原的回响' },
      {id: '1813552626', name: '江湾小酌' },
      {id: '1813556365', name: 'Dash！' },
      {id: '1813556342', name: '阴云' },
      {id: '1813556357', name: '落子无悔' },
      {id: '1813556350', name: '尘沙扬' },
      {id: '1813556351', name: '尽归霜雪' },
      {id: '1813556337', name: '奇兵天坠' },
    ]
  },
  computed: {
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
    level_num_style: function () {
      var obj1 = {
        fontFamily: 'Noto Sans SC, sans-serif',
        color: '#fff',
        fontWeight: 500,
        position: 'absolute'
      };
      var obj2 = {}
      if (this.userlv >= 100) {
        obj2 = { fontSize: '50px', margin: '-55px 72px' };
      }
      else if (this.userlv >= 10) {
        obj2 = { fontSize: '60px', margin: '-60px 80px' };
      }
      else {
        obj2 = { fontSize: '60px', margin: '-60px 100px' };
      }
      return Object.assign(obj1, obj2);
    }
  },
  methods: {
    boxSwitch: function (obj) {
      if (this.boxes[obj] == 'hidden') {
        this.closeBoxes();
        this.boxes[obj] = 'container';
      }
      else{ this.boxes[obj] = 'hidden'; }
    },
    closeBoxes: function () {
      for (let box in this.boxes) { this.boxes[box] = 'hidden'; }
    },
    changeBGM: function (m) {
      if (m == 0) { this.bgm_index = 0; }
      else {
        this.bgm_index += m;
        if (this.bgm_index == -1) { this.bgm_index = this.bgm_list.length-1; }
        if (this.bgm_index == this.bgm_list.length) {this.bgm_index = 0; }
      }
    },
    keydown: function () {
      console.log('233');
    }
  }
})