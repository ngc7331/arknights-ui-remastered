/*!
 * Author: xu_zh, AKA ngc7331
 * License: MIT
 */
var app = new Vue({
  el: '#app',
  data: {
    char_list: [],
  },
  computed: {
    avatar_src () {
      return function (char) {
        return "img/avatars/char_"+char+".png"
      }
    }
  },
  methods: {
    setChar: function (char) {
      window.parent.app.char_src = "img/characters/char_"+char+".png";
      window.parent.app.closeBoxes();
    }
  }
})