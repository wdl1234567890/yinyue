// pages/components/circular-card/circular-card.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemId:{
      type:Number,
      value:-1
    },
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
    },
    isMessage:{
      type:Boolean,
      value:false
    },
    messageCircularColor:{
      type:String,
      value: app.globalData.themeColor
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapItem(e) {
      this.triggerEvent('tapitem', this.data.itemId)
    }
  }
})
