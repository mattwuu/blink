import { classicBeh } from "../classic-beh.js";
// components/classic/music/index.js
Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: "images/player@waiting.png",
    playSrc: "images/player@playing.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {}
});