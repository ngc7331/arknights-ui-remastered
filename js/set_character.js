/*!
 * Author: xu_zh, AKA ngc7331
 * License: MIT
 */
var app = new Vue({
  el: '#app',
  data: {
    character_list: [],
  },
  computed: {
    avatar_src () {
      return function(name) {
        return "img/avatars/char_"+name+".png"
      }
    }
  },
  methods: {
    setChar: function (character) {
      window.parent.app.char_src = "img/characters/char_"+character+".png";
      window.parent.app.closeBoxes();
    }
  }
  
})