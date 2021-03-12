// pages/sub-pages/components/batch-music-list-item/batch-music-list-item.js
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "歌单名"
    },
    count: {
      type: Number,
      value: 0
    },
    itemId: {
      type: Number,
      value: -1
    },
    checked: {
      type: Boolean,
      value: false
    },
    cover:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    thumbSize: 140,
    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCheckChange(e) {
      this.triggerEvent('handlecheckchange', { checked: e.detail, id: this.data.itemId })
    },
    tapUp(e){
      this.triggerEvent('tapup', this.data.itemId)
    },
    tapDown(e){
      this.triggerEvent('tapdown', this.data.itemId)
    }
  }
})
