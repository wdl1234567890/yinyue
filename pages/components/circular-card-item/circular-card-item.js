// pages/components/circular-card/circular-card.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cover: {
      type: String,
      value: ''
    },
    message:{
      type: String,
      value: '音乐'
    },
    size:{
      type:Number,
      value:200
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
